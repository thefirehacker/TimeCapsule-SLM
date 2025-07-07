'use client';

import { useState, useEffect, useRef } from 'react';
import { VectorStore, DocumentData } from '../VectorStore/VectorStore';

export type AIProvider = 'ollama' | 'lmstudio' | 'openai' | 'local';
export type ResearchType = 'academic' | 'market' | 'technology' | 'competitive' | 'trend' | 'literature';
export type ResearchDepth = 'overview' | 'detailed' | 'comprehensive';

export interface Topic {
  id: string;
  title: string;
  description: string;
  selected: boolean;
}

export interface AIStatus {
  connected: boolean;
  provider: AIProvider;
  model?: string;
}

export class DeepResearchApp {
  topics: Topic[] = [];
  researchResults: Record<string, string> = {};
  currentTab: 'research' | 'sources' | 'notes' = 'research';
  aiAssistant: any = null;
  isGenerating = false;
  vectorStore: VectorStore | null = null;
  documentModalOpen = false;
  eventListenersSetup = false;
  isUploading = false;

  // React state setters (will be set in the hook)
  setTopics: ((topics: Topic[]) => void) | null = null;
  setAIStatus: ((status: AIStatus) => void) | null = null;
  setResearchType: ((type: ResearchType) => void) | null = null;
  setResearchDepth: ((depth: ResearchDepth) => void) | null = null;
  setResearchResults: ((results: string) => void) | null = null;
  setCurrentTab: ((tab: 'research' | 'sources' | 'notes') => void) | null = null;
  setStatusMessage: ((message: string) => void) | null = null;
  setIsGenerating: ((generating: boolean) => void) | null = null;
  setDocuments: ((docs: DocumentData[]) => void) | null = null;
  setDocumentStatus: ((status: { count: number; totalSize: number; vectorCount: number }) => void) | null = null;
  setShowDocumentManager: ((show: boolean) => void) | null = null;

  constructor() {
    // Make this instance globally available - only in browser
    if (typeof window !== 'undefined') {
      (window as any).deepResearchApp = this;
    }
    console.log('🚀 DeepResearchApp constructor called');
  }

  async init() {
    console.log('🚀 DeepResearchApp.init() called');
    
    this.loadFromStorage();
    this.updateStatus('🦙 Ollama mode enabled - Ready to start research');
    
    // Initialize Vector Store
    await this.initializeVectorStore();
    
    console.log('✅ DeepResearchApp initialized');
  }

  async initializeVectorStore() {
    try {
      console.log('🗂️ Initializing Vector Store...');
      
      // Check if there's already a shared VectorStore instance (only in browser)
      if (typeof window !== 'undefined' && (window as any).sharedVectorStore && (window as any).sharedVectorStore.initialized) {
        console.log('🔗 Using existing shared VectorStore instance');
        this.vectorStore = (window as any).sharedVectorStore;
      } else {
        // Create new VectorStore instance
        console.log('🆕 Creating new VectorStore instance for DeepResearch');
        this.vectorStore = new VectorStore();
        await this.vectorStore.init();
        
        // Make it available globally (only in browser)
        if (typeof window !== 'undefined') {
          (window as any).sharedVectorStore = this.vectorStore;
        }
      }
      
      console.log('✅ Vector Store initialized');
      this.updateStatus('📚 Vector Store ready for document management');
      this.updateDocumentStatus();
    } catch (error) {
      console.error('❌ Vector Store initialization failed:', error);
      this.updateStatus('❌ Vector Store initialization failed: ' + (error as Error).message);
      this.vectorStore = null;
    }
  }

