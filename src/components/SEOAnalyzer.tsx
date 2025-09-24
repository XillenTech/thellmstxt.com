"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, Square, Download, AlertTriangle, CheckCircle, XCircle, Clock, FileText, Tag, Link, Eye, Hash, ChevronDown, ChevronUp, Star, TrendingUp, Target } from "lucide-react";
import { useAuth } from "./AuthProvider";

interface SEOIssue {
  type: string;
  severity: "high" | "medium" | "low";
  message: string;
  sourcePage: string;
  affectedPages: string[];
  details?: {
    duplicateValues?: string[];
    missingTags?: string[];
    count?: number;
  };
  discoveredAt: string;
}

interface SEOSummary {
  totalPagesAnalyzed: number;
  totalIssuesFound: number;
  issuesByType: Record<string, number>;
  issuesBySeverity: Record<string, number>;
  duplicateCanonicals: number;
  duplicateTitles: number;
  duplicateMetaDescriptions: number;
  missingTitles: number;
  missingMetaDescriptions: number;
  missingCanonicals: number;
  duplicateH1s: number;
  multipleH1s: number;
  averageIssuesPerPage: number;
  scanDuration: number;
}

interface SEOAnalysisResult {
  websiteUrl: string;
  scanId: string;
  scanStartedAt: string;
  scanCompletedAt: string;
  issues: SEOIssue[];
  summary: SEOSummary;
  success: boolean;
  errorMessage?: string;
}

interface HistoryItem {
  id: string;
  url: string;
  timestamp: string;
  status: string;
  pagesCrawled: number;
  linksFound: number;
  pathsFound: number;
  type: string;
  seoIssuesFound?: number;
  scanId?: string;
}

interface SEOScore {
  overall: number;
  technical: number;
  content: number;
  performance: number;
  accessibility: number;
  mobile: number;
  social: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D+' | 'D' | 'F';
  recommendations: string[];
  strengths: string[];
  weaknesses: string[];
}


