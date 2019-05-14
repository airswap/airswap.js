# AirSwap Libraries

This repo contains modules that have proven to be useful throughout our airswap services. 

Roadmap can be found here: 
https://www.notion.so/airswap/Libraries-785d152341e44715b63cc1dc52cfc817

Documentation can be found here:
https://libraries.airswap.io

## Yarn Linking
In order to make iterating on this repo faster, we can use yarn linking. We will use trade-flow as an example repo.
1. Place your `trade-flow` repo and your `libraries` repo in the same directory.
2. `cd libraries` and `yarn link` (this prepares `libaries` to be linked to from another local repo)
3. `cd ../trade-flow` and then `yarn link "@airswap/libraries"` (this sets up a local link between `trade-flow` and `libraries` )

You can then develop both `trade-flow` and `libraries` in parallel. 

To import code from libraries without building it (so using the actively developed code in the `src` folder), you could use something like the following in `trade-flow`:

```
const { EXCHANGE_CONTRACT_ADDRESS } = require('@airswap/libraries/src/constants')
```
When you are finished, you can run `yarn unlink "@airswap/libraries"` and then run `yarn` to re-install the remote version.

More information about using `yarn link` can be found here https://yarnpkg.com/lang/en/docs/cli/link/

## Project Structure

Inside of `src`, the project is organized into submodules of scoped functionality.

Each submodule has the following director structure 
```
/[submodule name]
 index.js (main application code, CMD node.js)
 /redux
   index.js (exports middleware, reducers, selectors, containers, & actions)
   middleware.js 
   reducers.js
   actions.js
```

The top-level `index.js` is the meat of the application code. It should be atomic and isomorphic so that it can be included by itself in a node.js or frontend application without incompatibilities.
There are also redux implementations of the submodule bundled in the same directory. 
The `middleware.js` file is the window to the top-level `index.js` submodule. A redux application should only access the functionality in the library through actions, selectors, & containers 
There is very little redux written in this repo, the vast majority of the redux is implemented through redux templates. 


## Selector Conventions

In general, if a selector starts with `get` it will return a constant value.
If a selctor starts with `make`, it will return a function that takes a paramater, and that function will return a constant value.
