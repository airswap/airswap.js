const t = require('tcomb')
const fetch = require('isomorphic-fetch')
const querystring = require('querystring')
const ethers = require('ethers')
const openpgp = require('openpgp')
const { PGP_CONTRACT_ADDRESS, abis, NETWORK, SLS_PGP_URL } = require('../constants')

const { ipfsStoreJSON, ipfsFetchJSONFromCID } = require('../ipfs')

const keyspaceDefaultSeedFn = address => `I'm generating my encryption keys for AirSwap ${address}`
const keyspaceSignatureTextFn = ipfsKeyHash => `IPFS location of my Keyspace identity: ${ipfsKeyHash}`

const key = t.struct({
  public: t.String,
  private: t.String,
})

const ipfsHash = t.refinement(t.String, s => s.length > 30, 'ipfsHash')

async function generateKeyPair(signedSeed, signer) {
  const address = await signer.getAddress()
  const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
    userIds: [{ address }],
    curve: 'p256', // ECC curve name, most widely supported
    passphrase: signedSeed,
  })
  return key({
    private: privateKeyArmored,
    public: publicKeyArmored,
  })
}

function getPGPContract(signer) {
  return new ethers.Contract(PGP_CONTRACT_ADDRESS, abis[PGP_CONTRACT_ADDRESS], signer)
}
/* eslint-disable */
async function storeIPFSHashOnPGPContract(ipfsKeyHash, signer) {
  const pgpContract = getPGPContract(signer)
  return pgpContract.addPublicKey(ipfsKeyHash)
}

function storeHash({ address, signature, ipfsKeyHash, message }) {
  return new Promise((resolve, reject) =>
    Promise.all([
      fetch(`${SLS_PGP_URL}/storeHash`, {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify({ address, signature, ipfsHash: ipfsKeyHash, message }),
      }),
    ])
      .then(([response]) => {
        if (!response.ok) {
          reject(response.statusText)
        }
        return response.text()
      })
      .then(res => resolve(res))
      .catch(err => {
        reject(err)
      }),
  )
}

