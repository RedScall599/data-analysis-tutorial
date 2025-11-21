import Link from "next/link";

export default function Insights() {
  return (
    <div className="insights-page">
      <div className="header-row">
        <h1>Detailed Insights</h1>
        <Link href="/">
          <button className="back-home">Back to Home</button>
        </Link>
      </div>

      <section className="issue name-issues">
        <h2>Column: Name (Text) — 2 Issues Found</h2>
        <p>Type: Text (String)</p>
        <p>Missing: 2 out of 100 (2%)</p>
        <p>Unique Values: 98</p>
        <h4>Suggested Fixes</h4>
        <ol>
          <li>Fill missing values or remove rows</li>
          <li>Standardize name format (Title Case)</li>
        </ol>
      </section>

      <section className="issue age-issues">
        <h2>Column: Age (Integer) — 6 Issues Found</h2>
        <p>Type: Integer</p>
        <p>Missing Values: 5 out of 100 (5%)</p>
        <p>Outliers: 1 (age = 150)</p>
        <h4>Suggested Fixes</h4>
        <ol>
          <li>Remove or correct outlier value</li>
          <li>Fill missing values with median</li>
        </ol>
      </section>

      <section className="others">
        <h2>Other Columns</h2>
        <p>Email: No issues ✓</p>
        <p>City: No issues ✓</p>
      </section>
    </div>
  );
}
