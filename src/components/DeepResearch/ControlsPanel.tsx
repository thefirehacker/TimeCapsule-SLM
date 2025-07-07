'use client';

import { useState } from 'react';
import { AIProvider, AIStatus, ResearchType, ResearchDepth } from './DeepResearchApp';

interface ControlsPanelProps {
  aiStatus: AIStatus;
  setAIStatus: (status: AIStatus) => void;
  researchType: ResearchType;
  setResearchType: (type: ResearchType) => void;
  researchDepth: ResearchDepth;
  setResearchDepth: (depth: ResearchDepth) => void;
  onAddTopic: (title: string, description: string) => void;
  onConnectAI: () => void;
  onGenerateResearch: () => void;
  onClearAll: () => void;
  onManageKnowledge: () => void;
  onUploadDocuments: () => void;
  onUploadRepository: () => void;
  onExportResults: () => void;
  onExportTimeCapsule: () => void;
  onLoadTimeCapsule: () => void;
  isGenerating: boolean;
  documentStatus: {
    count: number;
    totalSize: number;
    vectorCount: number;
  };
}

export function ControlsPanel({
  aiStatus,
  setAIStatus,
  researchType,
  setResearchType,
  researchDepth,
  setResearchDepth,
  onAddTopic,
  onConnectAI,
  onGenerateResearch,
  onClearAll,
  onManageKnowledge,
  onUploadDocuments,
  onUploadRepository,
  onExportResults,
  onExportTimeCapsule,
  onLoadTimeCapsule,
  isGenerating,
  documentStatus
}: ControlsPanelProps) {
  const [topicTitle, setTopicTitle] = useState('');
  const [topicDescription, setTopicDescription] = useState('');

  const handleAddTopic = () => {
    if (topicTitle.trim()) {
      onAddTopic(topicTitle, topicDescription);
      setTopicTitle('');
      setTopicDescription('');
    }
  };

  const handleProviderChange = (provider: AIProvider) => {
    setAIStatus({ ...aiStatus, provider, connected: false });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white/10 backdrop-blur-[10px] rounded-[20px] p-[20px] text-white shadow-[0_8px_32px_rgba(31,38,135,0.37)] border border-white/18 relative overflow-hidden h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-red-400/5 pointer-events-none"></div>
      
      <div className="relative z-10 h-full overflow-y-auto space-y-6">
        <h2 className="text-xl font-bold text-white">🎛️ Controls</h2>

        {/* AI Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-300">🤖 AI Configuration</h3>
          
          <div>
            <label className="block text-sm font-medium mb-2">AI Provider</label>
            <select
              value={aiStatus.provider}
              onChange={(e) => handleProviderChange(e.target.value as AIProvider)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ollama">🦙 Ollama</option>
              <option value="lmstudio">🏠 LM Studio</option>
              <option value="openai">🚀 OpenAI</option>
              <option value="local">🧠 Local Qwen</option>
            </select>
          </div>

          <button
            onClick={onConnectAI}
            disabled={isGenerating}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              aiStatus.connected
                ? 'bg-green-500/30 text-green-200 border border-green-400/50'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {aiStatus.connected ? '✅ Connected' : '🔌 Connect AI'}
          </button>
        </div>

        {/* Research Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-green-300">📊 Research Config</h3>
          
          <div>
            <label className="block text-sm font-medium mb-2">Research Type</label>
            <select
              value={researchType}
              onChange={(e) => setResearchType(e.target.value as ResearchType)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="academic">📚 Academic</option>
              <option value="market">📈 Market</option>
              <option value="technology">⚙️ Technology</option>
              <option value="competitive">🏆 Competitive</option>
              <option value="trend">📊 Trend</option>
              <option value="literature">📖 Literature</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Research Depth</label>
            <select
              value={researchDepth}
              onChange={(e) => setResearchDepth(e.target.value as ResearchDepth)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="overview">👁️ Overview</option>
              <option value="detailed">🔍 Detailed</option>
              <option value="comprehensive">📋 Comprehensive</option>
            </select>
          </div>
        </div>

        {/* Topic Management */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-300">📝 Add Topic</h3>
          
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
              placeholder="Enter topic title..."
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyPress={(e) => e.key === 'Enter' && handleAddTopic()}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={topicDescription}
              onChange={(e) => setTopicDescription(e.target.value)}
              placeholder="Enter topic description..."
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          <button
            onClick={handleAddTopic}
            disabled={!topicTitle.trim()}
            className="w-full bg-purple-500 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            ➕ Add Topic
          </button>
        </div>

        {/* Document Management */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-yellow-300">📚 Knowledge Base</h3>
          
          <div className="bg-white/10 rounded-lg p-3 text-sm">
            <div className="text-white/70 mb-2">Current Status:</div>
            <div className="text-blue-300">
              {documentStatus.count} documents • {formatFileSize(documentStatus.totalSize)}
            </div>
            {documentStatus.vectorCount > 0 && (
              <div className="text-white/60 text-xs mt-1">
                {documentStatus.vectorCount} searchable chunks
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onUploadDocuments}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
            >
              📄 Upload
            </button>
            <button
              onClick={onManageKnowledge}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
            >
              🛠️ Manage
            </button>
          </div>

          <button
            onClick={onUploadRepository}
            disabled
            className="w-full bg-gray-500/50 text-white/50 py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed"
          >
            📦 Repository (Soon)
          </button>
        </div>

        {/* Research Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-red-300">🚀 Actions</h3>
          
          <button
            onClick={onGenerateResearch}
            disabled={isGenerating || !aiStatus.connected}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-bold transition-all duration-200"
          >
            {isGenerating ? '⏳ Generating...' : '🚀 Generate Research'}
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onExportResults}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
            >
              📥 Export
            </button>
            <button
              onClick={onClearAll}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* TimeCapsule */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-cyan-300">🧳 TimeCapsule</h3>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onExportTimeCapsule}
              className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
            >
              💾 Save
            </button>
            <button
              onClick={onLoadTimeCapsule}
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
            >
              📂 Load
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 