import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { query, limit = 10 } = await request.json();
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }
    
    console.log(`🔍 Performing similarity search for: "${query}"`);
    
    // Import VectorStore
    const { VectorStore } = await import('@/components/VectorStore/VectorStore');
    
    // Create VectorStore instance
    const vectorStore = new VectorStore();
    
    // Initialize if needed
    if (!vectorStore.initialized) {
      console.log('🔄 Initializing VectorStore...');
      await vectorStore.init();
    }
    
    // Perform similarity search
    const results = await vectorStore.search(query, limit);
    
    console.log(`✅ Found ${results.length} similar chunks`);
    
    // Get document metadata for context
    const documents = await vectorStore.getDocumentMetadata();
    
    // Enhance results with document info
    const enhancedResults = results.map((result: any) => {
      const document = documents.find((doc: any) => doc.id === result.documentId);
      return {
        chunk: {
          id: result.id,
          content: result.content,
          similarity: result.similarity,
          documentId: result.documentId
        },
        document: document ? {
          title: document.title,
          filename: document.metadata?.filename,
          documentType: document.metadata?.documentType
        } : null
      };
    });
    
    return NextResponse.json({
      query,
      results: enhancedResults,
      count: enhancedResults.length
    });
    
  } catch (error: any) {
    console.error('❌ Error performing similarity search:', error);
    return NextResponse.json(
      { 
        error: 'Failed to perform similarity search',
        details: error.message || String(error)
      },
      { status: 500 }
    );
  }
}