use flate2::Compression;
use flate2::write::GzEncoder;
use flate2::read::GzDecoder;
use std::io::{Read, Write};
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// When the `console_error_panic_hook` feature is enabled, we can call the
// `set_panic_hook` function at least once during initialization, and then
// we will get better error messages if our code ever panics.
//
// For more details see
// https://github.com/rustwasm/console_error_panic_hook#readme
#[cfg(feature = "console_error_panic_hook")]
fn set_panic_hook() {
  console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn gzip_encode(buffer: &[u8]) -> Vec<u8> {
  let mut e = GzEncoder::new(Vec::new(), Compression::best());
  e.write_all(buffer).expect("could not encode");
  let output = e.finish();
  return output.unwrap();
}

#[wasm_bindgen]
pub fn gzip_decode(buffer: &[u8]) -> Vec<u8> {
  let mut d = GzDecoder::new(&buffer[..]);
  let mut output = Vec::new();
  d.read_to_end(&mut output).unwrap();
  return output;
}