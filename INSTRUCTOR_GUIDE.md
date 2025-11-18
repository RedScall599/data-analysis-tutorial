# Instructor Guide - Data Quality Analysis Platform

This guide helps instructors understand how this project develops technical skills and where to provide support.

---

## Quick Reference: Skills by Milestone

### Milestone 1 (Days 1-3): Foundation
**Focus:** Setup, basic React, TypeScript, file handling

**Key Skills Developed:**
- ✅ **TS.1.1** Variables: `useState`, props, type definitions
- ✅ **TS.2.3.1-2** HTML/CSS: Tailwind utilities, semantic markup
- ✅ **TS.2.4.1** Frameworks: Next.js 14, App Router
- ✅ **TS.4.1.1** Data Models: TypeScript interfaces

**Common Student Challenges:**
1. **TypeScript syntax errors** - Expected, use as learning opportunity
2. **Tailwind CSS confusion** - Show utility-first approach
3. **`'use client'` directive** - Explain client vs server components
4. **File input handling** - Walk through FileReader API

**Instructor Checkpoints:**
- [ ] Students can create Next.js project with TypeScript
- [ ] File upload component accepts CSV/JSON files
- [ ] Types defined in `DataTypes.ts`
- [ ] No console errors on `pnpm run dev`

---

### Milestone 2 (Days 4-6): Data Analysis Engine
**Focus:** Algorithms, data processing, conditionals, loops

**Key Skills Developed:**
- ✅ **TS.1.3** Conditionals: Quality score thresholds, data type detection
- ✅ **TS.1.4** Loops & Functions: Column iteration, reusable analysis functions
- ✅ **TS.4.2** Data Queries: Array methods (map, filter, reduce)
- ✅ **TS.3.4.2** Architecture: Service layer pattern

**Common Student Challenges:**
1. **Algorithm logic errors** - Guide through step-by-step debugging
2. **Type mismatches** - Show how to read TypeScript errors
3. **Array method confusion** - Explain map vs filter vs reduce
4. **Quality score calculation** - Walk through math together

**Instructor Checkpoints:**
- [ ] File parsing works for CSV and JSON
- [ ] Data analysis functions calculate correct statistics
- [ ] Quality score displays with color coding
- [ ] `/analysis` page renders without errors
- [ ] Column analysis table shows all columns

**Critical Code Review Points:**
```typescript
// Check students understand this pattern:
const columnAnalysis = headers.map(header =>
  this.analyzeColumn(data, header)
);
// Explain: "For each header, run analyzeColumn and collect results"

// Check conditional logic:
if (value >= 90) return 'excellent';
// Ask: "What happens if value is 75? Why?"
```

---

### Milestone 3 (Days 7-9): AI & Visualizations
**Focus:** API integration, Chart.js, async operations

**Key Skills Developed:**
- ✅ **TS.3.1** API Consumption: OpenAI integration, error handling
- ✅ **TS.1.2.2** Async Flow: Promises, async/await
- ✅ **TS.2.3.3** Interactivity: Dynamic chart rendering
- ✅ **TS.2.1.3** UX: Progressive disclosure (AI on demand)

**Common Student Challenges:**
1. **OpenAI API key issues** - Verify `.env.local` setup
2. **API rate limiting** - Explain error handling, show fallback
3. **Chart.js not rendering** - Check registration, container height
4. **Async confusion** - Draw sequence diagrams together

**Instructor Checkpoints:**
- [ ] OpenAI API key configured in `.env.local`
- [ ] AI insights generate successfully
- [ ] Fallback message shows when API fails
- [ ] All 3 charts render correctly
- [ ] Charts responsive on mobile

**API Integration Teaching Moments:**
```typescript
// Before coding, draw this flow on whiteboard:
// 1. User clicks "Generate Insights"
// 2. Component sets loading = true
// 3. Call OpenAI API (wait for response)
// 4. If success: show insights
// 5. If error: show fallback
// 6. Set loading = false

// Then show code that implements this flow
```

---

### Milestone 4 (Day 10): Testing & Deployment
**Focus:** Quality assurance, accessibility, production deployment

**Key Skills Developed:**
- ✅ **TS.2.1.3** Accessibility: WCAG 2.1 AA, ARIA labels, keyboard nav
- ✅ **TS.2.4.2** Testing: Vitest, Testing Library
- ✅ **TS.2.4.3** Deployment: Vercel/Netlify
- ✅ **TS.1.2.3** Debugging: Test-driven development

**Common Student Challenges:**
1. **Test setup confusion** - Provide working vitest.config.ts
2. **Accessibility testing** - Use browser DevTools together
3. **Deployment errors** - Check environment variables on platform
4. **Lighthouse scores** - Prioritize accessibility over perfect performance

