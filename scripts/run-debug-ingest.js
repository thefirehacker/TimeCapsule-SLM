/**
 * Lightweight runner to execute TypeScript ingestion scripts in this repo
 * without needing ts-node/tsx (works offline).
 *
 * Usage:
 *   node scripts/run-debug-ingest.js
 *
 * The runner registers a minimal TS transpiler + @/ path alias support,
 * then requires ./debug-ingest.ts.
 */

const path = require("path");
const fs = require("fs");
const Module = require("module");
const ts = require("typescript");

const projectRoot = path.resolve(__dirname, "..");

// Resolve @/ imports to ./src/*
const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function(request, parent, isMain, options) {
  if (request.startsWith("@/")) {
    const resolvedPath = path.join(projectRoot, "src", request.slice(2));
    return originalResolveFilename.call(
      this,
      resolvedPath,
      parent,
      isMain,
      options
    );
  }

  if (request === "@/auth") {
    const resolvedPath = path.join(projectRoot, "auth");
    return originalResolveFilename.call(
      this,
      resolvedPath,
      parent,
      isMain,
      options
    );
  }

  return originalResolveFilename.call(this, request, parent, isMain, options);
};

// Simple TypeScript transpiler for .ts imports
const originalTsHandler = require.extensions[".ts"];
require.extensions[".ts"] = function(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const { outputText, diagnostics } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      resolveJsonModule: true,
      jsx: ts.JsxEmit.React,
      skipLibCheck: true,
      baseUrl: projectRoot,
      paths: {
        "@/*": ["src/*"],
        "@/auth": ["auth"],
      },
    },
    fileName: filename,
    reportDiagnostics: true,
  });

  if (diagnostics?.length) {
    diagnostics.forEach((diag) => {
      const message = ts.flattenDiagnosticMessageText(diag.messageText, "\n");
      const loc = diag.file
        ? `${diag.file.fileName}:${ts.getLineAndCharacterOfPosition(
            diag.file,
            diag.start ?? 0
          ).line + 1}`
        : "";
      console.warn(`⚠️  TS transpile warning ${loc} ${message}`);
    });
  }

  return module._compile(outputText, filename);
};

try {
  require("./debug-ingest.ts");
} finally {
  // Restore original handlers to avoid leaking state when run via node -r
  if (originalTsHandler) {
    require.extensions[".ts"] = originalTsHandler;
  }
  Module._resolveFilename = originalResolveFilename;
}
