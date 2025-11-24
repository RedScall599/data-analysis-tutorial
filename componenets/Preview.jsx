"use client";
import Link from "next/link";
import DataPreview from "./DataPreview";
import QualityScore from "./QualityScore";

export default function Preview() {
  return (
    <div className="preview-page">
      <div className="header-row">
        <h1>Data Preview</h1>
        <Link href="/">
          <button className="back-home">Back to Home</button>
        </Link>
      </div>

      <div className="preview-card">
        <DataPreview />
      </div>

      <section className="data-preview">
        <h2>Initial Quality Overview</h2>
        <QualityScore />
        <div style={{ marginTop: 12 }}>
          <Link href="/results"><button className="back-home">Continue to Full Results →</button></Link>
        </div>
      </section>
    </div>
  );
}
