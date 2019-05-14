const t = require('tcomb')
const fetch = require('isomorphic-fetch')
const querystring = require('querystring')
const ethers = require('ethers')
const {
  PGP_CONTRACT_ADDRESS,
  abis,
  NETWORK,
  SLS_PGP_URL,
  keyspaceDefaultSeedFn,
  keyspaceSignatureTextFn,
} = require('../constants')
const IPFS = require('ipfs-mini')
const openpgp = require('openpgp')
const axios = require('axios')

const ipfsInfura = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
const ipfsAirSwap = new IPFS({ host: 'ipfs.airswap.io', port: 443, protocol: 'https' })

const key = t.struct({
  public: t.String,
  private: t.String,
})

const pinJSONToIPFS = JSONBody => {
  const url = `${SLS_PGP_URL}/storePinata`
  return axios.post(url, JSONBody).then(resp => resp.data.IpfsHash)
}

const ipfsHash = t.refinement(t.String, s => s.length > 30, 'ipfsHash')

async function generateKeyPair(signedSeed, signer) {
  const address = await signer.getAddress()
  const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
    userIds: [{ address }],
    curve: 'p256', // ECC curve name, most widely supported
    passphrase: signedSeed,
  })
  return {
    private: privateKeyArmored,
    public: publicKeyArmored,
  }
}

async function storePGPKeyOnIPFS(walletPGPKey) {
  return new Promise((resolve, reject) => {
    // this "resolved" syntax is required since there isn't a Promise.none()
    let resolved = 0
    ipfsAirSwap
      .add(JSON.stringify(walletPGPKey))
      .then(resolve)
      .catch(e => {
        resolved++
        if (resolved === 2) {
          reject(e)
        }
      })
    ipfsInfura
      .add(JSON.stringify(walletPGPKey))
      .then(resolve)
      .catch(e => {
        resolved++
        if (resolved === 2) {
          reject(e)
        }
      })

    pinJSONToIPFS(walletPGPKey) // pinata will always take the longest to resolve since they don't support reads
  })
}

const fetchIPFSContentFromCloudfare = cid =>
  axios.get(`https://cloudflare-ipfs.com/ipfs/${cid}`).then(resp => JSON.stringify(resp.data))

async function fetchPGPKeyFromIPFS(cid) {
  const content = await new Promise((resolve, reject) => {
    if (!cid) {
      resolve(undefined)
      return
    }
    // this "resolved" syntax is required since there isn't a Promise.none()
    let resolved = 0
    ipfsAirSwap
      .cat(cid)
      .then(resolve)
      .catch(e => {
        resolved++
        if (resolved === 3) {
          reject(e)
        }
      })
    ipfsInfura
      .cat(cid)
      .then(resolve)
      .catch(e => {
        resolved++
        if (resolved === 3) {
          reject(e)
        }
      })

    fetchIPFSContentFromCloudfare(cid)
      .then(resolve)
      .catch(e => {
        resolved++
        if (resolved === 3) {
          reject(e)
        }
      })
  })
  return key(JSON.parse(content))
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
      this.signerPGPKey = await fetchPGPKeyFromIPFS(this.signerIPFSHash)
    } catch (e) {
      console.log('ipfsHash for wallet not found')
    }
    return true
  }
  async createSignedSeed() {
    return this.signer.signMessage(this.seed)
  }
  async getHashByAddress(address) {
    const that = this
    return (
      //this.ipfsHashes[address] ||
      fetch(
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
    )
  }
  async fetchKeyByAddress(address) {
    const ipfsKeyHash = await this.getHashByAddress(address.toLowerCase())
    return fetchPGPKeyFromIPFS(ipfsKeyHash)
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
        ipfsKeyHash = ipfsHash(await storePGPKeyOnIPFS(keyPair))
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
  isPGPReady() {
    return this.signedSeed && this.signerIPFSHash && this.signerPGPKey
  }
}

module.exports = KeySpace
