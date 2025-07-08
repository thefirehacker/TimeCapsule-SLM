"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  MessageCircle,
  BookOpen,
  Target,
  Video,
  Clock,
  Brain,
  Lightbulb,
  ArrowRight,
  Download,
  Upload,
  Plus,
  Edit3,
  Wand2,
  Database,
  Search,
  Link as LinkIcon,
  Save,
  Trash2,
  Eye,
  Settings,
  GripVertical,
} from "lucide-react";

// Import DeepResearch components and types
import { DeepResearchApp } from "../../components/DeepResearch/DeepResearchApp";
import { VectorStore } from "../../components/VectorStore/VectorStore";

interface AIFrame {
  id: string;
  title: string;
  goal: string;
  informationText: string;
  videoUrl: string;
  startTime: number;
  duration: number;
  afterVideoText: string;
  aiConcepts: string[];
  isGenerated?: boolean;
  sourceGoal?: string;
  sourceUrl?: string;
}

interface FrameCreationData {
  goal: string;
  videoUrl: string;
  startTime?: number;
  duration?: number;
}

const hardcodedFrames: AIFrame[] = [
  {
    id: "frame-01",
    title: "GPT-2 Model Loading from Scratch",
    goal: "Understanding how to load and initialize GPT-2 model from scratch using Tyler's implementation",
    informationText: `
      In this frame, we'll explore Tyler Romero's approach to loading GPT-2 model from scratch. 
      This is a foundational concept for understanding how large language models are initialized 
      and prepared for training or inference. 
      
      Tyler's blog post demonstrates the practical implementation details that are often overlooked 
      in theoretical explanations.
    `,
    videoUrl: "https://youtu.be/l8pRSuU81PU?si=fTMMzZfitHcNcv2J&t=1242",
    startTime: 1242, // 20:42
    duration: 300, // 5 minutes
    afterVideoText: `
      Key takeaways from this segment:
      • Model initialization requires careful parameter setup
      • Configuration files define model architecture
      • Proper tokenizer integration is crucial for text processing
      • Understanding the relationship between model size and memory requirements
      
      The implementation shown here forms the foundation for more advanced training techniques 
      we'll explore in subsequent frames.
    `,
    aiConcepts: [
      "Model Architecture",
      "Parameter Initialization",
      "Tokenizer Integration",
      "Memory Management",
      "Configuration Files",
      "GPT-2 Variants"
    ]
  },
  {
    id: "frame-02",
    title: "Understanding train_gpt2.py Script",
    goal: "Explanation of what train_gpt2.py script is and why it's needed",
    informationText: `
      Tyler's training script is the orchestrator that brings together all components needed 
      for GPT-2 training. This script handles data loading, model training loops, 
      optimization, and checkpointing.
      
      Understanding this script is crucial for anyone wanting to train language models 
      from scratch or fine-tune existing models.
    `,
    videoUrl: "https://youtu.be/l8pRSuU81PU?si=fTMMzZfitHcNcv2J&t=1542",
    startTime: 1542, // 25:42
    duration: 360, // 6 minutes
    afterVideoText: `
      The train_gpt2.py script serves several critical functions:
      • Data preprocessing and batch management
      • Training loop implementation with proper gradient handling
      • Loss calculation and optimization steps
      • Model checkpointing and state management
      • Evaluation metrics and logging
      
      This script demonstrates production-ready training practices that can be adapted 
      for various language modeling tasks.
    `,
    aiConcepts: [
      "Training Loops",
      "Gradient Optimization",
      "Data Preprocessing",
      "Checkpointing",
      "Loss Functions",
      "Evaluation Metrics"
    ]
  }
];

