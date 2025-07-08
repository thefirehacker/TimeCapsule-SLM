"use client";

import { Topic } from "./DeepResearchApp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileText,
  HardDrive,
  CheckCircle2,
  Circle,
  ChevronUp,
  ChevronDown,
  Trash2,
  Database,
  BookOpen,
  Lightbulb,
  Target,
} from "lucide-react";

interface StructureBuilderProps {
  topics: Topic[];
  onSelectTopic: (topicId: string) => void;
  onDeleteTopic: (topicId: string) => void;
  onMoveTopic: (topicId: string, direction: "up" | "down") => void;
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
  documentStatus,
}: StructureBuilderProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const selectedCount = topics.filter((topic) => topic.selected).length;

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-r border-slate-200 dark:border-slate-700">
      <Card className="h-full border-0 shadow-lg rounded-none">
        <CardHeader className="pb-3 border-b border-slate-200 dark:border-slate-700">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-primary" />
            Research Structure
          </CardTitle>
          {selectedCount > 0 && (
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>
                {selectedCount} topic{selectedCount !== 1 ? "s" : ""} selected
              </span>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-0 h-[calc(100%-5rem)]">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              {/* Document Status */}
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-800/10 border-blue-200 dark:border-blue-800">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <HardDrive className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    Knowledge Base Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-blue-600 dark:text-blue-400 mb-1">
                        Documents
                      </span>
                      <Badge
                        variant="outline"
                        className="justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                      >
                        <Database className="h-3 w-3 mr-1" />
                        {documentStatus.count}
                      </Badge>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-blue-600 dark:text-blue-400 mb-1">
                        Total Size
                      </span>
                      <Badge
                        variant="outline"
                        className="justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                      >
                        <HardDrive className="h-3 w-3 mr-1" />
                        {formatFileSize(documentStatus.totalSize)}
                      </Badge>
                    </div>
                  </div>
                  {documentStatus.vectorCount > 0 && (
                    <div className="pt-2 border-t border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-blue-600 dark:text-blue-400">
                          Searchable Chunks:
                        </span>
                        <Badge
                          variant="outline"
                          className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                        >
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          {documentStatus.vectorCount}
                        </Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Topics Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      Research Topics
                    </h3>
                  </div>
                  {topics.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {topics.length} topic{topics.length !== 1 ? "s" : ""}
                    </Badge>
                  )}
                </div>

                {topics.length === 0 ? (
                  <Card className="p-8 text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/10 dark:to-purple-800/10 border-purple-200 dark:border-purple-800">
                    <div className="flex flex-col items-center">
                      <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-full mb-4">
                        <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                        No Topics Yet
                      </h3>
                      <p className="text-sm text-purple-700 dark:text-purple-300 max-w-xs">
                        Add research topics using the controls panel to build
                        your research structure
                      </p>
                    </div>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {topics.map((topic, index) => (
                      <Card
                        key={topic.id}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                          topic.selected
                            ? "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800 shadow-sm"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800 bg-white dark:bg-slate-900"
                        }`}
                        onClick={() => onSelectTopic(topic.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="flex-shrink-0">
                                  {topic.selected ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                                  )}
                                </div>
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                  <Badge
                                    variant="outline"
                                    className="text-xs px-2 py-1 flex-shrink-0"
                                  >
                                    #{index + 1}
                                  </Badge>
                                  <h4 className="font-medium text-slate-900 dark:text-slate-100 truncate">
                                    {topic.title}
                                  </h4>
                                </div>
                              </div>

                              {topic.description && (
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed ml-8">
                                  {topic.description}
                                </p>
                              )}

                              {topic.selected && (
                                <div className="mt-3 ml-8">
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                                  >
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Selected for research
                                  </Badge>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col gap-1 ml-3 flex-shrink-0">
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onMoveTopic(topic.id, "up");
                                }}
                                disabled={index === 0}
                                variant="outline"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <ChevronUp className="h-3 w-3" />
                              </Button>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onMoveTopic(topic.id, "down");
                                }}
                                disabled={index === topics.length - 1}
                                variant="outline"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <ChevronDown className="h-3 w-3" />
                              </Button>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteTopic(topic.id);
                                }}
                                variant="outline"
                                size="sm"
                                className="h-6 w-6 p-0 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {topics.length > 0 && (
                  <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/10 dark:to-amber-800/10 border-amber-200 dark:border-amber-800">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                          Research Tip
                        </p>
                        <p className="text-amber-800 dark:text-amber-200">
                          Click topics to select them for research generation.
                          Selected topics will be analyzed together to create
                          comprehensive insights.
                        </p>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
