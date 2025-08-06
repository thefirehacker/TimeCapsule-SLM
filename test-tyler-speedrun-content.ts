/**
 * Test Script: Verify Tyler's Speed Run Content in RxDB
 * 
 * This script tests if Tyler's blog content with the 6-entry speed run table
 * is actually stored in the RxDB knowledge base.
 */

// Type definitions
interface SearchResult {
  similarity?: number;
  chunk?: {
    id: string;
    content: string;
  };
  document?: {
    id: string;
    title: string;
    metadata?: any;
  };
}

interface VectorStore {
  searchSimilar(query: string, threshold: number, limit: number, options?: any): Promise<SearchResult[]>;
  db?: {
    documents: {
      find(): { exec(): Promise<any[]> };
    };
    chunks: {
      find(selector?: any): { exec(): Promise<any[]> };
    };
  };
}

// Global window interface extension
declare global {
  interface Window {
    sharedVectorStore?: any;
    getVectorStore?: () => any;
    TylerContentTester?: typeof TylerContentTester;
  }
}

// Expected Tyler's Speed Run Data (from screenshot)
const EXPECTED_SPEEDRUN_DATA = [
  { entry: 1, description: "Initial baseline", time: "8.13 hours", tokens: "6.44B" },
  { entry: 2, description: "Architectural changes", time: "7.51 hours", tokens: "5.07B" },  
  { entry: 3, description: "Muon optimizer", time: "4.53 hours", tokens: "3.04B" },
  { entry: 4, description: "Dataloading tweaks", time: "4.26 hours", tokens: "3.31B" },
  { entry: 5, description: "Logit Soft-capping at 30", time: "4.01 hours", tokens: "3.15B" },
  { entry: 6, description: "Longer Sequence Length", time: "2.55 hours", tokens: "1.88B" }
];

const EXPECTED_TIMING_VALUES = ["8.13", "7.51", "4.53", "4.26", "4.01", "2.55"];

class TylerContentTester {
  private vectorStore: VectorStore | null = null;
  
  constructor() {
    console.log('🔍 Tyler Speed Run Content Tester Initialized');
    console.log('📊 Expected 6 entries:', EXPECTED_SPEEDRUN_DATA.map(d => `${d.time} (${d.description})`));
  }
  
  /**
   * Initialize VectorStore connection
   */
  async initializeVectorStore(): Promise<boolean> {
    try {
      // Try to access global VectorStore instance
      if (typeof window !== 'undefined') {
        if (window.sharedVectorStore) {
          this.vectorStore = window.sharedVectorStore;
          console.log('✅ Connected to window.sharedVectorStore');
          return true;
        }
        if (window.getVectorStore) {
          this.vectorStore = window.getVectorStore();
          console.log('✅ Connected via window.getVectorStore()');
          return true;
        }
      }
      
      console.log('❌ No VectorStore found');
      return false;
    } catch (error) {
      console.error('❌ VectorStore initialization failed:', error);
      return false;
    }
  }
  
  /**
   * Test 1: Search for Tyler's blog content
   */
  async testTylerBlogSearch(): Promise<void> {
    console.log('\n🔍 TEST 1: Searching for Tyler\'s blog content...');
    
    const queries = [
      "Tyler's blog",
      "Tyler Romero blog", 
      "nanoGPT speedrun",
      "Progress so far",
      "GPT-2 training"
    ];
    
    for (const query of queries) {
      try {
        console.log(`   🔍 Searching: "${query}"`);
        if (!this.vectorStore) {
          console.log(`   ❌ VectorStore not available`);
          continue;
        }
        const results = await this.vectorStore.searchSimilar(query, 0.1, 10);
        console.log(`   📊 Found ${results.length} results`);
        
        if (results.length > 0) {
          results.slice(0, 3).forEach((result: SearchResult, i: number) => {
            console.log(`   ${i + 1}. ${result.document?.title || 'Unknown'} (${result.similarity?.toFixed(3)})`);
            console.log(`      Content: ${result.chunk?.content?.substring(0, 100)}...`);
          });
        }
      } catch (error) {
        console.error(`   ❌ Search failed for "${query}":`, error);
      }
    }
  }
  
