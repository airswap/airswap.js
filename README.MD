![AirSwap Logo](https://miro.medium.com/max/4000/1*Wr5GFTao0-IXtpikXiAE2Q.png)

[![Total alerts](https://img.shields.io/lgtm/alerts/g/airswap/AirSwap.js.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/airswap/AirSwap.js/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/airswap/AirSwap.js.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/airswap/AirSwap.js/context:javascript)
[![NPM version](https://img.shields.io/npm/v/airswap.js.svg)](https://www.npmjs.com/package/airswap.js)
[![Discord Chat](https://img.shields.io/discord/590643190281928738?logo=discord)](https://discord.gg/ecQbV7H)  

# AirSwap.js

Useful JavaScript modules for Web3 and AirSwap network developers.

## Quick Start

```
yarn add airswap.js
```

## Examples
For more complete examples and a demo web app, see the [AirSwap.js-examples](https://github.com/airswap/AirSwap.js-examples) repository.

### DexIndex Prices
[DexIndex](https://dexindex.io) is a price aggregator for decentralized trading venues.

```JavaScript
import { fetchDexIndexPrices } from 'airswap.js/src/dexIndex'
const prices = await fetchDexIndexPrices({ side, amount, symbol })
```

### Token Metadata
ERC20 token metadata like images and descriptions.

```JavaScript
import { fetchTokens } from 'airswap.js/src/tokens'
const tokens = await fetchTokens()
```

### Token Balances
Fetch many balances or allowances for many addresses in a single call.

```JavaScript
import { getManyBalancesManyAddresses } from 'airswap.js/src/deltaBalances'
```

### Atomic Swaps
Perform a token swap between parties for both ERC20 and ERC721 (NFT) tokens.
The new Swap contract lives on Rinkeby at `0x4E25e972AF14942d119275453CD2DB93B320607c` and Kovan at `0x909Af82a14e78d1e8a187D88E6BBA8874f657ef5`. Learn more about the [Swap Protocol](https://swap.tech/whitepaper) and [Swap Contract](https://github.com/airswap/swap-contract).

```JavaScript
import { swapSimple } from 'airswap.js/src/swap'
const result = swapSimple({ id, makerWallet, makerAmount, makerToken,
  takerWallet, takerAmount, takerToken,
  expiry, v, r, s })
```

## Using Ethers
Ethereum wallet interactions often take a "signer" as a parameter. [Learn more about Ethers and signers](https://github.com/ethers-io/ethers.js/).

## Module Structure
The top-level `index.js` includes the majority of the application code. It should be isomorphic to be used easily in both NodeJS and browser based applications. The `redux` folder includes the actions, reducers, and middleware in use by the module.

```bash
[submodule-name]
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