const SEOAnalyzer: React.FC = () => {
  const { user } = useAuth();
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [maxPages, setMaxPages] = useState(50);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<SEOAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [analysisSessionId, setAnalysisSessionId] = useState<string | null>(null);
  const [expandedIssues, setExpandedIssues] = useState<Set<number>>(new Set());
  const [seoScore, setSeoScore] = useState<SEOScore | null>(null);
  const [isCalculatingScore, setIsCalculatingScore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Page limit options based on authentication
  const pageLimitOptions = user 
    ? [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    : [50];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return <XCircle className="w-4 h-4" />;
      case "medium": return <AlertTriangle className="w-4 h-4" />;
      case "low": return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "duplicate_canonical": return <Link className="w-4 h-4" />;
      case "duplicate_title": return <FileText className="w-4 h-4" />;
      case "duplicate_meta_description": return <Tag className="w-4 h-4" />;
      case "missing_title": return <FileText className="w-4 h-4" />;
      case "missing_meta_description": return <Tag className="w-4 h-4" />;
      case "missing_canonical": return <Link className="w-4 h-4" />;
      case "duplicate_h1": return <Hash className="w-4 h-4" />;
      case "missing_h1": return <Hash className="w-4 h-4" />;
      case "multiple_h1": return <Hash className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  const toggleIssueExpansion = (index: number) => {
    setExpandedIssues(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const calculateSEOScore = (analysisResult: SEOAnalysisResult): SEOScore => {
    const issues = analysisResult.issues;
    const summary = analysisResult.summary;
    
    // Calculate individual category scores
    const technicalScore = calculateTechnicalScore(issues, summary);
    const contentScore = calculateContentScore(issues, summary);
    const performanceScore = calculatePerformanceScore(issues, summary);
    const accessibilityScore = calculateAccessibilityScore(issues);
    const mobileScore = calculateMobileScore(issues);
    const socialScore = calculateSocialScore(issues);
    
    // Calculate overall score (weighted average)
    const overall = Math.round(
      (technicalScore * 0.25) +
      (contentScore * 0.25) +
      (performanceScore * 0.20) +
      (accessibilityScore * 0.15) +
      (mobileScore * 0.10) +
      (socialScore * 0.05)
    );
    
    const grade = getGradeFromScore(overall);
    const { recommendations, strengths, weaknesses } = generateRecommendations(issues, summary);
    
    return {
      overall,
      technical: technicalScore,
      content: contentScore,
      performance: performanceScore,
      accessibility: accessibilityScore,
      mobile: mobileScore,
      social: socialScore,
      grade,
      recommendations,
      strengths,
      weaknesses
    };
  };

  const calculateTechnicalScore = (issues: SEOIssue[], summary: SEOSummary): number => {
    let score = 100;
    
    // Deduct points for technical issues
    const duplicateIssues = issues.filter(issue => 
      issue.type.includes('duplicate') || issue.type.includes('missing')
    );
    
    score -= duplicateIssues.length * 5; // 5 points per technical issue
    score -= summary.duplicateTitles * 3;
    score -= summary.duplicateMetaDescriptions * 3;
    score -= summary.duplicateCanonicals * 4;
    score -= summary.missingTitles * 8;
    score -= summary.missingMetaDescriptions * 6;
    score -= summary.missingCanonicals * 7;
    
    return Math.max(0, Math.min(100, score));
  };

  const calculateContentScore = (issues: SEOIssue[], summary: SEOSummary): number => {
    let score = 100;
    
    // Content quality factors
    const contentIssues = issues.filter(issue => 
      issue.type.includes('h1') || issue.type.includes('title')
    );
    
    score -= contentIssues.length * 4;
    score -= summary.duplicateH1s * 6;
    score -= summary.multipleH1s * 8;
    
    return Math.max(0, Math.min(100, score));
  };

  const calculatePerformanceScore = (issues: SEOIssue[], summary: SEOSummary): number => {
    // This would typically involve page speed metrics
    // For now, we'll base it on the number of issues found
    let score = 100;
    const totalIssues = summary.totalIssuesFound;
    
    if (totalIssues > 50) score = 60;
    else if (totalIssues > 30) score = 70;
    else if (totalIssues > 20) score = 80;
    else if (totalIssues > 10) score = 90;
    
    return Math.max(0, Math.min(100, score));
  };

  const calculateAccessibilityScore = (issues: SEOIssue[]): number => {
    // Accessibility scoring based on SEO issues that affect accessibility
    let score = 100;
    
    const accessibilityIssues = issues.filter(issue => 
      issue.type.includes('missing') || issue.type.includes('duplicate')
    );
    
    score -= accessibilityIssues.length * 3;
    
    return Math.max(0, Math.min(100, score));
  };

  const calculateMobileScore = (issues: SEOIssue[]): number => {
    // Mobile optimization scoring
    let score = 100;
    
    // Deduct points for issues that affect mobile experience
    const mobileIssues = issues.filter(issue => 
      issue.severity === 'high' || issue.type.includes('missing')
    );
    
    score -= mobileIssues.length * 4;
    
    return Math.max(0, Math.min(100, score));
  };

  const calculateSocialScore = (issues: SEOIssue[]): number => {
    // Social media optimization scoring
    let score = 100;
    
    // Deduct points for missing social meta tags
    const socialIssues = issues.filter(issue => 
      issue.type.includes('meta') || issue.type.includes('social')
    );
    
    score -= socialIssues.length * 5;
    
    return Math.max(0, Math.min(100, score));
  };

  const getGradeFromScore = (score: number): SEOScore['grade'] => {
    if (score >= 95) return 'A+';
    if (score >= 90) return 'A';
    if (score >= 85) return 'B+';
    if (score >= 80) return 'B';
    if (score >= 75) return 'C+';
    if (score >= 70) return 'C';
    if (score >= 65) return 'D+';
    if (score >= 60) return 'D';
    return 'F';
  };

  const generateRecommendations = (issues: SEOIssue[], summary: SEOSummary) => {
    const recommendations: string[] = [];
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    
    // Generate recommendations based on issues
    if (summary.duplicateTitles > 0) {
      recommendations.push(`Fix ${summary.duplicateTitles} duplicate title tags`);
      weaknesses.push('Duplicate title tags found');
    }
    
    if (summary.duplicateMetaDescriptions > 0) {
      recommendations.push(`Fix ${summary.duplicateMetaDescriptions} duplicate meta descriptions`);
      weaknesses.push('Duplicate meta descriptions found');
    }
    
    if (summary.missingTitles > 0) {
      recommendations.push(`Add ${summary.missingTitles} missing title tags`);
      weaknesses.push('Missing title tags');
    }
    
    if (summary.missingMetaDescriptions > 0) {
      recommendations.push(`Add ${summary.missingMetaDescriptions} missing meta descriptions`);
      weaknesses.push('Missing meta descriptions');
    }
    
    // Add strengths
    if (summary.duplicateTitles === 0) strengths.push('No duplicate title tags');
    if (summary.duplicateMetaDescriptions === 0) strengths.push('No duplicate meta descriptions');
    if (summary.missingTitles === 0) strengths.push('All pages have title tags');
    if (summary.missingMetaDescriptions === 0) strengths.push('All pages have meta descriptions');
    
    return { recommendations, strengths, weaknesses };
  };

  const getCategoryDetails = (category: string) => {
    if (!analysisResult) return null;
    
    const issues = analysisResult.issues;
    const summary = analysisResult.summary;
    
    switch (category) {
      case 'technical':
        return {
          title: 'Technical SEO',
          score: seoScore?.technical || 0,
          description: 'Technical aspects of SEO including meta tags, canonical URLs, and site structure',
          issues: issues.filter(issue => 
            issue.type.includes('duplicate') || issue.type.includes('missing') || issue.type.includes('canonical')
          ),
          recommendations: [
            summary.duplicateTitles > 0 ? `Fix ${summary.duplicateTitles} duplicate title tags` : null,
            summary.duplicateMetaDescriptions > 0 ? `Fix ${summary.duplicateMetaDescriptions} duplicate meta descriptions` : null,
            summary.duplicateCanonicals > 0 ? `Fix ${summary.duplicateCanonicals} duplicate canonical URLs` : null,
            summary.missingTitles > 0 ? `Add ${summary.missingTitles} missing title tags` : null,
            summary.missingMetaDescriptions > 0 ? `Add ${summary.missingMetaDescriptions} missing meta descriptions` : null,
            summary.missingCanonicals > 0 ? `Add ${summary.missingCanonicals} missing canonical URLs` : null,
          ].filter(Boolean)
        };
      case 'content':
        return {
          title: 'Content Quality',
          score: seoScore?.content || 0,
          description: 'Content optimization including headings, structure, and quality',
          issues: issues.filter(issue => 
            issue.type.includes('h1') || issue.type.includes('title') || issue.type.includes('heading')
          ),
          recommendations: [
            summary.duplicateH1s > 0 ? `Fix ${summary.duplicateH1s} duplicate H1 tags` : null,
            summary.multipleH1s > 0 ? `Fix ${summary.multipleH1s} pages with multiple H1 tags` : null,
            'Ensure proper heading hierarchy (H1 > H2 > H3)',
            'Add descriptive alt text to images',
            'Use descriptive anchor text for links'
          ].filter(Boolean)
        };
      case 'performance':
        return {
          title: 'Performance',
          score: seoScore?.performance || 0,
          description: 'Website speed and performance optimization',
          issues: issues.filter(issue => issue.severity === 'high'),
          recommendations: [
            'Optimize images and use modern formats (WebP)',
            'Minify CSS and JavaScript files',
            'Enable browser caching',
            'Use a Content Delivery Network (CDN)',
            'Optimize database queries'
          ]
        };
      case 'accessibility':
        return {
          title: 'Accessibility',
          score: seoScore?.accessibility || 0,
          description: 'Website accessibility for users with disabilities',
          issues: issues.filter(issue => 
            issue.type.includes('missing') || issue.type.includes('alt') || issue.type.includes('aria')
          ),
          recommendations: [
            'Add alt text to all images',
            'Use proper heading structure',
            'Ensure sufficient color contrast',
            'Add ARIA labels where needed',
            'Make forms accessible with proper labels'
          ]
        };
      case 'mobile':
        return {
          title: 'Mobile Optimization',
          score: seoScore?.mobile || 0,
          description: 'Mobile-friendly design and optimization',
          issues: issues.filter(issue => 
            issue.severity === 'high' || issue.type.includes('mobile') || issue.type.includes('responsive')
          ),
          recommendations: [
            'Use responsive design',
            'Optimize for touch interactions',
            'Ensure fast loading on mobile',
            'Use mobile-friendly fonts and sizes',
            'Test on various mobile devices'
          ]
        };
      case 'social':
        return {
          title: 'Social Media Optimization',
          score: seoScore?.social || 0,
          description: 'Social media sharing and optimization',
          issues: issues.filter(issue => 
            issue.type.includes('meta') || issue.type.includes('social') || issue.type.includes('og:')
          ),
          recommendations: [
            'Add Open Graph meta tags',
            'Add Twitter Card meta tags',
            'Optimize social sharing images',
            'Add social media links',
            'Create shareable content'
          ]
        };
      default:
        return null;
    }
  };

  const fetchAnalysisHistory = useCallback(async () => {
    if (!websiteUrl.trim()) return;

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
      const response = await fetch(`${API_BASE_URL}/api/auth/history`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const seoHistory = data.history.filter((item: HistoryItem) => item.type === 'seo-analysis');
        setHistory(seoHistory);
      }
    } catch (error) {
      console.error("Failed to fetch analysis history:", error);
    }
  }, [websiteUrl]);

  const startAnalysis = async () => {
    if (!websiteUrl.trim()) return;

    setIsAnalyzing(true);
    setProgress(0);
    setError(null);
    setAnalysisResult(null);

    // Generate session ID for cancellation
    const sessionId = `seo-analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setAnalysisSessionId(sessionId);

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 1000);

      const response = await fetch(`${API_BASE_URL}/api/seo-analysis/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          websiteUrl: websiteUrl.trim(),
          maxPages,
          saveResults: true,
          sessionId
        }),
      });

      clearInterval(progressInterval);
      setProgress(100);

      const result = await response.json();

      if (result.success) {
        setAnalysisResult(result.data);
        
        // Calculate SEO score after analysis is complete
        setIsCalculatingScore(true);
        try {
          const calculatedScore = calculateSEOScore(result.data);
          setSeoScore(calculatedScore);
        } catch (scoreError) {
          console.error("Error calculating SEO score:", scoreError);
        } finally {
          setIsCalculatingScore(false);
        }
        
        await fetchAnalysisHistory();
      } else {
        setError(result.message || "Analysis failed");
      }
    } catch (error) {
      setError("Failed to start SEO analysis. Please try again.");
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
      setProgress(0);
      setAnalysisSessionId(null);
    }
  };

  const stopAnalysis = async () => {
    if (analysisSessionId) {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
        const response = await fetch(`${API_BASE_URL}/api/seo-analysis/cancel`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: analysisSessionId }),
        });

        const result = await response.json();
        if (result.success) {
          console.log("✅ Analysis cancelled successfully");
        } else {
          console.warn("⚠️ Failed to cancel analysis:", result.message);
        }
      } catch (error) {
        console.warn("Failed to cancel analysis:", error);
      }
    }

    setIsAnalyzing(false);
    setProgress(0);
    setAnalysisSessionId(null);
    setError("Analysis was cancelled");
  };

  const exportResults = () => {
    if (!analysisResult) return;

    console.log("Exporting analysis result:", analysisResult);
    console.log("SEO issues count:", analysisResult.issues.length);

    // Create a comprehensive CSV with all the important information
    const csvContent = [
      ["Issue Type", "Severity", "Message", "Source Page", "Affected Pages", "Duplicate Values", "Missing Tags", "Count", "Discovered At"],
      ...analysisResult.issues.map(issue => [
        issue.type,
        issue.severity,
        issue.message,
        issue.sourcePage,
        issue.affectedPages.join("; "),
        issue.details?.duplicateValues?.join("; ") || "",
        issue.details?.missingTags?.join("; ") || "",
        issue.details?.count?.toString() || "",
        new Date(issue.discoveredAt).toISOString()
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");

    console.log("CSV content preview:", csvContent.substring(0, 500));

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `seo-analysis-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (websiteUrl.trim()) {
      fetchAnalysisHistory();
    }
  }, [websiteUrl, fetchAnalysisHistory]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">SEO Analysis</h2>
        <p className="text-gray-600 mb-6">
          Analyze your website for SEO issues including duplicate titles, meta descriptions, canonical URLs, and more.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="website-url" className="block text-sm font-medium text-gray-700 mb-2">
              Website URL
            </label>
            <input
              id="website-url"
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isAnalyzing}
            />
          </div>

          <div>
            <label htmlFor="max-pages" className="block text-sm font-medium text-gray-700 mb-2">
              Max Pages to Analyze
            </label>
            <div className="relative">
              <select
                id="max-pages"
                value={maxPages}
                onChange={(e) => setMaxPages(Number(e.target.value))}
                className="w-full h-10 px-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                disabled={isAnalyzing}
              >
                {pageLimitOptions.map((limit) => (
                  <option key={limit} value={limit}>
                    {limit} pages
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          {isAnalyzing ? (
            <button
              onClick={stopAnalysis}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 flex items-center gap-2"
            >
              <Square className="w-4 h-4" />
              {progress > 0 && progress < 100 ? `Stop (${Math.round(progress)}%)` : "Stop"}
            </button>
          ) : (
            <button
              onClick={startAnalysis}
              disabled={!websiteUrl.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Start Analysis
            </button>
          )}

          {analysisResult && (
            <button
              onClick={exportResults}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          )}
        </div>

        {isAnalyzing && (
          <div className="mb-6">
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">Analyzing website for SEO issues...</p>
          </div>
        )}

        {isCalculatingScore && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <p className="text-blue-600 text-sm">Calculating SEO score...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}
      </div>

      {analysisResult && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-900">Pages Analyzed</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{analysisResult.summary.totalPagesAnalyzed}</p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-900">Issues Found</span>
                </div>
                <p className="text-2xl font-bold text-red-600">{analysisResult.summary.totalIssuesFound}</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-900">Duration</span>
                </div>
                <p className="text-2xl font-bold text-yellow-600">{formatDuration(analysisResult.summary.scanDuration)}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-900">Avg Issues/Page</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{analysisResult.summary.averageIssuesPerPage.toFixed(1)}</p>
              </div>
            </div>
          </div>

          {/* SEO Score */}
          {seoScore && (
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  <Star className="w-8 h-8 text-yellow-300" />
                  SEO Score Report
                </h2>
                <p className="text-blue-100 text-lg">Comprehensive analysis of your website&apos;s SEO performance</p>
              </div>
              
              <div className="p-8">
                {/* Overall Score */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-blue-600 text-white mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{seoScore.overall}/100</div>
                      <div className="text-sm font-semibold">Grade: {seoScore.grade}</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Overall SEO Score</h3>
                  <p className="text-gray-600">
                    {seoScore.overall >= 90 ? "Excellent SEO performance!" :
                     seoScore.overall >= 80 ? "Good SEO performance with room for improvement" :
                     seoScore.overall >= 70 ? "Fair SEO performance, several areas need attention" :
                     seoScore.overall >= 60 ? "Poor SEO performance, significant improvements needed" :
                     "Critical SEO issues require immediate attention"}
                  </p>
                </div>

                {/* Score Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  <button 
                    onClick={() => setSelectedCategory(selectedCategory === 'technical' ? null : 'technical')}
                    className={`bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer text-left ${
                      selectedCategory === 'technical' ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-900">Technical SEO</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{seoScore.technical}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${seoScore.technical}%` }}
                      />
                    </div>
                  </button>

                  <button 
                    onClick={() => setSelectedCategory(selectedCategory === 'content' ? null : 'content')}
                    className={`bg-green-50 p-4 rounded-lg hover:bg-green-100 transition-colors cursor-pointer text-left ${
                      selectedCategory === 'content' ? 'ring-2 ring-green-500' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-900">Content Quality</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{seoScore.content}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${seoScore.content}%` }}
                      />
                    </div>
                  </button>

                  <button 
                    onClick={() => setSelectedCategory(selectedCategory === 'performance' ? null : 'performance')}
                    className={`bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer text-left ${
                      selectedCategory === 'performance' ? 'ring-2 ring-purple-500' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-900">Performance</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{seoScore.performance}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${seoScore.performance}%` }}
                      />
                    </div>
                  </button>

                  <button 
                    onClick={() => setSelectedCategory(selectedCategory === 'accessibility' ? null : 'accessibility')}
                    className={`bg-orange-50 p-4 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer text-left ${
                      selectedCategory === 'accessibility' ? 'ring-2 ring-orange-500' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-5 h-5 text-orange-600" />
                      <span className="font-semibold text-orange-900">Accessibility</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">{seoScore.accessibility}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${seoScore.accessibility}%` }}
                      />
                    </div>
                  </button>

                  <button 
                    onClick={() => setSelectedCategory(selectedCategory === 'mobile' ? null : 'mobile')}
                    className={`bg-pink-50 p-4 rounded-lg hover:bg-pink-100 transition-colors cursor-pointer text-left ${
                      selectedCategory === 'mobile' ? 'ring-2 ring-pink-500' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Link className="w-5 h-5 text-pink-600" />
                      <span className="font-semibold text-pink-900">Mobile</span>
                    </div>
                    <div className="text-2xl font-bold text-pink-600">{seoScore.mobile}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${seoScore.mobile}%` }}
                      />
                    </div>
                  </button>

                  <button 
                    onClick={() => setSelectedCategory(selectedCategory === 'social' ? null : 'social')}
                    className={`bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer text-left ${
                      selectedCategory === 'social' ? 'ring-2 ring-indigo-500' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-5 h-5 text-indigo-600" />
                      <span className="font-semibold text-indigo-900">Social</span>
                    </div>
                    <div className="text-2xl font-bold text-indigo-600">{seoScore.social}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${seoScore.social}%` }}
                      />
                    </div>
                  </button>
                </div>

                {/* Category Details */}
                {selectedCategory && (() => {
                  const categoryDetails = getCategoryDetails(selectedCategory);
                  if (!categoryDetails) return null;
                  
                  return (
                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          {categoryDetails.title} Details
                        </h3>
                        <button 
                          onClick={() => setSelectedCategory(null)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-600 mb-2">{categoryDetails.description}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-bold text-gray-900">
                            Score: {categoryDetails.score}/100
                          </span>
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${categoryDetails.score}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {categoryDetails.issues && categoryDetails.issues.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Issues Found ({categoryDetails.issues.length})</h4>
                          <div className="space-y-2">
                            {categoryDetails.issues.slice(0, 5).map((issue, index) => (
                              <div key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                                {issue.message}
                              </div>
                            ))}
                            {categoryDetails.issues.length > 5 && (
                              <p className="text-sm text-gray-500">
                                ... and {categoryDetails.issues.length - 5} more issues
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {categoryDetails.recommendations && categoryDetails.recommendations.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Recommendations</h4>
                          <ul className="space-y-1">
                            {categoryDetails.recommendations.map((rec, index) => (
                              <li key={index} className="text-sm text-blue-600 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })()}

              {/* Recommendations and Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Strengths */}
                {seoScore.strengths.length > 0 && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {seoScore.strengths.map((strength, index) => (
                        <li key={index} className="text-sm text-green-700 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Weaknesses */}
                {seoScore.weaknesses.length > 0 && (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-2">
                      {seoScore.weaknesses.map((weakness, index) => (
                        <li key={index} className="text-sm text-red-700 flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {seoScore.recommendations.length > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {seoScore.recommendations.map((recommendation, index) => (
                        <li key={index} className="text-sm text-blue-700 flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              </div>
            </div>
          )}

          {/* Issues by Type */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Issues by Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(analysisResult.summary.issuesByType).map(([type, count]) => (
                <div key={type} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {getIssueIcon(type)}
                    <span className="font-semibold text-gray-900 capitalize">
                      {type.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-600">{count}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Issues */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Issues</h2>
            <div className="space-y-4">
              {analysisResult.issues.map((issue, index) => {
                const isExpanded = expandedIssues.has(index);
                const hasAffectedPages = issue.affectedPages.length > 1;
                
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)} transition-all duration-200 ${
                      isExpanded ? 'shadow-md' : 'hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getSeverityIcon(issue.severity)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getIssueIcon(issue.type)}
                          <span className="font-semibold capitalize">
                            {issue.type.replace(/_/g, ' ')}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                            {issue.severity}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{issue.message}</p>
                        <div className="text-sm text-gray-600">
                          <p><strong>Source:</strong> {issue.sourcePage}</p>
                          {hasAffectedPages && (
                            <div className="flex items-center gap-2 mt-2">
                              <p><strong>Affected Pages:</strong> {issue.affectedPages.length}</p>
                              <button
                                onClick={() => toggleIssueExpansion(index)}
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors"
                              >
                                {isExpanded ? (
                                  <>
                                    <ChevronUp className="w-3 h-3" />
                                    Hide Details
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="w-3 h-3" />
                                    Show Details
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                          {issue.details?.duplicateValues && (
                            <p><strong>Duplicate Values:</strong> {issue.details.duplicateValues.join(", ")}</p>
                          )}
                          {issue.details?.missingTags && (
                            <p><strong>Missing Tags:</strong> {issue.details.missingTags.join(", ")}</p>
                          )}
                        </div>
                        
                        {/* Expanded Content - Affected Pages */}
                        {isExpanded && hasAffectedPages && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              Affected Pages ({issue.affectedPages.length})
                            </h4>
                            <div className="space-y-2">
                              {issue.affectedPages.map((page, pageIndex) => (
                                <div key={pageIndex} className="flex items-center gap-2 p-2 bg-white rounded border border-gray-200">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                  <a 
                                    href={page} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline flex items-center gap-1"
                                  >
                                    {page}
                                    <Link className="w-3 h-3" />
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis History</h2>
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{item.url}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(item.timestamp).toLocaleString()} • {item.pagesCrawled} pages • {item.seoIssuesFound} issues
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOAnalyzer;