  /**
   * Test 2: Search for specific timing values
   */
  async testTimingValueSearch(): Promise<void> {
    console.log('\n🔍 TEST 2: Searching for specific timing values...');
    
    const foundTimings: string[] = [];
    
    for (const timing of EXPECTED_TIMING_VALUES) {
      try {
        console.log(`   🔍 Searching: "${timing} hours"`);
        if (!this.vectorStore) {
          console.log(`   ❌ VectorStore not available`);
          continue;
        }
        const results = await this.vectorStore.searchSimilar(`${timing} hours`, 0.1, 5);
        console.log(`   📊 Found ${results.length} results for ${timing} hours`);
        
        if (results.length > 0) {
          foundTimings.push(timing);
          results.forEach((result: SearchResult, i: number) => {
            const content = result.chunk?.content || '';
            if (content.includes(timing)) {
              console.log(`   ✅ ${i + 1}. FOUND "${timing}" in: ${content.substring(0, 150)}...`);
            }
          });
        } else {
          console.log(`   ❌ No results for ${timing} hours`);
        }
      } catch (error) {
        console.error(`   ❌ Search failed for ${timing}:`, error);
      }
    }
    
    console.log(`\n📊 TIMING SEARCH SUMMARY:`);
    console.log(`   Expected: ${EXPECTED_TIMING_VALUES.length} timing values`);
    console.log(`   Found: ${foundTimings.length} timing values`);
    console.log(`   Missing: ${EXPECTED_TIMING_VALUES.filter(t => !foundTimings.includes(t)).join(', ')}`);
  }
  
  /**
   * Test 3: Search for table structure keywords
   */
  async testTableStructureSearch(): Promise<void> {
    console.log('\n🔍 TEST 3: Searching for table structure keywords...');
    
    const tableKeywords = [
      "Record time",
      "Training Tokens", 
      "Description",
      "Initial baseline",
      "Architectural changes",
      "Muon optimizer",
      "Dataloading tweaks",
      "Logit Soft-capping",
      "Longer Sequence Length"
    ];
    
    const foundKeywords: string[] = [];
    
    for (const keyword of tableKeywords) {
      try {
        console.log(`   🔍 Searching: "${keyword}"`);
        if (!this.vectorStore) {
          console.log(`   ❌ VectorStore not available`);
          continue;
        }
        const results = await this.vectorStore.searchSimilar(keyword, 0.2, 3);
        
        if (results.length > 0) {
          foundKeywords.push(keyword);
          console.log(`   ✅ Found "${keyword}" in ${results.length} results`);
          
          results.forEach((result: SearchResult, i: number) => {
            const content = result.chunk?.content || '';
            if (content.toLowerCase().includes(keyword.toLowerCase())) {
              console.log(`   📄 ${i + 1}. ${content.substring(0, 200)}...`);
            }
          });
        } else {
          console.log(`   ❌ No results for "${keyword}"`);
        }
      } catch (error) {
        console.error(`   ❌ Search failed for "${keyword}":`, error);
      }
    }
    
    console.log(`\n📊 TABLE KEYWORDS SUMMARY:`);
    console.log(`   Expected: ${tableKeywords.length} keywords`);
    console.log(`   Found: ${foundKeywords.length} keywords`);
    console.log(`   Missing: ${tableKeywords.filter(k => !foundKeywords.includes(k)).join(', ')}`);
  }
  
