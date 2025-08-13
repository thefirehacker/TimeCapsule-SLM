import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const documentTypesParam = searchParams.get('documentTypes');
    const documentIdsParam = searchParams.get('documentIds');
    const limitParam = searchParams.get('limit');
    
    // Parse document types filter
    let documentTypes: string[] | undefined;
    if (documentTypesParam) {
      documentTypes = documentTypesParam.split(',').map(t => t.trim());
    }
    
    // Parse document IDs filter
    let documentIds: string[] | undefined;
    if (documentIdsParam) {
      documentIds = documentIdsParam.split(',').map(id => id.trim());
    }
    
    // Import VectorStore
    const { VectorStore } = await import('@/components/VectorStore/VectorStore');
    
    // Create VectorStore instance
    const vectorStore = new VectorStore();
    console.log('🆕 Created VectorStore instance for chunks API');
    
    // Initialize to connect to RxDB
    if (!vectorStore.initialized) {
      console.log('🔄 Initializing VectorStore connection to RxDB...');
      await vectorStore.init();
      console.log('✅ VectorStore connected to RxDB');
    }
    
    // Get all chunks from RxDB
    let chunks = await vectorStore.getAllChunks(documentTypes as any);
    
    if (!chunks || chunks.length === 0) {
      console.warn('⚠️ No chunks found in VectorStore/RxDB');
      return NextResponse.json([]);
    }
    
    console.log(`📚 Retrieved ${chunks.length} chunks from RxDB`);
    
    // Filter by document IDs if specified
    if (documentIds && documentIds.length > 0) {
      chunks = chunks.filter((chunk: any) => 
        documentIds.includes(chunk.documentId)
      );
      console.log(`🎯 Filtered to ${chunks.length} chunks for selected documents: ${documentIds.join(', ')}`);
      
      if (chunks.length === 0) {
        console.warn(`⚠️ No chunks found for document IDs: ${documentIds.join(', ')}`);
      }
    }
    
    // Apply limit if specified
    const limit = limitParam ? parseInt(limitParam) : undefined;
    const limitedChunks = limit ? chunks.slice(0, limit) : chunks;
    
    // Transform chunks for testing interface
    const transformedChunks = limitedChunks.map(chunk => ({
      id: chunk.id,
      text: chunk.content,
      content: chunk.content,
      source: chunk.source || chunk.sourceDocument || 'Unknown Source',
      documentId: chunk.documentId,
      metadata: {
        documentType: chunk.metadata?.documentType,
        filename: chunk.metadata?.filename,
        source: chunk.metadata?.source
      }
    }));

    return NextResponse.json(transformedChunks);
    
  } catch (error: any) {
    console.error('❌ Error loading document chunks:', error);
    return NextResponse.json(
      { 
        error: 'Failed to load chunks from VectorStore',
        details: error.message || String(error),
        hint: 'Check if VectorStore/RxDB is properly initialized'
      },
      { status: 500 }
    );
  }
}