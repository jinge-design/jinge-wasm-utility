# jinge-wasm-utility

> wasm utility for https://jinge.design

## Develop

First, install [wasm-bindgen](https://rustwasm.github.io/wasm-bindgen/reference/cli.html) and [wasm-opt](https://github.com/WebAssembly/binaryen).

````bash
cargo install wasm-bindgen-cli
brew install binaryen
````

Then, install npm dependencies and start development.
  
````bash
npm install
npm run build-wasm
npm start
````

## Build

````bash
npm run build
````

