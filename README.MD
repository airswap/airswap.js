# AirSwap.js

Useful JavaScript modules for Web3 and AirSwap network developers.

## Quick Start

```
yarn add airswap
```

## Popular Modules

### DexIndex Prices
[DexIndex](https://dexindex.io) is a price aggregator for decentralized trading venues.

```JavaScript
import { fetchDexIndexPrices } from `@airswap/dexIndex`
const prices = await fetchDexIndexPrices({ side, amount, symbol })
```

### Token Metadata
ERC20 tokens often have metadata associated with them beyond what's on the smart contract.

```JavaScript
import { fetchDexIndexPrices } from `@airswap/dexIndex`
const prices = await fetchDexIndexPrices({ side, amount, symbol })
```

### Hardware Wallets
Wallets like Ledger and Trezor can be challenging to work with so we've created handy modules.

```JavaScript
import { fetchDexIndexPrices } from `@airswap/ledger`
const prices = await fetchDexIndexPrices({ side, amount, symbol })
```

### Atomic Swaps
Perform a token swap between parties for both ERC20 and ERC721 (NFT) tokens.

```JavaScript
import { fillOrder } from `@airswap/swapLegacy`
const prices = await fillOrder(order, signer)
```

## Using with Ethereum

When interacting with wallets for signatures or transactions, AirSwap.js uses the ethers libraries to manage "signers".

...

## Using with Redux
There is very little redux written in this repo, the vast majority of the redux is implemented through redux templates. The `middleware.js` file is the window to the top-level `index.js` submodule. A redux application should only access the functionality in the library through actions, selectors, & containers

### Actions
[Actions](https://redux.js.org/basics/actions) are fired to send data from your application to your store.

### Reducers
...

### Middleware
...

### Selectors
[Selectors](https://github.com/reduxjs/reselect) are convenient and efficient ways to read application state.

In general, if a selector starts with `get` it will return a constant value. If a selector name begins with `make`, it will return a function that takes an argument and return a constant value. Selectors live inside of reducers.

### Example

```
import { unwrapWeth } from '@airswap/erc20/redux/actions'
```

```
import { selectors as walletSelectors } from '@airswap/libraries/src/wallet/redux/reducers'

const {
  getIsWalletUnwrappingWeth
} = walletSelectors

const mapStateToProps = (state: *) => {
  return {
    isWalletUnwrappingWeth: getIsWalletUnwrappingWeth(state)
  }
}
```

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

## Contributing

...

## Scripts

| Command | Description |
| :--- | :--- |
| `yarn test` | ... |
| `yarn build` | ... |

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
