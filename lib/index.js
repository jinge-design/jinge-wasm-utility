
/**
 * Don't forgot to use `file-loader` to handle wasm.
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
}

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachegetUint8Memory0;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1);
  getUint8Memory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
  if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachegetInt32Memory0;
}

function getArrayU8FromWasm0(ptr, len) {
  return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
* @param {Uint8Array} buffer
* @returns {Uint8Array}
*/
export async function gzipEncode(buffer) {
  await __init__();
  var ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.gzip_encode(8, ptr0, len0);
  var r0 = getInt32Memory0()[8 / 4 + 0];
  var r1 = getInt32Memory0()[8 / 4 + 1];
  var v1 = getArrayU8FromWasm0(r0, r1).slice();
  wasm.__wbindgen_free(r0, r1 * 1);
  return v1;
}

/**
* @param {Uint8Array} buffer
* @returns {Uint8Array}
*/
export async function gzipDecode(buffer) {
  await __init__();
  var ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.gzip_decode(8, ptr0, len0);
  var r0 = getInt32Memory0()[8 / 4 + 0];
  var r1 = getInt32Memory0()[8 / 4 + 1];
  var v1 = getArrayU8FromWasm0(r0, r1).slice();
  wasm.__wbindgen_free(r0, r1 * 1);
  return v1;
}
