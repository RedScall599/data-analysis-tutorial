# Technical Skills Mapping - Data Quality Analysis Platform

**Project:** Agentic Data Quality Analysis Platform  
**Tech Stack:** JavaScript ES6+, React 18, Next.js 14, CSS3, Papa Parse, Chart.js, OpenAI API  
**Target Audience:** Beginner to intermediate developers  

This document maps where students gain each technical skill throughout the project milestones.

---

## TS.1: Core Programming (JavaScript)

### TS.1.1: Create and manipulate variables
**Competency:** Store values as variables and use them

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **1.1.1** Declare variables | 1 | Declaring state variables with `useState`, `const`, `let` | M1, M2 | `FileUpload.jsx`, `page.jsx` |
| **1.1.2** Assign variable values | 1 | Setting state, assigning analysis results | M2, M3 | `analysis/page.jsx` |
| **1.1.3** Use variables in operations | 2 | Calculating quality scores, data type detection | M2 | `dataAnalysis.js` |

**Key Learning Moments:**
```javascript
// M1: Declaring and using state variables (JavaScript)
const [isProcessing, setIsProcessing] = useState(false);
const [analysis, setAnalysis] = useState(null);
const [selectedFile, setSelectedFile] = useState(null);

// M2: Using variables in calculations
const avgMissingPercentage = analysis.reduce((sum, col) =>
  sum + (col.missingCount / totalRows), 0) / analysis.length;
const completeness = Math.max(0, 100 - (avgMissingPercentage * 100));

// M2: Object destructuring
const { fileName, rowCount, columnCount, qualityScore } = analysis;
```

**Skills Emphasized:**
- `const` and `let` (no `var`)
- ES6 destructuring
- Array methods (map, filter, reduce)
- Object property access

---

### TS.1.2: Understand statements
**Competency:** Create statements to programmatically perform tasks

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **1.2.1** Write sequential statements | 1 | Building file processing pipeline | M1, M2 | `analysis/page.jsx` |
| **1.2.2** Implement program flow | 2 | Managing async/await flow in analysis | M2 | `analysis/page.jsx` |
| **1.2.3** Debug statements | 2 | Using try/catch blocks, console.error | M3, M4 | `aiIntegration.js` |

**Key Learning Moments:**
```javascript
// M2: Sequential data processing
const parseResult = await new Promise((resolve, reject) => {
  Papa.parse(fileContent, {
    header: true,
    dynamicTyping: true,
    complete: resolve,
    error: reject
  });
});

const analysisResult = DataAnalyzer.analyzeDataset(
  parseResult.data,
  fileName
);

setAnalysis(analysisResult);

// M3: Error handling and debugging
try {
  const result = await getAIInsights(analysis);
  setInsights(result);
} catch (error) {
  console.error('OpenAI API error:', error);
  setError('Unable to generate AI insights');
}
```

**Skills Emphasized:**
- Async/await syntax
- Promise handling
- Error handling with try/catch
- Console debugging methods

---

### TS.1.3: Utilize conditionals
**Competency:** Use conditionals to check for and parse different outcomes

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **1.3.1** Create if/else statements | 2 | File type validation, quality score thresholds | M1, M2 | `QualityScore.jsx` |
| **1.3.2** Use comparison operators | 2 | Detecting data types, identifying issues | M2 | `dataAnalysis.js` |
| **1.3.3** Build complex conditionals | 3 | Multi-condition data quality checks | M2 | `dataAnalysis.js` |

