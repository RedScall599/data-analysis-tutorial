"use client";
import React from "react";
import { analyzeData } from "../utils/dataAnalysis";

export default function DataPreview() {
  let dataset = null;
  try {
    dataset = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('dataset') || 'null') : null;
  } catch (e) {
    dataset = null;
  }

  const rows = dataset?.rows || [];
  const columns = dataset?.columns || (rows[0] ? Object.keys(rows[0]) : []);

  if (!rows || rows.length === 0) {
    return <div>No data available. Upload a file on the Home page.</div>;
  }

  const sample = rows.slice(0, 10);
  const analysis = analyzeData(rows, columns);

  return (
    <div className="data-preview-component">
      <div className="preview-top">
        <h3>Preview (first {sample.length} rows)</h3>
        <div className="completeness">Completeness: {(analysis.summary?.completeness ?? 0).toFixed(2)}%</div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>{columns.map(c => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {sample.map((r, i) => (
              <tr key={i}>{columns.map(c => <td key={c}>{r[c]}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="col-summary">
        <h4>Missing Values by Column</h4>
        <ul>
          {Object.entries(analysis.columns || {}).map(([col, info]) => (
            <li key={col}>{col}: {info.missing} missing</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
