import fs from 'fs';
import path from 'path';
import { ingestDocumentBuffer } from '@/lib/server/documentIngestion';

async function main() {
  const filePath = path.join(process.cwd(), 'Test/temp/thefirehacker-github-io-til-ddp-python-basics-html.pdf');
  const buffer = await fs.promises.readFile(filePath);
  const result = await ingestDocumentBuffer({
    buffer,
    filename: path.basename(filePath),
    mimeType: 'application/pdf',
    documentType: 'userdocs',
  });
  console.log('Chunks:', result.chunks.length, 'Vectors:', result.vectors.length);
  result.chunks.slice(0, 5).forEach((chunk, idx) => {
    console.log(`\n--- chunk ${idx + 1} (#${chunk.id}) ---`);
    console.log(chunk.content);
  });
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
