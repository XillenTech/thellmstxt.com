"use client";
import React, { useState } from "react";
import { Copy, Download, Check } from "lucide-react";

interface OutputPreviewProps {
  content: string;
}

const OutputPreview = ({ content }: OutputPreviewProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const downloadFile = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "llms.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Live Preview</h3>
        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          Real-time
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs overflow-x-auto mb-4 max-h-80 overflow-y-auto">
        <pre className="text-gray-100 whitespace-pre-wrap break-all">
          {content}
        </pre>
      </div>

      <div className="flex flex-col space-y-2">
        <button
          onClick={copyToClipboard}
          className={`
            flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300
            ${
              copied
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }
          `}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span>{copied ? "Copied!" : "Copy to Clipboard"}</span>
        </button>
        <button
          onClick={downloadFile}
          className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-all duration-300"
        >
          <Download className="h-4 w-4" />
          <span>Download llms.txt</span>
        </button>
      </div>

      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <p className="text-sm text-gray-700 mb-2">
          <strong>Next step:</strong> Upload this file to your website&apos;s
          root directory
        </p>
        <code className="text-xs bg-white px-2 py-1 rounded text-blue-600 break-all">
          yoursite.com/llms.txt
        </code>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-xs text-yellow-800">
          <strong>Note:</strong> This preview updates automatically as you
          modify your rules.
        </p>
      </div>
    </div>
  );
};

export default OutputPreview;
