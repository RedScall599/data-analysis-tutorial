// Lightweight client-side CSV/JSON parsing and simple analysis utilities
// Designed for demo/prototyping — replace with robust libraries (PapaParse) later.

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return { columns: [], rows: [] };
  const header = lines[0].split(/,|;|\t/).map(h => h.trim());
  const rows = lines.slice(1).map(line => {
    const parts = line.split(/,|;|\t/);
    const obj = {};
    header.forEach((col, i) => {
      obj[col] = parts[i] === undefined ? '' : parts[i].trim();
    });
    return obj;
  });
  return { columns: header, rows };
}

export async function parseFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = () => {
      try {
        const text = reader.result;
        if (file.type === 'application/json' || /\.json$/i.test(file.name)) {
          const parsed = JSON.parse(text);
          // If it's an array of objects
          if (Array.isArray(parsed)) {
            const columns = parsed.length ? Object.keys(parsed[0]) : [];
            resolve({ columns, rows: parsed });
          } else {
            // wrap single object
            const columns = Object.keys(parsed || {});
            resolve({ columns, rows: [parsed] });
          }
        } else {
          // try CSV
          const parsed = parseCSV(text);
          resolve(parsed);
        }
      } catch (err) {
        reject(new Error('Parse error: ' + (err.message || err)));
      }
    };
    reader.readAsText(file);
  });
}

export function analyzeData(rows, columns) {
  const analysis = { columns: {} };
  if (!rows || rows.length === 0) {
    columns?.forEach(col => (analysis.columns[col] = { type: 'unknown', missing: 0, unique: 0 }));
    return analysis;
  }

  const colNames = columns && columns.length ? columns : Object.keys(rows[0]);
  colNames.forEach(col => {
    const values = rows.map(r => (r[col] === undefined || r[col] === null ? '' : String(r[col])));
    const missing = values.filter(v => v.trim() === '').length;
    const unique = new Set(values.filter(v => v.trim() !== '')).size;
    // naive type inference: if all numeric -> integer/float, else text
    const nonEmpty = values.filter(v => v.trim() !== '');
    const numericCount = nonEmpty.filter(v => /^-?\d+(\.\d+)?$/.test(v)).length;
    const type = numericCount === nonEmpty.length ? 'number' : 'text';
    // duplicates: count rows where value repeats
    const counts = {};
    values.forEach(v => { counts[v] = (counts[v] || 0) + 1; });
    const duplicates = Object.values(counts).filter(c => c > 1).length;

    const colInfo = { type, missing, unique, duplicates };

    // If numeric, compute simple stats and detect outliers (z-score > 3)
    if (type === 'number') {
      const nums = nonEmpty.map(v => Number(v));
      const n = nums.length;
      const mean = n ? nums.reduce((s, x) => s + x, 0) / n : 0;
      const variance = n ? nums.reduce((s, x) => s + (x - mean) * (x - mean), 0) / n : 0;
      const std = Math.sqrt(variance);
      const min = n ? Math.min(...nums) : null;
      const max = n ? Math.max(...nums) : null;
      const outliers = nums.filter(x => std > 0 && Math.abs((x - mean) / std) > 3);
      colInfo.stats = { min, max, mean, std };
      colInfo.outliers = { count: outliers.length, examples: outliers.slice(0, 5) };
    }

    analysis.columns[col] = colInfo;
  });

  // overall summary metrics
  analysis.summary = {};
  const totalCells = rows.length * colNames.length;
  const totalMissing = colNames.reduce((s, c) => s + analysis.columns[c].missing, 0);
  // precise completeness percentage (two decimals). If there are missing cells,
  // ensure we don't round up to 100.00 due to floating point rounding.
  let completenessRaw = totalCells === 0 ? 0 : ((totalCells - totalMissing) / totalCells) * 100;
  let completeness = Number(completenessRaw.toFixed(2));
  if (totalMissing > 0 && completeness >= 100) {
    // nudge down to show there's at least some missing data
    completeness = Number((100 - (100 / totalCells)).toFixed(2));
  }
  analysis.summary.completeness = completeness;

  return analysis;
}

export function computeQualityScore(analysis) {
  if (!analysis) return 0;
  const completeness = analysis.summary?.completeness ?? 0;
  // penalize duplicates and missing lightly
  const duplicatePenalty = Object.values(analysis.columns || {}).reduce((s, c) => s + (c.duplicates || 0) * 2, 0);
  const score = Math.max(0, Math.min(100, completeness - duplicatePenalty));
  return Math.round(score);
}

export default { parseFile, analyzeData, computeQualityScore };