  addTopic(title: string, description: string) {
    const newTopic: Topic = {
      id: `topic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      description,
      selected: false
    };
    
    this.topics.push(newTopic);
    this.setTopics?.(this.topics);
    this.saveToStorage();
  }

  deleteTopic(topicId: string) {
    this.topics = this.topics.filter(t => t.id !== topicId);
    this.setTopics?.(this.topics);
    this.saveToStorage();
  }

  selectTopic(topicId: string) {
    this.topics = this.topics.map(t => ({
      ...t,
      selected: t.id === topicId ? !t.selected : t.selected
    }));
    this.setTopics?.(this.topics);
    this.saveToStorage();
  }

  moveTopic(topicId: string, direction: 'up' | 'down') {
    const index = this.topics.findIndex(t => t.id === topicId);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= this.topics.length) return;
    
    const newTopics = [...this.topics];
    [newTopics[index], newTopics[newIndex]] = [newTopics[newIndex], newTopics[index]];
    
    this.topics = newTopics;
    this.setTopics?.(this.topics);
    this.saveToStorage();
  }

  async connectAI() {
    this.updateStatus('🔄 Connecting to AI...');
    
    // Simulate AI connection
    setTimeout(() => {
      this.setAIStatus?.({ connected: true, provider: 'ollama' });
      this.updateStatus('✅ Connected to AI successfully');
    }, 1000);
  }

  async generateResearch(researchType: ResearchType, researchDepth: ResearchDepth) {
    if (this.isGenerating) return;
    
    const selectedTopics = this.topics.filter(t => t.selected);
    if (selectedTopics.length === 0) {
      this.updateStatus('❌ Please select at least one research topic');
      return;
    }

    this.isGenerating = true;
    this.setIsGenerating?.(true);
    this.updateStatus('🔄 Generating research...');

    try {
      // Generate mock research content
      const researchContent = this.generateMockResearch(selectedTopics, researchType, researchDepth);
      
      // Save to vector store if available
      if (this.vectorStore) {
        const title = `Research: ${selectedTopics.map(t => t.title).join(', ')}`;
        await this.vectorStore.addGeneratedDocument(title, researchContent);
        this.updateStatus('✅ Research saved to knowledge base');
        this.updateDocumentStatus();
      }
      
      this.setResearchResults?.(researchContent);
      this.updateStatus('✅ Research generated successfully');
      
    } catch (error) {
      console.error('❌ Research generation failed:', error);
      this.updateStatus('❌ Research generation failed: ' + (error as Error).message);
    } finally {
      this.isGenerating = false;
      this.setIsGenerating?.(false);
    }
  }

  private generateMockResearch(selectedTopics: Topic[], type: ResearchType, depth: ResearchDepth): string {
    const topics = selectedTopics.map(t => t.title).join(', ');
    
    let content = `# ${type.charAt(0).toUpperCase() + type.slice(1)} Research Report\n\n`;
    content += `**Research Depth:** ${depth}\n`;
    content += `**Topics:** ${topics}\n`;
    content += `**Generated:** ${new Date().toLocaleDateString()}\n\n`;
    
    content += `## Executive Summary\n\n`;
    content += `This ${depth} ${type} research analysis covers ${topics}. `;
    
    if (depth === 'overview') {
      content += `This overview provides key insights and high-level findings.\n\n`;
      content += `## Key Findings\n\n`;
      selectedTopics.forEach((topic, i) => {
        content += `### ${i + 1}. ${topic.title}\n\n`;
        content += `${topic.description}\n\n`;
        content += `**Key Points:**\n`;
        content += `- Market opportunity identified\n`;
        content += `- Technological feasibility confirmed\n`;
        content += `- Competitive landscape assessed\n\n`;
      });
    } else if (depth === 'detailed') {
      content += `This detailed analysis provides comprehensive insights with supporting data.\n\n`;
      content += `## Detailed Analysis\n\n`;
      selectedTopics.forEach((topic, i) => {
        content += `### ${i + 1}. ${topic.title}\n\n`;
        content += `**Background:** ${topic.description}\n\n`;
        content += `**Market Analysis:**\n`;
        content += `- Market size: $X.X billion\n`;
        content += `- Growth rate: X% CAGR\n`;
        content += `- Key drivers: Innovation, demand, regulation\n\n`;
        content += `**Technology Assessment:**\n`;
        content += `- Maturity level: High\n`;
        content += `- Implementation complexity: Medium\n`;
        content += `- Required resources: Moderate\n\n`;
        content += `**Competitive Landscape:**\n`;
        content += `- Number of competitors: X-Y major players\n`;
        content += `- Market leader: Company ABC\n`;
        content += `- Differentiation opportunities: Innovation, cost, service\n\n`;
      });
    } else { // comprehensive
      content += `This comprehensive research provides in-depth analysis with detailed methodology and extensive findings.\n\n`;
      content += `## Methodology\n\n`;
      content += `- Literature review of 50+ sources\n`;
      content += `- Market data analysis\n`;
      content += `- Expert interviews\n`;
      content += `- Competitive intelligence\n\n`;
      content += `## Comprehensive Analysis\n\n`;
      selectedTopics.forEach((topic, i) => {
        content += `### ${i + 1}. ${topic.title}\n\n`;
        content += `**Executive Summary:** ${topic.description}\n\n`;
        content += `**Market Dynamics:**\n`;
        content += `- Total Addressable Market (TAM): $X.X billion\n`;
        content += `- Serviceable Addressable Market (SAM): $X.X billion\n`;
        content += `- Serviceable Obtainable Market (SOM): $X.X million\n`;
        content += `- Market growth drivers: Technology adoption, regulatory support\n`;
        content += `- Market constraints: Technical challenges, cost barriers\n\n`;
        content += `**Technology Deep Dive:**\n`;
        content += `- Current state: Mature/Emerging/Early stage\n`;
        content += `- Technical requirements: High performance computing, specialized algorithms\n`;
        content += `- Implementation timeline: 6-18 months\n`;
        content += `- Risk factors: Technical complexity, resource requirements\n\n`;
        content += `**Competitive Intelligence:**\n`;
        content += `- Market leaders: Company A (25%), Company B (20%), Company C (15%)\n`;
        content += `- Competitive advantages: Patent portfolio, market presence, technical expertise\n`;
        content += `- Competitive gaps: Cost optimization, user experience, integration capabilities\n\n`;
        content += `**Strategic Recommendations:**\n`;
        content += `- Investment priority: High/Medium/Low\n`;
        content += `- Recommended approach: Partnership, acquisition, internal development\n`;
        content += `- Success metrics: Revenue growth, market share, technical milestones\n\n`;
      });
    }
    
    content += `## Conclusion\n\n`;
    content += `Based on this ${depth} ${type} analysis, the research indicates significant opportunities in ${topics}. `;
    content += `Key recommendations include strategic investment, technology development, and market positioning initiatives.\n\n`;
    content += `## Next Steps\n\n`;
    content += `1. Detailed market entry strategy\n`;
    content += `2. Technical feasibility assessment\n`;
    content += `3. Partnership and collaboration opportunities\n`;
    content += `4. Investment and resource planning\n\n`;
    content += `---\n\n`;
    content += `*This research was generated by DeepResearch TimeCapsule*`;
    
    return content;
  }

  async handleFileUpload(files: FileList) {
    if (!this.vectorStore) {
      this.updateStatus('❌ Vector Store not available');
      return;
    }

    if (this.isUploading) {
      this.updateStatus('⚠️ Upload already in progress');
      return;
    }

    this.isUploading = true;
    console.log(`📊 Processing ${files.length} documents...`);
    
    let successCount = 0;
    let failedCount = 0;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`📄 Processing file ${i + 1}/${files.length}: ${file.name}`);
        this.updateStatus(`📄 Processing ${file.name} (${i + 1}/${files.length})...`);
        
        try {
          const content = await this.readFileContent(file);
          await this.vectorStore.addDocument(file, content);
          successCount++;
          console.log(`✅ Successfully processed: ${file.name}`);
        } catch (fileError) {
          console.error(`❌ Failed to process ${file.name}:`, fileError);
          failedCount++;
          this.updateStatus(`❌ Failed to process ${file.name}: ${(fileError as Error).message}`);
          
          // Continue processing other files instead of stopping
          await new Promise(resolve => setTimeout(resolve, 1000)); // Brief pause before next file
        }
      }
      
