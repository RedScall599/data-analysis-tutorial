"use client";
import React from "react";

export default function ColumnDetail({ columnName, info }) {
  if (!info) return null;

  return (
    <div className={`issue column-detail`}>
      <h4>{columnName} — {info.type}</h4>
      <p>Missing: {info.missing}</p>
      <p>Unique: {info.unique}</p>
      <p>Duplicates: {info.duplicates}</p>
      {info.stats && (
        <div className="numeric-stats">
          <p>Min: {info.stats.min}</p>
          <p>Max: {info.stats.max}</p>
          <p>Mean: {Number(info.stats.mean).toFixed(2)}</p>
          <p>Std: {Number(info.stats.std).toFixed(2)}</p>
        </div>
      )}
      {info.outliers && info.outliers.count > 0 && (
        <div className="outlier-info">
          <p>Outliers: {info.outliers.count} (examples: {info.outliers.examples.join(', ')})</p>
        </div>
      )}
      {info.missing > 0 && <div className="issue-hint">Recommended: fill or remove missing values</div>}
      {info.duplicates > 0 && <div className="issue-hint">Recommended: deduplicate values</div>}
    </div>
  );
}
