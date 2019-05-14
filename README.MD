# AirSwap.js

This repo contains modules that have proven to be useful throughout our airswap services. 

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
