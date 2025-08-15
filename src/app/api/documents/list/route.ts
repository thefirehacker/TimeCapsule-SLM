import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Import VectorStore
    const { VectorStore } = await import('@/components/VectorStore/VectorStore');
    
    // Create VectorStore instance
    const vectorStore = new VectorStore();
    console.log('🆕 Created VectorStore instance for API');
    
    // Initialize VectorStore - this should connect to existing RxDB database
    if (!vectorStore.initialized) {
      console.log('🔄 Initializing VectorStore connection to RxDB...');
      await vectorStore.init();
      console.log('✅ VectorStore connected to RxDB');
    }
    
    // Get document metadata from RxDB
    const documents = await vectorStore.getDocumentMetadata();
    
    if (!documents || documents.length === 0) {
      console.warn('⚠️ No documents found in VectorStore/RxDB');
      return NextResponse.json([]);
    }
    
    console.log(`📚 Found ${documents.length} documents in RxDB`);
    
    // Transform to simple list format
    const documentList = documents.map((doc: any) => ({
      id: doc.id,
      name: doc.title,
      type: doc.metadata?.documentType || 'unknown',
      filename: doc.metadata?.filename,
      source: doc.metadata?.source || 'RxDB',
      chunkCount: doc.chunkCount
    }));

    return NextResponse.json(documentList);
    
  } catch (error: any) {
    console.error('❌ Error loading document list:', error);
    
    // More detailed error response
    return NextResponse.json(
      { 
        error: 'Failed to load documents from VectorStore', 
        details: error.message || String(error),
        hint: 'Check if VectorStore/RxDB is properly initialized in the application'
      },
      { status: 500 }
    );
  }
}