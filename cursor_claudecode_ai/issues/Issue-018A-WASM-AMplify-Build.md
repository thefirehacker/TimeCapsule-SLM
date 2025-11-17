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
  concatenating incorrectly when resolving the public asset location. Next
  step: adjust the server-side loader to use path.join(process.cwd(), "public",
  "onnxruntime-web") (with a trailing slash or path.resolve) before assigning
  to module.env.backends.onnx.wasm.wasmPaths, and re-deploy so the Lambda looks
  under .../public/onnxruntime-web/ort-wasm-simd.wasm instead of the broken
  concatenation.

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