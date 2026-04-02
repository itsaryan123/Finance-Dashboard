# Finance Dashboard

A clean and modern finance dashboard to track spending, understand patterns, and get quick insights into your money without feeling overwhelmed.

## Why I Built This

I wanted a dashboard I’d actually enjoy using. Most finance apps feel cluttered or overly complex. My goal was simple: keep it clean, useful, and a little smart, with helpful insights but no unnecessary noise.

---

## Features

### Dashboard Overview
- Quick summary of balance, income, and expenses  
- 30-day balance trend (area chart)  
- Monthly income vs expenses comparison  
- Financial health score (0–100)  
- Key stats:
  - Savings rate  
  - Average monthly spending  
  - Active months  
- Spending breakdown by category (pie chart)

---

### Weekly Insights and Alerts
- Weekly spending for the last 4 weeks  
- Smart alerts if spending goes 20% above average  
- Simple color indicators to highlight warnings  

---

### Transactions
- Add, edit, delete transactions (Admin mode)  
- Filter by category or type  
- Search using keywords  
- Sort by date or amount  
- Viewer mode (read-only)  
- Quick totals and averages  

---

### Insights and Analytics
- Financial health score with visual progress  
- Basic predictions:
  - Monthly average spend  
  - Annual projection  
  - Next 3 months balance estimate  
- Highlights:
  - Top spending category  
  - Best income month  
  - Highest spending month  
- Smart recommendations  

---

### Additional Features
- Dark mode with persistence  
- Fully responsive (mobile, tablet, desktop)  
- Data stored in localStorage  
- Export data as JSON or CSV  
- Smooth transitions and animations  
- Glass-style UI elements  

---

### Role-Based Access
- Viewer: read-only  
- Admin: full access including CRUD  
- Role switcher in the header  

---

## Architecture
src/
├── components/
│   ├── Header.jsx (Logo, role switcher, dark mode)
│   ├── Sidebar.jsx (Navigation, export tools)
│   ├── DashboardOverview.jsx (Charts and metrics)
│   ├── TransactionsSection.jsx (CRUD + filtering)
│   ├── InsightsSection.jsx (Analytics + recommendations)
│   └── App.jsx (Main layout)
├── context/
│   └── FinanceContext.jsx (State + calculations)
├── data/
│   └── mockData.js (34 sample transactions)
└── styles/
    └── globals.css (Tailwind components + animations)

    
## Getting Started

```bash


npm install
npm run dev

Built for the Zorvyn internship assignment. April 2026.

