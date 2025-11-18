# JavaScript + CSS Migration Guide

This guide documents the complete migration from TypeScript + Tailwind CSS to JavaScript + CSS3.

---

## Summary of Changes

### Technology Stack Changes

**Before (TypeScript + Tailwind):**
- TypeScript (.tsx, .ts files)
- Tailwind CSS (utility classes)
- @types/* packages
- tsconfig.json

**After (JavaScript + CSS3):**
- JavaScript (.jsx, .js files)
- CSS3 (custom CSS files)
- No type definitions needed
- jsconfig.json (optional)

---

## File Extension Changes

### Component Files
| Old (TypeScript) | New (JavaScript) |
|------------------|------------------|
| `FileUpload.tsx` | `FileUpload.jsx` |
| `page.tsx` | `page.jsx` |
| `layout.tsx` | `layout.js` |
| `DataTypes.ts` | `dataTypes.js` (or remove, use JSDoc) |
| `dataAnalysis.ts` | `dataAnalysis.js` |

### Style Files
| Old (Tailwind) | New (CSS) |
|----------------|-----------|
| Inline className with Tailwind utilities | Separate `.css` files |
| `tailwind.config.js` | Removed |
| `postcss.config.js` | Removed |

---

## Code Conversion Patterns

### 1. Component Props (TypeScript Interfaces → PropTypes or JSDoc)

**Before (TypeScript):**
```typescript
interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  // ...
}
```

**After (JavaScript with JSDoc):**
```javascript
/**
 * @param {Object} props
 * @param {(file: File) => void} props.onFileSelect - Callback when file is selected
 */
export default function FileUpload({ onFileSelect }) {
  // ...
}
```

**Or with PropTypes:**
```javascript
import PropTypes from 'prop-types';

export default function FileUpload({ onFileSelect }) {
  // ...
}

FileUpload.propTypes = {
  onFileSelect: PropTypes.func.isRequired
};
```

---

### 2. State with Type Annotations → Plain State

**Before (TypeScript):**
```typescript
const [analysis, setAnalysis] = useState<DatasetAnalysis | null>(null);
const [loading, setLoading] = useState<boolean>(true);
```

**After (JavaScript):**
```javascript
const [analysis, setAnalysis] = useState(null);
const [loading, setLoading] = useState(true);
```

---

### 3. Event Handlers

**Before (TypeScript):**
```typescript
const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  // ...
};
```

**After (JavaScript):**
```javascript
const handleDrop = (e) => {
  e.preventDefault();
  // ...
};
```

---

### 4. Tailwind Classes → CSS Classes

**Before (Tailwind):**
```jsx
<div className="bg-white rounded-lg shadow p-6 hover:shadow-lg">
  <h2 className="text-xl font-semibold mb-4">Title</h2>
  <p className="text-gray-600">Description</p>
</div>
```

**After (CSS):**
```jsx
<div className="card">
  <h2 className="card-title">Title</h2>
  <p className="card-description">Description</p>
</div>
```

**CSS File (`Card.css`):**
```css
.card {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-lg);
  transition: box-shadow var(--transition-normal);
}

.card:hover {
  box-shadow: var(--shadow-lg);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--spacing-md);
}

