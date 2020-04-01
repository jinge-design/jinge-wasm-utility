const fs = require('fs');
const path = require('path');

function _re(filename) {
  return path.resolve(__dirname, '../lib/' + filename);
}

const INIT_CODE = `
let wasm;
async function __init__() {
  if (!wasm)
    wasm = await import('./jinge_wasm_utility_bg.wasm');
}\n`;
const cnt = fs.readFileSync(
  _re('jinge_wasm_utility.js'), 'utf-8'
).replace(
  /^[\s\n\r]*import[^\n]+\n/, INIT_CODE
).replace(
  /export function\s*([\w\d$_]+)([^{]+){/g, (m0, m1, m2) => {
    return `export async function ${m1.replace(/_(\w)/, (m0, m1) => m1.toUpperCase())}${m2} {
  await __init__();`;
  }
);

fs.writeFileSync(
  _re('index.js'),
  cnt
);

fs.unlinkSync(_re('jinge_wasm_utility.js'));
fs.unlinkSync(_re('jinge_wasm_utility.d.ts'));
fs.unlinkSync(_re('jinge_wasm_utility_bg.d.ts'));
