# Technical Skills Mapping - Data Quality Analysis Platform

This document maps where students gain each technical skill throughout the project milestones.

---

## TS.1: Core Programming

### TS.1.1: Create and manipulate variables
**Competency:** Store values as variables and use them

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **1.1.1** Declare variables | 1 | Declaring state variables in React components | M1, M2 | `FileUpload.tsx`, `page.tsx` |
| **1.1.2** Assign variable values | 1 | Setting state with `useState`, assigning analysis results | M2, M3 | `analysis/page.tsx` lines 429-455 |
| **1.1.3** Use variables in operations | 2 | Calculating quality scores, data type detection | M2 | `dataAnalysis.ts` lines 212-243 |

**Key Learning Moments:**
```typescript
// M1: Declaring and using state variables
const [isProcessing, setIsProcessing] = useState(false);
const [analysis, setAnalysis] = useState<DatasetAnalysis | null>(null);

// M2: Using variables in calculations
const avgMissingPercentage = analysis.reduce((sum, col) =>
  sum + (col.nullCount / totalRows), 0) / analysis.length;
const completeness = Math.max(0, 100 - (avgMissingPercentage * 100));
```

---

### TS.1.2: Understand statements
**Competency:** Create statements to programmatically perform tasks

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **1.2.1** Write sequential statements | 1 | Building file processing pipeline | M1, M2 | `fileProcessing.ts` lines 42-64 |
| **1.2.2** Implement program flow | 2 | Managing async/await flow in analysis | M2 | `analysis/page.tsx` lines 423-465 |
| **1.2.3** Debug statements | 2 | Using try/catch blocks, console.error | M3, M4 | `aiIntegration.ts` lines 85-102 |

**Key Learning Moments:**
```typescript
// M2: Sequential data processing
const parsedData = await FileProcessor.processFile(file);
const analysisResult = DataAnalyzer.analyzeDataset(parsedData.data, fileName);
setAnalysis(analysisResult);

// M3: Error handling and debugging
try {
  const result = await getAIInsights(analysis);
  setInsights(result);
} catch (error) {
  console.error('OpenAI API error:', error);
  // Fallback logic
}
```

---

### TS.1.3: Utilize conditionals
**Competency:** Use conditionals to check for and parse different outcomes

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **1.3.1** Create if/else statements | 2 | File type validation, quality score thresholds | M1, M2 | `QualityScore.tsx` lines 357-367 |
| **1.3.2** Use comparison operators | 2 | Detecting data types, identifying issues | M2 | `dataAnalysis.ts` lines 156-181 |
| **1.3.3** Build complex conditionals | 3 | Multi-condition data quality checks | M2 | `dataAnalysis.ts` lines 184-210 |

**Key Learning Moments:**
```typescript
// M2: Quality score classification
const getScoreColor = (value: number) => {
  if (value >= 90) return 'text-quality-excellent bg-green-100';
  if (value >= 70) return 'text-quality-good bg-amber-100';
  return 'text-quality-poor bg-red-100';
};

// M2: Complex conditional logic for data type detection
if (numberCount >= threshold) return 'number';
if (dateCount >= threshold) return 'date';
if (booleanCount >= threshold) return 'boolean';
return 'text';

// M2: Compound conditions for issue identification
if (missingPercentage > 10) {
  issues.push(`High missing values: ${missingPercentage.toFixed(1)}%`);
}
if (dataType === 'number') {
  const invalidNumbers = values.filter(val => val !== null && val !== '' && isNaN(Number(val)));
  if (invalidNumbers.length > 0) {
    issues.push(`${invalidNumbers.length} non-numeric values in numeric column`);
  }
}
```

---

### TS.1.4: Optimize statements
**Competency:** Use loops and functions to optimize code

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **1.4.1** Implement loops | 2 | Iterating over columns, analyzing data rows | M2 | `dataAnalysis.ts` lines 148-174, 269-271 |
| **1.4.2** Create functions | 2 | Building reusable analysis functions | M2 | All functions in `dataAnalysis.ts` |
| **1.4.3** Apply optimization principles | 3 | DRY principle with reusable components | M2, M3 | Component reuse across pages |

