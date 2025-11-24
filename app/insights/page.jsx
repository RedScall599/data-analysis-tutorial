"use client";
import { useEffect, useState } from "react";
import AIInsights from "../../componenets/AIInsights";
import { analyzeData } from "../../utils/dataAnalysis";

export default function InsightsPage() {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("dataset");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!parsed) return;
      const analysisResult = analyzeData(parsed.rows || [], parsed.columns || []);
      setAnalysis(analysisResult);
    } catch (err) {
      console.error("Failed to load dataset from sessionStorage:", err);
    }
  }, []);

  return (
    <div className="insights-page">
      <h1>Detailed Insights</h1>
      <AIInsights analysisSummary={analysis} />
    </div>
  );
}
