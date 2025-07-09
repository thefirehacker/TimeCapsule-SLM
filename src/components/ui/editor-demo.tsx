"use client";

import { useState } from "react";
import { RichTextEditor } from "./rich-text-editor";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

const sampleMarkdown = `# Deep Learning Research Report

## Executive Summary

This research examines the current state of **deep learning** technologies and their applications in various industries. Our findings indicate significant growth in adoption rates across multiple sectors.

### Key Findings

- **Performance Improvements**: Deep learning models show 25-40% better accuracy
- **Cost Reduction**: Implementation costs decreased by 30% over the past year
- **Scalability**: New architectures support 10x larger datasets

## Mathematical Foundations

The core of deep learning relies on gradient descent optimization:

$$\\nabla f(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$

For neural networks, we use backpropagation to compute gradients efficiently.

## Code Implementation

Here's a simple neural network implementation:

\`\`\`python
import torch
import torch.nn as nn

class NeuralNetwork(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(NeuralNetwork, self).__init__()
        self.hidden = nn.Linear(input_size, hidden_size)
        self.output = nn.Linear(hidden_size, output_size)
        
    def forward(self, x):
        x = torch.relu(self.hidden(x))
        x = self.output(x)
        return x
\`\`\`

## Industry Applications

> "The adoption of AI and machine learning continues to accelerate across industries, with deep learning at the forefront of this transformation." - Tech Industry Report 2024

### Healthcare
- Medical image analysis
- Drug discovery acceleration
- Personalized treatment plans

### Finance
- Fraud detection systems
- Algorithmic trading
- Risk assessment models

### Transportation
- Autonomous vehicles
- Traffic optimization
- Predictive maintenance

## Conclusion

The research demonstrates that deep learning technologies are not just theoretical concepts but practical tools driving real-world innovation. Organizations implementing these technologies report significant improvements in efficiency and accuracy.

---

*This report was generated using advanced AI research methodologies and peer-reviewed sources.*`;

export function EditorDemo() {
  const [content, setContent] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const loadSampleContent = () => {
    setContent(sampleMarkdown);
    setIsLoaded(true);
  };

  const clearContent = () => {
    setContent("");
    setIsLoaded(false);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Rich Text Editor Demo</CardTitle>
        <div className="flex gap-2">
          <Button onClick={loadSampleContent} variant="outline">
            Load Sample Research
          </Button>
          <Button onClick={clearContent} variant="outline">
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <RichTextEditor
          content={content}
          onChange={setContent}
          editable={true}
          placeholder="Start typing your research content here, or load the sample content above..."
          className="min-h-[400px]"
        />

        {isLoaded && (
          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Features Demonstrated:</h4>
            <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
              <li>✅ Markdown to HTML conversion</li>
              <li>✅ Mathematical equations (LaTeX)</li>
              <li>✅ Code syntax highlighting</li>
              <li>✅ Headers, lists, and formatting</li>
              <li>✅ Blockquotes and emphasis</li>
              <li>✅ Rich text editing toolbar</li>
              <li>✅ Export functionality</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