**Key Learning Moments:**
```typescript
// M2: Using loops to process data
for (const value of sample) {
  if (value === null || value === '') continue;
  if (!isNaN(Number(value))) {
    numberCount++;
    continue;
  }
  // ... more logic
}

// M2: Creating reusable functions (DRY principle)
static analyzeColumn(data: any[], columnName: string): ColumnAnalysis {
  // Reusable logic that can be called for any column
}

// M2: Mapping to reduce repetition
const columnAnalysis = headers.map(header => this.analyzeColumn(data, header));
```

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

---

### TS.2.2: Create a wireframe
**Competency:** Plan layout, functionality, and content

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **2.2.1** Sketch basic layouts | 1 | Reviewing ASCII wireframes | Pre-M1 | `02-wireframes-overview.md` lines 96-155 |
| **2.2.2** Design responsive layouts | 2 | Planning mobile/tablet/desktop layouts | M1 | Tailwind responsive classes |
| **2.2.3** Prototype interactions | 3 | Drag-and-drop, button clicks, chart interactions | M1, M3 | Interactive components |

**Key Learning Moments:**
```typescript
// M1: Responsive grid layout
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Adapts from 1 column (mobile) to 2 columns (tablet+) */}
</div>

// M3: Interactive dashboard layout
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-1">{/* Quality Score */}</div>
  <div className="lg:col-span-2">{/* Recommendations */}</div>
</div>
```

---

### TS.2.3: Build a front-end
**Competency:** Create interactive product with buttons, forms, navigation

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **2.3.1** Structure HTML content | 1 | Creating semantic JSX/TSX markup | M1, M2 | All components |
| **2.3.2** Style with CSS | 2 | Using Tailwind CSS utilities and responsive design | M1, M2, M3 | All components |
| **2.3.3** Add JavaScript interactivity | 3 | File upload, state management, dynamic rendering | M1, M2, M3 | React components |

**Key Learning Moments:**
```typescript
// M1: Semantic HTML structure
<main className="min-h-screen">
  <section className="max-w-4xl mx-auto">
    <h1>Data Quality Analysis Platform</h1>
    <form>...</form>
  </section>
</main>

// M2: CSS styling with Tailwind
<div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">

// M3: JavaScript interactivity
const handleFileSelect = async (file: File) => {
  setIsProcessing(true);
  // Process file, update state
  router.push('/analysis');
};
```

**Specific Skill Applications:**
- **Buttons:** Upload button, Generate Insights button, navigation buttons
- **Forms:** File input, drag-and-drop zone
- **Navigation:** Router navigation between pages
- **Interactive elements:** Charts, collapsible tables, loading spinners

---

### TS.2.4: Utilize front-end tools
**Competency:** Choose and use tools to build and deploy applications

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **2.4.1** Select appropriate frameworks | 2 | Using Next.js 14, React 18, Tailwind CSS | M1 | Project setup |
| **2.4.2** Use development tools | 2 | pnpm, Vitest, browser DevTools | M1, M4 | Development workflow |
| **2.4.3** Deploy applications | 3 | Deploying to Vercel/Netlify | M4 | `04-SETUP_INSTRUCTIONS.md` lines 136-167 |

**Key Learning Moments:**
```bash
# M1: Package management
pnpm install
pnpm add papaparse chart.js react-chartjs-2 openai

# M4: Testing tools
pnpm run test
pnpm run test:coverage

# M4: Deployment
vercel --prod
```

---

## TS.3: Back-End (Web Server Services)

### TS.3.1: Consume APIs
**Competency:** Understand and use APIs

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **3.1.1** Understand API concepts | 1 | Learning about OpenAI API, REST principles | M3 | `aiIntegration.ts` |
| **3.1.2** Make API requests | 2 | Calling OpenAI chat completions API | M3 | `aiIntegration.ts` lines 62-81 |
| **3.1.3** Handle API responses | 2 | Parsing AI insights, error handling | M3 | `aiIntegration.ts` lines 83-102 |

**Key Learning Moments:**
```typescript
// M3: Understanding API structure
const response = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',  // API endpoint selection
  messages: [              // Request payload
    { role: 'system', content: '...' },
    { role: 'user', content: '...' }
  ],
  max_tokens: 500,         // API parameters
  temperature: 0.7
});

// M3: Handling API responses
return response.choices[0]?.message?.content || 'Unable to generate insights';

// M3: Error handling with fallback
catch (error) {
  console.error('OpenAI API error:', error);
  // Return fallback statistical analysis
  return `**Data Quality Summary**\n\nYour dataset has...`;
}
```

