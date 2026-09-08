# Nigerian Fintech Dashboard — Course Build Plan

Build teaching notes and project code for the 16-week frontend engineering course, progressing session by session.

## Approach

### Two Deliverables Per Session
For each of the 48 sessions (3 days/week × 16 weeks), I will produce:

1. **Teaching Notes** (`notes/week-XX-day-X.txt`) — Detailed instructor notes covering:
   - Show & Tell guidance (what to look for in the prior take-home task)
   - Talking points for each of the 4 blocks (30 min each)
   - Code snippets to walk through with the class
   - Key concepts to emphasize
   - The take-home task with clear acceptance criteria
   - How the take-home connects to the next session

2. **Project Code** — The actual dashboard files that accumulate session by session in `C:\Users\USER\Pictures\DW_FD`

### Folder Structure

```
C:\Users\USER\Pictures\DW_FD\
├── notes/                          ← Teaching notes (.txt per day)
│   ├── week-01-day-1.txt
│   ├── week-01-day-2.txt
│   ├── week-01-day-3.txt
│   ├── ...
│   └── week-16-day-3.txt
├── index.html                      ← Dashboard (Phase 1, grows over time)
├── styles.css                      ← Styles (Phase 1)
├── components.html                 ← Component reference page (Week 3)
├── settings.html                   ← Profile & Settings page (Week 3)
├── main.js                         ← Entry point (Phase 2)
├── store.js                        ← State management (Phase 2)
├── api.js                          ← Mock API layer (Phase 2)
├── toast.js                        ← Toast notifications (Phase 2)
├── components/                     ← JS component modules (Phase 2)
│   ├── verdictRow.js
│   ├── transactionFeed.js
│   ├── sendMoney.js
│   └── savings.js
├── utils/
│   └── format.js                   ← Formatting utilities (Phase 2)
├── data/
│   └── transactions.json           ← Mock data (Phase 2)
└── Course_Frontend_DW.txt          ← (already present, reference)
```

> [!IMPORTANT]
> ### Pause Point: Week 6 Day 2
> At Phase 2 Week 6 Day 2 ("React Setup & First Components"), the curriculum calls for:
> ```bash
> npm create vite@latest fintech-dashboard-react -- --template react
> npm install tailwindcss @tailwindcss/vite
> npx shadcn@latest init
> ```
> **I will stop all code work here** and provide you a checklist of what to install when you have full internet access. Teaching notes for Weeks 6-16 will still be generated — they just won't have accompanying code until dependencies are installed.

## Execution Order

### Batch 1: Phase 1 — HTML & CSS (Weeks 1–3, 9 sessions)
Build the static dashboard from scratch with modern CSS features.

| Session | Key Deliverable |
|---|---|
| W1D1 | `index.html` skeleton + Send Money form + notes |
| W1D2 | `styles.css` with `@layer`, design tokens, grid layout + notes |
| W1D3 | Components (`.card`, `.badge`, `.pill`), `:has()`, Money in Motion strip + notes |
| W2D1 | Container queries, native nesting, `@property` gradient + notes |
| W2D2 | Form validation CSS, bank selector, `<dialog>` modal + notes |
| W2D3 | Savings plans, dark mode (`light-dark()`), accessibility polish + notes |
| W3D1 | Settings page, `<details>`, subgrid, `@scope` + notes |
| W3D2 | Component reference page, button system, typography scale + notes |
| W3D3 | Phase 1 capstone, code review, JS preview + notes |

### Batch 2: Phase 2 — JavaScript (Weeks 4–6 Day 1, 7 sessions)
Make the dashboard interactive with vanilla JS.

| Session | Key Deliverable |
|---|---|
| W4D1 | `main.js`, DOM manipulation, events, `structuredClone()` + notes |
| W4D2 | Event delegation, `Object.groupBy()`, `toSorted()` + notes |
| W4D3 | `fetch()`, async/await, loading skeletons, `Promise.all()` + notes |
| W5D1 | `store.js` (Redux-like vanilla store) + notes |
| W5D2 | ES modules architecture, `api.js`, `utils/format.js` + notes |
| W5D3 | Optimistic UI, toast system, real-time simulation + notes |
| W6D1 | ESLint, error handling audit, PHASE2.md + notes |

### Batch 3: Notes Only (Week 6 Day 2 → Week 16)
Teaching notes only — no code until you confirm internet access + dependency installation.

## Verification Plan

### For Each Session
- Code is valid HTML/CSS/JS (no syntax errors)
- Files build on prior sessions (never reset)
- Notes cover all 4 blocks + take-home task
- Take-home task connects to the next session

### Phase 1 Checkpoint
- `index.html` passes HTML validation
- CSS uses all specified 2026 features
- Dashboard renders at 320px, 768px, 1280px
- Dark mode works via `prefers-color-scheme`

### Phase 2 Checkpoint
- All JS runs without errors in the console
- Store pattern works (dispatch → render cycle)
- Module architecture has clean imports/exports

## Open Questions

> [!IMPORTANT]
> **Q1: Batch size for delivery?**
> Should I deliver all sessions at once, or would you prefer me to go day-by-day (so you can review each before I proceed)?
> My recommendation: **I'll go week by week** — deliver all 3 days of a week in one batch, then you review.

> [!IMPORTANT]
> **Q2: Notes for Weeks 6–16 (React/TS/Ship phases)?**
> Even though I can't build the code yet (no internet for npm), should I still generate all the teaching notes now? Or only generate notes up to the pause point and come back for the rest later?

> [!IMPORTANT]
> **Q3: Reference screenshots for the dashboard design?**
> The curriculum mentions showing "reference screenshots (Kuda, PiggyVest, OPay)" on Day 1. Do you have specific designs in mind, or should I design the dashboard layout based on typical Nigerian fintech app patterns?
