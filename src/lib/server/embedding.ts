"use server";

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

      const wasmDir = path.join(
        process.cwd(),
        "public",
        "onnxruntime-web"
      ) + path.sep;
      module.env.backends.onnx.wasm.wasmPaths = wasmDir;
      module.env.backends.onnx.wasm.numThreads = 1;
      module.env.backends.onnx.wasm.proxy = false;

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
