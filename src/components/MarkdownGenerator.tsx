"use client";
import React, { useState } from "react";
import {
  Download,
  FileText,
  FolderOpen,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { MarkdownGenerationResponse } from "../types/backend";

interface MarkdownGeneratorProps {
  websiteUrl: string;
  onClose: () => void;
}

const MarkdownGenerator: React.FC<MarkdownGeneratorProps> = ({
  websiteUrl,
  onClose,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<MarkdownGenerationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
   const BASE_API_URL =
     process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";


  const generateMarkdown = async () => {
    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `${BASE_API_URL}/api/generate-markdown`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ websiteUrl }),
        }
      );

      const data: MarkdownGenerationResponse = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || "Failed to generate markdown files");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAllFiles = () => {
    if (!result?.files) return;

    result.files.forEach((file, index) => {
      setTimeout(() => {
        const blob = new Blob([file.content], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, index * 100); // Stagger downloads
    });
  };

  const downloadSingleFile = (file: {
    path: string;
    content: string;
    filename: string;
  }) => {
    const blob = new Blob([file.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <FolderOpen className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Generate Markdown Pages
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Generate <code className="bg-gray-100 px-2 py-1 rounded">.md</code>{" "}
            versions of your key pages for better parsing and offline processing
            by LLMs. This creates individual markdown files for each important
            page.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 mb-1">
                  Structured Content
                </h3>
                <p className="text-green-800 text-sm">
                  Each markdown file includes metadata, AI-generated summaries,
                  and clean content formatting for optimal LLM processing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mb-6">
          <button
            onClick={generateMarkdown}
            disabled={isGenerating}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Markdown Files...</span>
              </>
            ) : (
              <>
                <FolderOpen className="w-5 h-5" />
                <span>Generate Markdown Pages</span>
              </>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Result */}
        {result && result.success && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-900">
                  Generation Complete! ✅
                </h3>
              </div>
              <p className="text-green-800">
                Successfully generated {result.files.length} markdown files from
                your website.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={downloadAllFiles}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download All Files</span>
              </button>
            </div>

            {/* Files List */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Generated Files:
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {result.files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-gray-900">
                          {file.filename}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {file.path} • {(file.content.length / 1024).toFixed(1)}{" "}
                        KB
                      </p>
                    </div>
                    <button
                      onClick={() => downloadSingleFile(file)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview of first file */}
            {result.files.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Preview of {result.files[0].filename}:
                </h4>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-40 overflow-y-auto">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                    {result.files[0].content.substring(0, 300)}
                    {result.files[0].content.length > 300 && "..."}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkdownGenerator;
