# Quick Start

## Setup (Takes 2 minutes)

```bash
npm install
npm run dev
```

Opens at localhost:3000 with sample data already loaded.

## What to Try First

### Explore the dashboard
- Check the summary cards at the top (balance, income, expenses)
- Look at the financial health score (0-100 rating)
- Review the balance trend chart (30-day view)
- Check the weekly spending chart (patterns over 4 weeks)
- Look at the monthly breakdown (income vs expenses)
- See the spending alerts for flagged categories
- Explore the pie chart showing spending by category

### Check your financial health
- Find the Financial Health Score card at the top
- See the color-coded progress bar (green = healthy, red = needs work)
- Read what your score means

### Switch between Viewer and Admin
- Click the role button in the header (👁️ Viewer or 👨‍💼 Admin)
- Switch roles and see what changes
- Viewer is read-only, Admin lets you modify data

### Add/edit a transaction
- In Admin mode, click "Add Transaction" button in the Transactions tab
- Fill in the details (date, amount, category, type)
- Edit or delete existing ones (click the buttons)

### Filter and search
- Use the search box to find transactions
- Filter by type (income/expense) or category
- Sort by date or amount
- Try combining multiple filters

### Dark mode
- Click the moon/sun icon in the header
- It switches the theme and saves your preference automatically

### Export your data
- Click "Export Data" in the sidebar
- Choose JSON or CSV
- File downloads with a timestamp

### Check insights & analytics
Go to the Insights tab:
- See your **Financial Health Score** in a premium card
- View **Predictive Analytics**:
  - Average monthly spending
  - Estimated annual spending  
  - Projected balance in 3 months
- Read **Key Observations**:
  - Top spending category
  - Best income month
  - Peak spending month
  - Balance status
- Get **Smart Recommendations** tailored to your data:
  - Savings optimization tips
  - Spending ratio improvements
  - Investment suggestions
  - Budget optimization
- Look at **Monthly Trends** chart
- See transaction stats

### Test the alerts
- Go to Dashboard
- Check the "Spending Alerts" section
- It shows categories over 20% above average
- Alerts are color-coded for quick scanning

## Tips for Better Experience

- Start in the Insights tab to understand your data
- Use the weekly spending chart to spot patterns
- Check alerts regularly to monitor spending
- Toggle dark mode to test how it looks
- Try exporting to see data in different formats

## Gotchas

**Port already in use?** 
Vite will ask you to use a different port. Just hit Y.

**Data not loading?** 
Clear your browser cache (F12 → right-click refresh → hard refresh). Or clear localStorage in DevTools.

**Lost your changes?** 
localStorage only works for the current browser/device. If you close/reopen in a different browser, you'll see the original sample data again.

**Charts not showing?**
Make sure you have enough data. The sample data has 30+ transactions, so most charts should be visible.

## That's it

Poke around. Try all the tabs and features. Everything is pretty self-explanatory. If something breaks, open the browser console (F12) and you'll see what went wrong.

When you're ready to deploy, run:
```bash
npm run build
```

This creates an optimized bundle in the `dist/` folder ready for deployment.

---


## Need Help?

1. Check README.md for comprehensive documentation
2. Review IMPLEMENTATION_NOTES.md for design decisions
3. Check FEATURE_CHECKLIST.md to verify all requirements are met
4. Look at component comments for technical details
5. Open browser DevTools (F12) to see any error messages

## Role-Based Behavior Checklist

- [x] Admin: full add/edit/delete access
- [x] Viewer: read-only (no add/edit/delete, inputs disabled)
- [x] Header role toggle and persistent state
- [x] Role badge visible in header and transactions page
- [x] `Admin only feature` tooltips for locked actions
- [x] Build verified with `npm run build`


---

**Ready? Run `npm install && npm run dev` and start exploring!**

Enjoy exploring the Finance Dashboard! 🎉💰
