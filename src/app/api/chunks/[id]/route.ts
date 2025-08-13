import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const chunkId = params.id;
    
    if (!chunkId) {
      return NextResponse.json(
        { error: 'Chunk ID is required' },
        { status: 400 }
      );
    }
    
    console.log(`🔍 Fetching chunk with ID: ${chunkId}`);
    
    // Import VectorStore
    const { VectorStore } = await import('@/components/VectorStore/VectorStore');
    
    // Create VectorStore instance
    const vectorStore = new VectorStore();
    
    // Initialize if needed
    if (!vectorStore.initialized) {
      console.log('🔄 Initializing VectorStore...');
      await vectorStore.init();
    }
    
    // Get all chunks to find the specific one
    const allChunks = await vectorStore.getAllChunks();
    
    // Find the chunk by ID
    const chunk = allChunks.find((c: any) => c.id === chunkId);
    
    if (!chunk) {
      return NextResponse.json(
        { error: `Chunk not found: ${chunkId}` },
        { status: 404 }
      );
    }
    
    // Get document metadata
    const documents = await vectorStore.getDocumentMetadata();
    const document = documents.find((doc: any) => doc.id === chunk.documentId);
    
    // Return chunk with document info
    return NextResponse.json({
      chunk: {
        id: chunk.id,
        content: chunk.content,
        documentId: chunk.documentId,
        startIndex: chunk.startIndex,
        endIndex: chunk.endIndex,
        metadata: chunk.metadata
      },
      document: document ? {
        id: document.id,
        title: document.title,
        filename: document.metadata?.filename,
        documentType: document.metadata?.documentType,
        uploadedAt: document.metadata?.uploadedAt
      } : null
    });
    
  } catch (error: any) {
    console.error('❌ Error fetching chunk:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch chunk',
        details: error.message || String(error)
      },
      { status: 500 }
    );
  }
}