**Key Learning Moments:**
```javascript
// M2: Quality score classification
const getScoreLabel = (value) => {
  if (value >= 90) return 'Excellent';
  if (value >= 70) return 'Good';
  return 'Needs Improvement';
};

const getScoreClass = (value) => {
  if (value >= 90) return 'excellent';
  if (value >= 70) return 'good';
  return 'poor';
};

// M2: Data type detection with complex conditionals
static detectDataType(values) {
  const sampleSize = Math.min(100, values.length);
  const sample = values.slice(0, sampleSize);
  
  let numberCount = 0;
  let dateCount = 0;
  let booleanCount = 0;
  
  for (const value of sample) {
    if (value === null || value === '') continue;
    
    if (!isNaN(Number(value))) {
      numberCount++;
      continue;
    }
    
    if (this.isDate(value)) {
      dateCount++;
      continue;
    }
    
    if (this.isBoolean(value)) {
      booleanCount++;
    }
  }
  
  const threshold = sampleSize * 0.8;
  
  if (numberCount >= threshold) return 'number';
  if (dateCount >= threshold) return 'date';
  if (booleanCount >= threshold) return 'boolean';
  return 'text';
}

// M2: Compound conditions for issue identification
if (missingPercentage > 10) {
  issues.push(`High missing values: ${missingPercentage.toFixed(1)}%`);
}

if (dataType === 'number' && values.some(val => 
  val !== null && val !== '' && isNaN(Number(val))
)) {
  issues.push('Non-numeric values in numeric column');
}
```

**Skills Emphasized:**
- if/else chains
- Ternary operators
- Logical operators (&&, ||)
- Comparison operators (>, <, >=, <=, ===, !==)
- Truthy/falsy values

---

### TS.1.4: Optimize statements
**Competency:** Use loops and functions to optimize code

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **1.4.1** Implement loops | 2 | Iterating over columns, analyzing data rows | M2 | `dataAnalysis.js` |
| **1.4.2** Create functions | 2 | Building reusable analysis functions | M2 | All functions in `dataAnalysis.js` |
| **1.4.3** Apply optimization principles | 3 | DRY principle with reusable components | M2, M3 | Component reuse |

**Key Learning Moments:**
```javascript
// M2: Using for...of loops to process data
for (const value of sample) {
  if (value === null || value === '') continue;
  
  if (!isNaN(Number(value))) {
    numberCount++;
    continue;
  }
}

// M2: Array methods for iteration
const columnNames = Object.keys(data[0] || {});
const columns = columnNames.map(name => 
  this.analyzeColumn(data, name)
);

// M2: Creating reusable class methods (DRY principle)
class DataAnalyzer {
  static analyzeColumn(data, columnName) {
    // Reusable logic that can be called for any column
    const values = data.map(row => row[columnName]);
    const uniqueValues = new Set(values.filter(v => v !== null));
    
    return {
      name: columnName,
      type: this.detectDataType(values),
      uniqueCount: uniqueValues.size,
      missingCount: values.filter(v => v === null).length
    };
  }
  
  static analyzeDataset(data, fileName) {
    const columns = Object.keys(data[0] || {}).map(col =>
      this.analyzeColumn(data, col)
    );
    // ... more logic
  }
}

// M3: Filter and map for data transformation
const columnsWithIssues = analysis.columns
  .filter(col => col.issues.length > 0)
  .map(col => ({
    name: col.name,
    issueCount: col.issues.length
  }));
```

