 KB Upload WASM Notes

  - Shipping the ONNX runtime assets: we already copied onnxruntime-web/*.wasm
    into public/onnxruntime-web, and src/lib/server/embedding.ts:19-37 now points
    Xenova’s env.backends.onnx.wasm.wasmPaths at that directory (plus disables
    the worker proxy) so local npm run build && npm run start works.
  - Keeping the WASM inside the Amplify Lambda: next.config.ts was updated to
    use outputFileTracingIncludes to explicitly bundle node_modules/onnxruntime-
    web/dist/ort-wasm*.wasm and public/onnxruntime-web/** so the serverless zip
    should contain the files during next build.
  - Amplify build hooks (amplify.yml) run git lfs install + git lfs pull before
    npm ci, so the heavyweight model files are pulled down during CI/CD.

Despite the above, Amplify’s runtime is still throwing ENOENT: '/tmp/app/
 public/onnxruntime-webort-wasm-simd.wasm'. That path is missing a slash
 between onnxruntime-web and ort-*.wasm, which means Next is stripping or
 concatenating incorrectly when resolving the public asset location.  
✅ Fix attempt #1: force `module.env.backends.onnx.wasm.wasmPaths` to use
`path.join(process.cwd(), "public", "onnxruntime-web") + "/"` so the slash
sticks around inside Xenova.

 **New failure mode (2025-01-13)**  
 Even after forcing a trailing slash, the Lambda now returns:
 
 ```
 {"error":"no available backend found. ERR: [wasm] RuntimeError: Aborted(CompileError: WebAssembly.instantiate(): expected magic word 00 61 73 6d, found 76 65 72 73 @+0). Build with -sASSERTIONS for more info."}
 ```
 
That indicates the WASM loader is reading a non-binary payload (likely HTML or a
missing file).

✅ Fix attempt #2 (current): `src/lib/server/embedding.ts` now resolves the ONNX
runtime directory dynamically. It prefers `public/onnxruntime-web/`, but if that
path is missing/bad it automatically falls back to
`node_modules/onnxruntime-web/dist`, and it always appends a trailing slash when
assigning `module.env.backends.onnx.wasm.wasmPaths`. This means Amplify can load
the bundled `.wasm` files from node_modules even if `/public` gets mangled.
  [#43](https://github.com/thefirehacker/TimeCapsule-SLM/issues/43)2150-08b6897e84c01d2b.js:1  POST https://timecapsule.bubblspace.com/api/kb/upload 500 (Internal Server Error)
(anonymous) @ 2150-08b6897e84c01d2b.js:1
onChange @ page-5b0f252fd0c0ddc4.js:1
iX @ 4bd1b696-148e447745c159fa.js:1
(anonymous) @ 4bd1b696-148e447745c159fa.js:1
nS @ 4bd1b696-148e447745c159fa.js:1
i2 @ 4bd1b696-148e447745c159fa.js:1
s7 @ 4bd1b696-148e447745c159fa.js:1
s5 @ 4bd1b696-148e447745c159fa.js:1Understand this error
1684-cc81a5745e91eb77.js:1 File upload failed: Error: Upload failed (500): {"error":"no available backend found. ERR: [wasm] RuntimeError: Aborted(Error: ENOENT: no such file or directory, open '/tmp/app/public/onnxruntime-webort-wasm-simd.wasm'). Build with -sASSERTIONS for more info."}
    at Object.handleFileUpload (2150-08b6897e84c01d2b.js:1:42028)
    at async onChange (page-5b0f252fd0c0ddc4.js:1:382311)
overrideMethod @ hook.js:608
push.66905.window.console.error @ 1684-cc81a5745e91eb77.js:1
(anonymous) @ 2150-08b6897e84c01d2b.js:1
await in (anonymous)
onChange @ page-5b0f252fd0c0ddc4.js:1
iX @ 4bd1b696-148e447745c159fa.js:1
(anonymous) @ 4bd1b696-148e447745c159fa.js:1
nS @ 4bd1b696-148e447745c159fa.js:1
i2 @ 4bd1b696-148e447745c159fa.js:1
s7 @ 4bd1b696-148e447745c159fa.js:1
s5 @ 4bd1b696-148e447745c159fa.js:1Understand this error
2150-08b6897e84c01d2b.js:1 Fetch failed loading: POST "https://timecapsule.bubblspace.com/api/kb/upload".