.card-description {
  color: var(--color-text-secondary);
}
```

---

## Tailwind to CSS3 Conversion Reference

### Layout & Spacing

| Tailwind | CSS Equivalent |
|----------|---------------|
| `flex` | `display: flex;` |
| `flex-col` | `flex-direction: column;` |
| `justify-between` | `justify-content: space-between;` |
| `items-center` | `align-items: center;` |
| `gap-4` | `gap: var(--spacing-md);` |
| `p-4` | `padding: var(--spacing-md);` |
| `px-6 py-4` | `padding: var(--spacing-md) var(--spacing-lg);` |
| `m-4` | `margin: var(--spacing-md);` |
| `mt-4` | `margin-top: var(--spacing-md);` |
| `max-w-4xl` | `max-width: 56rem;` |
| `mx-auto` | `margin-left: auto; margin-right: auto;` |

### Colors & Backgrounds

| Tailwind | CSS Equivalent |
|----------|---------------|
| `bg-white` | `background-color: var(--color-surface);` |
| `bg-gray-50` | `background-color: var(--color-background);` |
| `bg-blue-600` | `background-color: var(--color-primary);` |
| `text-gray-900` | `color: var(--color-text-primary);` |
| `text-gray-600` | `color: var(--color-text-secondary);` |
| `text-white` | `color: white;` |
| `border-gray-200` | `border-color: var(--color-border);` |

### Typography

| Tailwind | CSS Equivalent |
|----------|---------------|
| `text-xl` | `font-size: 1.25rem;` |
| `text-4xl` | `font-size: 2.25rem;` |
| `font-bold` | `font-weight: 700;` |
| `font-semibold` | `font-weight: 600;` |
| `font-medium` | `font-weight: 500;` |
| `text-center` | `text-align: center;` |
| `leading-6` | `line-height: 1.5rem;` |

### Borders & Radius

| Tailwind | CSS Equivalent |
|----------|---------------|
| `rounded` | `border-radius: var(--radius-sm);` |
| `rounded-lg` | `border-radius: var(--radius-lg);` |
| `border` | `border: 1px solid var(--color-border);` |
| `border-2` | `border-width: 2px;` |
| `border-dashed` | `border-style: dashed;` |

### Effects & Shadows

| Tailwind | CSS Equivalent |
|----------|---------------|
| `shadow` | `box-shadow: var(--shadow-md);` |
| `shadow-lg` | `box-shadow: var(--shadow-lg);` |
| `hover:bg-blue-700` | `.btn:hover { background-color: var(--color-primary-dark); }` |
| `transition-colors` | `transition: color var(--transition-normal);` |

### Grid & Responsive

| Tailwind | CSS Equivalent |
|----------|---------------|
| `grid` | `display: grid;` |
| `grid-cols-2` | `grid-template-columns: repeat(2, 1fr);` |
| `md:grid-cols-3` | `@media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); }` |
| `lg:col-span-2` | `@media (min-width: 1024px) { grid-column: span 2; }` |

---

## CSS Variables Setup

Create `src/styles/globals.css` with these variables (already in Milestone 1):

```css
:root {
  /* Colors */
  --color-quality-excellent: #10b981;
  --color-quality-good: #f59e0b;
  --color-quality-poor: #ef4444;
  --color-quality-neutral: #6b7280;
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  --color-background: #f9fafb;
  --color-surface: #ffffff;
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
  --color-border: #e5e7eb;

  /* Spacing */
  --spacing-xs: 0.25rem;    /* 4px */
  --spacing-sm: 0.5rem;     /* 8px */
  --spacing-md: 1rem;       /* 16px */
  --spacing-lg: 1.5rem;     /* 24px */
  --spacing-xl: 2rem;       /* 32px */
  --spacing-2xl: 3rem;      /* 48px */

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 300ms ease-in-out;
}
```

---

## Component CSS Files Needed

### Milestone 1
- `src/styles/globals.css` ✅ (created)
- `src/styles/FileUpload.css` ✅ (created)
- `src/styles/HomePage.css` ✅ (created)

### Milestone 2
- `src/styles/DataPreview.css` (needs creation)
- `src/styles/QualityScore.css` (needs creation)
- `src/styles/AnalysisPage.css` (needs creation)

### Milestone 3
- `src/styles/AIInsights.css` (needs creation)
- `src/styles/DataVisualizations.css` (needs creation)

### Milestone 4
- No new CSS files (accessibility improvements to existing)

---

## Package.json Changes

**Remove:**
```json
{
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.0.1",
    "postcss": "^8"
  }
}
```

**Keep:**
```json
{
  "dependencies": {
    "next": "14.x",
    "react": "^18",
    "react-dom": "^18",
    "papaparse": "^5.4.1",
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0",
    "openai": "^4.20.0"
  },
  "devDependencies": {
    "eslint": "^8",
    "eslint-config-next": "14.x",
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.1.0",
    "@testing-library/jest-dom": "^6.1.0"
  }
}
```

---

## Common Conversion Examples

### Example 1: Quality Score Component

**Before (TypeScript + Tailwind):**
```typescript
import { DataQualityScore } from '@/types/DataTypes';

interface QualityScoreProps {
  score: DataQualityScore;
}

export default function QualityScore({ score }: QualityScoreProps) {
  const getScoreColor = (value: number) => {
    if (value >= 90) return 'text-quality-excellent bg-green-100';
    if (value >= 70) return 'text-quality-good bg-amber-100';
    return 'text-quality-poor bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Data Quality Score</h2>
      <div className={`text-center p-8 rounded-lg ${getScoreColor(score.overall)}`}>
        <div className="text-6xl font-bold mb-2">{score.overall}</div>
      </div>
    </div>
  );
}
```

**After (JavaScript + CSS):**
```javascript
import '../styles/QualityScore.css';