**Skills Emphasized:**
- for...of loops
- Array methods (map, filter, reduce, find, some, every)
- Arrow functions
- Class methods (static)
- DRY (Don't Repeat Yourself) principle

---

## TS.2: Front-End

### TS.2.1: Design a user experience
**Competency:** Design UX that meets user needs

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **2.1.1** Research user needs | 1 | Reading problem statement, identifying data analyst needs | Pre-M1 | `00-problem.md` |
| **2.1.2** Create user journey maps | 2 | Planning upload → analysis → insights flow | Pre-M1 | `02-wireframes-overview.md` |
| **2.1.3** Apply UX principles | 3 | Implementing accessibility, error states, loading feedback | M4 | Accessibility audit |

**Key Learning Moments:**
- **M1:** Understanding target users (data analysts, business users)
- **M2:** Designing clear data presentation with color-coded quality scores
- **M3:** Progressive disclosure (charts visible, AI insights on-demand)
- **M4:** WCAG 2.1 AA compliance, keyboard navigation, screen reader support

**UX Patterns Implemented:**
- Loading states with spinners
- Error states with helpful messages
- Empty states with guidance
- Progressive enhancement
- Responsive feedback (hover, focus, active states)

---

### TS.2.2: Create a wireframe
**Competency:** Plan layout, functionality, and content

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **2.2.1** Sketch basic layouts | 1 | Reviewing wireframe images | Pre-M1 | `img/` folder, `02-wireframes-overview.md` |
| **2.2.2** Design responsive layouts | 2 | Planning mobile/tablet/desktop layouts with CSS Grid | M1, M2 | CSS files with media queries |
| **2.2.3** Prototype interactions | 3 | Drag-and-drop, button clicks, chart interactions | M1, M3 | Interactive components |

**Key Learning Moments:**
```css
/* M1: Responsive grid layout with CSS Grid */
.upload-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .upload-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* M2: Dashboard layout with Flexbox */
.quality-metrics {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 1024px) {
  .quality-metrics {
    flex-direction: row;
    justify-content: space-between;
  }
}
```

**Layout Skills:**
- CSS Grid for page layouts
- Flexbox for component layouts
- Media queries for responsive design
- Mobile-first approach

---

### TS.2.3: Build a front-end
**Competency:** Create interactive product with buttons, forms, navigation

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **2.3.1** Structure HTML content | 1 | Creating semantic JSX markup | M1, M2 | All components |
| **2.3.2** Style with CSS | 2 | **Writing custom CSS3 with variables, Grid, Flexbox** | M1, M2, M3 | All `.css` files |
| **2.3.3** Add JavaScript interactivity | 3 | File upload, state management, dynamic rendering | M1, M2, M3 | React components |

**Key Learning Moments:**

**HTML/JSX Structure (M1):**
```javascript
// Semantic HTML with proper ARIA attributes
<main id="main-content" role="main">
  <section className="upload-section" aria-label="File upload">
    <h1>Data Quality Analysis Platform</h1>
    <div 
      className="file-upload" 
      role="region"
      aria-label="File upload area"
    >
      <button 
        className="upload-button"
        onClick={handleClick}
        aria-label="Choose file to upload"
      >
        Choose File
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.json,.xlsx"
        onChange={handleChange}
        className="file-input"
        aria-label="File input"
      />
    </div>
  </section>
</main>
```

**CSS Styling (M1, M2, M3):**
```css
/* globals.css - CSS Variables System */
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  --color-surface: #ffffff;
  --color-background: #f9fafb;
  --color-border: #e5e7eb;
  
  /* Quality Score Colors */
  --color-quality-excellent: #10b981;
  --color-quality-good: #f59e0b;
  --color-quality-poor: #ef4444;
  
  /* Text Colors */
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
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
  --transition-medium: 300ms ease-in-out;
}

/* FileUpload.css - Component-specific styles */
.file-upload {
  background-color: var(--color-surface);
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  transition: all var(--transition-fast);
}

.file-upload.drag-over {
  border-color: var(--color-primary);
  background-color: rgba(59, 130, 246, 0.05);
}

.upload-button {
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: background-color var(--transition-fast);
}

.upload-button:hover {
  background-color: var(--color-primary-dark);
}

/* QualityScore.css - Responsive layout with Grid */
.quality-metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

@media (min-width: 768px) {
  .quality-metrics {
    grid-template-columns: repeat(4, 1fr);
  }
}

.metric-card.excellent {
  background-color: rgba(16, 185, 129, 0.1);
  border-left: 4px solid var(--color-quality-excellent);
}

.metric-card.good {
  background-color: rgba(245, 158, 11, 0.1);
  border-left: 4px solid var(--color-quality-good);
}

.metric-card.poor {
  background-color: rgba(239, 68, 68, 0.1);
  border-left: 4px solid var(--color-quality-poor);
}
```

**JavaScript Interactivity (M1, M2):**
```javascript
// M1: File upload with drag-and-drop
export default function FileUpload({ onFileSelect }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  return (
    <div
      className={`file-upload ${isDragOver ? 'drag-over' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragOver(false)}
    >
      {/* Component content */}
    </div>
  );
}