**API Concepts Covered:**
- Authentication (API keys in environment variables)
- HTTP methods (POST requests)
- Request/response structure (JSON)
- Error codes and handling (rate limiting, network errors)
- Asynchronous operations (async/await)

---

### TS.3.2: Handle web servers
**Competency:** Handle request/response for dynamic web applications

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **3.2.1** Set up web servers | 1 | Understanding Next.js dev server | M1 | `pnpm run dev` |
| **3.2.2** Process HTTP requests | 2 | Client-side routing, form handling | M1, M2 | Next.js App Router |
| **3.2.3** Implement server-side logic | 3 | Understanding client vs server components | M1 | `'use client'` directive |

**Key Learning Moments:**
```typescript
// M1: Client-side routing
'use client';  // Indicates client-side component
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/analysis');

// M1: Form submission handling
const handleFileSelect = async (file: File) => {
  // Validate
  if (file.size > maxSize) {
    alert('File too large');
    return;
  }
  // Process
  sessionStorage.setItem('uploadedFile', content);
  router.push('/analysis');
};
```

**Server Concepts Covered:**
- Next.js development server
- Client-side rendering vs server-side rendering
- Route handling with App Router
- Session management (sessionStorage)
- File uploads and processing

---

### TS.3.3: Configure servers
**Competency:** Configure ORM and back-end services

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **3.3.1** Set up databases | 1 | N/A - Client-side only project | - | - |
| **3.3.2** Implement ORM systems | 2 | N/A - No database in this project | - | - |
| **3.3.3** Optimize server performance | 3 | Client-side optimization (chunking, lazy loading) | M2, M4 | Performance optimization |

**Note:** This project focuses on client-side data processing for security. Database skills can be added in future iterations.

---

### TS.3.4: Design systems & architecture
**Competency:** Create logical system architecture

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **3.4.1** Create database schemas | 2 | Designing TypeScript interfaces for data structures | M1 | `DataTypes.ts` |
| **3.4.2** Plan system architecture | 2 | Understanding component hierarchy, data flow | Pre-M1, M1 | Project architecture |
| **3.4.3** Implement design patterns | 3 | Separation of concerns, service layer pattern | M2 | `lib/` directory organization |

**Key Learning Moments:**
```typescript
// M1: Data structure design (similar to database schema)
export interface DataQualityScore {
  overall: number;
  completeness: number;
  consistency: number;
  accuracy: number;
  validity: number;
}

export interface ColumnAnalysis {
  name: string;
  dataType: string;
  nullCount: number;
  uniqueCount: number;
  duplicateCount: number;
  issues: string[];
}

export interface DatasetAnalysis {
  fileName: string;
  rowCount: number;
  columnCount: number;
  qualityScore: DataQualityScore;
  columns: ColumnAnalysis[];
  recommendations: string[];
}
```

**Architecture Patterns:**
```
src/
├── app/            # Presentation layer (pages)
├── components/     # UI components (view layer)
├── lib/            # Business logic (service layer)
│   ├── fileProcessing.ts    # File I/O service
│   ├── dataAnalysis.ts      # Analysis service
│   └── aiIntegration.ts     # AI service
└── types/          # Data contracts (DTOs)
```

This demonstrates:
- **Separation of concerns:** UI, business logic, data models separated
- **Service layer pattern:** Encapsulated logic in static classes
- **Data Transfer Objects (DTOs):** TypeScript interfaces define data contracts

---

## TS.4: Back-End (Databases)

### TS.4.1: Create a data structure
**Competency:** Use programming techniques to organize information

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **4.1.1** Design data models | 1 | Creating TypeScript interfaces | M1 | `DataTypes.ts` |
| **4.1.2** Define relationships | 2 | Understanding relationships between entities | M1 | DatasetAnalysis contains ColumnAnalysis[] |
| **4.1.3** Normalize data structures | 3 | Avoiding redundancy in data design | M1 | Efficient interface design |

