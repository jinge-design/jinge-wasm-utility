const fs = require('fs');
const path = require('path');

function _re(filename) {
  return path.resolve(__dirname, '../lib/' + filename);
}

const INIT_CODE = `
/**
 * Don't forgot to use \`file-loader\` to handle wasm.
 * See: https://github.com/cars10/rust-wasm-webworker-example
 */
import wasmSrc from './jinge_wasm_utility_bg.wasm';

let wasm;
let __waiting__;
function __init__() {
  if (wasm) {
    return Promise.resolve();
  }
  if (!__waiting__) {
    __waiting__ = WebAssembly.instantiateStreaming(fetch(wasmSrc)).then(result => {
      wasm = result.instance.exports;
    });
  }
  return __waiting__;
}\n`;

fs.writeFileSync(
  _re('index.js'),
  fs.readFileSync(
    _re('jinge_wasm_utility_bg.js'), 'utf-8'
  ).replace(
    /^[\s\n\r]*import[^\n]+\n/, INIT_CODE
  ).replace(
    /export function\s*([\w\d$_]+)([^{]+){/g, (m0, m1, m2) => {
      return `export async function ${m1.replace(/_(\w)/, (m0, m1) => m1.toUpperCase())}${m2} {
    await __init__();`;
    }
  )
);

fs.writeFileSync(
  _re('index.d.ts'),
  fs.readFileSync(
    _re('jinge_wasm_utility.d.ts'), 'utf-8'
  ).replace(
    /export function\s*([\w\d_$]+)(\s*\([^)]+\)\s*):\s*([\w\d_$]+);\n/g, (m0, m1, m2, m3) => {
      return `export function ${m1.replace(/_\w/g, m => m[1].toUpperCase())}${m2}: Promise<${m3}>;\n`;
    }
  )
);

fs.unlinkSync(_re('jinge_wasm_utility.js'));
fs.unlinkSync(_re('jinge_wasm_utility.d.ts'));
fs.unlinkSync(_re('jinge_wasm_utility_bg.d.ts'));
