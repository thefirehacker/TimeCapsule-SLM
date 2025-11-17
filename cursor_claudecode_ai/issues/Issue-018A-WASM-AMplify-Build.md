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

✅ Fix attempt #2: `src/lib/server/embedding.ts` now resolves the ONNX
runtime directory dynamically. It prefers `public/onnxruntime-web/`, but if that
path is missing/bad it automatically falls back to
`node_modules/onnxruntime-web/dist`, and it always appends a trailing slash when
assigning `module.env.backends.onnx.wasm.wasmPaths`. This means Amplify can load
the bundled `.wasm` files from node_modules even if `/public` gets mangled.

**New failure mode (2025-01-17)**
Error changed to:
```
{"error":"Can't create a session"}
```

This indicates WASM files loaded successfully, but ONNX session creation failed.

**Root cause discovered:** `next.config.ts` had `outputFileTracingIncludes` 
defined in BOTH the top-level (correct) AND the `experimental` section (wrong).
Next.js 15.3.5 logs showed:
```
⚠ `experimental.outputFileTracingIncludes` has been moved to `outputFileTracingIncludes`
```

This meant the WASM bundling configuration was being ignored, so the Lambda 
didn't contain the required `.wasm` files from `node_modules/onnxruntime-web/dist/`.

✅ **Fix attempt #3:** Removed the duplicate `experimental.outputFileTracingIncludes` 
block from `next.config.ts` (lines 61-71). Now only the top-level config remains, 
which Next.js 15+ recognizes. This ensures `node_modules/onnxruntime-web/dist/*.wasm` 
files are properly bundled into the Lambda, allowing the fallback in `embedding.ts` 
to find real WASM binaries (not LFS pointers).

**Still failing with "Can't create a session" (2025-01-17)**

**Root cause #2 discovered:** Git LFS was never actually working on Amplify. Build logs 
showed:
```
git: 'lfs' is not a git command. See 'git --help'.
```

This meant all files in `public/embeddings/` (model `.onnx` files) and 
`public/onnxruntime-web/` (WASM files) were Git LFS **pointer files** (text starting 
with `version https://git-lfs...`) instead of actual binaries. The "magic word" and 
"Can't create a session" errors were caused by trying to load these text pointers as 
binary files.

The issue was identical to https://github.com/aws-amplify/amplify-hosting/issues/3486 
– Amplify's build image doesn't have Git LFS pre-installed, and the packagecloud 
installation script method fails.

✅ **Fix attempt #4 (current):** Updated `amplify.yml` to install Git LFS from the 
official binary release (v3.7.1) before running `git lfs pull`. This is the method 
confirmed working by the AWS Amplify team in the GitHub issue above.

Installation commands added to preBuild phase:
```yaml
- curl -L https://github.com/git-lfs/git-lfs/releases/download/v3.7.1/git-lfs-linux-amd64-v3.7.1.tar.gz | tar -xz
- cd git-lfs-3.7.1
- sudo ./install.sh
- cd ..
- git lfs install
- git lfs pull
```

This ensures real binary files are pulled for both ONNX models and WASM runtime files, 
allowing the Lambda to properly load them for KB upload functionality.

Reference: https://github.com/git-lfs/git-lfs#from-binary

Error log from previous attempt:
```
2150-08b6897e84c01d2b.js:1  POST https://timecapsule.bubblspace.com/api/kb/upload 500 (Internal Server Error)
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
