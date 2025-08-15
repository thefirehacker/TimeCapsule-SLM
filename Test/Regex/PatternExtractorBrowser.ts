/**
 * Browser-Based Regex Pattern Extractor for IndexedDB Data
 * Extracts patterns from documents stored in browser IndexedDB and exports to CSV
 */

interface ExtractionResult {
  pattern: string;
  description: string;
  matches: string[];
  matchCount: number;
  sourceDocument?: string;
  documentId?: string;
}

interface CSVRow {
  Pattern: string;
  Description: string;
  MatchCount: number;
  Matches: string;
  SourceDocument: string;
  DocumentId: string;
  Timestamp: string;
}

interface DocumentData {
  id: string;
  title: string;
  content: string;
  metadata: {
    filename: string;
    documentType: string;
    [key: string]: any;
  };
  chunks: Array<{
    id: string;
    content: string;
    startIndex: number;
    endIndex: number;
  }>;
}

class BrowserPatternExtractor {
  private patterns: Array<{pattern: RegExp, description: string}> = [];
  private results: ExtractionResult[] = [];

  constructor() {
    this.initializePatterns();
  }

  private initializePatterns(): void {
    // Extracted patterns from logs.md - Person/Author patterns
    this.patterns = [
      // Person patterns with actions
      { pattern: /Zhihong Shao[^\n]*(?:developed|created|proposes|implements)[^\n]*/gi, description: "Person pattern for Zhihong Shao" },
      { pattern: /(?:author|by|from)\s*[^\n]*Zhihong Shao[^\n]*/gi, description: "Authorship pattern for Zhihong Shao" },
      { pattern: /Peiyi Wang[^\n]*(?:developed|created|proposes|implements)[^\n]*/gi, description: "Person pattern for Peiyi Wang" },
      { pattern: /(?:author|by|from)\s*[^\n]*Peiyi Wang[^\n]*/gi, description: "Authorship pattern for Peiyi Wang" },
      { pattern: /Qihao Zhu[^\n]*(?:developed|created|proposes|implements)[^\n]*/gi, description: "Person pattern for Qihao Zhu" },
      { pattern: /(?:author|by|from)\s*[^\n]*Qihao Zhu[^\n]*/gi, description: "Authorship pattern for Qihao Zhu" },
      { pattern: /Ruoxin Xu[^\n]*(?:developed|created|proposes|implements)[^\n]*/gi, description: "Person pattern for Ruoxin Xu" },
      { pattern: /(?:author|by|from)\s*[^\n]*Ruoxin Xu[^\n]*/gi, description: "Authorship pattern for Ruoxin Xu" },
      { pattern: /Junxiao Song[^\n]*(?:developed|created|proposes|implements)[^\n]*/gi, description: "Person pattern for Junxiao Song" },
      { pattern: /(?:author|by|from)\s*[^\n]*Junxiao Song[^\n]*/gi, description: "Authorship pattern for Junxiao Song" },
      { pattern: /Xiao Bi[^\n]*(?:developed|created|proposes|implements)[^\n]*/gi, description: "Person pattern for Xiao Bi" },
      { pattern: /(?:author|by|from)\s*[^\n]*Xiao Bi[^\n]*/gi, description: "Authorship pattern for Xiao Bi" },
      { pattern: /Haowei Zhang[^\n]*(?:developed|created|proposes|implements)[^\n]*/gi, description: "Person pattern for Haowei Zhang" },
      { pattern: /(?:author|by|from)\s*[^\n]*Haowei Zhang[^\n]*/gi, description: "Authorship pattern for Haowei Zhang" },
      { pattern: /Mingchuan Zhang[^\n]*(?:developed|created|proposes|implements)[^\n]*/gi, description: "Person pattern for Mingchuan Zhang" },
      { pattern: /(?:author|by|from)\s*[^\n]*Mingchuan Zhang[^\n]*/gi, description: "Authorship pattern for Mingchuan Zhang" },
      { pattern: /Y\.\s*K\.\s*Li[^\n]*(?:developed|created|proposes|implements)[^\n]*/gi, description: "Person pattern for Y. K. Li" },
      { pattern: /(?:author|by|from)\s*[^\n]*Y\.\s*K\.\s*Li[^\n]*/gi, description: "Authorship pattern for Y. K. Li" },
      { pattern: /Y\.\s*Wu[^\n]*(?:developed|created|proposes|implements)[^\n]*/gi, description: "Person pattern for Y. Wu" },
      { pattern: /(?:author|by|from)\s*[^\n]*Y\.\s*Wu[^\n]*/gi, description: "Authorship pattern for Y. Wu" },
      { pattern: /Daya Guo[^\n]*(?:developed|created|proposes|implements)[^\n]*/gi, description: "Person pattern for Daya Guo" },
      { pattern: /(?:author|by|from)\s*[^\n]*Daya Guo[^\n]*/gi, description: "Authorship pattern for Daya Guo" },
      { pattern: /Toby Simonds[^\n]*(?:developed|created|proposes|implements)[^\n]*/gi, description: "Person pattern for Toby Simonds" },
      { pattern: /(?:author|by|from)\s*[^\n]*Toby Simonds[^\n]*/gi, description: "Authorship pattern for Toby Simonds" },
      { pattern: /Tufa Labs\.[^\n]*(?:developed|created|proposes|implements)[^\n]*/gi, description: "Person pattern for Tufa Labs." },
      { pattern: /(?:author|by|from)\s*[^\n]*Tufa Labs\.[^\n]*/gi, description: "Authorship pattern for Tufa Labs." },

      // Method/Concept patterns (most successful from logs)
      { pattern: /Group Relative Policy Optimization \(GRPO\)[^\n]{0,100}/gi, description: "GRPO method pattern" },
      { pattern: /language models[^\n]{0,100}/gi, description: "Language models concept (long)" },
      { pattern: /Reinforcement Learning[^\n]{0,100}/gi, description: "Reinforcement Learning concept (long)" },
      { pattern: /Chain-of-Thought[^\n]{0,100}/gi, description: "Chain-of-Thought concept" },
      { pattern: /Program-of-Thought[^\n]{0,100}/gi, description: "Program-of-Thought concept" },
      { pattern: /language models[^\n]{0,80}/gi, description: "Language models concept (short)" },
      { pattern: /reinforcement learning[^\n]{0,80}/gi, description: "Reinforcement learning concept (short)" },
      { pattern: /mathematical reasoning[^\n]{0,80}/gi, description: "Mathematical reasoning concept" },
      { pattern: /instruction tuning[^\n]{0,80}/gi, description: "Instruction tuning concept" },

      // Additional useful patterns for academic papers
      { pattern: /\b(?:proposed|introduces|presents|develops|implements|creates)\s+[A-Z][^\n]{10,80}/gi, description: "Method introduction pattern" },
      { pattern: /\b(?:algorithm|method|approach|technique|framework)\s+[A-Z][^\n]{5,60}/gi, description: "Technical method pattern" },
      { pattern: /\b(?:performance|accuracy|results?|evaluation)\s+[^\n]{5,80}/gi, description: "Performance results pattern" },
      { pattern: /\b(?:dataset|corpus|benchmark)\s+[A-Z][^\n]{5,60}/gi, description: "Dataset mention pattern" },
      { pattern: /\b(?:model|architecture|network)\s+[A-Z][^\n]{5,60}/gi, description: "Model architecture pattern" },

      // Academic paper structure patterns
      { pattern: /\b(?:abstract|introduction|methodology|conclusion|discussion)[^\n]{10,100}/gi, description: "Paper section pattern" },
      { pattern: /\b(?:figure|table|equation)\s+\d+[^\n]{5,50}/gi, description: "Reference pattern" },
      { pattern: /\b(?:cite|reference|bibliography)[^\n]{5,80}/gi, description: "Citation pattern" },
      
      // Technical metrics patterns
      { pattern: /\b(?:accuracy|precision|recall|f1-score|auc|rmse|mae)\s*[:=]\s*[\d.]+/gi, description: "Metrics pattern" },
      { pattern: /\b\d+\.?\d*%\s*(?:improvement|increase|decrease|better|worse)/gi, description: "Percentage improvement pattern" }
    ];

    console.log(`🎯 Initialized ${this.patterns.length} regex patterns for IndexedDB extraction`);
  }