export default function QualityScore({ score }) {
  const getScoreClass = (value) => {
    if (value >= 90) return 'excellent';
    if (value >= 70) return 'good';
    return 'poor';
  };

  return (
    <div className="quality-score-card">
      <h2 className="quality-score-title">Data Quality Score</h2>
      <div className={`score-display ${getScoreClass(score.overall)}`}>
        <div className="score-number">{score.overall}</div>
      </div>
    </div>
  );
}
```

**CSS File (`QualityScore.css`):**
```css
.quality-score-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-lg);
}

.quality-score-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--spacing-md);
}

.score-display {
  text-align: center;
  padding: var(--spacing-2xl);
  border-radius: var(--radius-lg);
}

.score-display.excellent {
  color: var(--color-quality-excellent);
  background-color: rgba(16, 185, 129, 0.1);
}

.score-display.good {
  color: var(--color-quality-good);
  background-color: rgba(245, 158, 11, 0.1);
}

.score-display.poor {
  color: var(--color-quality-poor);
  background-color: rgba(239, 68, 68, 0.1);
}

.score-number {
  font-size: 3.75rem;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
}
```

---

## Migration Checklist

### Phase 1: Setup (Milestone 1)
- [ ] Create Next.js project WITHOUT TypeScript flag
- [ ] Remove Tailwind CSS dependencies
- [ ] Create `src/styles/` directory
- [ ] Create `globals.css` with CSS variables
- [ ] Convert FileUpload component to JavaScript + CSS
- [ ] Convert Home page to JavaScript + CSS

### Phase 2: Core Components (Milestone 2)
- [ ] Convert data analysis functions to JavaScript
- [ ] Convert DataPreview component to JavaScript + CSS
- [ ] Convert QualityScore component to JavaScript + CSS
- [ ] Convert Analysis page to JavaScript + CSS
- [ ] Remove all TypeScript type definitions

### Phase 3: Advanced Features (Milestone 3)
- [ ] Convert AI integration to JavaScript
- [ ] Convert AIInsights component to JavaScript + CSS
- [ ] Convert DataVisualizations to JavaScript + CSS
- [ ] Update Chart.js configuration for JavaScript

### Phase 4: Testing & Polish (Milestone 4)
- [ ] Update tests to use JavaScript
- [ ] Remove TypeScript from test configuration
- [ ] Update accessibility styles
- [ ] Final CSS polish

---

## Benefits of JavaScript + CSS Approach

### For Students:
1. **Simpler syntax** - No type annotations to learn
2. **Fewer files** - No `.d.ts` or `tsconfig.json`
3. **Faster iteration** - No type checking delays
4. **Better CSS understanding** - Learn actual CSS, not utility classes
5. **Portable skills** - CSS works everywhere, not just Tailwind projects

### For Instructors:
1. **Easier debugging** - No TypeScript errors to troubleshoot
2. **Better TS.2 coverage** - Students write more CSS (TS.2.3.2 skill)
3. **Clearer separation** - Structure (HTML), Style (CSS), Behavior (JS)
4. **Industry relevance** - Many production apps still use plain CSS

---

## Quick Reference: Common Patterns

### Conditional Styling

**Tailwind:**
```jsx
<div className={`base-class ${condition ? 'true-class' : 'false-class'}`}>
```

**CSS:**
```jsx
<div className={`base-class ${condition ? 'active' : ''}`}>
```

### Responsive Design

**Tailwind:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

**CSS:**
```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Hover Effects

**Tailwind:**
```jsx
<button className="bg-blue-600 hover:bg-blue-700">
```

**CSS:**
```css
.button {
  background-color: var(--color-primary);
  transition: background-color var(--transition-fast);
}

.button:hover {
  background-color: var(--color-primary-dark);
}
```

---

## Next Steps

1. ✅ Milestone 1 completed with JavaScript + CSS
2. Create CSS files for Milestone 2 components
3. Update all remaining milestones
4. Update documentation (CLAUDE.md, README.md, etc.)
5. Update SKILLS_MAPPING.md to reference CSS instead of Tailwind
6. Test complete flow with JavaScript + CSS

---

**Note:** This migration maintains all functionality while teaching students foundational CSS skills instead of framework-specific utilities.
