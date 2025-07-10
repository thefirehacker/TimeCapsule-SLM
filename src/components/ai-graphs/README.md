# AI Learning Graph

A React Flow-based interactive learning graph that allows users to create visual connections between different learning resources.

## Features

- **Drag and Drop Interface**: Drag nodes from the sidebar to the canvas
- **Three Node Types**:
  - **YouTube Video**: Store video URL, timestamp, and notes
  - **PDF Document**: Store PDF URL, page ranges, and notes
  - **Text Note**: Store plain text content
- **Interactive Connections**: Connect nodes to show relationships
- **Visual Canvas**: Clean, modern interface with background patterns
- **Zoom and Pan**: Full canvas navigation with minimap
- **Real-time Editing**: Edit node content directly on the canvas

## Usage

1. **Adding Nodes**: Drag any node type from the left sidebar to the canvas
2. **Editing Content**: Click on any input field within a node to edit its content
3. **Connecting Nodes**: Drag from one node's connection point to another to create relationships
4. **Navigation**: Use mouse wheel to zoom, drag to pan, or use the controls panel

## Node Types

### YouTube Node (Red)

- **Video URL**: Full YouTube video URL
- **Timestamp**: Specific time reference (e.g., "1:23:45")
- **Notes**: Additional context or comments

### PDF Node (Blue)

- **PDF URL**: Link to the PDF document
- **Pages**: Specific page references (e.g., "1-10" or "5,8,12")
- **Notes**: Additional context or comments

### Text Node (Green)

- **Content**: Free-form text content for notes, ideas, or summaries

## Technical Details

Built with:

- **@xyflow/react**: For the flow diagram functionality
- **React**: Component-based architecture
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Styling and responsive design
- **Shadcn/ui**: UI component library

## File Structure

```
src/components/ai-graphs/
├── LearningGraph.tsx    # Main component with React Flow
├── Sidebar.tsx          # Draggable node sidebar
├── YouTubeNode.tsx      # YouTube video node component
├── PDFNode.tsx          # PDF document node component
├── TextNode.tsx         # Text note node component
├── types.ts             # TypeScript type definitions
├── index.ts             # Component exports
└── README.md            # This documentation
```

## Future Enhancements

- Save/load graph configurations
- Export graphs as images or PDFs
- Advanced node types (websites, books, courses)
- Collaborative editing
- AI-powered content suggestions
- Integration with external learning platforms
