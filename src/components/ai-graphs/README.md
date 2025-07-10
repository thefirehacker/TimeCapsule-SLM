# AI-Graphs Components

This directory contains the React Flow-based graph components for learning experiences.

## Components

### Core Components
- **LearningGraph**: Main graph component with drag-and-drop node creation
- **YouTubeNode**: Node for YouTube video content
- **PDFNode**: Node for PDF document content  
- **TextNode**: Node for text notes
- **AIFrameNode**: Node for AI Frame content (NEW)
- **ConceptNode**: Node for AI concepts (NEW)
- **ChapterNode**: Node for chapter organization (NEW)
- **Sidebar**: Draggable component palette
- **FrameGraphIntegration**: Integration component for AI-Frames (NEW)

### AI-Frames Integration

The new integration allows users to:
- **Graph-based Frame Creation**: Create AI frames by dropping nodes in graph view
- **Sequential Flow**: Enforce one-to-one connections between frames
- **Concept Visualization**: Show AI concepts as side nodes connected to frames
- **Chapter Organization**: Automatically organize frames into chapters
- **Dual Interface**: Toggle between traditional linear view and graph view
- **Bidirectional Sync**: Changes in graph reflect in frame list and vice versa

## Usage in AI-Frames

```tsx
import { FrameGraphIntegration } from "@/components/ai-graphs";

// In your AI-Frames component
<FrameGraphIntegration
  frames={frames}
  onFramesChange={setFrames}
  isCreationMode={isCreationMode}
  currentFrameIndex={currentFrameIndex}
  onFrameIndexChange={setCurrentFrameIndex}
  onCreateFrame={() => setShowCreateFrame(true)}
/>
```

## Features

### Sequential Graph System
- Only one connection allowed per node (linear sequence)
- Automatic concept node generation from frame AI concepts
- Chapter auto-organization based on concept similarity

### Creator Mode
- Drag nodes to create frames
- Edit node content inline
- Organize frames into chapters
- Visual structure overview

### Learning Mode
- Follow sequential path through frames
- Visual progress tracking
- Concept relationship exploration
- Chapter-based navigation

## Node Types

### AI Frame Node
- Represents a complete AI frame with video, goal, and concepts
- Editable title, goal, video URL, start time, duration
- Shows associated AI concepts as badges
- Connects to concept nodes automatically

### Concept Node
- Represents an AI concept from a frame
- Shows concept name and description
- Connected to parent frame with yellow connector
- Positioned as side nodes for clarity

### Chapter Node
- Groups related frames together
- Shows frame count and chapter description
- Auto-generated based on concept similarity
- Green color scheme for easy identification

## Sequential Flow Rules

1. **One Output Per Node**: Each frame can only connect to one next frame
2. **Linear Progression**: No branching or complex paths allowed
3. **Concept Side-Chains**: Concepts branch off but don't continue the main flow
4. **Chapter Grouping**: Visual grouping without breaking linear flow

## Integration Points

- **Frame Creation**: Graph nodes sync with frame creation tools
- **Chapter Management**: Automatic chapter organization with manual override
- **Concept Mapping**: AI concepts become visual nodes
- **Progress Tracking**: Current frame highlighted in both views
- **Export/Import**: Graph structure saved with TimeCapsule data

## Styling

- **AI Frames**: Purple theme (#8b5cf6)
- **Concepts**: Yellow theme (#f59e0b)  
- **Chapters**: Green theme (#10b981)
- **Connections**: Blue connectors (#3b82f6) for sequential flow
- **Concept Links**: Yellow connectors (#fbbf24) for concept relationships