export default function AIFramesPage() {
  // Mode state
  const [isCreationMode, setIsCreationMode] = useState(false);
  
  // Frame state
  const [frames, setFrames] = useState<AIFrame[]>(hardcodedFrames);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  
  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showAIConcepts, setShowAIConcepts] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'ai', content: string}>>([]);
  const [chatInput, setChatInput] = useState("");
  
  // Creation mode state
  const [showCreateFrame, setShowCreateFrame] = useState(false);
  const [newFrameData, setNewFrameData] = useState<FrameCreationData>({
    goal: "",
    videoUrl: "",
    startTime: 0,
    duration: 300
  });
  const [isGeneratingFrame, setIsGeneratingFrame] = useState(false);
  const [showFrameEditor, setShowFrameEditor] = useState(false);
  const [editingFrame, setEditingFrame] = useState<AIFrame | null>(null);
  
  // Drag and drop state
  const [draggedFrameId, setDraggedFrameId] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  
  // DeepResearch integration
  const [deepResearchApp, setDeepResearchApp] = useState<DeepResearchApp | null>(null);
  const [vectorStore, setVectorStore] = useState<VectorStore | null>(null);
  const [timeCapsuleData, setTimeCapsuleData] = useState<any>(null);
  
  const videoRef = useRef<HTMLIFrameElement>(null);

  // Initialize DeepResearch integration
  useEffect(() => {
    // Check if there's a global DeepResearch instance
    if (typeof window !== "undefined" && (window as any).deepResearchApp) {
      setDeepResearchApp((window as any).deepResearchApp);
      setVectorStore((window as any).sharedVectorStore);
      
      // Load TimeCapsule data from localStorage
      try {
        const savedData = localStorage.getItem("deepresearch_data");
        if (savedData) {
          setTimeCapsuleData(JSON.parse(savedData));
        }
      } catch (error) {
        console.error("Failed to load TimeCapsule data:", error);
      }
    }
  }, []);

  const currentFrame = frames[currentFrameIndex];

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConceptClick = async (concept: string) => {
    setSelectedConcept(concept);
    
    // Enhanced AI response using DeepResearch and Knowledge Base
    let aiResponse = `Let me explain ${concept} in the context of your current learning path:

Based on your TimeCapsule data and knowledge base, here's what you need to know about ${concept}:`;

    // Search knowledge base for related content
    if (vectorStore) {
      try {
        const searchResults = await vectorStore.searchSimilar(concept, 0.3, 5);
        if (searchResults.length > 0) {
          aiResponse += `\n\n**From your Knowledge Base:**\n`;
          searchResults.forEach((result, index) => {
            aiResponse += `• ${result.document.title}: ${result.chunk.content.substring(0, 200)}...\n`;
          });
        }
      } catch (error) {
        console.error("Knowledge base search failed:", error);
      }
    }

    // Check TimeCapsule research for related topics
    if (timeCapsuleData?.research?.topics) {
      const relatedTopics = timeCapsuleData.research.topics.filter((topic: any) => 
        topic.title.toLowerCase().includes(concept.toLowerCase()) ||
        topic.description.toLowerCase().includes(concept.toLowerCase())
      );
      
      if (relatedTopics.length > 0) {
        aiResponse += `\n\n**Related Research Topics:**\n`;
        relatedTopics.forEach((topic: any) => {
          aiResponse += `• ${topic.title}: ${topic.description}\n`;
        });
      }
    }

    aiResponse += `\n\nThis concept connects to your current frame "${currentFrame.title}" and will help you achieve your goal: "${currentFrame.goal}"

Would you like me to create a new frame focused specifically on ${concept}?`;

    setChatMessages(prev => [
      ...prev,
      { role: 'user', content: `Tell me about ${concept}` },
      { role: 'ai', content: aiResponse }
    ]);
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;
    
    let aiResponse = `Great question! Based on your current frame "${currentFrame.title}" and your learning journey, let me help you understand this concept better.`;

    // Enhanced AI response with knowledge base integration
    if (vectorStore) {
      try {
        const searchResults = await vectorStore.searchSimilar(chatInput, 0.3, 3);
        if (searchResults.length > 0) {
          aiResponse += `\n\n**Relevant information from your knowledge base:**\n`;
          searchResults.forEach((result, index) => {
            aiResponse += `${index + 1}. From "${result.document.title}": ${result.chunk.content.substring(0, 300)}...\n\n`;
          });
        }
      } catch (error) {
        console.error("Knowledge base search failed:", error);
      }
    }

    aiResponse += `\nThis relates to your current learning goal and connects to the concepts in this frame. Would you like me to suggest related frames or create new ones based on this topic?`;
    
    setChatMessages(prev => [
      ...prev,
      { role: 'user', content: chatInput },
      { role: 'ai', content: aiResponse }
    ]);
    setChatInput("");
  };

  const generateFrameContent = async (frameData: FrameCreationData): Promise<AIFrame> => {
    setIsGeneratingFrame(true);
    
    try {
      // Simulate AI generation process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Analyze existing frames for concept relationships
      const existingConcepts = frames.flatMap(frame => frame.aiConcepts);
      const relatedConcepts: string[] = [];
      
      // Simple concept matching (in real implementation, this would use AI)
      const goalWords = frameData.goal.toLowerCase().split(' ');
      existingConcepts.forEach(concept => {
        if (goalWords.some(word => concept.toLowerCase().includes(word))) {
          relatedConcepts.push(concept);
        }
      });
      
      // Generate new concepts based on goal
      const newConcepts = [
        "Implementation Details",
        "Best Practices",
        "Common Pitfalls",
        "Performance Optimization",
        "Real-world Applications",
        "Advanced Techniques"
      ];
      
      const allConcepts = [...new Set([...relatedConcepts, ...newConcepts])].slice(0, 6);
      
      // Extract video info
      const videoId = extractVideoId(frameData.videoUrl);
      const startTime = frameData.startTime || 0;
      const duration = frameData.duration || 300;
      
      const newFrame: AIFrame = {
        id: `frame-${Date.now()}`,
        title: `Learning: ${frameData.goal.substring(0, 50)}${frameData.goal.length > 50 ? '...' : ''}`,
        goal: frameData.goal,
        informationText: `
          This frame focuses on: ${frameData.goal}
          
          Based on your TimeCapsule research and knowledge base, this topic connects to several key concepts 
          you've been exploring. The content has been curated to build upon your existing understanding 
          and guide you toward your learning objectives.
          
          Pay attention to how this relates to the concepts you've already covered in previous frames.
        `,
        videoUrl: frameData.videoUrl,
        startTime: startTime,
        duration: duration,
        afterVideoText: `
          Key insights from this content:
          • This topic builds upon concepts from your previous frames
          • Understanding this will help you progress toward your learning goals
          • The implementation details shown here are practical and applicable
          • Consider how this connects to your research findings
          
          Based on your knowledge base and research, here are the next steps in your learning journey.
        `,
        aiConcepts: allConcepts,
        isGenerated: true,
        sourceGoal: frameData.goal,
        sourceUrl: frameData.videoUrl
      };
      
      return newFrame;
    } finally {
      setIsGeneratingFrame(false);
    }
  };

  const handleCreateFrame = async () => {
    if (!newFrameData.goal.trim() || !newFrameData.videoUrl.trim()) {
      return;
    }
    
    try {
      const newFrame = await generateFrameContent(newFrameData);
      setFrames(prev => [...prev, newFrame]);
      setCurrentFrameIndex(frames.length); // Switch to new frame
      setShowCreateFrame(false);
      setNewFrameData({ goal: "", videoUrl: "", startTime: 0, duration: 300 });
      
      // Add success message to chat
      setChatMessages(prev => [
        ...prev,
        { 
          role: 'ai', 
          content: `✅ Successfully created new frame: "${newFrame.title}"\n\nThis frame was generated based on your goal and existing knowledge base. The AI has identified ${newFrame.aiConcepts.length} related concepts that connect to your learning journey.` 
        }
      ]);
    } catch (error) {
      console.error("Failed to create frame:", error);
    }
  };

  const handleEditFrame = (frame: AIFrame) => {
    setEditingFrame(frame);
    setShowFrameEditor(true);
  };

  const handleDeleteFrame = (frameId: string) => {
    if (confirm("Are you sure you want to delete this frame?")) {
      setFrames(prev => prev.filter(f => f.id !== frameId));
      if (currentFrameIndex >= frames.length - 1) {
        setCurrentFrameIndex(Math.max(0, frames.length - 2));
      }
    }
  };

  const handleDragStart = (e: React.DragEvent, frameId: string, index: number) => {
    setDraggedFrameId(frameId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', frameId);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear drag over if we're leaving the entire drop zone
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (!draggedFrameId) return;
    
    const draggedIndex = frames.findIndex(frame => frame.id === draggedFrameId);
    if (draggedIndex === -1 || draggedIndex === dropIndex) {
      setDraggedFrameId(null);
      setDragOverIndex(null);
      return;
    }

    // Create new array with reordered frames
    const newFrames = [...frames];
    const [draggedFrame] = newFrames.splice(draggedIndex, 1);
    newFrames.splice(dropIndex, 0, draggedFrame);

    setFrames(newFrames);
    
    // Update current frame index if needed
    if (currentFrameIndex === draggedIndex) {
      setCurrentFrameIndex(dropIndex);
    } else if (draggedIndex < currentFrameIndex && dropIndex >= currentFrameIndex) {
      setCurrentFrameIndex(currentFrameIndex - 1);
    } else if (draggedIndex > currentFrameIndex && dropIndex <= currentFrameIndex) {
      setCurrentFrameIndex(currentFrameIndex + 1);
    }

    // Add success message to chat
    setChatMessages(prev => [
      ...prev,
      { 
        role: 'ai', 
        content: `✅ Frame reordered successfully! Frame "${draggedFrame.title}" moved to position ${dropIndex + 1}.` 
      }
    ]);

    setDraggedFrameId(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedFrameId(null);
    setDragOverIndex(null);
  };

  const videoId = extractVideoId(currentFrame.videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${currentFrame.startTime}&end=${currentFrame.startTime + currentFrame.duration}&autoplay=0&controls=1&modestbranding=1&rel=0`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                <Video className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  AI-Frames
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                  Interactive AI-guided learning experiences
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Mode Toggle */}
              <div className="flex items-center gap-3">
                <Label htmlFor="mode-toggle" className="text-sm font-medium">
                  {isCreationMode ? "Creation" : "Learning"}
                </Label>
                <Switch
                  id="mode-toggle"
                  checked={isCreationMode}
                  onCheckedChange={setIsCreationMode}
                />
                <Badge variant={isCreationMode ? "default" : "secondary"}>
                  {isCreationMode ? <Edit3 className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                  {isCreationMode ? "Create" : "Learn"}
                </Badge>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Load TimeCapsule
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export TimeCapsule
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Creation Mode Panel */}
            {isCreationMode && (
              <Card className="border-2 border-dashed border-blue-300 dark:border-blue-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5 text-blue-600" />
                    AI Frame Creation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-8">
                    <Button
                      onClick={() => setShowCreateFrame(true)}
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Create New AI Frame
                    </Button>
                  </div>
                  {timeCapsuleData && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Connected to TimeCapsule</span>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {timeCapsuleData.research?.topics?.length || 0} research topics • 
                        {vectorStore ? " Knowledge base connected" : " No knowledge base"}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Frame Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">
                      Frame {currentFrameIndex + 1} of {frames.length}
                    </Badge>
                    <Badge variant="secondary">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(currentFrame.duration)}
                    </Badge>
                    {currentFrame.isGenerated && (
                      <Badge variant="default" className="bg-purple-500">
                        <Wand2 className="h-3 w-3 mr-1" />
                        AI Generated
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {isCreationMode && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditFrame(currentFrame)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteFrame(currentFrame.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentFrameIndex(Math.max(0, currentFrameIndex - 1))}
                      disabled={currentFrameIndex === 0}
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentFrameIndex(Math.min(frames.length - 1, currentFrameIndex + 1))}
                      disabled={currentFrameIndex === frames.length - 1}
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-2xl">{currentFrame.title}</CardTitle>
              </CardHeader>
            </Card>

            {/* Goal Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Learning Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentFrame.goal}
                </p>
              </CardContent>
            </Card>

            {/* Information Text */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  Context & Background
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {currentFrame.informationText.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Video Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-purple-600" />
                  Video Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                  <iframe
                    ref={videoRef}
                    src={embedUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Playing from {formatTime(currentFrame.startTime)} for {formatTime(currentFrame.duration)}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAIConcepts(!showAIConcepts)}
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    AI Concepts
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Concepts (triggered by video pause or user action) */}
            {showAIConcepts && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    Related Concepts
                    {timeCapsuleData && (
                      <Badge variant="outline" className="ml-2">
                        <Database className="h-3 w-3 mr-1" />
                        KB Connected
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {currentFrame.aiConcepts.map((concept, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleConceptClick(concept)}
                        className="h-auto p-3 text-left justify-start"
                      >
                        <Brain className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{concept}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* After Video Text */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-indigo-600" />
                  Key Takeaways
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {currentFrame.afterVideoText.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Frame Navigation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Frame Navigation
                  {isCreationMode && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCreateFrame(true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {frames.map((frame, index) => (
                    <div
                      key={frame.id}
                      className={`relative transition-all duration-200 ${
                        dragOverIndex === index ? 'transform scale-105 bg-blue-50 dark:bg-blue-900/20 rounded-lg' : ''
                      } ${
                        draggedFrameId === frame.id ? 'opacity-50' : ''
                      }`}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragEnd={handleDragEnd}
                    >
                      <div
                        className={`flex items-center gap-2 ${isCreationMode ? 'cursor-move' : ''}`}
                        draggable={isCreationMode}
                        onDragStart={(e) => handleDragStart(e, frame.id, index)}
                      >
                        {isCreationMode && (
                          <div className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <GripVertical className="h-4 w-4" />
                          </div>
                        )}
                        <Button
                          variant={index === currentFrameIndex ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentFrameIndex(index)}
                          className="flex-1 justify-start text-left h-auto p-3"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">Frame {index + 1}</span>
                              {frame.isGenerated && (
                                <Badge variant="secondary" className="text-xs">
                                  <Wand2 className="h-2 w-2 mr-1" />
                                  AI
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs opacity-75 truncate">
                              {frame.title}
                            </div>
                          </div>
                        </Button>
                      </div>
                      {isCreationMode && (
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditFrame(frame);
                            }}
                            className="h-6 w-6 p-0"
                          >
                            <Edit3 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Assistant */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  AI Assistant
                  {vectorStore && (
                    <Badge variant="outline">
                      <Database className="h-3 w-3 mr-1" />
                      KB
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64 mb-4">
                  <div className="space-y-3">
                    {chatMessages.length === 0 ? (
                      <div className="text-center text-slate-500 dark:text-slate-400 py-8">
                        <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">
                          Ask questions about the content or click on AI concepts to learn more
                        </p>
                        {timeCapsuleData && (
                          <p className="text-xs mt-2 text-blue-600 dark:text-blue-400">
                            Connected to your TimeCapsule knowledge
                          </p>
                        )}
                      </div>
                    ) : (
                      chatMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-blue-100 dark:bg-blue-900/30 ml-4'
                              : 'bg-slate-100 dark:bg-slate-800 mr-4'
                          }`}
                        >
                          <div className="text-sm font-medium mb-1">
                            {message.role === 'user' ? 'You' : 'AI Assistant'}
                          </div>
                          <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                    placeholder="Ask about the content..."
                    className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-sm"
                  />
                  <Button size="sm" onClick={handleChatSubmit}>
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Create Frame Modal */}
      <Dialog open={showCreateFrame} onOpenChange={setShowCreateFrame}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-purple-600" />
              Create AI Frame
            </DialogTitle>
            <DialogDescription>
              AI will analyze your goal and TimeCapsule data to create a comprehensive learning frame.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="frame-goal">Learning Goal</Label>
              <Textarea
                id="frame-goal"
                value={newFrameData.goal}
                onChange={(e) => setNewFrameData(prev => ({ ...prev, goal: e.target.value }))}
                placeholder="What do you want to learn? (e.g., 'Understanding how neural networks backpropagate gradients')"
                className="min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="video-url">Video URL</Label>
              <Input
                id="video-url"
                value={newFrameData.videoUrl}
                onChange={(e) => setNewFrameData(prev => ({ ...prev, videoUrl: e.target.value }))}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time (seconds)</Label>
                <Input
                  id="start-time"
                  type="number"
                  value={newFrameData.startTime}
                  onChange={(e) => setNewFrameData(prev => ({ ...prev, startTime: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (seconds)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newFrameData.duration}
                  onChange={(e) => setNewFrameData(prev => ({ ...prev, duration: parseInt(e.target.value) || 300 }))}
                  placeholder="300"
                />
              </div>
            </div>
            {timeCapsuleData && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-sm font-medium mb-1">AI will use your TimeCapsule data:</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  • {timeCapsuleData.research?.topics?.length || 0} research topics
                  • {vectorStore ? "Knowledge base documents" : "No knowledge base"}
                  • Existing frame concepts for relationship mapping
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateFrame(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateFrame}
                disabled={isGeneratingFrame || !newFrameData.goal.trim() || !newFrameData.videoUrl.trim()}
              >
                {isGeneratingFrame ? (
                  <>
                    <Wand2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Create Frame
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 