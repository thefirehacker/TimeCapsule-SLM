# Unified TimeCapsule System - Cross-Platform Learning & Research

## Overview

The Unified TimeCapsule System enables seamless data sharing and session persistence between **AI-Frames** and **DeepResearch** pages. Export your learning sessions, research data, and knowledge base from any page and import it into any other page.

## 🎯 Key Features

### 🔄 **Bidirectional Compatibility**
- Export from AI-Frames → Import to DeepResearch
- Export from DeepResearch → Import to AI-Frames  
- Combined exports include both AI-Frames and DeepResearch data
- Automatic format detection and conversion

### 📦 **Comprehensive Data Export**
- **AI-Frames Data**: Frames, progress, voice settings, graph state, chapters
- **DeepResearch Data**: Topics, research results, vector store documents
- **Settings & State**: User preferences, chat history, current positions
- **Metadata**: Timestamps, versions, platform information

### 🔒 **Privacy-First Design**
- All data stays local (localStorage + file downloads)
- No cloud storage or external servers
- Complete offline functionality
- User controls all data sharing

## 🚀 How to Use

### From AI-Frames Page

#### Export TimeCapsule
1. Navigate to **AI-Frames** page
2. Click **"Export TimeCapsule"** button in the header
3. Downloads a `.json` file containing:
   - All AI frames and learning progress
   - Voice settings and graph state
   - Any connected DeepResearch data
   - Session metadata

#### Import TimeCapsule
1. Click **"Load TimeCapsule"** button in AI-Frames header
2. Select a TimeCapsule `.json` file
3. Supports importing:
   - AI-Frames exports (native format)
   - DeepResearch exports (auto-converts topics to frames)
   - Combined exports (full restoration)

### From DeepResearch Page

#### Export TimeCapsule
1. Navigate to **DeepResearch** page
2. Click **"Save"** button in TimeCapsule section
3. Downloads a `.json` file containing:
   - Research topics and results
   - Vector store documents and embeddings
   - Any connected AI-Frames data
   - Complete knowledge base

#### Import TimeCapsule
1. Click **"Load"** button in TimeCapsule section
2. Select a TimeCapsule `.json` file
3. Supports importing:
   - DeepResearch exports (native format)
   - AI-Frames exports (auto-converts frames to topics)
   - Combined exports (full restoration)

## 🔧 Technical Implementation

### Data Structure

```typescript
// AI-Frames TimeCapsule Format
{
  version: "1.0",
  timestamp: string,
  type: "ai-frames-timecapsule",
  data: {
    frames: AIFrame[],
    currentFrameIndex: number,
    graphState: GraphState,
    chapters: Chapter[],
    voiceSettings: VoiceSettings,
    chatMessages: ChatMessage[],
    deepResearchData: DeepResearchData // optional
  }
}

// DeepResearch TimeCapsule Format
{
  metadata: {
    version: "4.0.0",
    exportedAt: string,
    platform: "Next.js"
  },
  research: {
    topics: Topic[],
    researchResults: ResearchResults,
    currentTab: string
  },
  vectorStore: {
    documents: Document[],
    stats: VectorStats
  },
  aiFramesData: AIFramesData // optional
}
```

### Cross-Platform Conversion

#### AI-Frames → DeepResearch
```typescript
// Converts AI frames to research topics
frames.map(frame => ({
  id: frame.id,
  title: frame.goal,
  description: frame.transcript,
  concepts: frame.aiConcepts,
  selected: true
}))
```

#### DeepResearch → AI-Frames
```typescript
// Converts research topics to AI frames
topics.map(topic => ({
  id: topic.id,
  goal: topic.title,
  description: topic.description,
  aiConcepts: topic.concepts || [],
  transcript: topic.description
}))
```

### Storage Strategy

1. **Local Storage Keys**:
   - `ai_frames_timecapsule` - AI-Frames specific data
   - `deepresearch_data` - DeepResearch specific data
   - `timecapsule_combined` - Unified format for cross-page access

2. **Auto-Restoration**:
   - Each page checks for relevant TimeCapsule data on load
   - Automatically restores previous session if available
   - Shows restoration confirmation in chat/status

3. **File Downloads**:
   - JSON format for easy sharing and backup
   - Timestamped filenames for organization
   - Human-readable structure for debugging

## 🎯 Use Cases

### 🎓 **Educational Workflow**
1. **Research Phase**: Use DeepResearch to gather information on a topic
2. **Content Creation**: Export to AI-Frames to create structured learning content
3. **Learning Session**: Progress through frames with AI assistance
4. **Knowledge Sharing**: Export combined TimeCapsule for students/colleagues

### 🔬 **Research Collaboration**
1. **Individual Research**: Each team member researches different aspects
2. **Data Consolidation**: Import multiple TimeCapsules into DeepResearch
3. **Report Generation**: Use combined knowledge base for comprehensive research
4. **Results Sharing**: Export final TimeCapsule with all data and findings

### 💼 **Training Development**
1. **Content Research**: Gather materials and sources in DeepResearch
2. **Curriculum Design**: Convert research to structured learning frames
3. **Interactive Training**: Use graph view to visualize learning paths
4. **Course Distribution**: Share TimeCapsules with trainers/learners

## 🔧 Advanced Features

### Graph State Persistence
- Saves node positions and connections
- Restores chapter organization
- Maintains visual layout across sessions

### Voice Settings Sync
- Preserves selected voice and settings
- Maintains speech rate, pitch, and volume
- Continues narration preferences

### Progress Tracking
- Saves current frame/topic position
- Tracks completion status
- Maintains learning momentum

### Chat History
- Preserves AI conversation context
- Maintains learning dialogue
- Enables continued assistance

## 🛠️ Troubleshooting

### Import Issues
- **Invalid Format**: Ensure file is a valid TimeCapsule export
- **Version Compatibility**: Newer exports work with older systems
- **Large Files**: Check browser memory for very large knowledge bases

### Export Problems
- **Storage Full**: Clear browser storage if export fails
- **Download Blocked**: Check browser popup/download settings
- **Data Missing**: Ensure all data is saved before export

### Cross-Page Issues
- **Data Not Syncing**: Check localStorage permissions
- **Old Sessions**: Clear browser data to reset state
- **Mixed Formats**: Use "Load TimeCapsule" to import specific formats

## 🔮 Future Enhancements

### Planned Features
- **Collaborative Real-time Sync**: Share sessions between users
- **Version Control**: Track changes and merge conflicts
- **Cloud Storage Options**: Optional backup to user's cloud
- **Enhanced Analytics**: Learning progress and research insights
- **Mobile Optimization**: Full TimeCapsule support on mobile devices

### Integration Roadmap
- **GitHub Integration**: Direct repository imports/exports
- **LMS Compatibility**: Export to common learning management systems
- **API Access**: Programmatic TimeCapsule operations
- **Batch Operations**: Process multiple TimeCapsules simultaneously

---

**💡 Pro Tip**: Use descriptive research topics in DeepResearch - they become frame goals when imported to AI-Frames, making your learning content more organized and effective! 