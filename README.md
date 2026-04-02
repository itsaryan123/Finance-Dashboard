# Finance Dashboard

A modern, feature-rich finance dashboard for tracking spending and understanding financial patterns. Built with React, Vite, and Tailwind CSS with a beautiful, responsive UI.

## Why I Built This

I wanted to create something genuinely useful for managing finances. The goal was to make it clean and intuitive without unnecessary complexity. The dashboard gives you a real-time view of your financial health with actionable insights.

## What's Inside

### 📊 Dashboard Overview
- **Summary Cards** - Account balance, total income, and expenses at a glance
- **Balance Trend Chart** - 30-day area chart showing balance changes over time
- **Monthly Breakdown** - Income vs expense comparison with gradient bars
- **Financial Health Score** - Automatic 0-100 rating with progress visualization
- **4 Key Metrics** - Savings rate, health score, average monthly spending, active months
- **Spending by Category** - Pie chart + detailed breakdown list showing where money goes

### 💰 Weekly & Alert Features (NEW!)
- **Weekly Spending Chart** - Bar chart showing spending patterns over last 4 weeks
- **Smart Spending Alerts** - Real-time alerts when spending exceeds average by 20%+
- **Color-coded warnings** - Visual indicators for different spending levels

### 📈 Transactions Section
- **Full CRUD Operations** - Add, edit, delete transactions easily
- **Smart Filtering** - Filter by type (income/expense) or category
- **Search Functionality** - Find transactions instantly
- **Sorting** - Sort by date or amount
- **Admin/Viewer Modes** - Different access levels (admin can edit, viewer is read-only)
- **Transaction Summary** - Totals and averages at a glance

### 💡 Insights & Analytics (Enhanced!)
- **Financial Health Score** - Premium card with gradient background showing overall rating
- **Predictive Analytics** - 
  - Average monthly spending based on history
  - Annual spending projection
  - Projected balance for next 3 months
- **Key Observations** - Data-driven insights including:
  - Top spending category
  - Best income month
  - Peak spending month
  - Balance status
- **Smart Recommendations** - 6+ personalized suggestions based on:
  - Savings rate optimization
  - Spending ratio improvements
  - Investment opportunities
  - Budget optimization tips
- **Monthly Trends** - Gradient bar chart comparing income vs expenses
- **Stats Summary** - Total transactions, categories tracked, months covered

### 🎨 Premium Features
- **Dark Mode** - Full dark theme support that persists automatically
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Data Persistence** - All changes saved to localStorage automatically
- **Export Functionality** - Download data as JSON or CSV
- **Smooth Animations** - Fade-in effects, hover states, transitions
- **Glassmorphism Design** - Modern UI with backdrop blur and gradients

### 🔐 Role-Based Access
- **Viewer Mode** - Read-only access to all dashboards and reports
- **Admin Mode** - Full access including ability to add/edit/delete transactions
- **Easy Switching** - Toggle between roles with dropdown in header

## How to Use

### Install & Run
```bash
npm install
npm run dev
```

Opens at `localhost:3000` with sample data pre-loaded. Everything works immediately!

### Try These Features

**Dashboard**
- Check out the financial health score and what it means
- Explore the balance trend and monthly comparison charts
- Look at the weekly spending chart to spot patterns
- Check spending alerts for any flagged categories

**Transactions**
- In Admin mode, click "Add Transaction" to add new ones
- Try filtering by category or type
- Sort by date or amount to find specific transactions
- Search for transactions by keywords

**Role Switching**
- Click the role button in the header (👨‍💼 Admin or 👁️ Viewer)
- Switch between modes and notice what changes
- Viewer can't add/edit, Admin has full control

**Insights**
- View your financial health score and what it means
- Check predictive analytics for future planning
- Read smart recommendations for improvement
- See monthly trends and which categories drain the most

**Data Management**
- Dark mode: Click moon/sun icon in header
- Export: Click "Export Data" in sidebar
- Choose JSON or CSV format
- File downloads with timestamp

## What Powers This

- **React 18** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling with gradients and animations
- **Recharts** - Beautiful, responsive charts (Area, Bar, Pie)
- **Lucide Icons** - Clean icon library (500+ icons)
- **React Context API** - Simple, effective state management
- **localStorage** - Client-side data persistence

## Key Implementation Details

**State Management**
- Uses React Context for global state (transactions, filters, roles, dark mode)
- Calculations are memoized for performance
- localStorage keeps data between sessions

**Data Calculations**
- Financial health score (0-100) based on savings rate and spending ratio
- Monthly breakdowns calculated from transaction dates
- Trend analysis for predictions
- Category grouping with automatic color assignment

**Responsive Design**
- Mobile-first approach with Tailwind's breakpoints
- Grid layouts adapt from 1 to 4 columns
- Touch-friendly button sizes
- Readable font sizes across all screens

**Performance**
- Lazy loading of components
- Optimized re-renders with proper dependencies
- Charts only render when data is available
- Images and assets optimized

## Architecture

```
src/
├── components/
│   ├── Header.jsx          (Logo, role switcher, dark mode)
│   ├── Sidebar.jsx         (Navigation, export tools)
│   ├── DashboardOverview.jsx (All charts and metrics)
│   ├── TransactionsSection.jsx (CRUD + filtering)
│   ├── InsightsSection.jsx (Analytics & recommendations)
│   └── App.jsx             (Main layout)
│
├── context/
│   └── FinanceContext.jsx  (State + calculations)
│
├── data/
│   └── mockData.js         (34 sample transactions)
│
└── styles/
    └── globals.css         (Tailwind components & animations)
```

## What I'd Add Next

- Backend integration with API calls
- User authentication & multiple accounts
- Budget planning with spending limits
- Recurring transactions
- More advanced predictions (ML-based)
- Tests & CI/CD pipeline
- Deployment to cloud

## Design Highlights

- **Gradient Everywhere** - Cards, buttons, charts use color gradients
- **Smooth Transitions** - Hover effects, animations, scale transforms
- **Color Coding** - Blue (finance), green (income), orange (expenses), red (warnings)
- **Professional Polish** - Shadows, rounded corners, proper spacing
- **Dark Mode** - Fully supported with semantic color adjustments
- **Accessibility** - Proper contrast, icon + text labels, keyboard navigation

## Submission Details

This dashboard meets all assignment requirements:
- ✅ Dashboard overview with multiple visualizations
- ✅ Transactions section with CRUD and filtering
- ✅ Role-based UI (Viewer/Admin modes)
- ✅ Insights section with analytics
- ✅ Proper state management
- ✅ Clean, responsive design
- ✅ Error handling for edge cases
- ✅ Professional UI/UX

Plus extra enhancements:
- ✅ Dark mode
- ✅ Data persistence
- ✅ Export functionality (JSON/CSV)
- ✅ Animations & transitions
- ✅ Predictive analytics
- ✅ Weekly spending charts
- ✅ Smart alerts system

## Notes

- All data is stored locally in your browser (localStorage)
- Sample data includes 34 realistic transactions
- Changes persist automatically
- Export includes full transaction history
- No backend required - fully functional client-side

---

Built with ❤️ for the Zorvyn internship assignment. April 2026.#   f i n a n c e  
 