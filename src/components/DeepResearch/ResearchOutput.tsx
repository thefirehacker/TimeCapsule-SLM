'use client';

interface ResearchOutputProps {
  researchResults: string;
  currentTab: 'research' | 'sources' | 'notes';
  onTabChange: (tab: 'research' | 'sources' | 'notes') => void;
  onClearOutput: () => void;
}

export function ResearchOutput({
  researchResults,
  currentTab,
  onTabChange,
  onClearOutput
}: ResearchOutputProps) {
  const renderMarkdown = (content: string) => {
    // Simple markdown rendering - in a real app you'd use a proper markdown library
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 text-white">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3 text-blue-300">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-medium mb-2 text-green-300">$1</h3>')
      .replace(/^\*\*(.*)\*\*/gim, '<strong class="font-bold text-yellow-300">$1</strong>')
      .replace(/^\* (.*$)/gim, '<li class="ml-4 text-white/90">• $1</li>')
      .replace(/\n/g, '<br />');
  };

  const renderEmptyState = () => (
    <div className="flex items-center justify-center h-full text-center">
      <div className="max-w-md text-white/70">
        <div className="text-6xl mb-6">🌟</div>
        <h3 className="text-2xl font-semibold mb-4 text-white">Welcome to Deep Research Studio</h3>
        <p className="mb-6">This AI-powered platform helps you conduct comprehensive research and analysis.</p>
        
        <div className="text-left space-y-4">
          <div>
            <h4 className="text-lg font-semibold mb-2 text-blue-300">🚀 Quick Start Guide:</h4>
            <ol className="space-y-1 text-sm">
              <li>1. Connect to your preferred AI provider</li>
              <li>2. Add research topics using the left panel</li>
              <li>3. Select your research type and depth</li>
              <li>4. Click "Generate Research" to begin analysis</li>
              <li>5. Review AI-generated content in markdown format</li>
            </ol>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-2 text-green-300">✨ Features:</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>Multiple AI Providers:</strong> Ollama, LM Studio, OpenAI API, Local Qwen</li>
              <li>• <strong>Research Types:</strong> Academic, Market, Technology, Competitive, Trend Analysis</li>
              <li>• <strong>Structured Approach:</strong> Build topic hierarchies for comprehensive research</li>
              <li>• <strong>Markdown Output:</strong> Professional formatting with syntax highlighting</li>
              <li>• <strong>Export Options:</strong> Save and share your research results</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white/10 backdrop-blur-[10px] rounded-[20px] text-white shadow-[0_8px_32px_rgba(31,38,135,0.37)] border border-white/18 relative overflow-hidden h-full flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-pink-400/5 pointer-events-none"></div>
      
      {/* Header with Tabs */}
      <div className="relative z-10 p-6 border-b border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">📄 Research Output</h3>
          {researchResults && (
            <button
              onClick={onClearOutput}
              className="text-red-400 hover:text-red-300 transition-colors text-sm"
              title="Clear Output"
            >
              🗑️ Clear
            </button>
          )}
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2">
          {[
            { id: 'research', label: '📊 Research', description: 'Main findings' },
            { id: 'sources', label: '📚 Sources', description: 'References' },
            { id: 'notes', label: '📝 Notes', description: 'Annotations' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as 'research' | 'sources' | 'notes')}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${currentTab === tab.id 
                  ? 'bg-blue-500/30 text-blue-200 border border-blue-400/50' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/20'
                }
              `}
              title={tab.description}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex-1 overflow-hidden">
        {!researchResults ? (
          renderEmptyState()
        ) : (
          <div className="h-full overflow-y-auto p-6">
            <div className="prose prose-invert max-w-none">
              {currentTab === 'research' && (
                <div 
                  className="text-white/90 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(researchResults) }}
                />
              )}
              
              {currentTab === 'sources' && (
                <div className="text-white/90 leading-relaxed">
                  <h2 className="text-xl font-semibold mb-3 text-blue-300">📚 Research Sources</h2>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Methodology</h3>
                      <p className="text-sm text-white/70">
                        This research was conducted using AI analysis and synthesis combining general knowledge 
                        and uploaded document knowledge base.
                      </p>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Source Categories</h3>
                      <ul className="text-sm text-white/70 space-y-1">
                        <li>• AI Knowledge Base: Core training data and reasoning capabilities</li>
                        <li>• Academic Literature: Scholarly articles and research papers</li>
                        <li>• Industry Reports: Market analysis and industry publications</li>
                        <li>• Technology Documentation: Technical specifications and whitepapers</li>
                        <li>• Uploaded Documents: User-provided materials with direct content extraction</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-400/30">
                      <p className="text-sm text-blue-200">
                        <strong>Note:</strong> This AI-generated research should be used as a starting point 
                        for further investigation and verified independently for critical applications.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {currentTab === 'notes' && (
                <div className="text-white/90 leading-relaxed">
                  <h2 className="text-xl font-semibold mb-3 text-green-300">📝 Research Notes</h2>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Research Parameters</h3>
                      <ul className="text-sm text-white/70 space-y-1">
                        <li>• Generated: {new Date().toLocaleString()}</li>
                        <li>• Status: Analysis Complete ✅</li>
                        <li>• Format: Markdown with enhanced formatting</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Next Steps</h3>
                      <ul className="text-sm text-white/70 space-y-1">
                        <li>☐ Review and validate key findings</li>
                        <li>☐ Conduct additional research on specific areas</li>
                        <li>☐ Share results with stakeholders</li>
                        <li>☐ Plan follow-up research phases</li>
                        <li>☐ Export results for archival purposes</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-500/20 rounded-lg p-4 border border-green-400/30">
                      <h3 className="font-medium mb-2 text-green-300">💡 Research Enhancement Tips</h3>
                      <ul className="text-sm text-green-200 space-y-1">
                        <li>• Add Documents: Upload relevant PDFs, Word docs, or text files to enhance analysis</li>
                        <li>• Multiple Perspectives: Include documents from various sources and viewpoints</li>
                        <li>• Current Information: Add recent reports or articles for up-to-date insights</li>
                        <li>• Cross-Reference: Verify findings across multiple sources for accuracy</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {researchResults && (
        <div className="relative z-10 p-4 border-t border-white/20 bg-white/5">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>Research generated • {new Date().toLocaleDateString()}</span>
            <span>Use Export options to save your research</span>
          </div>
        </div>
      )}
    </div>
  );
} 