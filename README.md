# TimeCapsule-SLM: Solving Open Learning with a Complete AI-Powered Platform for Research, Creativity, and Collaboration

## Overview

TimeCapsule-SLM is a comprehensive AI-powered platform that democratizes research and learning through innovative tools and collaborative features. Built with Next.js and modern web technologies, it provides researchers, educators, and learners with powerful capabilities for knowledge discovery and sharing.

## Key Features

### 🧠 DeepResearch TimeCapsule

- Advanced AI-powered research platform
- Generate novel insights and discover hidden patterns
- Collaborative knowledge discovery
- Export/import research sessions as TimeCapsules
- Integration with local knowledge base

### 🎥 AI-Frames

- Interactive AI-guided learning experiences
- Create structured learning paths with videos, documents, and AI assistance
- Timestamp-controlled video segments for focused learning
- AI-powered concept explanations and contextual help
- Sequential frame navigation with goal-oriented learning

### 📚 Knowledge Base Integration

- In-browser RAG (Retrieval-Augmented Generation)
- Upload and search your own documents
- Privacy-first approach - your data stays local
- Semantic search capabilities
- Integration with research and learning workflows

### 🤖 AI Assistant Integration

- Support for multiple AI providers (Ollama, LM Studio, OpenAI)
- Local LLM support for privacy
- Contextual AI assistance throughout the platform
- Smart concept recommendations

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Platform Structure

### Main Pages

- **Home**: Landing page with feature overview
- **DeepResearch**: AI-powered research platform
- **AI-Frames**: Interactive learning experience builder
- **Vision & Roadmap**: Project vision and development roadmap

### Core Technologies

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Radix UI**: Accessible component primitives
- **Vector Store**: In-browser document processing and search

## AI-Frames Usage

AI-Frames allows you to create structured learning experiences:

1. **Create Frames**: Each frame contains a specific learning goal
2. **Add Content**: Include videos (with timestamp control), documents, and context
3. **AI Assistance**: Get contextual help and concept explanations
4. **Sequential Learning**: Build connected learning paths
5. **Export/Import**: Share learning experiences via TimeCapsules

### Example Frame Structure

```
Frame Title: "GPT-2 Model Loading from Scratch"
Goal: Understanding model initialization
Information: Context and background
Video: YouTube video with specific timestamp
AI Concepts: Related topics for exploration
Takeaways: Key learning points
```

## TimeCapsule System

TimeCapsules are comprehensive exports that include:

- Research topics and results
- Knowledge base documents
- AI-Frames learning paths
- Session metadata and configuration

## Contributing

We welcome contributions! Please see our contributing guidelines and join our community.

## License

Apache 2.0 Licensed • Community driven • Optional paid add-ons

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
