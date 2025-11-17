"use server";

import path from "path";
import type { Pipeline } from "@xenova/transformers";
import { LOCAL_EMBEDDING_MODEL_ID } from "@/lib/transformers/modelConfig";

let embeddingPipeline: Pipeline | null = null;
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

      const wasmDir = path.join(process.cwd(), "public/onnxruntime-web");
      module.env.backends.onnx.wasm.wasmPaths = {
        "ort-wasm-simd": path.join(wasmDir, "ort-wasm-simd.wasm"),
        "ort-wasm-simd-threaded": path.join(
          wasmDir,
          "ort-wasm-simd-threaded.wasm"
        ),
        "ort-wasm-threaded": path.join(wasmDir, "ort-wasm-threaded.wasm"),
        "ort-wasm": path.join(wasmDir, "ort-wasm.wasm"),
      };

      return module;
    });
  }
  return transformersModulePromise;
}

export async function generateServerEmbeddings(
  texts: string[]
): Promise<number[][]> {
  const { pipeline } = await loadTransformers();

  if (!embeddingPipeline) {
    embeddingPipeline = await pipeline(
      "feature-extraction",
      LOCAL_EMBEDDING_MODEL_ID
    );
  }

  const embeddings: number[][] = [];
  for (const text of texts) {
    const output: any = await embeddingPipeline(text, {
      pooling: "mean",
      normalize: true,
    });
    const vector = Array.from(output.data as Float32Array);
    embeddings.push(vector);
  }
  return embeddings;
}