**Key Learning Moments:**
```typescript
// M1: Entity design
export interface DatasetAnalysis {
  fileName: string;
  rowCount: number;
  columnCount: number;
  qualityScore: DataQualityScore;    // Composed entity (1-to-1)
  columns: ColumnAnalysis[];          // Collection (1-to-many)
  recommendations: string[];
}

// This demonstrates:
// - Entity identification (Dataset, Column, QualityScore)
// - Composition (has-a relationships)
// - Arrays for one-to-many relationships
// - Avoiding redundancy (score is separate object)
```

**Data Modeling Concepts:**
- Entity identification (what are the main "things"?)
- Attributes (what properties does each entity have?)
- Relationships (how do entities relate to each other?)
- Normalization (avoid storing same data multiple times)

---

### TS.4.2: Navigate data structures
**Competency:** Use queries and techniques to access data

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **4.2.1** Write basic queries | 1 | Filtering, mapping, reducing arrays | M2 | `dataAnalysis.ts` throughout |
| **4.2.2** Implement complex queries | 2 | Chaining array methods, complex filters | M2, M3 | Data processing functions |
| **4.2.3** Optimize query performance | 3 | Efficient data processing, avoiding O(n²) | M2 | Algorithm optimization |

**Key Learning Moments:**
```typescript
// M2: Basic data access (like SQL SELECT)
const values = data.map(row => row[columnName]).filter(val => val !== undefined);

// M2: Aggregate functions (like SQL COUNT, AVG)
const nullCount = data.length - values.length;
const uniqueCount = new Set(nonNullValues).size;
const avgMissingPercentage = analysis.reduce((sum, col) =>
  sum + (col.nullCount / totalRows), 0) / analysis.length;

// M2: Complex filtering (like SQL WHERE with multiple conditions)
const invalidNumbers = values.filter(val =>
  val !== null && val !== '' && isNaN(Number(val))
);

// M2: Multiple operations (like SQL JOIN + GROUP BY)
const dataTypeCounts = analysis.columns.reduce((acc, col) => {
  acc[col.dataType] = (acc[col.dataType] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

// M3: Filtering with conditions (like SQL WHERE)
const columnsWithIssues = analysis.columns.filter(col => col.issues.length > 0);
```

**SQL-like Operations in JavaScript:**
- `map()` = SELECT (transform data)
- `filter()` = WHERE (select subset)
- `reduce()` = GROUP BY + aggregate functions
- `find()` = SELECT ... LIMIT 1
- `sort()` = ORDER BY
- Chaining methods = subqueries

---

### TS.4.3: Understand data models
**Competency:** Design, create, and utilize complex data models

| Skill | Level | Where Students Practice | Milestone | File/Component |
|-------|-------|------------------------|-----------|----------------|
| **4.3.1** Model business requirements | 2 | Translating data quality concepts into code | M1, M2 | `DataTypes.ts`, `dataAnalysis.ts` |
| **4.3.2** Implement referential integrity | 2 | Type safety with TypeScript | M1 | Interface definitions |
| **4.3.3** Design for scalability | 3 | Efficient algorithms, limiting data display | M2 | DataPreview limiting rows |

**Key Learning Moments:**
```typescript
// M1: Business requirements → Data model
// Requirement: "Track data quality across multiple dimensions"
// Model:
export interface DataQualityScore {
  overall: number;       // Single score for dashboard
  completeness: number;  // % of non-null values
  consistency: number;   // Type consistency across columns
  accuracy: number;      // Valid vs invalid data
  validity: number;      // Format compliance
}

// M1: Referential integrity through TypeScript
export interface DatasetAnalysis {
  qualityScore: DataQualityScore;  // Must be this exact type
  columns: ColumnAnalysis[];        // Array of this specific type
}
// TypeScript prevents invalid data from being assigned

// M2: Scalability considerations
export default function DataPreview({ data, maxRows = 100 }: DataPreviewProps) {
  const displayData = data.slice(0, maxRows);  // Limit displayed rows
  // Shows only 100 rows even if dataset has 1 million
}
```

---

## Skills Summary by Milestone

### Milestone 1: Foundation (Days 1-3)
**Primary Skills:**
- TS.1.1.1-2: Variable declaration and assignment
- TS.2.3.1: HTML structure
- TS.2.3.2: CSS styling (Tailwind)
- TS.2.4.1-2: Framework selection, dev tools
- TS.3.4.1: Data structure design (TypeScript interfaces)
- TS.4.1.1: Data model design

