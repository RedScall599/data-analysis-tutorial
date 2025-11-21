"use client";
import React, { useMemo } from "react";
import { analyzeData, computeQualityScore } from "../../utils/dataAnalysis";
import Link from "next/link";

export default function AnalysisPage() {
  let dataset = null;
  try {
    dataset = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('dataset') || 'null') : null;
  } catch (e) {
    dataset = null;
  }
  const rows = dataset?.rows || [];
  const columns = dataset?.columns || (rows[0] ? Object.keys(rows[0]) : []);

  const analysis = useMemo(() => analyzeData(rows, columns), [JSON.stringify(rows || [])]);
  const score = computeQualityScore(analysis);

  if (!rows || rows.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <h2>No data loaded</h2>
        <p>Please upload a dataset on the Home page first.</p>
        <Link href="/"><button className="back-home">Back to Home</button></Link>
      </div>
    );
  }

  return (
    <div className="analysis-page" style={{ padding: 18 }}>
      <div className="header-row">
        <h1>Full Analysis</h1>
        <Link href="/"><button className="back-home">Back to Home</button></Link>
      </div>

      <section className="analysis-summary">
        <h2>Quality Score: {score}</h2>
        <div className="analysis-overview">
          <p>Rows: {rows.length}</p>
          <p>Columns: {columns.length}</p>
          <p>Completeness: {(analysis.summary?.completeness ?? 0).toFixed(2)}%</p>
        </div>

        <div className="column-details">
          {Object.entries(analysis.columns || {}).map(([col, info]) => (
            <div key={col} className="column-card">
              <h3>{col} — {info.type}</h3>
              <p>Missing: {info.missing}</p>
              <p>Unique: {info.unique}</p>
              <p>Duplicates: {info.duplicates}</p>
              {info.stats && (
                <div>
                  <p>Min: {info.stats.min}</p>
                  <p>Max: {info.stats.max}</p>
                  <p>Mean: {Number(info.stats.mean).toFixed(2)}</p>
                  <p>Std: {Number(info.stats.std).toFixed(2)}</p>
                </div>
              )}
              {info.outliers && info.outliers.count > 0 && (
                <p>Outliers: {info.outliers.count} (examples: {info.outliers.examples.join(', ')})</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
