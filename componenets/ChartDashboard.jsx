"use client";
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function ChartDashboard({ analysis }) {
  const columns = analysis ? Object.keys(analysis.columns || {}) : [];
  const completeness = analysis?.summary?.completeness ?? 0;

  const barData = {
    labels: columns,
    datasets: [{ label: 'Missing Values', data: columns.map(c => analysis.columns[c].missing || 0), backgroundColor: '#60a5fa' }],
  };

  const pieData = {
    labels: ['Completeness', 'Missing'],
    datasets: [{ data: [completeness, 100 - completeness], backgroundColor: ['#f59e0b', '#e5e7eb'] }],
  };

  return (
    <div className="chart-dashboard">
      <h3>Visualizations</h3>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <Bar data={barData} />
        </div>
        <div style={{ width: 220 }}>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}