  /**
   * Test 4: Document metadata analysis
   */
  async testDocumentMetadata(): Promise<void> {
    console.log('\n🔍 TEST 4: Analyzing document metadata...');
    
    try {
      // Search broadly for documents
      if (!this.vectorStore) {
        console.log('   ❌ VectorStore not available');
        return;
      }
      const results = await this.vectorStore.searchSimilar("Tyler", 0.1, 20);
      console.log(`   📊 Found ${results.length} documents mentioning "Tyler"`);
      
      // Analyze unique documents
      const uniqueDocs = new Map<string, {
        title: string;
        id: string;
        chunkCount: number;
        metadata: any;
      }>();
      results.forEach((result: SearchResult) => {
        const docId = result.document?.id;
        const docTitle = result.document?.title;
        if (docId && !uniqueDocs.has(docId)) {
          uniqueDocs.set(docId, {
            title: docTitle || 'Unknown',
            id: docId,
            chunkCount: 1,
            metadata: result.document?.metadata
          });
        } else if (docId) {
          const doc = uniqueDocs.get(docId);
          if (doc) {
            doc.chunkCount++;
          }
        }
      });
      
      console.log(`   📚 Unique documents: ${uniqueDocs.size}`);
      Array.from(uniqueDocs.values()).forEach((doc: any, i: number) => {
        console.log(`   ${i + 1}. "${doc.title}" (${doc.chunkCount} chunks)`);
        console.log(`      ID: ${doc.id}`);
        if (doc.metadata) {
          console.log(`      Metadata: ${JSON.stringify(doc.metadata, null, 2).substring(0, 200)}...`);
        }
      });
      
    } catch (error) {
      console.error('   ❌ Document metadata analysis failed:', error);
    }
  }
  
  /**
   * Test 5: Raw database query test
   */
  async testRawDatabaseQuery(): Promise<void> {
    console.log('\n🔍 TEST 5: Raw database queries...');
    
    try {
      // Access the RxDB database directly
      if (!this.vectorStore) {
        console.log('   ❌ VectorStore not available');
        return;
      }
      const db = this.vectorStore.db;
      if (!db) {
        console.log('   ❌ No direct database access available');
        return;
      }
      
      // Query documents collection
      const documents = await db.documents.find().exec();
      console.log(`   📚 Total documents in DB: ${documents.length}`);
      
      // Query chunks collection  
      const chunks = await db.chunks.find().exec();
      console.log(`   📄 Total chunks in DB: ${chunks.length}`);
      
      // Look for Tyler-related content
      const tylerChunks = await db.chunks.find({
        selector: {
          $or: [
            { content: { $regex: /tyler/i } },
            { content: { $regex: /speedrun/i } },
            { content: { $regex: /nanoGPT/i } }
          ]
        }
      }).exec();
      
      console.log(`   🎯 Tyler-related chunks: ${tylerChunks.length}`);
      
      if (tylerChunks.length > 0) {
        tylerChunks.slice(0, 3).forEach((chunk: any, i: number) => {
          console.log(`   ${i + 1}. ${chunk.content.substring(0, 200)}...`);
        });
      }
      
    } catch (error) {
      console.error('   ❌ Raw database query failed:', error);
    }
  }
  
  /**
   * Run comprehensive test suite
   */
  async runFullTest(): Promise<void> {
    console.log('🚀 Starting Tyler Speed Run Content Test Suite...\n');
    
    // Initialize VectorStore
    const initialized = await this.initializeVectorStore();
    if (!initialized) {
      console.log('❌ Cannot run tests without VectorStore connection');
      return;
    }
    
    // Run all tests
    await this.testTylerBlogSearch();
    await this.testTimingValueSearch();
    await this.testTableStructureSearch();
    await this.testDocumentMetadata();
    await this.testRawDatabaseQuery();
    
    console.log('\n✅ Test suite completed!');
    console.log('\n🎯 CONCLUSION:');
    console.log('If timing values (8.13, 7.51, 4.53, 4.26, 4.01, 2.55) are missing,');
    console.log('then Tyler\'s speed run blog content is NOT in the knowledge base.');
  }
}

// Export for use
if (typeof window !== 'undefined') {
  (window as any).TylerContentTester = TylerContentTester;
  
  // Auto-run test
  console.log('🔍 Tyler Content Tester loaded. Run test with:');
  console.log('const tester = new TylerContentTester(); await tester.runFullTest();');
  
  // Or run immediately
  const autoTest = new TylerContentTester();
  autoTest.runFullTest().catch(console.error);
}

export { TylerContentTester };