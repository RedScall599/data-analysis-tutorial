# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

An AI-powered data quality analysis platform that helps business users and data analysts automatically validate datasets, identify quality issues, and receive actionable recommendations—without requiring deep technical expertise.

**Tech Stack:**
- **Frontend:** React 18 + Next.js 14
- **Routing:** Next.js App Router
- **Data Processing:** Papa Parse (CSV/JSON)
- **AI Integration:** OpenAI API
- **Styling:** Tailwind CSS
- **Charts:** Chart.js + react-chartjs-2
- **Testing:** Vitest + React Testing Library
- **Storage:** Client-side only (sessionStorage for file data)

## Essential Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm run dev

# Production build
pnpm run build

# Run tests
pnpm run test

# Preview production build
pnpm run preview
```

## Architecture

```
src/
├── app/                    # Next.js 14 App Router
│   ├── page.tsx           # Home page with file upload
│   ├── analysis/          # Data analysis results pages
│   └── layout.tsx         # Root layout
├── components/
│   ├── FileUpload.tsx     # File upload component
│   ├── DataPreview.tsx    # Dataset preview table
│   ├── QualityScore.tsx   # Data quality scoring
│   ├── AIInsights.tsx     # AI-generated explanations
│   └── DataVisualizations.tsx
├── lib/
│   ├── dataAnalysis.ts    # Core analysis functions
│   ├── aiIntegration.ts   # OpenAI API integration
│   ├── fileProcessing.ts  # CSV/JSON parsing
│   └── qualityMetrics.ts  # Quality scoring algorithms
└── types/
    └── DataTypes.ts       # TypeScript interfaces
```

## Critical Requirements

- Follow Tailwind CSS conventions (no CSS Modules)
- Target beginner skill level
- Meet WCAG 2.1 AA standards
- Achieve Lighthouse scores: Performance ≥ 85, Accessibility ≥ 90
- Client-side file processing only (no server storage for security)

## API Integration

**Primary API:** OpenAI API for AI-powered insights

**Integration Pattern:**
- Client-side API calls with error handling
- Rate limiting: client-side throttling
- Fallback to statistical analysis when AI unavailable
- Secure API key storage in environment variables

## Development Milestones

1. **Milestone 1:** Project setup, file upload, basic data parsing
2. **Milestone 2:** Data analysis engine, quality scoring algorithms
3. **Milestone 3:** AI integration, interactive dashboards, data visualizations
4. **Milestone 4:** Testing, accessibility, performance, deployment

## Testing Guidelines

- Unit tests for data analysis algorithms (accuracy critical!)
- Component tests for FileUpload, DataPreview, QualityScore
- Integration tests for file upload → analysis → AI insights flow
- Accessibility tests (keyboard nav, screen readers, chart labels)
- Target coverage: ≥ 70%

## Common Patterns

### File Upload with Validation
```typescript
const handleFileSelect = async (file: File) => {
  // Validate file size
  const maxSize = 50 * 1024 * 1024; // 50MB
  if (file.size > maxSize) {
    alert('File too large. Maximum size is 50MB.');
    return;
  }
  // Process file
}
```

### AI Insights Generation
```typescript
const generateInsights = async (analysisData: DatasetAnalysis) => {
  const response = await fetch('/api/ai-insights', {
    method: 'POST',
    body: JSON.stringify(analysisData)
  });
  return await response.json();
}
```

## Important Notes

- Always use pnpm for package management
- Follow Tailwind CSS conventions (NO CSS Modules)
- All interactive elements must have proper ARIA labels
- Respect `prefers-reduced-motion` for chart animations
- File processing is client-side only (security requirement)
- Never commit .env.local to git (contains OpenAI API key)
