'use client';

import { Topic } from './DeepResearchApp';

interface StructureBuilderProps {
  topics: Topic[];
  onSelectTopic: (topicId: string) => void;
  onDeleteTopic: (topicId: string) => void;
  onMoveTopic: (topicId: string, direction: 'up' | 'down') => void;
  documentStatus: {
    count: number;
    totalSize: number;
    vectorCount: number;
  };
}

export function StructureBuilder({
  topics,
  onSelectTopic,
  onDeleteTopic,
  onMoveTopic,
  documentStatus
}: StructureBuilderProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white/10 backdrop-blur-[10px] rounded-[20px] p-[20px] text-white shadow-[0_8px_32px_rgba(31,38,135,0.37)] border border-white/18 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-blue-400/5 pointer-events-none"></div>
      
      <div className="relative z-10">
        <h2 className="text-[20px] font-[700] mb-[15px] text-white">📋 Research Structure</h2>
        
        {/* Document Status */}
        <div className="mb-4 p-3 bg-white/10 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">📚 Knowledge Base:</span>
            <span className="text-blue-300 font-medium">
              {documentStatus.count} docs • {formatFileSize(documentStatus.totalSize)}
            </span>
          </div>
          {documentStatus.vectorCount > 0 && (
            <div className="text-xs text-white/60 mt-1">
              {documentStatus.vectorCount} searchable chunks available
            </div>
          )}
        </div>

        {/* Topics List */}
        <div className="space-y-3">
          {topics.length === 0 ? (
            <div className="text-center py-8 text-white/70">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="text-lg font-semibold mb-2">No Topics Yet</h3>
              <p className="text-sm">Add research topics using the form on the left to build your research structure.</p>
            </div>
          ) : (
            topics.map((topic, index) => (
              <div
                key={topic.id}
                className={`
                  bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 cursor-pointer transition-all duration-200
                  ${topic.selected ? 'bg-blue-500/30 border-blue-400/50' : 'hover:bg-white/15'}
                `}
                onClick={() => onSelectTopic(topic.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-white mb-1">
                      {index + 1}. {topic.title}
                    </div>
                    <div className="text-sm text-white/70">
                      {topic.description}
                    </div>
                    {topic.selected && (
                      <div className="text-xs text-blue-300 mt-2">
                        ✓ Selected for research
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-1 ml-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveTopic(topic.id, 'up');
                      }}
                      disabled={index === 0}
                      className="w-6 h-6 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm flex items-center justify-center transition-colors"
                      title="Move Up"
                    >
                      ↑
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveTopic(topic.id, 'down');
                      }}
                      disabled={index === topics.length - 1}
                      className="w-6 h-6 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm flex items-center justify-center transition-colors"
                      title="Move Down"
                    >
                      ↓
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTopic(topic.id);
                      }}
                      className="w-6 h-6 bg-red-500/30 hover:bg-red-500/50 rounded text-sm flex items-center justify-center transition-colors"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {topics.length > 0 && (
          <div className="mt-4 p-3 bg-blue-500/20 rounded-lg">
            <div className="text-sm text-blue-200">
              💡 <strong>Tip:</strong> Click topics to select them for research generation. Selected topics will be analyzed together.
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 