class KeySpace {
  constructor({
    signer,
    signedSeed,
    seed,
    onRequestSignedSeed,
    onGeneratedSignedSeed,
    onRequestPGPKeyPair,
    onGeneratedPGPKeyPair,
  }) {
    if (!signer) {
      throw new Error('This keyspace implementation requires a valid ethers.js Signer')
    }
    this.onRequestSignedSeed = onRequestSignedSeed.bind(this)
    this.onGeneratedSignedSeed = onGeneratedSignedSeed.bind(this)
    this.onRequestPGPKeyPair = onRequestPGPKeyPair.bind(this)
    this.onGeneratedPGPKeyPair = onGeneratedPGPKeyPair.bind(this)
    this.seed = seed
    this.signedSeed = signedSeed
    this.signer = signer
    this.ipfsHashes = {}
    this.pgpKeys = {}
    this.initialized = this.init()
  }
  async init() {
    this.signerAddress = (await this.signer.getAddress()).toLowerCase()
    this.seed = this.seed || keyspaceDefaultSeedFn(this.signerAddress)
    try {
      this.signerIPFSHash = await this.getHashByAddress(this.signerAddress)
      this.signerPGPKey = await ipfsFetchJSONFromCID(this.signerIPFSHash)
    } catch (e) {
      console.log('ipfsHash for wallet not found')
      return true
    }
    return true
  }
  async createSignedSeed() {
    return this.signer.signMessage(this.seed)
  }
  async getHashByAddress(address) {
    const that = this
    return fetch(
      `${SLS_PGP_URL}/getHashByAddress?${querystring.stringify({
        address: address.toLowerCase(),
        network: NETWORK,
      })}`,
      {
        method: 'get',
        mode: 'cors',
      },
    ).then(async response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const ipfsKeyHash = ipfsHash(await response.text())
      that.ipfsHashes[address.toLowerCase()] = ipfsKeyHash
      return ipfsKeyHash
    })
  }
  async fetchKeyByAddress(address) {
    if (this.pgpKeys[address.toLowerCase()]) {
      return this.pgpKeys[address.toLowerCase()]
    }
    const ipfsKeyHash = await this.getHashByAddress(address.toLowerCase())
    const key = await ipfsFetchJSONFromCID(ipfsKeyHash)
    this.pgpKeys[address.toLowerCase()] = key
    return key
  }
  async setUpPGP() {
    await this.initialized
    if (this.isPGPReady()) {
      return true
    }
    if (!this.signedSeed) {
      // generating signed seed
      this.onRequestSignedSeed(this.seed)
      try {
        this.signedSeed = await this.createSignedSeed()
        // generated signed seed
        this.onGeneratedSignedSeed(this.signedSeed)
      } catch (e) {
        return Promise.reject(e)
      }
    }
    if (!this.signerPGPKey) {
      // generating key pair
      this.onRequestPGPKeyPair(this.signerAddress)

      let keyPair
      try {
        keyPair = await generateKeyPair(this.signedSeed, this.signer)
      } catch (e) {
        return Promise.reject(e)
      }

      let ipfsKeyHash
      try {
        ipfsKeyHash = ipfsHash(await ipfsStoreJSON(keyPair))
      } catch (e) {
        return Promise.reject(e)
      }

      const signatureText = keyspaceSignatureTextFn(ipfsKeyHash)

      let signature
      try {
        signature = await this.signer.signMessage(signatureText)
      } catch (e) {
        return Promise.reject(e)
      }

      try {
        await storeHash({
          signature,
          message: signatureText,
          ipfsKeyHash,
          address: this.signerAddress,
        })
        // generated key pair
        this.onGeneratedPGPKeyPair(keyPair)
      } catch (e) {
        return Promise.reject(e)
      }

      this.signerPGPKey = keyPair
      this.signerIPFSHash = ipfsKeyHash
    }

    try {
      await this.fetchKeyByAddress(this.signerAddress)
    } catch (e) {
      return Promise.reject(e)
    }

    return this.isPGPReady()
  }
  async encrypt(message, toAddress) {
    const toKey = await this.fetchKeyByAddress(toAddress.toLowerCase())
    const publicKeyArmored = toKey.public
    const [privKeyObj] = (await openpgp.key.readArmored(this.signerPGPKey.private)).keys
    await privKeyObj.decrypt(this.signedSeed)
    return new Promise(async (resolve, reject) => {
      openpgp
        .encrypt({
          message: openpgp.message.fromText(message), // input as Message object
          publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys, // for encryption
          privateKeys: [privKeyObj], // for signing (optional)
        })
        .then(ciphertext => {
          resolve(ciphertext.data)
        })
        .catch(reject)
    })
  }
  async decrypt(encryptedMessage, fromAddress) {
    await this.setUpPGP()
    const fromKey = await this.fetchKeyByAddress(fromAddress.toLowerCase())
    const publicKeyArmored = fromKey.public
    const [privKeyObj] = (await openpgp.key.readArmored(this.signerPGPKey.private)).keys
    await privKeyObj.decrypt(this.signedSeed)
    return new Promise(async (resolve, reject) => {
      openpgp
        .decrypt({
          message: await openpgp.message.readArmored(encryptedMessage),
          publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys, // for verification (optional)
          privateKeys: [privKeyObj],
        })
        .then(plaintext => {
          resolve(plaintext.data)
        })
        .catch(reject)
    })
  }
  async sign(text) {
    await this.setUpPGP()
    const privKeyObj = (await openpgp.key.readArmored(this.signerPGPKey.private)).keys[0]
    await privKeyObj.decrypt(this.signedSeed)
    const signedData = await openpgp
      .sign({
        message: openpgp.cleartext.fromText(text), // CleartextMessage or Message object
        privateKeys: [privKeyObj], // for signing
      })
      .then(signed => signed.data)
    return signedData
  }
  async validate(cleartext, fromAddress) {
    const fromKey = await this.fetchKeyByAddress(fromAddress.toLowerCase())
    const publicKeyArmored = fromKey.public
    const result = await openpgp.verify({
      message: await openpgp.cleartext.readArmored(cleartext), // parse armored message
      publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys, // for verification
    })
    return _.get(result, 'signatures.0.valid')
  }

  isPGPReady() {
    return this.signedSeed && this.signerIPFSHash && this.signerPGPKey
  }
}

module.exports = KeySpace