      if (successCount > 0) {
        this.updateStatus(`✅ Successfully uploaded ${successCount} file(s)${failedCount > 0 ? ` (${failedCount} failed)` : ''}`);
        this.updateDocumentStatus();
      } else {
        this.updateStatus(`❌ All uploads failed`);
      }
      
      console.log(`📊 Upload process completed: ${successCount} successful, ${failedCount} failed`);
      
    } catch (error) {
      console.error('❌ Upload process failed:', error);
      this.updateStatus('❌ Upload process failed: ' + (error as Error).message);
    } finally {
      this.isUploading = false;
      
      // Clear file input to allow re-uploading same files
      if (typeof document !== 'undefined') {
        const fileInput = document.getElementById('documentUpload') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
          console.log(`📄 File input cleared successfully`);
        }
      }
      
      console.log(`📄 Upload process completed, state reset`);
    }
  }

  private readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      // Check file size to prevent freezing (following reference implementation)
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        reject(new Error(`File too large: ${file.name} (${this.formatFileSize(file.size)}). Please use files under 10MB.`));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  showDocumentManager() {
    if (!this.vectorStore) {
      this.updateStatus('❌ Vector Store not initialized');
      return;
    }

    this.setShowDocumentManager?.(true);
    this.updateStatus('📚 Opening document manager...');
  }

  hideDocumentManager() {
    this.setShowDocumentManager?.(false);
  }

  async deleteDocument(docId: string) {
    if (!this.vectorStore) {
      this.updateStatus('❌ Vector Store not available');
      return;
    }

    if (confirm('Are you sure you want to delete this document?')) {
      try {
        await this.vectorStore.deleteDocument(docId);
        this.updateStatus('✅ Document deleted successfully');
        this.updateDocumentStatus();
      } catch (error) {
        console.error('Failed to delete document:', error);
        this.updateStatus('❌ Failed to delete document: ' + (error as Error).message);
      }
    }
  }

  async previewDocument(docId: string) {
    if (!this.vectorStore) {
      this.updateStatus('❌ Vector Store not available');
      return null;
    }

    try {
      const document = await this.vectorStore.getDocument(docId);
      if (!document) {
        this.updateStatus('❌ Document not found');
        return null;
      }

      this.updateStatus('📄 Document preview loaded');
      return document;
    } catch (error) {
      console.error('Failed to preview document:', error);
      this.updateStatus('❌ Failed to preview document: ' + (error as Error).message);
      return null;
    }
  }

  async downloadDocument(docId: string) {
    if (!this.vectorStore) {
      this.updateStatus('❌ Vector Store not available');
      return;
    }

    try {
      const document = await this.vectorStore.getDocument(docId);
      if (!document) {
        this.updateStatus('❌ Document not found');
        return;
      }

      const blob = new Blob([document.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = `${document.title}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      
      this.updateStatus('✅ Document downloaded successfully');
    } catch (error) {
      console.error('Failed to download document:', error);
      this.updateStatus('❌ Failed to download document: ' + (error as Error).message);
    }
  }

  async searchDocuments(query: string, threshold: number = 0.3, limit: number = 20) {
    if (!this.vectorStore) {
      this.updateStatus('❌ Vector Store not available');
      return [];
    }

    if (!query.trim()) {
      this.updateStatus('❌ Please enter a search query');
      return [];
    }

    try {
      this.updateStatus('🔍 Searching documents...');
      const results = await this.vectorStore.searchSimilar(query, threshold, limit);
      
      if (results.length === 0) {
        this.updateStatus('❌ No documents found matching your query');
        return [];
      }

      this.updateStatus(`✅ Found ${results.length} relevant results`);
      return results;
    } catch (error) {
      console.error('Search failed:', error);
      this.updateStatus('❌ Search failed: ' + (error as Error).message);
      return [];
    }
  }

  async updateDocumentStatus() {
    if (!this.vectorStore) {
      this.setDocumentStatus?.({ count: 0, totalSize: 0, vectorCount: 0 });
      return;
    }

    try {
      const stats = await this.vectorStore.getStats();
      const documents = await this.vectorStore.getAllDocuments();
      const totalSize = documents.reduce((sum, doc) => sum + doc.metadata.filesize, 0);
      
      this.setDocumentStatus?.({
        count: stats.documentCount,
        totalSize: totalSize,
        vectorCount: stats.vectorCount
      });
      
      this.setDocuments?.(documents);
    } catch (error) {
      console.error('Failed to update document status:', error);
    }
  }

  exportResults() {
    const data = {
      topics: this.topics,
      researchResults: this.researchResults,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deepresearch_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    this.updateStatus('✅ Research exported successfully');
  }

  // TimeCapsule export - comprehensive data export including vector store
  async exportTimeCapsule() {
    try {
      this.updateStatus('📦 Preparing TimeCapsule export...');
      
      const timeCapsuleData = {
        metadata: {
          version: '4.0.0',
          exportedAt: new Date().toISOString(),
          platform: 'Next.js',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
        },
        research: {
          topics: this.topics,
          researchResults: this.researchResults,
          currentTab: this.currentTab
        },
        vectorStore: null as any
      };

      // Export vector store data if available
      if (this.vectorStore) {
        try {
          const documents = await this.vectorStore.getAllDocuments();
          const stats = await this.vectorStore.getStats();
          
          timeCapsuleData.vectorStore = {
            documents: documents,
            stats: stats,
            exportedAt: new Date().toISOString()
          };
          
          this.updateStatus('📊 Vector store data included in export');
        } catch (vectorError) {
          console.warn('⚠️ Could not export vector store data:', vectorError);
          this.updateStatus('⚠️ Research data exported without vector store');
        }
      }

      const blob = new Blob([JSON.stringify(timeCapsuleData, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `timecapsule_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      this.updateStatus('✅ TimeCapsule exported successfully');
    } catch (error) {
      console.error('❌ TimeCapsule export failed:', error);
      this.updateStatus('❌ TimeCapsule export failed: ' + (error as Error).message);
    }
  }

  // TimeCapsule import - restore from exported data
  async importTimeCapsule(file: File) {
    try {
      this.updateStatus('📦 Importing TimeCapsule...');
      
      const content = await this.readFileContent(file);
      const timeCapsuleData = JSON.parse(content);
      
      // Validate TimeCapsule format
      if (!timeCapsuleData.metadata || !timeCapsuleData.research) {
        throw new Error('Invalid TimeCapsule format');
      }
      
      // Restore research data
      if (timeCapsuleData.research.topics) {
        this.topics = timeCapsuleData.research.topics;
        this.setTopics?.(this.topics);
      }
      
      if (timeCapsuleData.research.researchResults) {
        this.researchResults = timeCapsuleData.research.researchResults;
        this.setResearchResults?.(this.researchResults['current'] || '');
      }
      
      // Restore vector store data
      if (timeCapsuleData.vectorStore && this.vectorStore) {
        try {
          this.updateStatus('📊 Restoring vector store data...');
          
          // Clear existing data
          await this.vectorStore.clear();
          
          // Import documents
          const documents = timeCapsuleData.vectorStore.documents || [];
          for (const doc of documents) {
            try {
              // Re-insert document into vector store
              await this.vectorStore.insertDocument(doc);
            } catch (docError) {
              console.warn(`⚠️ Could not restore document ${doc.id}:`, docError);
            }
          }
          
          this.updateDocumentStatus();
          this.updateStatus('✅ Vector store data restored');
        } catch (vectorError) {
          console.warn('⚠️ Could not restore vector store data:', vectorError);
          this.updateStatus('⚠️ Research data restored without vector store');
        }
      }
      
      this.saveToStorage();
      this.updateStatus('✅ TimeCapsule imported successfully');
      
    } catch (error) {
      console.error('❌ TimeCapsule import failed:', error);
      this.updateStatus('❌ TimeCapsule import failed: ' + (error as Error).message);
    }
  }

  // Advanced search with filters
  async searchDocumentsAdvanced(options: {
    query: string;
    threshold?: number;
    limit?: number;
    documentTypes?: string[];
    dateRange?: { start: Date; end: Date };
  }) {
    if (!this.vectorStore) {
      this.updateStatus('❌ Vector Store not available');
      return [];
    }

    try {
      const { query, threshold = 0.3, limit = 20 } = options;
      
      this.updateStatus('🔍 Performing advanced search...');
      console.log('🔍 Advanced search parameters:', options);
      
      const results = await this.vectorStore.searchSimilar(query, threshold, limit);
      
      // Apply additional filters if specified
      let filteredResults = results;
      
      if (options.documentTypes && options.documentTypes.length > 0) {
        filteredResults = filteredResults.filter(result => 
          options.documentTypes!.includes(result.document.metadata.filetype)
        );
      }
      
      if (options.dateRange) {
        const { start, end } = options.dateRange;
        filteredResults = filteredResults.filter(result => {
          const uploadDate = new Date(result.document.metadata.uploadedAt);
          return uploadDate >= start && uploadDate <= end;
        });
      }
      
      this.updateStatus(`✅ Advanced search completed: ${filteredResults.length} results`);
      return filteredResults;
      
    } catch (error) {
      console.error('❌ Advanced search failed:', error);
      this.updateStatus('❌ Advanced search failed: ' + (error as Error).message);
      return [];
    }
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all research data?')) {
      this.topics = [];
      this.researchResults = {};
      this.setTopics?.([]);
      this.setResearchResults?.('');
      this.saveToStorage();
      this.updateStatus('🧹 All data cleared');
    }
  }

  saveToStorage() {
    try {
      const data = {
        topics: this.topics,
        researchResults: this.researchResults
      };
      localStorage.setItem('deepresearch_data', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  }

  loadFromStorage() {
    try {
      const data = localStorage.getItem('deepresearch_data');
      if (data) {
        const parsed = JSON.parse(data);
        this.topics = parsed.topics || [];
        this.researchResults = parsed.researchResults || {};
        
        // Update React state if setters are available
        this.setTopics?.(this.topics);
        this.setResearchResults?.(this.researchResults['current'] || '');
      }
    } catch (error) {
      console.error('Failed to load from storage:', error);
    }
  }

  updateStatus(message: string) {
    console.log(`📋 Status: ${message}`);
    this.setStatusMessage?.(message);
  }
}

// React Component Hook
export function DeepResearchComponent() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [aiStatus, setAIStatus] = useState<AIStatus>({ connected: false, provider: 'ollama' });
  const [researchType, setResearchType] = useState<ResearchType>('academic');
  const [researchDepth, setResearchDepth] = useState<ResearchDepth>('overview');
  const [researchResults, setResearchResults] = useState<string>('');
  const [currentTab, setCurrentTab] = useState<'research' | 'sources' | 'notes'>('research');
  const [statusMessage, setStatusMessage] = useState<string>('Initializing...');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [documentStatus, setDocumentStatus] = useState({ count: 0, totalSize: 0, vectorCount: 0 });
  const [showDocumentManager, setShowDocumentManager] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchThreshold, setSearchThreshold] = useState<number>(0.1);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string>('');
  const [previewDocument, setPreviewDocument] = useState<DocumentData | null>(null);
  const [showDocumentPreview, setShowDocumentPreview] = useState<boolean>(false);
  const [showChunkView, setShowChunkView] = useState<boolean>(false);
  const [currentChunk, setCurrentChunk] = useState<any>(null);
  
  const appRef = useRef<DeepResearchApp | null>(null);

  useEffect(() => {
    // Initialize the app instance
    if (!appRef.current) {
      appRef.current = new DeepResearchApp();
      
      // Set React state setters
      appRef.current.setTopics = setTopics;
      appRef.current.setAIStatus = setAIStatus;
      appRef.current.setResearchType = setResearchType;
      appRef.current.setResearchDepth = setResearchDepth;
      appRef.current.setResearchResults = setResearchResults;
      appRef.current.setCurrentTab = setCurrentTab;
      appRef.current.setStatusMessage = setStatusMessage;
      appRef.current.setIsGenerating = setIsGenerating;
      appRef.current.setDocuments = setDocuments;
      appRef.current.setDocumentStatus = setDocumentStatus;
      appRef.current.setShowDocumentManager = setShowDocumentManager;
      
      // Initialize the app
      appRef.current.init();
    }
  }, []);

  const app = appRef.current;
  if (!app) return <div>Loading...</div>;

  const handleSearch = async () => {
    if (!app || !searchQuery.trim()) {
      return;
    }

    setIsSearching(true);
    try {
      const results = await app.searchDocuments(searchQuery, searchThreshold, 20);
      setSearchResults(results);
      if (results.length > 0) {
        setCurrentSearchQuery(searchQuery);
        setShowSearchResults(true);
      }
    } catch (error) {
      console.error('Search failed:', error);
      app.updateStatus('❌ Search failed: ' + (error as Error).message);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handlePreviewDocument = async (docId: string) => {
    const doc = await app.previewDocument(docId);
    if (doc) {
      setPreviewDocument(doc);
      setShowDocumentPreview(true);
    }
  };

  const closeSearchResults = () => {
    setShowSearchResults(false);
    setSearchResults([]);
    setCurrentSearchQuery('');
  };

  const closeDocumentPreview = () => {
    setShowDocumentPreview(false);
    setPreviewDocument(null);
  };

  const handleViewChunk = (chunk: any, document: DocumentData) => {
    setCurrentChunk({ ...chunk, document });
    setShowChunkView(true);
  };

  const closeChunkView = () => {
    setShowChunkView(false);
    setCurrentChunk(null);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr 6px 2fr',
        gridTemplateRows: '140px 1fr',
        height: 'calc(100vh - 40px)',
        gap: '15px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          gridColumn: '1 / -1',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          padding: '20px 30px',
          color: 'white',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            margin: '0',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            🔬 DeepResearch Studio
          </h1>
        </div>

        {/* Controls Panel */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '25px',
          color: 'white',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          overflowY: 'auto'
        }}>
          <h3 style={{ marginBottom: '25px', fontSize: '20px', textAlign: 'center' }}>
            🎛️ Research Controls
          </h3>

          {/* AI Connection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
              AI Provider
            </label>
            <select 
              value={aiStatus.provider}
              onChange={(e) => setAIStatus({...aiStatus, provider: e.target.value as AIProvider})}
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '10px',
                color: 'white',
                marginBottom: '10px'
              }}
            >
              <option value="ollama">🦙 Ollama</option>
              <option value="lmstudio">🏠 LM Studio</option>
              <option value="openai">🤖 OpenAI</option>
              <option value="local">💻 Local</option>
            </select>
            <button 
              onClick={() => app.connectAI()}
              style={{
                width: '100%',
                padding: '14px',
                background: aiStatus.connected ? 
                  'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)' :
                  'linear-gradient(45deg, #fa709a 0%, #fee140 100%)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              {aiStatus.connected ? '✅ Connected' : '🔌 Connect AI'}
            </button>
          </div>

          {/* Research Type */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
              Research Type
            </label>
            <select 
              value={researchType}
              onChange={(e) => setResearchType(e.target.value as ResearchType)}
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '10px',
                color: 'white'
              }}
            >
              <option value="academic">📚 Academic</option>
              <option value="market">📈 Market</option>
              <option value="technology">💻 Technology</option>
              <option value="competitive">⚔️ Competitive</option>
              <option value="trend">📊 Trend</option>
              <option value="literature">📖 Literature</option>
            </select>
          </div>

          {/* Research Depth */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
              Research Depth
            </label>
            <select 
              value={researchDepth}
              onChange={(e) => setResearchDepth(e.target.value as ResearchDepth)}
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '10px',
                color: 'white'
              }}
            >
              <option value="overview">👀 Overview</option>
              <option value="detailed">🔍 Detailed</option>
              <option value="comprehensive">📋 Comprehensive</option>
            </select>
          </div>

          {/* Add Topic */}
          <div style={{ marginBottom: '20px' }}>
            <button 
              onClick={() => {
                const title = prompt('Topic title:');
                const description = prompt('Topic description:');
                if (title && description) {
                  app.addTopic(title, description);
                }
              }}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontWeight: '700',
                cursor: 'pointer',
                marginBottom: '10px'
              }}
            >
              ➕ Add Topic
            </button>
          </div>

          {/* Generate Research */}
          <button 
            onClick={() => app.generateResearch(researchType, researchDepth)}
            disabled={isGenerating || topics.filter(t => t.selected).length === 0}
            style={{
              width: '100%',
              padding: '14px',
              background: isGenerating ? 
                'rgba(255, 255, 255, 0.3)' :
                'linear-gradient(45deg, #fa709a 0%, #fee140 100%)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontWeight: '700',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              opacity: isGenerating ? 0.5 : 1,
              marginBottom: '20px'
            }}
          >
            {isGenerating ? '🔄 Generating...' : '🚀 Generate Research'}
          </button>

          {/* Document Management */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '10px' }}>📚 Knowledge Base</h4>
            <div style={{ fontSize: '12px', marginBottom: '10px', color: 'rgba(255,255,255,0.8)' }}>
              Documents: {documentStatus.count} | Size: {formatFileSize(documentStatus.totalSize)} | Vectors: {documentStatus.vectorCount}
            </div>
            <input 
              type="file" 
              id="documentUpload"
              multiple
              style={{ display: 'none' }}
              onChange={(e) => e.target.files && app.handleFileUpload(e.target.files)}
            />
            <button 
              onClick={() => document.getElementById('documentUpload')?.click()}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#333',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '10px'
              }}
            >
              📄 Upload Documents
            </button>
            <button 
              onClick={() => app.showDocumentManager()}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontWeight: '700',
                cursor: 'pointer',
                marginBottom: '10px',
                boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              📚 Manage Knowledge
            </button>
          </div>

          {/* Export */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '10px', fontSize: '14px' }}>📤 Export/Import</h4>
            <button 
              onClick={() => app.exportResults()}
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '10px'
              }}
            >
              📥 Export Results
            </button>
            <button 
              onClick={() => app.exportTimeCapsule()}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '10px'
              }}
            >
              📦 Export TimeCapsule
            </button>
            <input 
              type="file" 
              id="timeCapsuleImport"
              accept=".json"
              style={{ display: 'none' }}
              onChange={(e) => e.target.files && e.target.files[0] && app.importTimeCapsule(e.target.files[0])}
            />
            <button 
              onClick={() => document.getElementById('timeCapsuleImport')?.click()}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#333',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '10px'
              }}
            >
              📦 Import TimeCapsule
            </button>
          </div>

          <button 
            onClick={() => app.clearAll()}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(255, 69, 0, 0.3)',
              border: '1px solid rgba(255, 69, 0, 0.5)',
              borderRadius: '12px',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🗑️ Clear All
          </button>
        </div>

        {/* Topics Panel */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '25px',
          color: 'white',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          overflowY: 'auto'
        }}>
          <h3 style={{ marginBottom: '20px', fontSize: '18px', textAlign: 'center' }}>
            🎯 Research Topics
          </h3>
          
          {topics.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', padding: '20px' }}>
              No topics added yet.<br />Click "➕ Add Topic" to start.
            </div>
          ) : (
            topics.map((topic) => (
              <div key={topic.id} style={{
                background: topic.selected ? 'rgba(79, 172, 254, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '15px',
                padding: '15px',
                marginBottom: '15px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => app.selectTopic(topic.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', marginBottom: '5px' }}>
                      {topic.selected ? '✅' : '⭕'} {topic.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                      {topic.description}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button 
                      onClick={(e) => { e.stopPropagation(); app.moveTopic(topic.id, 'up'); }}
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        border: 'none',
                        borderRadius: '5px',
                        color: 'white',
                        padding: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      ⬆️
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); app.moveTopic(topic.id, 'down'); }}
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        border: 'none',
                        borderRadius: '5px',
                        color: 'white',
                        padding: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      ⬇️
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); app.deleteTopic(topic.id); }}
                      style={{
                        background: 'rgba(255,69,0,0.3)',
                        border: 'none',
                        borderRadius: '5px',
                        color: 'white',
                        padding: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Resize Handle */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '3px',
          cursor: 'col-resize'
        }} />

        {/* Results Panel */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '25px',
          color: 'white',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          overflowY: 'auto'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', margin: 0 }}>📄 Research Output</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              {(['research', 'sources', 'notes'] as const).map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setCurrentTab(tab)}
                  style={{
                    padding: '8px 16px',
                    background: currentTab === tab ? 'rgba(79, 172, 254, 0.5)' : 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '20px',
                    color: 'white',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {researchResults ? (
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '15px',
              padding: '20px',
              minHeight: 'calc(100% - 80px)',
              whiteSpace: 'pre-wrap',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              {researchResults}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.7)',
              padding: '40px',
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '15px',
              minHeight: 'calc(100% - 80px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔬</div>
                <div style={{ fontSize: '18px', marginBottom: '10px' }}>No research generated yet</div>
                <div style={{ fontSize: '14px' }}>Add topics and click "Generate Research" to start</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Document Manager Modal - Redesigned to match reference */}
      {showDocumentManager && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(5px)',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '900px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px',
              paddingBottom: '15px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h2 style={{ margin: 0, color: '#4facfe', fontSize: '24px' }}>📚 Knowledge Base Manager</h2>
              <button 
                onClick={() => app.hideDocumentManager()}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '5px',
                  borderRadius: '5px',
                  transition: 'background 0.3s ease'
                }}
                                 onMouseEnter={(e) => (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.2)'}
                 onMouseLeave={(e) => (e.target as HTMLElement).style.background = 'none'}
              >
                ✕
              </button>
            </div>

            {/* Vector Statistics */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              padding: '20px',
              marginBottom: '25px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h3 style={{ color: '#4facfe', marginBottom: '15px', fontSize: '16px' }}>📊 Vector Store Statistics</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '15px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4facfe', marginBottom: '5px' }}>
                    {documentStatus.count}
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
                    Documents
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4facfe', marginBottom: '5px' }}>
                    {formatFileSize(documentStatus.totalSize)}
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
                    Total Size
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4facfe', marginBottom: '5px' }}>
                    {documentStatus.vectorCount}
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
                    Vector Count
                  </div>
                </div>
              </div>
            </div>

            {/* Search Interface */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              padding: '20px',
              marginBottom: '25px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h3 style={{ color: '#4facfe', marginBottom: '15px', fontSize: '16px' }}>🔍 Search Knowledge Base</h3>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter search query..."
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <select
                  value={searchThreshold}
                  onChange={(e) => setSearchThreshold(parseFloat(e.target.value))}
                  style={{
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                >
                  <option value={0.1}>Low (0.1)</option>
                  <option value={0.3}>Medium (0.3)</option>
                  <option value={0.5}>High (0.5)</option>
                  <option value={0.7}>Very High (0.7)</option>
                </select>
                <button
                  onClick={handleSearch}
                  disabled={isSearching || !searchQuery.trim()}
                  style={{
                    padding: '12px 20px',
                    background: isSearching ? 'rgba(255, 255, 255, 0.3)' : 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    cursor: isSearching ? 'not-allowed' : 'pointer',
                    opacity: isSearching ? 0.5 : 1
                  }}
                >
                  {isSearching ? '🔄' : '🔍'} Search
                </button>
                {searchResults.length > 0 && (
                  <button
                    onClick={clearSearch}
                    style={{
                      padding: '12px 20px',
                      background: 'rgba(255, 69, 0, 0.3)',
                      border: '1px solid rgba(255, 69, 0, 0.5)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    ✕ Clear
                  </button>
                )}
              </div>
              
              {/* Search Results */}
              {searchResults.length > 0 && (
                <div style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '8px',
                  padding: '15px',
                  marginTop: '15px',
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  <h4 style={{ color: '#4facfe', marginBottom: '10px', fontSize: '14px' }}>
                    🎯 Search Results ({searchResults.length})
                  </h4>
                  {searchResults.map((result, index) => (
                    <div key={index} style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px',
                      padding: '10px',
                      marginBottom: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                        <span style={{ fontWeight: '600', color: '#4facfe', fontSize: '12px' }}>
                          📄 {result.document.title}
                        </span>
                        <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)' }}>
                          {(result.similarity * 100).toFixed(1)}% match
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)' }}>
                        {result.chunk.content.substring(0, 150)}...
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upload Area */}
            <div style={{
              border: '2px dashed rgba(255, 255, 255, 0.3)',
              borderRadius: '10px',
              padding: '30px',
              textAlign: 'center',
              marginBottom: '25px',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onClick={() => document.getElementById('documentUpload')?.click()}
                         onMouseEnter={(e) => {
               const target = e.target as HTMLElement;
               target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
               target.style.background = 'rgba(255, 255, 255, 0.05)';
             }}
             onMouseLeave={(e) => {
               const target = e.target as HTMLElement;
               target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
               target.style.background = 'transparent';
             }}
            >
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>📁</div>
              <div style={{ fontSize: '18px', marginBottom: '10px' }}>Click to Upload Documents</div>
              <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
                Supports: PDF, DOCX, TXT, MD, and more
              </div>
            </div>

            {/* Document List */}
            {documents.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: 'rgba(255,255,255,0.7)',
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '15px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>📄</div>
                <div style={{ fontSize: '18px', marginBottom: '10px' }}>No documents uploaded yet</div>
                <div style={{ fontSize: '14px' }}>Upload documents to build your knowledge base</div>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gap: '15px',
                marginBottom: '25px'
              }}>
                {documents.map((doc) => (
                  <div key={doc.id} style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    padding: '15px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.3s ease'
                  }}
                                     onMouseEnter={(e) => {
                     const target = e.target as HTMLElement;
                     target.style.background = 'rgba(255, 255, 255, 0.15)';
                     target.style.transform = 'translateY(-2px)';
                   }}
                   onMouseLeave={(e) => {
                     const target = e.target as HTMLElement;
                     target.style.background = 'rgba(255, 255, 255, 0.1)';
                     target.style.transform = 'translateY(0)';
                   }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', marginBottom: '5px', color: '#4facfe' }}>
                        📄 {doc.title}
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
                        <strong>Type:</strong> {doc.metadata.filetype} | 
                        <strong> Size:</strong> {formatFileSize(doc.metadata.filesize)} | 
                        <strong> Uploaded:</strong> {new Date(doc.metadata.uploadedAt).toLocaleDateString()} |
                        <strong> Chunks:</strong> {doc.chunks.length} |
                        <strong> Vectors:</strong> {doc.vectors.length}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handlePreviewDocument(doc.id)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          border: 'none',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        👁️ Preview
                      </button>
                      <button 
                        onClick={() => app.downloadDocument(doc.id)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          border: 'none',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        📥 Download
                      </button>
                      <button 
                        onClick={() => app.deleteDocument(doc.id)}
                        style={{
                          background: 'rgba(255, 69, 0, 0.3)',
                          border: 'none',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Modal Actions */}
            <div style={{
              display: 'flex',
              gap: '15px',
              marginTop: '25px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              justifyContent: 'center'
            }}>
              <button 
                onClick={() => document.getElementById('documentUpload')?.click()}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#333',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                📄 Upload More Documents
              </button>
              <button 
                onClick={() => app.exportTimeCapsule()}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                📦 Export TimeCapsule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Results Modal - Like Reference Design */}
      {showSearchResults && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(5px)',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '1000px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            {/* Search Results Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px',
              paddingBottom: '15px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h2 style={{ margin: 0, color: '#4facfe', fontSize: '24px' }}>
                ⚡ Quick Search Results for "{currentSearchQuery}"
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }}>
                  Found {searchResults.length} results • Threshold: {(searchThreshold * 100).toFixed(0)}% (Quick Mode)
                </span>
                <button 
                  onClick={closeSearchResults}
                  style={{
                    background: 'rgba(255, 69, 0, 0.7)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '35px',
                    height: '35px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Search Results List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {searchResults.map((result, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  padding: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease'
                }}>
                  {/* Document Title and Match Info */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px'
                  }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#4facfe',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      📄 {result.document.title}
                      <span style={{
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontWeight: 'normal'
                      }}>
                        • Chunk {result.chunk.index + 1} • {(result.similarity * 100).toFixed(1)}% match
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => handleViewChunk(result.chunk, result.document)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          border: 'none',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        👁️ View Chunk
                      </button>
                      <button
                        onClick={() => handlePreviewDocument(result.document.id)}
                        style={{
                          background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
                          border: 'none',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        📄 Full Doc
                      </button>
                    </div>
                  </div>

                  {/* Relevant Excerpt */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '10px',
                    padding: '15px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      color: '#4facfe',
                      marginBottom: '8px',
                      fontWeight: '600'
                    }}>
                      Relevant Excerpt:
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.9)',
                      lineHeight: '1.6'
                    }}>
                      "{result.chunk.content.length > 300 
                        ? result.chunk.content.substring(0, 300) + '...' 
                        : result.chunk.content}"
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {showDocumentPreview && previewDocument && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(5px)',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '1000px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            {/* Document Preview Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '25px',
              paddingBottom: '15px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div>
                <h2 style={{ margin: 0, color: '#4facfe', fontSize: '24px', marginBottom: '10px' }}>
                  📄 Document: {previewDocument.title}
                </h2>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <span><strong>Type:</strong> {previewDocument.metadata.filetype}</span>
                  <span><strong>Size:</strong> {formatFileSize(previewDocument.metadata.filesize)}</span>
                  <span><strong>Uploaded:</strong> {new Date(previewDocument.metadata.uploadedAt).toLocaleDateString()}</span>
                </div>
              </div>
              <button 
                onClick={closeDocumentPreview}
                style={{
                  background: 'rgba(255, 69, 0, 0.7)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '35px',
                  height: '35px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}
              >
                ✕
              </button>
            </div>

            {/* Document Content */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '15px',
              padding: '25px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              maxHeight: '60vh',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.9)',
              fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace'
            }}>
              {previewDocument.content}
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '15px',
              marginTop: '25px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              justifyContent: 'center'
            }}>
              <button 
                onClick={closeDocumentPreview}
                style={{
                  padding: '12px 24px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button 
                onClick={() => app.downloadDocument(previewDocument.id)}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                📥 Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        padding: '15px 30px',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        zIndex: 40
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>📋 {statusMessage}</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Chunk View Modal */}
      {showChunkView && currentChunk && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(5px)',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '1000px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            {/* Chunk View Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px',
              paddingBottom: '15px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h2 style={{ margin: 0, color: '#4facfe', fontSize: '24px' }}>
                📄 Chunk: {currentChunk.document.title}
              </h2>
              <button 
                onClick={closeChunkView}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '5px',
                  borderRadius: '5px',
                  transition: 'background 0.3s ease'
                }}
                                 onMouseEnter={(e) => (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.2)'}
                 onMouseLeave={(e) => (e.target as HTMLElement).style.background = 'none'}
              >
                ✕
              </button>
            </div>

            {/* Chunk Content */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '15px',
              padding: '25px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              maxHeight: '60vh',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.9)',
              fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace'
            }}>
              {currentChunk.content}
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '15px',
              marginTop: '25px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              justifyContent: 'center'
            }}>
              <button 
                onClick={closeChunkView}
                style={{
                  padding: '12px 24px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button 
                onClick={() => app.downloadDocument(currentChunk.document.id)}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                📥 Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 