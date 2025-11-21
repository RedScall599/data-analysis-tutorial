"use client";

import Link from "next/link";
import { analyzeData } from "../utils/dataAnalysis";
import ChartDashboard from "./ChartDashboard";
import AIInsights from "./AIInsights";
import ColumnDetail from "./ColumnDetail";

export default function Results() {
  let dataset = null;
  try {
    dataset = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('dataset') || 'null') : null;
  } catch (e) {
    dataset = null;
  }
  const rows = dataset?.rows || [];
  const columns = dataset?.columns || (rows[0] ? Object.keys(rows[0]) : []);
  const analysis = analyzeData(rows, columns);

  function downloadReport() {
    const payload = { analysis, generatedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analysis-report.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="results-page">
      <div className="header-row">
        <h1>Analysis Results (Dashboard)</h1>
        <div>
          <button className="back-home" onClick={downloadReport}>Download Report</button>
          <Link href="/"><button className="back-home">Back to Home</button></Link>
        </div>
      </div>

      <section className="score-box">
        <div className="score">{/* score computed visually */}
          {(analysis.summary?.completeness ?? 0).toFixed(2)}
        </div>
        <div className="metrics">
          <h3>Quality Metrics</h3>
          <ul>
            <li>Completeness: {(analysis.summary?.completeness ?? 0).toFixed(2)}%</li>
            <li>Columns: {columns.length}</li>
          </ul>
        </div>
      </section>

      <section className="visualizations">
        <ChartDashboard analysis={analysis} />
      </section>

      <section className="insights">
        <AIInsights analysisSummary={analysis} />
      </section>

      <section className="column-details">
        <h3>Column Details</h3>
        {Object.entries(analysis.columns || {}).map(([col, info]) => (
          <ColumnDetail key={col} columnName={col} info={info} />
        ))}
      </section>
    </div>
  );
}
