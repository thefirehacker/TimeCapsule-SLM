"use client";

import { EditorDemo } from "@/components/ui/editor-demo";

export default function EditorTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Rich Text Editor Test
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Test the rich text editor functionality with sample content and full
            editing capabilities
          </p>
        </div>

        <EditorDemo />

        <div className="mt-8 p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Testing Instructions:
          </h3>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">1.</span>
              Click "Load Sample Research" to populate the editor with formatted
              content
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">2.</span>
              Try typing directly in the editor - you should be able to add and
              edit text
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">3.</span>
              Use the toolbar buttons to format text (bold, italic, headers,
              etc.)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">4.</span>
              Test advanced features like math equations, images, and tables
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">5.</span>
              Select text to see the bubble menu for quick formatting
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
