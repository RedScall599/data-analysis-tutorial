import "../style/home.css";
import "../style/preview.css";
import "../style/results.css";
import "../style/insights.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
