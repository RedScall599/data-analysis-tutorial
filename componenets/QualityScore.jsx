"use client";
import React from "react";
import { analyzeData, computeQualityScore } from "../utils/dataAnalysis";

export default function QualityScore() {
  let dataset = null;
  try {
    dataset = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('dataset') || 'null') : null;
  } catch (e) {
    dataset = null;
  }
  const rows = dataset?.rows || [];
  const columns = dataset?.columns || (rows[0] ? Object.keys(rows[0]) : []);
  const analysis = analyzeData(rows, columns);
  const score = computeQualityScore(analysis);

  return (
    <div className="quality-score">
      <div className="score-tile">{score}</div>
      <div className="score-meta">
        <div>Completeness: {analysis.summary?.completeness ?? 0}%</div>
        <div>Columns: {columns.length}</div>
      </div>
    </div>
  );
}