**Instructor Checkpoints:**
- [ ] Vitest runs successfully
- [ ] At least 3 unit tests passing
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Screen reader announces content
- [ ] Deployed to production with working URL
- [ ] Environment variables set on hosting platform

**Accessibility Teaching Moments:**
1. **Demo screen reader:** Turn on NVDA/VoiceOver, navigate the app
2. **Keyboard-only challenge:** Unplug mouse, navigate entire app
3. **Color blindness:** Show how color alone shouldn't convey meaning
4. **Mobile testing:** Test on actual devices, not just DevTools

---

## Technical Skills Coverage Matrix

| Domain | Competency | M1 | M2 | M3 | M4 | Assessment Method |
|--------|------------|----|----|----|----|-------------------|
| **TS.1 Core** | Variables | ✅ | ✅ | - | - | Code review of state management |
| **TS.1 Core** | Statements | ✅ | ✅ | ✅ | - | Debug session observation |
| **TS.1 Core** | Conditionals | - | ✅ | ✅ | - | Review quality scoring logic |
| **TS.1 Core** | Loops/Functions | - | ✅ | - | - | Review data analysis algorithms |
| **TS.2 Front-End** | UX Design | ✅ | - | - | ✅ | Wireframes + accessibility audit |
| **TS.2 Front-End** | Wireframes | ✅ | - | - | - | Review of layout planning |
| **TS.2 Front-End** | Build Front-End | ✅ | ✅ | ✅ | - | Working components |
| **TS.2 Front-End** | Front-End Tools | ✅ | - | - | ✅ | Dev workflow + deployment |
| **TS.3 Back-End** | API Consumption | - | - | ✅ | - | OpenAI integration working |
| **TS.3 Back-End** | Web Servers | ✅ | ✅ | - | - | Next.js App Router usage |
| **TS.3 Back-End** | Architecture | ✅ | ✅ | - | - | Code organization review |
| **TS.4 Database** | Data Structures | ✅ | - | - | - | TypeScript interfaces |
| **TS.4 Database** | Data Navigation | - | ✅ | ✅ | - | Array method proficiency |
| **TS.4 Database** | Data Models | ✅ | ✅ | - | - | Business logic modeling |

**Total Coverage:** 39/48 skills (81%)

---

## Common Blockers & Solutions

### Blocker 1: "Cannot find module '@/components/...'"
**Cause:** TypeScript path alias not configured
**Solution:** Verify `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Blocker 2: "OpenAI API error: 401 Unauthorized"
**Cause:** API key not loaded or invalid
**Solution:**
1. Check `.env.local` exists in project root
2. Verify format: `OPENAI_API_KEY=sk-...`
3. Restart dev server after changing env vars
4. Check API key has billing enabled

### Blocker 3: "Chart.js not rendering"
**Cause:** Chart components not registered
**Solution:** Ensure `chartConfig.ts` imported before component
```typescript
import '../lib/chartConfig';  // Must be before chart usage
import { Bar, Pie } from 'react-chartjs-2';
```

### Blocker 4: "Quality score shows NaN"
**Cause:** Division by zero or undefined values
**Solution:** Add null checks:
```typescript
const score = analysis.length > 0
  ? (sum / analysis.length)
  : 0;  // Fallback for empty data
```

### Blocker 5: "Tests failing with 'not wrapped in act(...)'"
**Cause:** Async state updates in tests
**Solution:** Use `waitFor` from Testing Library:
```typescript
import { render, screen, waitFor } from '@testing-library/react';

