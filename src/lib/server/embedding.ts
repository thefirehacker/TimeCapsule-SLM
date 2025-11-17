"use server";

import fs from "fs";
import path from "path";
import type { FeatureExtractionPipeline } from "@xenova/transformers";
import { LOCAL_EMBEDDING_MODEL_ID } from "@/lib/transformers/modelConfig";

let embeddingPipeline: FeatureExtractionPipeline | null = null;
let transformersModulePromise:
  | Promise<typeof import("@xenova/transformers")>
  | null = null;

const dynamicImportTransformers = new Function(
  "specifier",
  "return import(specifier);"
) as (
  specifier: string
) => Promise<typeof import("@xenova/transformers")>;

async function loadTransformers() {
  if (!transformersModulePromise) {
    transformersModulePromise = dynamicImportTransformers(
      "@xenova/transformers"
    ).then((module) => {
      module.env.allowLocalModels = true;
      module.env.allowRemoteModels = false;
      module.env.useBrowserCache = false;
      module.env.localModelPath = path.join(
        process.cwd(),
        "public/embeddings"
      );

      const wasmDir = resolveWasmDirectory();
      module.env.backends.onnx.wasm.wasmPaths = wasmDir;
      module.env.backends.onnx.wasm.numThreads = 1;
      module.env.backends.onnx.wasm.proxy = false;

      return module;
    });
  }
  return transformersModulePromise;
}

function resolveWasmDirectory(): string {
  const ensureTrailingSlash = (dir: string) =>
    dir.endsWith(path.sep) ? dir : dir + path.sep;

  const candidates = [
    path.join(process.cwd(), "public", "onnxruntime-web"),
    path.join(process.cwd(), "node_modules", "onnxruntime-web", "dist"),
  ];

  for (const dir of candidates) {
    const wasmPath = path.join(dir, "ort-wasm-simd.wasm");
    if (isValidWasmFile(wasmPath)) {
      return ensureTrailingSlash(dir);
    }
  }

  // Fall back to public path even if missing; ONNX runtime will throw a clearer error.
  return ensureTrailingSlash(candidates[0]);
}

function isValidWasmFile(filePath: string): boolean {
  if (!fs.existsSync(filePath)) return false;
  try {
    const fd = fs.openSync(filePath, "r");
    const header = Buffer.alloc(4);
    fs.readSync(fd, header, 0, 4, 0);
    fs.closeSync(fd);
    return header.equals(Buffer.from([0x00, 0x61, 0x73, 0x6d]));
  } catch (error) {
    console.warn(`⚠️ Unable to validate wasm file at ${filePath}:`, error);
    return false;
  }
}

export async function generateServerEmbeddings(
  texts: string[]
): Promise<number[][]> {
  const { pipeline } = await loadTransformers();

  if (!embeddingPipeline) {
    embeddingPipeline = await pipeline(
      "feature-extraction",
      LOCAL_EMBEDDING_MODEL_ID,
      {
        quantized: false,
      }
    );
  }
  const activePipeline = embeddingPipeline;
  if (!activePipeline) {
    throw new Error("Embedding pipeline failed to initialize.");
  }

  const embeddings: number[][] = [];
  for (const text of texts) {
    const output: any = await activePipeline(text, {
      pooling: "mean",
      normalize: true,
    });
    const vector = Array.from(output.data as Float32Array);
    embeddings.push(vector);
  }
  return embeddings;
}
