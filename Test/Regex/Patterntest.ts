/**
 * Regex Pattern Test Script for Flat File Extraction
 * Extracted from logs.md - Tests regex patterns against text files and outputs results to CSV
 */

const fs = require('fs');
const path = require('path');

interface ExtractionResult {
  pattern: string;
  description: string;
  matches: string[];
  matchCount: number;
  sourceFile?: string;
}

interface CSVRow {
  Pattern: string;
  Description: string;
  MatchCount: number;
  Matches: string;
  SourceFile: string;
  Timestamp: string;
}

class RegexPatternTester {
  private patterns: Array<{pattern: RegExp, description: string}> = [];
  public results: ExtractionResult[] = []; // Make public so we can access it

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

      // Additional useful patterns
      { pattern: /\b(?:proposed|introduces|presents|develops|implements|creates)\s+[A-Z][^\n]{10,80}/gi, description: "Method introduction pattern" },
      { pattern: /\b(?:algorithm|method|approach|technique|framework)\s+[A-Z][^\n]{5,60}/gi, description: "Technical method pattern" },
      { pattern: /\b(?:performance|accuracy|results?|evaluation)\s+[^\n]{5,80}/gi, description: "Performance results pattern" },
      { pattern: /\b(?:dataset|corpus|benchmark)\s+[A-Z][^\n]{5,60}/gi, description: "Dataset mention pattern" },
      { pattern: /\b(?:model|architecture|network)\s+[A-Z][^\n]{5,60}/gi, description: "Model architecture pattern" }
    ];

    console.log(`🎯 Initialized ${this.patterns.length} regex patterns for testing`);
  }

  /**
   * Test patterns against a single file
   */
  public async testFile(filePath: string): Promise<ExtractionResult[]> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const fileName = path.basename(filePath);
      const fileResults: ExtractionResult[] = [];

      console.log(`📄 Testing patterns against file: ${fileName}`);

      for (const {pattern, description} of this.patterns) {
        const matches = content.match(pattern) || [];
        const result: ExtractionResult = {
          pattern: pattern.source,
          description,
          matches: matches.map((match: string) => match.trim()),
          matchCount: matches.length,
          sourceFile: fileName
        };

        fileResults.push(result);
        
        if (matches.length > 0) {
          console.log(`✅ Pattern "${description}" found ${matches.length} matches`);
        }
      }

      return fileResults;
    } catch (error) {
      console.error(`❌ Error testing file ${filePath}:`, error);
      return [];
    }
  }

  /**
   * Test patterns against multiple files in a directory
   */
  public async testDirectory(dirPath: string, extensions: string[] = ['.txt', '.md', '.pdf']): Promise<void> {
    try {
      const files = fs.readdirSync(dirPath);
      const testFiles = files.filter((file: string) => 
        extensions.some((ext: string) => file.toLowerCase().endsWith(ext))
      );

      console.log(`📁 Found ${testFiles.length} files to test in ${dirPath}`);

      for (const file of testFiles) {
        const fullPath = path.join(dirPath, file);
        const fileResults = await this.testFile(fullPath);
        this.results.push(...fileResults);
      }

    } catch (error) {
      console.error(`❌ Error testing directory ${dirPath}:`, error);
    }
  }

  /**
   * Export results to CSV
   */
  public exportToCSV(outputPath: string): void {
    try {
      const csvRows: CSVRow[] = this.results.map(result => ({
        Pattern: `"${result.pattern.replace(/"/g, '""')}"`,
        Description: `"${result.description}"`,
        MatchCount: result.matchCount,
        Matches: `"${result.matches.slice(0, 3).join(' | ').replace(/"/g, '""')}"`, // First 3 matches
        SourceFile: result.sourceFile || 'Unknown',
        Timestamp: new Date().toISOString()
      }));

      // Create CSV header
      const headers = Object.keys(csvRows[0] || {});
      const csvContent = [
        headers.join(','),
        ...csvRows.map(row => Object.values(row).join(','))
      ].join('\n');

      fs.writeFileSync(outputPath, csvContent, 'utf-8');
      
      const totalMatches = this.results.reduce((sum, r) => sum + r.matchCount, 0);
      console.log(`📊 Exported ${this.results.length} pattern results to ${outputPath}`);
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
      console.error(`❌ Error exporting CSV:`, error);
    }
  }

  /**
   * Clear results for new test run
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
}

// Main execution function for Node.js testing
async function main() {
  const tester = new RegexPatternTester();
  
  // Test directory - modify this path as needed
  const testDir = path.join(__dirname, '../../Test/Test-RL'); // Contains the PDF files
  const csvOutputPath = path.join(__dirname, 'pattern_extraction_results.csv');
  
  console.log('🚀 Starting regex pattern extraction test...');
  console.log(`📁 Test directory: ${testDir}`);
  console.log(`📊 Output CSV: ${csvOutputPath}`);
  
  try {
    // Test against logs.md which contains text data
    const logsPath = path.resolve(__dirname, '../../Temp-Delete/logs.md');
    if (fs.existsSync(logsPath)) {
      console.log('📄 Testing against logs.md...');
      const results = await tester.testFile(logsPath);
      tester.results.push(...results); // Add results to main results array
      console.log(`✅ Tested logs.md: ${results.filter(r => r.matchCount > 0).length} successful patterns`);
    }
    
    // Test if directory exists
    if (fs.existsSync(testDir)) {
      await tester.testDirectory(testDir, ['.txt', '.md']); // Only text files
    } else {
      console.log(`⚠️  Directory ${testDir} not found.`);
    }
    
    // Export results
    tester.exportToCSV(csvOutputPath);
    
    console.log('🎉 Pattern extraction test completed!');
    console.log(`
📋 For IndexedDB extraction in browser:
1. Open your app in browser
2. Open browser console
3. Load PatternExtractorBrowser.ts
4. Run: extractPatterns()
    `);
    
  } catch (error) {
    console.error('❌ Error in main execution:', error);
  }
}

// Export for use as module
module.exports = { RegexPatternTester };

// Run if called directly
if (require.main === module) {
  main();
}
