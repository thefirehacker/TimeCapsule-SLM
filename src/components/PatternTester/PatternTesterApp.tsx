"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Play, Copy, CheckSquare, Square, Check, Search, Eye, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface PatternResult {
  pattern: string;
  description: string;
  matches: {
    content: string;
    source: string;
    chunkId: string;
    documentId: string;
    confidence: number;
    context: string;
  }[];
}

interface ExtractedData {
  patterns: PatternResult[];
  totalMatches: number;
  documentsCovered: string[];
}

interface Document {
  id: string;
  name: string;
  type: string;
  filename: string;
  chunkCount: number;
}

interface Chunk {
  id: string;
  text: string;
  content: string;
  source: string;
  documentId: string;
  metadata?: any;
}

export function PatternTesterComponent() {
  const [patterns, setPatterns] = useState<string>('');
  const [results, setResults] = useState<ExtractedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [availableDocs, setAvailableDocs] = useState<Document[]>([]);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [chunkIdSearch, setChunkIdSearch] = useState<string>('');
  const [chunkViewData, setChunkViewData] = useState<any>(null);
  const [similarityQuery, setSimilarityQuery] = useState<string>('');
  const [similarityResults, setSimilarityResults] = useState<any[]>([]);
  const [showAllMatches, setShowAllMatches] = useState<{[key: number]: boolean}>({});

  // Load available documents from RxDB on component mount
  useEffect(() => {
    loadAvailableDocuments();
  }, []);

  const loadAvailableDocuments = async () => {
    try {
      const response = await fetch('/api/documents/list');
      if (response.ok) {
        const docs = await response.json();
        setAvailableDocs(docs);
        // Auto-select all documents by default
        setSelectedDocs(docs.map((doc: Document) => doc.id));
      } else {
        console.warn('Failed to load documents');
      }
    } catch (error) {
      console.error('Could not load documents from RxDB:', error);
    }
  };

  const toggleDocumentSelection = (docId: string) => {
    setSelectedDocs(prev => {
      if (prev.includes(docId)) {
        return prev.filter(id => id !== docId);
      } else {
        return [...prev, docId];
      }
    });
  };

  const selectAllDocuments = () => {
    setSelectedDocs(availableDocs.map(doc => doc.id));
  };

  const deselectAllDocuments = () => {
    setSelectedDocs([]);
  };

  const executePatternTest = async () => {
    console.log('🧪 Execute Pattern Test clicked');
    console.log('Patterns:', patterns.length, 'chars');
    console.log('Selected documents:', selectedDocs);
    
    if (!patterns.trim()) {
      toast.error("Please provide regex patterns to test.");
      return;
    }
    
    if (selectedDocs.length === 0) {
      toast.error("Please select at least one document to test against.");
      return;
    }

    setIsLoading(true);
    
    try {
      // Load chunks for selected documents
      const documentIds = selectedDocs.join(',');
      const response = await fetch(`/api/documents/chunks?documentIds=${encodeURIComponent(documentIds)}`);
      
      if (!response.ok) {
        throw new Error('Failed to load document chunks');
      }
      
      const chunks: Chunk[] = await response.json();
      console.log(`📚 Loaded ${chunks.length} chunks from ${selectedDocs.length} documents`);
      
      // Parse patterns (one per line or comma-separated)
      const patternList = patterns.split(/\n|,/).map(p => p.trim()).filter(p => p);
      console.log(`📋 Testing ${patternList.length} patterns against ${chunks.length} chunks`);
      
      const patternResults: PatternResult[] = [];
      let totalMatches = 0;
      const documentsCovered = new Set<string>();

      // Process each pattern (matching ExtractionAgent logic)
      for (const [index, patternStr] of patternList.entries()) {
        console.log(`🔍 Processing pattern ${index + 1}:`, patternStr);
        try {
          // Extract description if present
          let description = `Pattern ${index + 1}`;
          let regexStr = patternStr;
          
          if (patternStr.includes(':')) {
            const parts = patternStr.split(':');
            if (parts.length >= 2) {
              description = parts[0].trim();
              regexStr = parts.slice(1).join(':').trim();
            }
          }

          // Parse regex pattern (matching ExtractionAgent.ts line 814-818)
          const regexMatch = regexStr.match(/^\/(.+)\/([gimuy]*)$/);
          const regexBody = regexMatch ? regexMatch[1] : regexStr;
          const regexFlags = regexMatch ? regexMatch[2] : 'gi';
          
          const regex = new RegExp(regexBody, regexFlags);
          console.log(`📝 Testing pattern: "${regexBody}" with flags "${regexFlags}"`);
          
          const matches: any[] = [];
          let patternMatches = 0;
          
          // Apply regex to each chunk (matching ExtractionAgent.ts line 823-849)
          for (const chunk of chunks) {
            const chunkText = chunk.text || chunk.content;
            let match;
            
            while ((match = regex.exec(chunkText)) !== null) {
              const extractedContent = match[1] || match[0];
              
              // Get context around the match
              const startIdx = Math.max(0, match.index! - 50);
              const endIdx = Math.min(chunkText.length, match.index! + match[0].length + 50);
              const context = chunkText.substring(startIdx, endIdx);
              
              matches.push({
                content: extractedContent.trim(),
                source: chunk.source || availableDocs.find(d => d.id === chunk.documentId)?.name || 'Unknown',
                chunkId: chunk.id,
                documentId: chunk.documentId,
                confidence: 0.95,
                context: `...${context}...`
              });
              
              documentsCovered.add(chunk.documentId);
              patternMatches++;
            }
            
            // Reset regex lastIndex for global patterns
            regex.lastIndex = 0;
          }
          
          console.log(`✅ Pattern "${regexStr}" found ${patternMatches} matches`);

          patternResults.push({
            pattern: regexStr,
            description,
            matches
          });
          
          totalMatches += matches.length;
        } catch (error) {
          console.error(`Error processing pattern "${patternStr}":`, error);
          patternResults.push({
            pattern: patternStr,
            description: `Invalid Pattern ${index + 1}`,
            matches: []
          });
        }
      }

      // Get document names for covered documents
      const coveredDocNames = Array.from(documentsCovered).map(docId => {
        const doc = availableDocs.find(d => d.id === docId);
        return doc?.name || docId;
      });
      
      setResults({
        patterns: patternResults,
        totalMatches,
        documentsCovered: coveredDocNames
      });

      toast.success(`Pattern Test Complete: Found ${totalMatches} matches across ${documentsCovered.size} documents`);

    } catch (error) {
      console.error('Error executing pattern test:', error);
      toast.error("Test Failed: An error occurred while testing patterns.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyPatternsFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setPatterns(text);
      toast.success("Patterns pasted from clipboard");
    } catch (error) {
      toast.error("Could not read from clipboard");
    }
  };

  const viewChunkById = async (chunkId?: string) => {
    const idToSearch = chunkId || chunkIdSearch;
    if (!idToSearch.trim()) {
      toast.error('Please enter a chunk ID');
      return;
    }
    
    try {
      const response = await fetch(`/api/chunks/${encodeURIComponent(idToSearch)}`);
      if (response.ok) {
        const data = await response.json();
        setChunkViewData(data);
        if (chunkId) {
          setChunkIdSearch(chunkId);
        }
        toast.success('Chunk loaded successfully');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Chunk not found');
        setChunkViewData(null);
      }
    } catch (error) {
      console.error('Error fetching chunk:', error);
      toast.error('Failed to fetch chunk');
    }
  };
  
  const performSimilaritySearch = async () => {
    if (!similarityQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }
    
    try {
      const response = await fetch('/api/search/similarity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: similarityQuery, limit: 10 })
      });
      
      if (response.ok) {
        const data = await response.json();
        setSimilarityResults(data.results);
        toast.success(`Found ${data.count} similar chunks`);
      } else {
        toast.error('Similarity search failed');
        setSimilarityResults([]);
      }
    } catch (error) {
      console.error('Error performing similarity search:', error);
      toast.error('Failed to perform similarity search');
    }
  };
  
  const exportToCSV = () => {
    if (!results) return;

    const csvRows = [
      ['Pattern', 'Description', 'Match Content', 'Source', 'Document ID', 'Chunk ID', 'Full Context', 'Confidence', 'Chunk Start Index', 'Chunk End Index']
    ];

    results.patterns.forEach(patternResult => {
      if (patternResult.matches.length === 0) {
        csvRows.push([
          patternResult.pattern,
          patternResult.description,
          'No matches found',
          '',
          '',
          '',
          '',
          '0'
        ]);
      } else {
        patternResult.matches.forEach(match => {
          csvRows.push([
            patternResult.pattern,
            patternResult.description,
            match.content.replace(/"/g, '""'), // Escape quotes
            match.source,
            match.documentId,
            match.chunkId,
            match.context.replace(/"/g, '""'), // Full chunk context
            match.confidence.toString(),
            'N/A', // Start index placeholder
            'N/A'  // End index placeholder
          ]);
        });
      }
    });

    const csvContent = csvRows.map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pattern_test_results_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Results exported to CSV file");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              🧪 Pattern Extraction Tester
            </CardTitle>
            <p className="text-gray-600">
              Test regex patterns against document data and export results to CSV
            </p>
          </CardHeader>
        </Card>

        {/* Additional Tools Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Chunk Viewer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Chunk Viewer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter chunk ID..."
                  value={chunkIdSearch}
                  onChange={(e) => setChunkIdSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && viewChunkById()}
                />
                <Button onClick={viewChunkById} variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              {chunkViewData && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm space-y-2">
                    <div><strong>Chunk ID:</strong> {chunkViewData.chunk.id}</div>
                    <div><strong>Document:</strong> {chunkViewData.document?.title || 'Unknown'}</div>
                    <div><strong>File:</strong> {chunkViewData.document?.filename}</div>
                    <div className="mt-3">
                      <strong>Content:</strong>
                      <div className="mt-2 p-3 bg-white rounded border text-xs font-mono overflow-x-auto">
                        {chunkViewData.chunk.content}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Similarity Search */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Search className="h-5 w-5" />
                Similarity Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter search query..."
                  value={similarityQuery}
                  onChange={(e) => setSimilarityQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && performSimilaritySearch()}
                />
                <Button onClick={performSimilaritySearch} variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              {similarityResults.length > 0 && (
                <ScrollArea className="h-64 mt-4">
                  <div className="space-y-2">
                    {similarityResults.map((result, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg text-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium">{result.document?.title || 'Unknown'}</div>
                          <Badge variant="secondary">
                            {Math.round(result.chunk.similarity * 100)}% match
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">
                          Chunk ID: {result.chunk.id}
                        </div>
                        <div className="text-xs bg-white p-2 rounded border">
                          {result.chunk.content.substring(0, 200)}...
                        </div>
                        <Button
                          variant="link"
                          size="sm"
                          className="mt-2 p-0 h-auto"
                          onClick={() => {
                            setChunkIdSearch(result.chunk.id);
                            viewChunkById();
                          }}
                        >
                          View Full Chunk →
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Patterns Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📋 Regex Patterns
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={copyPatternsFromClipboard}
                    className="ml-auto"
                  >
                    <Copy className="h-4 w-4" />
                    Paste from Clipboard
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={`Enter regex patterns (one per line or comma-separated):
GRPO Pattern: /Group Relative Policy Optimization \\(GRPO\\)[^\\n]{0,100}/gi
Method Pattern: /\\b[A-Z]{2,}\\b.*method/gi
Performance: /\\d+(\\.\\d+)?%?\\s*(improvement|accuracy|score)/gi`}
                  value={patterns}
                  onChange={(e) => setPatterns(e.target.value)}
                  rows={8}
                  className="font-mono text-sm"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Format: "Description: /pattern/flags" or just "/pattern/flags"
                </p>
              </CardContent>
            </Card>

            {/* Document Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📄 Select Documents to Test
                  <div className="ml-auto flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={selectAllDocuments}
                    >
                      <CheckSquare className="h-4 w-4 mr-1" />
                      Select All
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={deselectAllDocuments}
                    >
                      <Square className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {availableDocs.length === 0 ? (
                  <div className="text-gray-500 text-sm py-4">
                    Loading documents from RxDB...
                  </div>
                ) : (
                  <ScrollArea className="h-64">
                    <div className="space-y-2">
                      {availableDocs.map((doc) => (
                        <div 
                          key={doc.id} 
                          className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 cursor-pointer"
                          onClick={() => toggleDocumentSelection(doc.id)}
                        >
                          <div className={`
                            w-5 h-5 rounded border-2 flex items-center justify-center
                            ${selectedDocs.includes(doc.id) 
                              ? 'bg-blue-600 border-blue-600' 
                              : 'bg-white border-gray-300'}
                          `}>
                            {selectedDocs.includes(doc.id) && (
                              <Check className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-sm text-gray-500">
                              {doc.type} • {doc.chunkCount} chunks
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
                <div className="mt-4 text-sm text-gray-600">
                  {selectedDocs.length} of {availableDocs.length} documents selected
                </div>
              </CardContent>
            </Card>

            {/* Execute Button */}
            <Button 
              onClick={executePatternTest}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              <Play className="h-5 w-5 mr-2" />
              {isLoading ? 'Testing Patterns...' : 'Execute Pattern Test'}
            </Button>
          </div>

          {/* Results Section */}
          <div>
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>🔍 Test Results</CardTitle>
                {results && (
                  <Button 
                    variant="outline" 
                    onClick={exportToCSV}
                    className="ml-auto"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {!results ? (
                  <div className="text-center text-gray-500 py-12">
                    Run a pattern test to see results
                  </div>
                ) : (
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {/* Summary */}
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-900">Summary</h3>
                        <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                          <div>
                            <span className="text-blue-700">Total Matches:</span>
                            <div className="font-bold text-xl">{results.totalMatches}</div>
                          </div>
                          <div>
                            <span className="text-blue-700">Patterns:</span>
                            <div className="font-bold text-xl">{results.patterns.length}</div>
                          </div>
                          <div>
                            <span className="text-blue-700">Documents:</span>
                            <div className="font-bold text-xl">{results.documentsCovered.length}</div>
                          </div>
                        </div>
                      </div>

                      {/* Pattern Results */}
                      {results.patterns.map((patternResult, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold">{patternResult.description}</h4>
                              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {patternResult.pattern}
                              </code>
                            </div>
                            <Badge variant={patternResult.matches.length > 0 ? "default" : "secondary"}>
                              {patternResult.matches.length} matches
                            </Badge>
                          </div>
                          
                          {patternResult.matches.length > 0 ? (
                            <div className="space-y-2 mt-3">
                              {(showAllMatches[index] ? patternResult.matches : patternResult.matches.slice(0, 3)).map((match, matchIndex) => (
                                <div key={matchIndex} className="bg-green-50 p-3 rounded text-sm">
                                  <div className="flex justify-between items-start mb-2">
                                    <div className="font-medium text-green-800">
                                      📄 {match.source}
                                    </div>
                                    <div className="flex gap-2">
                                      <Badge 
                                        variant="secondary" 
                                        className="text-xs cursor-pointer hover:bg-gray-300"
                                        onClick={() => {
                                          navigator.clipboard.writeText(match.chunkId);
                                          toast.success('Chunk ID copied');
                                        }}
                                      >
                                        Chunk: {match.chunkId.substring(0, 8)}...
                                      </Badge>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-6 px-2 text-xs"
                                        onClick={() => viewChunkById(match.chunkId)}
                                      >
                                        <Eye className="h-3 w-3 mr-1" />
                                        View
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="bg-white p-2 rounded border border-green-200 mb-2">
                                    <div className="font-semibold text-green-900 mb-1">Match:</div>
                                    <code className="text-gray-800">{match.content}</code>
                                  </div>
                                  <div className="text-xs text-gray-600 italic">
                                    Context: {match.context}
                                  </div>
                                  <div className="flex justify-between items-center mt-2">
                                    <div className="text-xs text-green-600">
                                      Confidence: {Math.round(match.confidence * 100)}%
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      Doc: {match.documentId}
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {patternResult.matches.length > 3 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setShowAllMatches(prev => ({...prev, [index]: !prev[index]}))}
                                  className="w-full mt-2"
                                >
                                  {showAllMatches[index] ? 'Show Less' : `Show All ${patternResult.matches.length} Matches`}
                                </Button>
                              )}
                            </div>
                          ) : (
                            <div className="text-gray-500 text-sm mt-2">
                              No matches found for this pattern
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}