// M2: Dynamic rendering based on state
export default function QualityScore({ analysis }) {
  const getScoreClass = (value) => {
    if (value >= 90) return 'excellent';
    if (value >= 70) return 'good';
    return 'poor';
  };

  return (
    <div className="quality-score-card">
      <div className={`score-display ${getScoreClass(analysis.qualityScore.overall)}`}>
        {analysis.qualityScore.overall}
      </div>
      {/* More content */}
    </div>
  );
}
```

**Specific Skill Applications:**
- **Buttons:** Upload button, Generate Insights button, Refresh button
- **Forms:** File input with validation, drag-and-drop zone
- **Navigation:** Client-side routing with Next.js router
- **Interactive elements:** Charts, collapsible tables, loading spinners

**CSS Skills Emphasized:**
- CSS Custom Properties (variables)
- CSS Grid for layouts
- Flexbox for alignment
- Media queries for responsive design
- Pseudo-classes (:hover, :focus, :active)
- Transitions and animations
- Box model (margin, padding, border)
- Color theory (RGBA, color contrast)

---

### TS.2.4: Utilize front-end tools
**Competency:** Choose and use tools to build and deploy applications

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **2.4.1** Select appropriate frameworks | 2 | Using Next.js 14, React 18, **custom CSS3** | M1 | Project setup |
| **2.4.2** Use development tools | 2 | pnpm, Vitest, browser DevTools, CSS DevTools | M1, M4 | Development workflow |
| **2.4.3** Deploy applications | 3 | Deploying to Vercel/Netlify | M4 | `04-SETUP_INSTRUCTIONS.md` |

**Key Learning Moments:**
```bash
# M1: Package management with pnpm
pnpm create next-app@latest
pnpm install papaparse chart.js react-chartjs-2 openai

# M1: Development server
pnpm run dev

# M4: Testing tools
pnpm run test
pnpm run test:coverage

# M4: Production build
pnpm run build
pnpm run preview

# M4: Deployment
vercel --prod
```

**Development Tools:**
- pnpm for package management
- Next.js dev server with hot reload
- Browser DevTools (Elements, Console, Network)
- CSS DevTools (inspect, computed styles)
- Vitest for testing
- Vercel/Netlify for deployment

---

## TS.3: Back-End (Web Server Services)

### TS.3.1: Consume APIs
**Competency:** Understand and use APIs

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **3.1.1** Understand API concepts | 1 | Learning about OpenAI API, REST principles | M3 | `aiIntegration.js` |
| **3.1.2** Make API requests | 2 | Calling OpenAI chat completions API | M3 | `aiIntegration.js` |
| **3.1.3** Handle API responses | 2 | Parsing AI insights, error handling | M3 | `aiIntegration.js` |

**Key Learning Moments:**
```javascript
// M3: OpenAI API integration (v4+ syntax)
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true  // For client-side (use API routes in production)
});

export async function getAIInsights(analysis) {
  try {
    // Prepare analysis summary
    const summary = `
Dataset: ${analysis.fileName}
Total Rows: ${analysis.rowCount}
Quality Score: ${analysis.qualityScore.overall}/100
...
`;

    // Make API request
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a data quality expert. Provide clear, actionable insights.'
        },
        {
          role: 'user',
          content: `Analyze this dataset and provide recommendations:\n\n${summary}`
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    // Handle successful response
    return response.choices[0]?.message?.content || 'Unable to generate insights';

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Fallback to statistical analysis
    return `**Data Quality Summary**\n\nYour dataset has an overall quality score of ${analysis.qualityScore.overall}/100...`;
  }
}
```

**API Concepts Covered:**
- RESTful API principles
- Authentication with API keys
- Environment variables (`.env.local`)
- HTTP methods (POST requests)
- Request/response structure (JSON)
- Error codes and handling (401, 429, 500)
- Rate limiting and retries
- Asynchronous operations (async/await, Promises)
- Fallback strategies

---

### TS.3.2: Handle web servers
**Competency:** Handle request/response for dynamic web applications

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **3.2.1** Set up web servers | 1 | Understanding Next.js dev server | M1 | `pnpm run dev` |
| **3.2.2** Process HTTP requests | 2 | Client-side routing, form handling | M1, M2 | Next.js App Router |
| **3.2.3** Implement server-side logic | 3 | Understanding client vs server components | M1 | `'use client'` directive |

**Key Learning Moments:**
```javascript
// M1: Client-side component
'use client';  // Indicates client-side rendering

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [file, setFile] = useState(null);

  const handleFileSelect = (selectedFile) => {
    // Store in sessionStorage (client-side)
    sessionStorage.setItem('uploadedFile', fileContent);
    sessionStorage.setItem('fileName', selectedFile.name);
    
    // Navigate to analysis page
    router.push('/analysis');
  };

  return (
    <FileUpload onFileSelect={handleFileSelect} />
  );
}

