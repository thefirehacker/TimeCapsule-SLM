"use client";

import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PDFNodeData } from "./types";

interface PDFNodeProps {
  data: PDFNodeData;
  id: string;
}

export default function PDFNode({ data, id }: PDFNodeProps) {
  const [nodeData, setNodeData] = useState<PDFNodeData>(data);

  const handleInputChange = (field: keyof PDFNodeData, value: string) => {
    setNodeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card className="min-w-[300px] max-w-[400px] shadow-lg border-blue-200">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-blue-600 flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023.479 0 .774-.242.774-.651 0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018.817.006 1.349-.444 1.349-1.396.006-.83-.479-1.268-1.255-1.268z" />
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 0 1-.308-.018v1.426H7V15.12c.325-.043.672-.061 1.196-.061.584 0 .962.11 1.232.321.275.217.375.516.375.840 0 .37-.117.651-.305.769zm2.807 2.201c-.42 0-.749-.115-.939-.325-.197-.219-.301-.533-.301-.938v-.859c0-.665.104-.999.31-1.255.207-.263.572-.372 1.023-.372.353 0 .669.048.945.138v.681a3.15 3.15 0 0 0-.723-.069c-.263 0-.42.099-.42.420v.131h1.02v.827h-1.02v.266c0 .315.142.463.427.463a2.49 2.49 0 0 0 .684-.069v.708c-.235.08-.484.118-.716.118zm1.672-3.201H13.2v1.71c0 .42.16.599.5.599.168 0 .27-.018.27-.018v.708c-.094.024-.24.036-.434.036-.711 0-1.057-.344-1.057-1.044V15.19h-.168v-.827h.168v-.979l.898-.097v1.076z" />
            <path d="m14 9-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9h-6z" />
          </svg>
          PDF Document
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <Label htmlFor={`${id}-url`} className="text-xs">
            PDF URL
          </Label>
          <Input
            id={`${id}-url`}
            placeholder="https://example.com/document.pdf"
            value={nodeData.pdfUrl}
            onChange={(e) => handleInputChange("pdfUrl", e.target.value)}
            className="text-xs"
          />
        </div>

        <div>
          <Label htmlFor={`${id}-pages`} className="text-xs">
            Pages
          </Label>
          <Input
            id={`${id}-pages`}
            placeholder="1-10 or 5,8,12"
            value={nodeData.pages}
            onChange={(e) => handleInputChange("pages", e.target.value)}
            className="text-xs"
          />
        </div>

        <div>
          <Label htmlFor={`${id}-text`} className="text-xs">
            Notes
          </Label>
          <Textarea
            id={`${id}-text`}
            placeholder="Add your notes about this document..."
            value={nodeData.text}
            onChange={(e) => handleInputChange("text", e.target.value)}
            className="text-xs min-h-[60px]"
            rows={3}
          />
        </div>
      </CardContent>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </Card>
  );
}
