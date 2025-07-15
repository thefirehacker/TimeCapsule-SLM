import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Hash,
  Video, 
  File, 
  FileText, 
  Brain, 
  Layers,
  Link,
  ArrowDown,
  Plus
} from "lucide-react";
import { EnhancedDragItem } from "./types";

const enhancedDragItems: Array<{
  nodeType: EnhancedDragItem["nodeType"];
  label: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  category: "frames" | "attachments" | "concepts";
}> = [
  // Frame Containers
  {
    nodeType: "aiframe",
    label: "AI Frame",
    icon: <Hash className="h-4 w-4" />,
    color: "bg-purple-500",
    description: "Container for learning content",
    category: "frames"
  },
  
  // Content Attachments  
  {
    nodeType: "video-attachment",
    label: "Video Content",
    icon: <Video className="h-4 w-4" />,
    color: "bg-red-500", 
    description: "YouTube video segment",
    category: "attachments"
  },
  {
    nodeType: "pdf-attachment",
    label: "PDF Document",
    icon: <File className="h-4 w-4" />,
    color: "bg-blue-500",
    description: "PDF document or pages",
    category: "attachments"
  },
  {
    nodeType: "text-attachment", 
    label: "Text Note",
    icon: <FileText className="h-4 w-4" />,
    color: "bg-green-500",
    description: "Text content or notes",
    category: "attachments"
  },
  
  // Organization
  {
    nodeType: "concept",
    label: "Concept",
    icon: <Brain className="h-4 w-4" />,
    color: "bg-yellow-500",
    description: "AI concept visualization",
    category: "concepts"
  },
  {
    nodeType: "chapter",
    label: "Chapter",
    icon: <Layers className="h-4 w-4" />,
    color: "bg-indigo-500",
    description: "Group related frames",
    category: "concepts"
  }
];

const onDragStart = (event: React.DragEvent, nodeType: string) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};

export default function EnhancedSidebar() {
  const frameItems = enhancedDragItems.filter(item => item.category === "frames");
  const attachmentItems = enhancedDragItems.filter(item => item.category === "attachments");
  const conceptItems = enhancedDragItems.filter(item => item.category === "concepts");

  return (
    <div className="w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-4 space-y-6 overflow-y-auto">
      {/* Enhanced Header */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Frame Builder
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Drag components to create your learning sequence
        </p>
      </div>

      {/* Frame-Attachment System Guide */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-blue-800 dark:text-blue-200">
            📋 How it Works
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-blue-700 dark:text-blue-300 space-y-2">
          <div className="flex items-center gap-2">
            <Hash className="h-3 w-3" />
            <span>Create AI Frame containers</span>
          </div>
          <div className="flex items-center gap-2">
            <Link className="h-3 w-3" />
            <span>Attach ONE content per frame</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowDown className="h-3 w-3" />
            <span>Connect frames sequentially</span>
          </div>
        </CardContent>
      </Card>

      {/* Frame Containers */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
          <Hash className="h-4 w-4" />
          Frame Containers
        </h4>
        <div className="space-y-2">
          {frameItems.map((item) => (
            <div
              key={item.nodeType}
              className="p-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg cursor-move hover:border-purple-400 dark:hover:border-purple-500 transition-colors"
              draggable
              onDragStart={(event) => onDragStart(event, item.nodeType)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded ${item.color} text-white`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-slate-900 dark:text-white">
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {item.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Content Attachments */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
          <Link className="h-4 w-4" />
          Content Attachments
          <Badge variant="outline" className="text-xs">1 per frame</Badge>
        </h4>
        <div className="space-y-2">
          {attachmentItems.map((item) => (
            <div
              key={item.nodeType}
              className="p-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg cursor-move hover:border-orange-400 dark:hover:border-orange-500 transition-colors"
              draggable
              onDragStart={(event) => onDragStart(event, item.nodeType)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded ${item.color} text-white`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-slate-900 dark:text-white">
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {item.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Attachment Instructions */}
        <div className="mt-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded text-xs text-orange-700 dark:text-orange-300">
          💡 Drag content to the <strong>orange attachment slot</strong> on the right side of AI Frame nodes
        </div>
      </div>

      <Separator />

      {/* Organization */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
          <Brain className="h-4 w-4" />
          Organization
        </h4>
        <div className="space-y-2">
          {conceptItems.map((item) => (
            <div
              key={item.nodeType}
              className="p-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg cursor-move hover:border-yellow-400 dark:hover:border-yellow-500 transition-colors"
              draggable
              onDragStart={(event) => onDragStart(event, item.nodeType)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded ${item.color} text-white`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-slate-900 dark:text-white">
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {item.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Tips */}
      <Card className="bg-gray-50 dark:bg-gray-900/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">✨ Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <p>• Start with an AI Frame container</p>
          <p>• Add ONE attachment (video, PDF, or text)</p>
          <p>• Connect frames bottom-to-top for sequence</p>
          <p>• Use concepts for side explanations</p>
          <p>• Group related frames into chapters</p>
        </CardContent>
      </Card>
    </div>
  );
} 