// M1: Understanding Next.js routing
// File: src/app/page.jsx → route: /
// File: src/app/analysis/page.jsx → route: /analysis
```

**Server Concepts:**
- Client-side vs server-side rendering
- Next.js App Router file-based routing
- Client-side state management
- sessionStorage for temporary data
- Navigation with `useRouter`

---

## TS.4: Data & Storage

### TS.4.1: Manipulate data structures
**Competency:** Organize, store, and access data

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **4.1.1** Use arrays | 1 | Storing data rows, column analyses | M2 | `dataAnalysis.js` |
| **4.1.2** Use objects | 2 | Creating analysis objects, nested data | M2 | `dataAnalysis.js` |
| **4.1.3** Transform data | 3 | Mapping, filtering, reducing datasets | M2, M3 | All analysis code |

**Key Learning Moments:**
```javascript
// M2: Working with arrays
const data = [
  { name: 'Alice', age: 25, city: 'NYC' },
  { name: 'Bob', age: 30, city: 'LA' }
];

// Array iteration
const names = data.map(row => row.name);
const adults = data.filter(row => row.age >= 18);
const totalAge = data.reduce((sum, row) => sum + row.age, 0);

// M2: Working with objects
const analysis = {
  fileName: 'sales.csv',
  rowCount: 1000,
  columnCount: 5,
  columns: [
    {
      name: 'revenue',
      type: 'number',
      missingCount: 10,
      uniqueCount: 950,
      issues: ['High missing values: 1.0%']
    }
  ],
  qualityScore: {
    overall: 85,
    completeness: 99,
    consistency: 80,
    accuracy: 85,
    validity: 85
  }
};

// Accessing nested object properties
const overallScore = analysis.qualityScore.overall;
const firstColumnName = analysis.columns[0].name;

// M2: Data transformation
const columnsWithIssues = analysis.columns
  .filter(col => col.issues.length > 0)
  .map(col => ({
    name: col.name,
    issueCount: col.issues.length,
    issueList: col.issues.join(', ')
  }));

// M3: Complex data structures for charts
const chartData = {
  labels: ['Completeness', 'Consistency', 'Accuracy', 'Validity'],
  datasets: [
    {
      label: 'Quality Score',
      data: [
        analysis.qualityScore.completeness,
        analysis.qualityScore.consistency,
        analysis.qualityScore.accuracy,
        analysis.qualityScore.validity
      ],
      backgroundColor: ['rgba(16, 185, 129, 0.6)', ...]
    }
  ]
};
```

**Data Structure Skills:**
- Arrays (creation, indexing, iteration)
- Objects (creation, property access, nested objects)
- Array methods (map, filter, reduce, find, some, every)
- Object methods (Object.keys, Object.values, Object.entries)
- Destructuring (array and object)
- Spread operator (...)
- JSON.parse and JSON.stringify

---

### TS.4.2: Parse data formats
**Competency:** Convert between data formats

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **4.2.1** Parse CSV | 2 | Using Papa Parse library | M1, M2 | `analysis/page.jsx` |
| **4.2.2** Parse JSON | 2 | Understanding JSON structure | M2 | `analysis/page.jsx` |
| **4.2.3** Transform data | 3 | Converting between formats | M2 | `dataAnalysis.js` |

**Key Learning Moments:**
```javascript
// M2: Parsing CSV with Papa Parse
import Papa from 'papaparse';

const parseCSV = async (fileContent) => {
  return new Promise((resolve, reject) => {
    Papa.parse(fileContent, {
      header: true,           // Use first row as column names
      dynamicTyping: true,    // Convert numbers automatically
      skipEmptyLines: true,   // Ignore empty rows
      complete: resolve,
      error: reject
    });
  });
};

// Usage
const result = await parseCSV(csvContent);
console.log(result.data);  // Array of objects

