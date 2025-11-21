"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseFile } from "../utils/dataAnalysis";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState('');

  async function handleFile(e) {
    setError('');
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const parsed = await parseFile(file);
      // store in sessionStorage for page components to access
      sessionStorage.setItem('dataset', JSON.stringify(parsed));
      router.push('/preview');
    } catch (err) {
      setError(err.message || String(err));
    }
  }

  return (
    <div className="pageWrap">
      <header className="header">
        <div className="logo">Data Quality Analysis</div>
        <nav className="nav">
          <Link href="/"><button className="nav-button">Home</button></Link>
          <Link href="/preview"><button className="nav-button">Preview</button></Link>
          <Link href="/results"><button className="nav-button">Results</button></Link>
          <Link href="/insights"><button className="nav-button">Insights</button></Link>
        </nav>
      </header>

      <main className="container">
        <section className="heroCard">
          <h2 className="title">Upload Your Dataset</h2>
          <p className="subtitle">Instant AI-Powered Quality Analysis</p>

          <label className="dropzone" htmlFor="file-input">
            <div className="dropInner">
              <div className="uploadIcon">📁</div>
              <div className="dropText">Drag &amp; Drop File Here</div>
              <div className="or">or</div>
              <div className="chooseFile">[ Choose File ]</div>
            </div>
            <input id="file-input" type="file" className="fileInput" onChange={handleFile} />
          </label>

          {error && <div className="error-box">Error: {error}</div>}

          <aside className="recentBox">
            <h3 className="recentTitle">Recent Analyses:</h3>
            <ul className="recentList">
              <li>
                <strong>sales_data.csv</strong> - Score: 85 (Good)
                <div className="analysisMeta">Analyzed: 2 hours ago</div>
              </li>
              <li>
                <strong>users.json</strong> - Score: 72 (Good)
                <div className="analysisMeta">Analyzed: 1 day ago</div>
              </li>
            </ul>
            <div className="quickTips">
              <strong>Quick Tips:</strong>
              <div>• Ensure column headers are in first row</div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
