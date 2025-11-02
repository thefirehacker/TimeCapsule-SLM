import React, { useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConceptNodeData } from "./types";
import { Brain, Lightbulb, Edit3 } from "lucide-react";
import { ConceptEditDialog } from "./concept-edit-dialog";

interface ConceptNodeProps extends NodeProps {
  data: ConceptNodeData & {
    onConceptUpdate?: (nodeId: string, updates: { concept: string; description?: string }) => void;
    onConceptDelete?: (nodeId: string) => void;
    frames?: Array<{ id: string; title: string; conceptIds?: string[] }>;
    chapters?: Array<{ id: string; title: string; conceptIds?: string[] }>;
  };
}

export default function ConceptNode({ id, data, selected }: ConceptNodeProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleSave = (updatedConcept: { concept: string; description?: string }) => {
    if (data.onConceptUpdate) {
      data.onConceptUpdate(id, updatedConcept);
    }
  };

  const handleDelete = () => {
    if (data.onConceptDelete) {
      data.onConceptDelete(id);
    }
  };

  return (
    <>
      <div className="concept-node">
        <Handle
          type="target"
          position={Position.Left}
          style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#f97316',
            border: '2px solid white',
            borderRadius: '50%',
            boxShadow: '0 2px 8px rgba(249, 115, 22, 0.3)',
            zIndex: 5
          }}
        />

        <Card className={`w-48 ${selected ? 'ring-2 ring-yellow-500' : ''} bg-yellow-50 border-yellow-200 hover:shadow-md transition-shadow`}>
          <CardContent className="p-3">
            <div className="flex items-start gap-2">
              <div className="p-1 bg-yellow-100 rounded">
                <Brain className="h-3 w-3 text-yellow-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-1">
                  <h4 className="text-sm font-medium text-yellow-800 mb-1 flex-1">
                    {data.concept}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 hover:bg-yellow-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditDialogOpen(true);
                    }}
                    title="Edit concept"
                  >
                    <Edit3 className="h-3 w-3 text-yellow-600" />
                  </Button>
                </div>
                {data.description && (
                  <p className="text-xs text-yellow-700 opacity-80 line-clamp-2">
                    {data.description}
                  </p>
                )}
                <Badge variant="outline" className="mt-2 text-xs bg-yellow-100 text-yellow-700 border-yellow-300">
                  <Lightbulb className="h-2 w-2 mr-1" />
                  Concept
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <ConceptEditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        conceptData={{
          id,
          concept: data.concept,
          description: data.description,
          relatedFrameId: data.relatedFrameId,
        }}
        frames={data.frames || []}
        chapters={data.chapters || []}
        onSave={handleSave}
        onDelete={data.onConceptDelete ? handleDelete : undefined}
      />
    </>
  );
} 