// M2: Working with JSON
const jsonData = JSON.parse(jsonString);  // String → Object
const jsonString = JSON.stringify(analysis);  // Object → String

// M2: sessionStorage (stores strings only)
sessionStorage.setItem('analysis', JSON.stringify(analysis));
const retrieved = JSON.parse(sessionStorage.getItem('analysis'));
```

**File Format Skills:**
- CSV structure and parsing
- JSON syntax and parsing
- File reading with FileReader API
- String encoding (UTF-8)
- Data type conversion

---

### TS.4.3: Store data
**Competency:** Persist data in appropriate storage

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **4.3.1** Use client-side storage | 2 | sessionStorage for temporary data | M1, M2 | `page.jsx`, `analysis/page.jsx` |
| **4.3.2** Manage data lifecycle | 2 | Storing, retrieving, clearing data | M1, M2 | Analysis flow |
| **4.3.3** Handle storage limits | 3 | Understanding sessionStorage limits | M1 | File size validation |

**Key Learning Moments:**
```javascript
// M1: Storing uploaded file data
const handleFileSelect = async (file) => {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    const content = e.target.result;
    
    // Store in sessionStorage (cleared when browser tab closes)
    sessionStorage.setItem('uploadedFile', content);
    sessionStorage.setItem('fileName', file.name);
    
    router.push('/analysis');
  };
  
  reader.readAsText(file);
};

// M2: Retrieving stored data
useEffect(() => {
  const fileContent = sessionStorage.getItem('uploadedFile');
  const fileName = sessionStorage.getItem('fileName');
  
  if (!fileContent || !fileName) {
    router.push('/');  // Redirect if no data
    return;
  }
  
  processFile(fileContent, fileName);
}, []);

// M2: Clearing data
const handleStartOver = () => {
  sessionStorage.clear();
  router.push('/');
};
```

**Storage Concepts:**
- sessionStorage vs localStorage
- Storage limits (5-10MB typical)
- JSON serialization for storage
- Data privacy (client-side only)
- Storage lifecycle

---

## Summary: Skills Coverage

### Total Skills Practiced: 39 out of 48 (81% coverage)

**Fully Covered Categories:**
- ✅ TS.1: Core Programming (JavaScript) - 100%
- ✅ TS.2: Front-End (HTML, CSS3, React) - 100%
- ✅ TS.3: Back-End (APIs, Client-side routing) - 75%
- ✅ TS.4: Data & Storage (Arrays, Objects, CSV, JSON) - 75%

**Key Skills Emphasized in This Project:**
1. **JavaScript ES6+**: const/let, arrow functions, destructuring, async/await
2. **CSS3**: Custom properties, Grid, Flexbox, media queries, responsive design
3. **React Hooks**: useState, useEffect, useRef, custom hooks
4. **Data Analysis**: Statistical calculations, data type detection, quality scoring
5. **API Integration**: OpenAI API, error handling, fallback strategies
6. **Testing**: Vitest, React Testing Library, unit tests, component tests
7. **Accessibility**: WCAG 2.1 AA, ARIA labels, keyboard navigation
8. **Performance**: Lazy loading, code splitting, optimization

**CSS Skills Breakdown:**
- CSS Custom Properties (variables): M1
- CSS Grid layouts: M1, M2
- Flexbox layouts: M1, M2, M3
- Media queries (responsive): M1, M2, M3
- Pseudo-classes (:hover, :focus): M1, M2, M3, M4
- Transitions and animations: M1, M2, M3
- Box model (margin, padding, border): M1, M2, M3
- Color theory and contrast: M2, M4
- Accessibility (focus styles, reduced motion): M4

**JavaScript Skills Breakdown:**
- Variables (const, let): M1, M2
- Functions (arrow, class methods): M1, M2, M3
- Conditionals (if/else, ternary): M1, M2
- Loops (for...of, array methods): M2
- Objects and arrays: M2, M3
- Async/await and Promises: M2, M3
- Error handling (try/catch): M2, M3, M4
- ES6+ features (destructuring, spread): M2, M3

---

**Last Updated:** 2025-11-15  
**Project Version:** JavaScript + CSS3 (no TypeScript, no Tailwind)
