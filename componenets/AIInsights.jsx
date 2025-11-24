"use client";
import { useState } from "react";
import Link from "next/link";

export default function AIInsights({ analysisSummary }) {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState(null);
  const [localDiagnostics, setLocalDiagnostics] = useState(null);

  async function fetchInsights() {
    setLoading(true);
    setError(null);
    setLocalDiagnostics(null);
    try {
      // compute quick local diagnostics from the analysis summary and available dataset
      const dataset = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('dataset') || 'null') : null;
      const rows = dataset?.rows || [];
      const columns = dataset?.columns || (rows[0] ? Object.keys(rows[0]) : []);

      function computeDiagnostics(analysis, rows, columns) {
        const diags = { errors: [], missing: [], fixes: [] };
        if (!analysis) {
          diags.errors.push('No analysis available.');
          return diags;
        }
        // duplicate header detection
        const dupHeaders = columns.filter((c, i) => columns.indexOf(c) !== i);
        if (dupHeaders.length) diags.errors.push(`Duplicate header names: ${[...new Set(dupHeaders)].join(', ')}`);

        // all-empty columns and high-missing
        columns.forEach(col => {
          const info = analysis.columns?.[col] || {};
          const missing = info.missing ?? 0;
          if (rows.length > 0 && missing === rows.length) {
            diags.errors.push(`Column \"${col}\" is completely empty`);
            diags.missing.push({ column: col, count: missing, impact: 'all values missing' });
            diags.fixes.push({ title: `Remove or populate ${col}`, description: `Column \"${col}\" has no values; consider removing or populating with defaults.` });
          } else if (rows.length > 0 && missing / rows.length > 0.5) {
            diags.missing.push({ column: col, count: missing, impact: 'high missing rate (>50%)' });
            diags.fixes.push({ title: `Review ${col} for missing data`, description: `Column \"${col}\" has ${(missing/rows.length*100).toFixed(1)}% missing values. Consider imputation or exclusion.` });
          }

          // numeric-like columns stored as text
          const vals = rows.map(r => r[col] === undefined || r[col] === null ? '' : String(r[col]).trim()).filter(v => v !== '');
          if (vals.length > 0) {
            const numericLike = vals.filter(v => /^-?\d+(\.\d+)?$/.test(v)).length;
            if (numericLike / vals.length > 0.8 && (analysis.columns?.[col]?.type !== 'number')) {
              diags.errors.push(`Column \"${col}\" appears numeric but was inferred as text`);
              diags.fixes.push({ title: `Cast ${col} to numeric`, description: `Many values in ${col} look numeric. Consider converting the column to numeric type.` });
            }
            // simple date-like detection
            const dateLike = vals.filter(v => /^\d{4}-\d{2}-\d{2}$/.test(v) || /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(v)).length;
            if (dateLike / vals.length > 0.6) {
              diags.fixes.push({ title: `Normalize ${col} dates`, description: `Column \"${col}\" contains many date-like strings. Consider normalizing to ISO format.` });
            }
          }
        });

        // duplicate rows
        if (rows.length > 1) {
          const seen = new Map();
          rows.forEach(r => {
            const key = JSON.stringify(r);
            seen.set(key, (seen.get(key) || 0) + 1);
          });
          const dupCount = Array.from(seen.values()).filter(c => c > 1).reduce((s, c) => s + (c - 1), 0);
          if (dupCount > 0) {
            diags.errors.push(`Detected ${dupCount} duplicate row(s)`);
            diags.fixes.push({ title: 'Deduplicate rows', description: `There are ${dupCount} duplicate rows. Consider deduplication.` });
          }
        }

        return diags;
      }

      const diagnostics = computeDiagnostics(analysisSummary, rows, columns);
      setLocalDiagnostics(diagnostics);

      // Strong instruction so the model behaves as a data-quality analysis tool
      const instruction = `You are a data-quality analysis assistant. Scan the LOCAL_DIAGNOSTICS and ANALYSIS_SUMMARY provided and return a concise, prioritized report containing three sections:\n\n1) errors: list clear data issues (schema mismatches, parsing errors, corrupted rows, obvious outliers)\n2) missing: summary of missing-value counts per column and impact\n3) fixes: prioritized actionable fixes with short explanations (imputation, removal, normalization, format fixes).\n\nPlease return the result as JSON with keys: \"errors\", \"missing\", \"fixes\". If you use additional keys include them under \"details\". Only include JSON in the response. Use LOCAL_DIAGNOSTICS as a source of immediate findings and expand or correct them.`;

      const prompt = `${instruction}\n\nLOCAL_DIAGNOSTICS:\n${JSON.stringify(diagnostics)}\n\nANALYSIS_SUMMARY:\n${JSON.stringify(analysisSummary)}`;

      const res = await fetch('/api/openai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) });
      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content || data?.error || JSON.stringify(data);

      // Try to extract JSON from the model's text (models often wrap JSON in markdown)
      let parsed = null;
      try {
        // naive JSON extraction: find first { and last }
        const start = text.indexOf('{');
        const end = text.lastIndexOf('}');
        if (start !== -1 && end !== -1 && end > start) {
          const jsonText = text.slice(start, end + 1);
          parsed = JSON.parse(jsonText);
          setInsights(parsed);
        } else {
          setInsights(text);
        }
      } catch (e) {
        // fallback to raw text
        setInsights(text);
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ai-insights">
      <h3>AI Insights</h3>
      <div className="insights-actions" style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
      </div>
      <button className="back-home" onClick={fetchInsights} disabled={loading}>{loading ? 'Thinking...' : 'Generate Insights'}</button>
      {error && <div className="error-box">{error}</div>}
      {localDiagnostics && (
        <div className="local-diagnostics">
          <h4>Local Diagnostics</h4>
          {localDiagnostics.errors && localDiagnostics.errors.length > 0 && (
            <div className="ai-section">
              <strong>Errors:</strong>
              <ul className="ai-list">
                {localDiagnostics.errors.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          )}
          {localDiagnostics.missing && localDiagnostics.missing.length > 0 && (
            <div className="ai-section">
              <strong>Missing:</strong>
              <table className="ai-table">
                <thead>
                  <tr><th>Column</th><th>Missing</th><th>Impact</th></tr>
                </thead>
                <tbody>
                  {localDiagnostics.missing.map((m, i) => (
                    <tr key={i}><td>{m.column}</td><td>{m.count}</td><td>{m.impact}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {localDiagnostics.fixes && localDiagnostics.fixes.length > 0 && (
            <div className="ai-section">
              <strong>Suggested Fixes:</strong>
              <ol className="ai-list">
                {localDiagnostics.fixes.map((f, i) => (
                  <li key={i}><strong>{f.title}</strong>{f.description ? ` — ${f.description}` : ''}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
      {insights && (
        typeof insights === 'string' ? (
          <pre className="ai-output">{insights}</pre>
        ) : (
          <div className="ai-structured">
            {insights.errors && (
              <div className="ai-section">
                <h4>Errors</h4>
                {Array.isArray(insights.errors) ? (
                  <ul className="ai-list">
                    {insights.errors.map((err, i) => (
                      <li key={i}>
                        {typeof err === 'string' ? err : (err.message || JSON.stringify(err))}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <pre>{JSON.stringify(insights.errors, null, 2)}</pre>
                )}
              </div>
            )}
            {insights.missing && (
              <div className="ai-section">
                <h4>Missing</h4>
                {Array.isArray(insights.missing) ? (
                  <table className="ai-table">
                    <thead>
                      <tr>
                        <th>Column</th>
                        <th>Missing</th>
                        <th>Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {insights.missing.map((m, i) => (
                        <tr key={i}>
                          <td>{m.column ?? m.name ?? Object.keys(m)[0]}</td>
                          <td>{m.count ?? m.missing ?? (m[Object.keys(m)[1]] ?? '')}</td>
                          <td>{m.impact ?? m.note ?? ''}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : typeof insights.missing === 'object' ? (
                  <table className="ai-table">
                    <thead>
                      <tr>
                        <th>Column</th>
                        <th>Missing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(insights.missing).map(([col, val]) => (
                        <tr key={col}>
                          <td>{col}</td>
                          <td>{typeof val === 'object' ? JSON.stringify(val) : String(val)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <pre>{String(insights.missing)}</pre>
                )}
              </div>
            )}
            {insights.fixes && (
              <div className="ai-section">
                <h4>Fixes</h4>
                {Array.isArray(insights.fixes) ? (
                  <ol className="ai-list">
                    {insights.fixes.map((f, i) => (
                      <li key={i}>
                        {typeof f === 'string' ? f : (
                          <div>
                            <strong>{f.title ?? f.name ?? ''}</strong>
                            {f.description || f.detail || f.note ? (
                              <div>{f.description ?? f.detail ?? f.note}</div>
                            ) : null}
                          </div>
                        )}
                      </li>
                    ))}
                  </ol>
                ) : typeof insights.fixes === 'object' ? (
                  <div>
                    <strong>{insights.fixes.title ?? ''}</strong>
                    <div>{insights.fixes.description ? insights.fixes.description : JSON.stringify(insights.fixes)}</div>
                  </div>
                ) : (
                  <pre>{String(insights.fixes)}</pre>
                )}
              </div>
            )}
            {!insights.errors && !insights.missing && !insights.fixes && (
              <pre className="ai-output">{JSON.stringify(insights, null, 2)}</pre>
            )}
          </div>
        )
      )}
    </div>
  );
}
