![AirSwap Logo](https://miro.medium.com/max/4000/1*Wr5GFTao0-IXtpikXiAE2Q.png)

# KeySpace

KeySpace is a Trustless PGP implementation that utilizes Ethereum and IPFS. 

## Do I need this?

KeySpace will be useful to you as a dApp developer if you are trying to automate authentication of ethereum addresses on your frontend, or if you need end-to-end encrypted messaging in your application.  

## Quick Start

KeySpace is a dependency of AirSwap.js

```bash
yarn add airswap.js
```

After installing, KeySpace can be imported and initialized as follows:
```JavaScript
import KeySpace from 'airswap.js/src/keySpace'

const keySpace = new KeySpace({
  signer, // a valid ethers.js signer
  signedSeed, // the encrypted password for your PGP Key Pair, store it to persist keys accross sessions
  onRequestSignedSeed, // fired when the signature for the signedSeed is request, returns unsigned seed
  onGeneratedSignedSeed, // fired when the signature for the signedSeed is completed, returns signed seed
  onRequestPGPKeyPair, // fired when the signature for the key pair is requested, returns account address
  onGeneratedPGPKeyPair,  // fired when the signature for the key pair is completed, returns key pair
})

keySpace.setUpPGP().then(async () => {
  // keySpace is now initialized and ready to sign, validate, encrypt & decrypt!
  const walletAddress = await signer.getAddress()
  
  const messageToSign = 'Test Message'
  console.log(messageToSign);
  
  // message is signed by the PGP key asoociated with walletAddress
  const signedMessage = await keySpace.sign(messageToSign);
  console.log("signedMessage", signedMessage);
  
  // signed message is validated as signed by the PGP key asoociated with walletAddress
  const validated = await keySpace.validate(signedMessage, walletAddress);
  console.log("validated", validated);
 
  // message is encrypted with the public PGP key asoociated with walletAddress
  const encryptedMessage = await keySpace.encrypt(
    messageToSign,
    walletAddress
  );
  console.log("encryptedMessage", encryptedMessage);
  
  // message is decrypted by the private PGP key asoociated with walletAddress
  const decryptedMessage = await keySpace.decrypt(
    encryptedMessage,
    walletAddress
  );
  console.log("decryptedMessage", decryptedMessage);
})
```






## Using Ethers
Ethereum wallet interactions often take a "signer" as a parameter. [Learn more about Ethers and signers](https://github.com/ethers-io/ethers.js/).

## Module Structure
The top-level `index.js` includes the majority of the application code. It should be isomorphic to be used easily in both NodeJS and browser based applications. The `redux` folder includes the actions, reducers, and middleware in use by the module.

```bash
keySpace
├── index.js
├── redux
│   ├── actions.js
│   ├── index.js
│   ├── middleware.js
└── └── reducers.js
```

## License (Apache-2.0)

Copyright 2019 Swap Holdings Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