  /**
   * Access IndexedDB directly to get documents
   */
  private async getDocumentsFromIndexedDB(): Promise<DocumentData[]> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('deepresearch_vectorstore');
      
      request.onerror = () => reject(request.error);
      
      request.onsuccess = () => {
        const db = request.result;
        
        if (!db.objectStoreNames.contains('documents')) {
          console.warn('⚠️ Documents object store not found');
          resolve([]);
          return;
        }

        const transaction = db.transaction(['documents'], 'readonly');
        const store = transaction.objectStore('documents');
        const getAllRequest = store.getAll();

        getAllRequest.onerror = () => reject(getAllRequest.error);
        
        getAllRequest.onsuccess = () => {
          const documents = getAllRequest.result || [];
          console.log(`📄 Found ${documents.length} documents in IndexedDB`);
          resolve(documents);
        };
      };
    });
  }

  /**
   * Test patterns against a single document
   */
  public testDocument(doc: DocumentData): ExtractionResult[] {
    const documentResults: ExtractionResult[] = [];

    // Test against full document content
    const fullContent = doc.content;
    
    // Also test against chunks if available
    const chunkContents = doc.chunks?.map(chunk => chunk.content).join('\n') || '';
    const testContent = fullContent + '\n' + chunkContents;

    console.log(`📄 Testing patterns against document: ${doc.title}`);

    for (const {pattern, description} of this.patterns) {
      const matches = testContent.match(pattern) || [];
      const result: ExtractionResult = {
        pattern: pattern.source,
        description,
        matches: matches.map((match: string) => match.trim()),
        matchCount: matches.length,
        sourceDocument: doc.title,
        documentId: doc.id
      };

      documentResults.push(result);
      
      if (matches.length > 0) {
        console.log(`✅ Pattern "${description}" found ${matches.length} matches in ${doc.title}`);
        // Log first few matches for debugging
        matches.slice(0, 3).forEach((match, idx) => {
          console.log(`   ${idx + 1}: ${match.substring(0, 100)}...`);
        });
      }
    }

    return documentResults;
  }

  /**
   * Extract patterns from all documents in IndexedDB
   */
  public async extractFromIndexedDB(): Promise<void> {
    try {
      const documents = await this.getDocumentsFromIndexedDB();
      
      if (documents.length === 0) {
        console.warn('⚠️ No documents found in IndexedDB');
        return;
      }

      console.log(`📁 Processing ${documents.length} documents from IndexedDB`);

      for (const doc of documents) {
        const docResults = this.testDocument(doc);
        this.results.push(...docResults);
      }

      console.log(`✅ Pattern extraction completed. Total results: ${this.results.length}`);
      
    } catch (error) {
      console.error('❌ Error extracting from IndexedDB:', error);
      throw error;
    }
  }

  /**
   * Export results to CSV and trigger download
   */
  public exportToCSV(filename: string = 'pattern_extraction_results.csv'): void {
    try {
      const csvRows: CSVRow[] = this.results.map(result => ({
        Pattern: `"${result.pattern.replace(/"/g, '""')}"`,
        Description: `"${result.description}"`,
        MatchCount: result.matchCount,
        Matches: `"${result.matches.slice(0, 3).join(' | ').replace(/"/g, '""')}"`, // First 3 matches
        SourceDocument: result.sourceDocument || 'Unknown',
        DocumentId: result.documentId || 'Unknown',
        Timestamp: new Date().toISOString()
      }));

      // Create CSV header
      const headers = ['Pattern', 'Description', 'MatchCount', 'Matches', 'SourceDocument', 'DocumentId', 'Timestamp'];
      const csvContent = [
        headers.join(','),
        ...csvRows.map(row => Object.values(row).join(','))
      ].join('\n');

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      const totalMatches = this.results.reduce((sum, r) => sum + r.matchCount, 0);
      console.log(`📊 Exported ${this.results.length} pattern results to ${filename}`);
      console.log(`🎯 Total matches found: ${totalMatches}`);
      
      // Print summary of successful patterns
      const successfulPatterns = this.results.filter(r => r.matchCount > 0);
      console.log(`✅ Successful patterns: ${successfulPatterns.length}/${this.results.length}`);
      
      if (successfulPatterns.length > 0) {
        console.log('\nTop performing patterns:');
        successfulPatterns
          .sort((a, b) => b.matchCount - a.matchCount)
          .slice(0, 10)
          .forEach(result => {
            console.log(`  - ${result.description}: ${result.matchCount} matches`);
          });
      }

    } catch (error) {
      console.error('❌ Error exporting CSV:', error);
    }
  }

  /**
   * Clear results for new extraction
   */
  public clearResults(): void {
    this.results = [];
  }

  /**
   * Get current results
   */
  public getResults(): ExtractionResult[] {
    return this.results;
  }

  /**
   * Get results summary
   */
  public getSummary(): {
    totalResults: number;
    totalMatches: number;
    successfulPatterns: number;
    documentsProcessed: number;
    topPatterns: Array<{description: string, matches: number}>;
  } {
    const totalMatches = this.results.reduce((sum, r) => sum + r.matchCount, 0);
    const successfulPatterns = this.results.filter(r => r.matchCount > 0);
    const documentsProcessed = new Set(this.results.map(r => r.documentId)).size;
    
    const topPatterns = successfulPatterns
      .sort((a, b) => b.matchCount - a.matchCount)
      .slice(0, 10)
      .map(result => ({
        description: result.description,
        matches: result.matchCount
      }));

    return {
      totalResults: this.results.length,
      totalMatches,
      successfulPatterns: successfulPatterns.length,
      documentsProcessed,
      topPatterns
    };
  }
}

// Browser usage instructions and global access
if (typeof window !== 'undefined') {
  // Make available globally for browser console usage
  (window as any).BrowserPatternExtractor = BrowserPatternExtractor;
  
  // Add convenience function to window
  (window as any).extractPatterns = async function() {
    console.log('🚀 Starting IndexedDB pattern extraction...');
    const extractor = new BrowserPatternExtractor();
    
    try {
      await extractor.extractFromIndexedDB();
      extractor.exportToCSV();
      
      const summary = extractor.getSummary();
      console.log('📊 Extraction Summary:', summary);
      
      return extractor.getResults();
    } catch (error) {
      console.error('❌ Pattern extraction failed:', error);
      return [];
    }
  };

  console.log(`
🎯 Browser Pattern Extractor loaded!

Usage in browser console:
1. extractPatterns() - Extract patterns from IndexedDB and download CSV
2. new BrowserPatternExtractor() - Create new extractor instance

The extractor will:
- Access documents stored in IndexedDB (deepresearch_vectorstore)
- Test 43 regex patterns against document content
- Export results to CSV file automatically
- Show summary in console
  `);
}

export { BrowserPatternExtractor };
export type { ExtractionResult, DocumentData };
