export async function loadPdfParser() {
  const mod = await import("pdf2json");
  return (mod as any).default ?? mod;
}