await waitFor(() => {
  expect(screen.getByText('Analysis Complete')).toBeInTheDocument();
});
```

---

## Assessment Rubric by Milestone

### Milestone 1 Assessment (20 points)
- [ ] **5 pts** - Next.js project runs without errors
- [ ] **5 pts** - File upload component functional
- [ ] **5 pts** - TypeScript types defined correctly
- [ ] **5 pts** - Tailwind CSS applied, responsive layout

### Milestone 2 Assessment (30 points)
- [ ] **10 pts** - Data analysis algorithms work correctly
- [ ] **10 pts** - Quality score calculated accurately
- [ ] **5 pts** - Components display data properly
- [ ] **5 pts** - Code follows DRY principles

### Milestone 3 Assessment (30 points)
- [ ] **10 pts** - OpenAI API integration working
- [ ] **10 pts** - Charts render correctly
- [ ] **5 pts** - Error handling implemented
- [ ] **5 pts** - Loading states provide feedback

### Milestone 4 Assessment (20 points)
- [ ] **5 pts** - Tests pass (≥70% coverage)
- [ ] **5 pts** - Accessibility audit passes
- [ ] **5 pts** - Deployed to production
- [ ] **5 pts** - Documentation complete

**Total: 100 points**

---

## Time Management Recommendations

### For 10-Day Schedule:
- **Days 1-3:** Milestone 1 (Foundation)
  - Day 1: Setup, environment
  - Day 2: File upload component
  - Day 3: Routing, types

- **Days 4-6:** Milestone 2 (Analysis)
  - Day 4: File processing, parsing
  - Day 5: Analysis algorithms
  - Day 6: UI components, testing

- **Days 7-9:** Milestone 3 (AI & Charts)
  - Day 7: Chart.js setup, basic charts
  - Day 8: OpenAI integration
  - Day 9: Polish, error handling

- **Day 10:** Milestone 4 (Testing & Deploy)
  - Morning: Write tests
  - Afternoon: Accessibility fixes, deploy

### For Struggling Students:
- Focus on M1-M2 only (core functionality)
- Skip Chart.js, use simple HTML tables
- Skip AI integration, show static recommendations
- Provide more scaffolding code

### For Advanced Students:
- Add Excel export feature (.xlsx download)
- Implement data visualization filters
- Add user authentication
- Store analysis history in database

---

## Code Review Checklist

When reviewing student code, check for:

### Code Quality:
- [ ] Meaningful variable names (not `x`, `temp`, `data1`)
- [ ] Functions are small and focused (< 30 lines)
- [ ] No repeated code (DRY principle)
- [ ] Comments explain "why", not "what"
- [ ] TypeScript types used (not `any` everywhere)

### React Best Practices:
- [ ] `'use client'` only where needed
- [ ] State managed at appropriate level
- [ ] No state in render function
- [ ] Keys provided for list items
- [ ] No inline function definitions in JSX

### Data Analysis Logic:
- [ ] Handles null/undefined values
- [ ] Edge cases covered (empty data, single row)
- [ ] Algorithms are O(n) or O(n log n), not O(n²)
- [ ] Quality scores are 0-100 range
- [ ] Missing value detection accurate

### Accessibility:
- [ ] All buttons have labels
- [ ] Images have alt text
- [ ] Form inputs have labels
- [ ] Color not sole indicator
- [ ] Keyboard navigation works

---

## Extension Activities

### For Extra Credit:
1. **Add More File Formats:**
   - XML parsing
   - TSV (tab-separated values)
   - Google Sheets API integration

2. **Advanced Analytics:**
   - Outlier detection (Z-score, IQR)
   - Correlation analysis
   - Data distribution charts (histogram)

3. **Collaboration Features:**
   - Share analysis via URL
   - Export to PDF report
   - Email notifications

4. **Performance Optimizations:**
   - Web Workers for large files
   - Virtual scrolling for huge tables
   - Incremental analysis progress

---

## Resources for Instructors

### Video Tutorials to Share:
- [Next.js 14 App Router](https://nextjs.org/learn)
- [TypeScript for Beginners](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Chart.js Crash Course](https://www.chartjs.org/docs/latest/getting-started/)
- [OpenAI API Guide](https://platform.openai.com/docs/quickstart)

### Documentation Links:
- **Papa Parse:** https://www.papaparse.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Vitest:** https://vitest.dev/
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/

### Sample Solutions:
- All code examples in milestone files
- Test files in Milestone 4
- Complete working examples in each step

---

## FAQ for Instructors

**Q: Can students use different tech stack?**
A: Yes, but ensure they still hit the same skills. Vue/Angular can replace React, but keep TypeScript for TS.4 skills.

**Q: What if OpenAI API is too expensive?**
A: Use free tier (first $5 credit) or mock the API with static responses. See `aiIntegration.ts` fallback.

**Q: Should students work individually or in teams?**
A: Individual for skills assessment. Teams for collaborative learning (pair programming recommended).

**Q: How to handle students who finish early?**
A: Provide extension activities above. Have them help struggling peers (peer tutoring).

**Q: What if student gets stuck for hours?**
A: Time-box debugging (15-30 min). Then provide targeted hints, not full solutions. Use pair programming.

**Q: Can this project be portfolio-worthy?**
A: Yes! It demonstrates: React, TypeScript, API integration, data processing, testing, deployment. Encourage students to:
- Add to GitHub with good README
- Deploy to custom domain
- Write blog post about what they learned

---

## Success Indicators

Students are successful when they can:
- ✅ Explain their code choices (not just copy-paste)
- ✅ Debug TypeScript errors independently
- ✅ Use array methods fluently (map, filter, reduce)
- ✅ Handle async operations with confidence
- ✅ Deploy working application to production
- ✅ Discuss accessibility improvements
- ✅ Write tests for their code

---

**Remember:** Focus on learning process, not perfect code. Mistakes are learning opportunities!