**Students Build:**
- File upload component
- Basic page layouts
- TypeScript type definitions
- Development environment

---

### Milestone 2: Core Features (Days 4-6)
**Primary Skills:**
- TS.1.1.3: Variables in operations
- TS.1.3.1-3: Conditionals (all levels)
- TS.1.4.1-2: Loops and functions
- TS.2.3.3: JavaScript interactivity
- TS.3.4.2-3: System architecture, design patterns
- TS.4.2.1-2: Data queries (array methods)
- TS.4.3.1: Business requirements modeling

**Students Build:**
- Data analysis engine
- Quality scoring algorithm
- Data preview component
- Quality score display
- Analysis results page

---

### Milestone 3: Advanced Features (Days 7-9)
**Primary Skills:**
- TS.1.2.2-3: Program flow, debugging
- TS.2.1.3: UX principles
- TS.2.3.3: Advanced interactivity
- TS.3.1.1-3: API consumption (all levels)
- TS.3.2.2: HTTP request handling
- TS.4.2.2: Complex data queries

**Students Build:**
- OpenAI API integration
- AI insights component
- Chart.js visualizations
- Interactive dashboard
- Error handling and fallbacks

---

### Milestone 4: Testing & Deployment (Day 10)
**Primary Skills:**
- TS.1.2.3: Debugging
- TS.2.1.3: UX principles (accessibility)
- TS.2.4.2-3: Development tools, deployment
- TS.3.2.3: Server-side logic understanding
- TS.4.2.3: Performance optimization

**Students Build:**
- Unit tests for data analysis
- Component tests
- Accessibility improvements
- Performance optimizations
- Production deployment

---

## Skills NOT Covered (Future Enhancement Opportunities)

### TS.3.3: Configure servers (Database-related)
- **3.3.1:** Set up databases
- **3.3.2:** Implement ORM systems

**Reason:** This project uses client-side data processing only for security. No database required.

**Future Addition:** Add MongoDB + Mongoose to store analysis history
- Store past analyses in database
- Track quality improvement over time
- User authentication with session management

---

## Skill Level Distribution

### Level 1 (Foundational): 8 skills covered
- Variable declaration
- Variable assignment
- Sequential statements
- Research user needs
- Sketch layouts
- HTML structure
- Understand API concepts
- Basic queries

### Level 2 (Intermediate): 20 skills covered
- Variables in operations
- Program flow
- If/else statements
- Comparison operators
- Loops
- Functions
- User journey maps
- Responsive layouts
- CSS styling
- Framework selection
- Dev tools
- Make API requests
- Handle API responses
- Process HTTP requests
- Database schemas
- System architecture
- Define relationships
- Complex queries
- Model business requirements
- Referential integrity

### Level 3 (Advanced): 11 skills covered
- Complex conditionals
- Code optimization
- UX principles
- Interactive prototypes
- JavaScript interactivity
- Deployment
- Server-side logic
- Design patterns
- Normalize data structures
- Optimize queries
- Design for scalability

---

## Recommendations for Instructors

### Emphasize These High-Value Skills:
1. **TS.1.4** (Loops & Functions) - Core to data analysis algorithms
2. **TS.2.3** (Front-End Building) - Students build complete UI
3. **TS.3.1** (API Consumption) - Critical modern skill with OpenAI
4. **TS.4.2** (Data Navigation) - Extensive array method practice

### Optional Enhancements:
1. Add **TS.3.3** skills by implementing MongoDB
2. Add **TS.4.1.3** advanced normalization with complex datasets
3. Add more **TS.2.2.3** interactive prototyping with Figma

### Assessment Checkpoints:
- **After M1:** Test TS.1.1 (variables), TS.2.3.1-2 (HTML/CSS)
- **After M2:** Test TS.1.3-4 (conditionals, loops), TS.4.2 (data queries)
- **After M3:** Test TS.3.1 (API consumption), TS.2.3.3 (interactivity)
- **After M4:** Test TS.2.4.3 (deployment), TS.2.1.3 (accessibility)

---

**Total Skills Covered:** 39 out of 48 possible skills (81%)
**Skill Levels:** Beginner → Advanced progression throughout 4 milestones
