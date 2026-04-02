export const initialBalance = 5000;

export const mockTransactions = [
  // January transactions
  {
    id: 1,
    date: '2026-01-05',
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 4500
  },
  {
    id: 2,
    date: '2026-01-08',
    type: 'expense',
    category: 'Groceries',
    description: 'Weekly groceries at supermarket',
    amount: 85.50
  },
  {
    id: 3,
    date: '2026-01-10',
    type: 'expense',
    category: 'Utilities',
    description: 'Electric and water bill',
    amount: 120
  },
  {
    id: 4,
    date: '2026-01-12',
    type: 'expense',
    category: 'Entertainment',
    description: 'Movie tickets and dinner',
    amount: 65
  },
  {
    id: 5,
    date: '2026-01-15',
    type: 'expense',
    category: 'Transportation',
    description: 'Gas and parking',
    amount: 45.75
  },
  {
    id: 6,
    date: '2026-01-18',
    type: 'income',
    category: 'Freelance',
    description: 'Web design project',
    amount: 300
  },
  {
    id: 7,
    date: '2026-01-20',
    type: 'expense',
    category: 'Shopping',
    description: 'Clothes and shoes',
    amount: 150
  },
  {
    id: 8,
    date: '2026-01-22',
    type: 'expense',
    category: 'Groceries',
    description: 'Farmers market purchases',
    amount: 62.30
  },
  {
    id: 9,
    date: '2026-01-25',
    type: 'expense',
    category: 'Dining',
    description: 'Restaurant dinner',
    amount: 75.20
  },
  {
    id: 10,
    date: '2026-01-28',
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 4500
  },
  // February transactions
  {
    id: 11,
    date: '2026-02-02',
    type: 'expense',
    category: 'Healthcare',
    description: 'Doctor appointment',
    amount: 120
  },
  {
    id: 12,
    date: '2026-02-05',
    type: 'expense',
    category: 'Groceries',
    description: 'Weekly groceries',
    amount: 95.60
  },
  {
    id: 13,
    date: '2026-02-08',
    type: 'income',
    category: 'Freelance',
    description: 'UI/UX design consultation',
    amount: 400
  },
  {
    id: 14,
    date: '2026-02-10',
    type: 'expense',
    category: 'Utilities',
    description: 'Internet and phone bill',
    amount: 85
  },
  {
    id: 15,
    date: '2026-02-12',
    type: 'expense',
    category: 'Entertainment',
    description: 'Concert tickets',
    amount: 120
  },
  {
    id: 16,
    date: '2026-02-15',
    type: 'expense',
    category: 'Shopping',
    description: 'Tech gadgets',
    amount: 220
  },
  {
    id: 17,
    date: '2026-02-18',
    type: 'expense',
    category: 'Transportation',
    description: 'Monthly transit pass',
    amount: 50
  },
  {
    id: 18,
    date: '2026-02-20',
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 4500
  },
  {
    id: 19,
    date: '2026-02-22',
    type: 'expense',
    category: 'Dining',
    description: 'Weekend brunch',
    amount: 55.80
  },
  {
    id: 20,
    date: '2026-02-25',
    type: 'expense',
    category: 'Groceries',
    description: 'Monthly bulk shopping',
    amount: 120.45
  },
  // March transactions
  {
    id: 21,
    date: '2026-03-02',
    type: 'expense',
    category: 'Healthcare',
    description: 'Gym membership',
    amount: 50
  },
  {
    id: 22,
    date: '2026-03-05',
    type: 'income',
    category: 'Freelance',
    description: 'Logo design project',
    amount: 350
  },
  {
    id: 23,
    date: '2026-03-08',
    type: 'expense',
    category: 'Entertainment',
    description: 'Gaming purchase',
    amount: 65
  },
  {
    id: 24,
    date: '2026-03-10',
    type: 'expense',
    category: 'Utilities',
    description: 'Electric and gas bill',
    amount: 135
  },
  {
    id: 25,
    date: '2026-03-12',
    type: 'expense',
    category: 'Groceries',
    description: 'Weekly groceries',
    amount: 88.70
  },
  {
    id: 26,
    date: '2026-03-15',
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 4500
  },
  {
    id: 27,
    date: '2026-03-18',
    type: 'expense',
    category: 'Shopping',
    description: 'Spring wardrobe update',
    amount: 180
  },
  {
    id: 28,
    date: '2026-03-20',
    type: 'expense',
    category: 'Dining',
    description: 'Celebration dinner',
    amount: 95.50
  },
  {
    id: 29,
    date: '2026-03-22',
    type: 'expense',
    category: 'Transportation',
    description: 'Car maintenance',
    amount: 200
  },
  {
    id: 30,
    date: '2026-03-25',
    type: 'income',
    category: 'Bonus',
    description: 'Performance bonus',
    amount: 500
  },
  // April (recent) transactions
  {
    id: 31,
    date: '2026-03-28',
    type: 'expense',
    category: 'Groceries',
    description: 'Weekly shopping',
    amount: 92.30
  },
  {
    id: 32,
    date: '2026-03-30',
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 4500
  },
  {
    id: 33,
    date: '2026-04-01',
    type: 'expense',
    category: 'Healthcare',
    description: 'Dental checkup',
    amount: 150
  },
  {
    id: 34,
    date: '2026-04-02',
    type: 'expense',
    category: 'Entertainment',
    description: 'Streaming subscriptions',
    amount: 32.99
  },
  {
    id: 35,
    date: '2026-04-04',
    type: 'expense',
    category: 'Dining',
    description: 'Weekend cafe brunch',
    amount: 28.40
  },
  {
    id: 36,
    date: '2026-04-06',
    type: 'expense',
    category: 'Transportation',
    description: 'Ride share to office',
    amount: 18.25
  },
  {
    id: 37,
    date: '2026-04-08',
    type: 'income',
    category: 'Freelance',
    description: 'Landing page refresh',
    amount: 275
  },
  {
    id: 38,
    date: '2026-04-09',
    type: 'expense',
    category: 'Groceries',
    description: 'Midweek groceries',
    amount: 74.15
  },
  {
    id: 39,
    date: '2026-04-11',
    type: 'expense',
    category: 'Utilities',
    description: 'Water bill',
    amount: 42.80
  },
  {
    id: 40,
    date: '2026-04-13',
    type: 'expense',
    category: 'Shopping',
    description: 'Home office supplies',
    amount: 96.90
  },
  {
    id: 41,
    date: '2026-04-15',
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 4500
  },
  {
    id: 42,
    date: '2026-04-17',
    type: 'expense',
    category: 'Healthcare',
    description: 'Pharmacy essentials',
    amount: 36.70
  },
  {
    id: 43,
    date: '2026-04-19',
    type: 'expense',
    category: 'Entertainment',
    description: 'Live comedy show',
    amount: 48
  },
  {
    id: 44,
    date: '2026-04-21',
    type: 'expense',
    category: 'Groceries',
    description: 'Weekly groceries',
    amount: 89.35
  },
  {
    id: 45,
    date: '2026-04-23',
    type: 'income',
    category: 'Bonus',
    description: 'Quarterly performance bonus',
    amount: 650
  },
  {
    id: 46,
    date: '2026-04-25',
    type: 'expense',
    category: 'Dining',
    description: 'Dinner with friends',
    amount: 64.20
  },
  {
    id: 47,
    date: '2026-04-27',
    type: 'expense',
    category: 'Transportation',
    description: 'Fuel top-up',
    amount: 52.10
  },
  {
    id: 48,
    date: '2026-04-30',
    type: 'income',
    category: 'Investment',
    description: 'Dividend payout',
    amount: 120
  },
  {
    id: 49,
    date: '2026-05-01',
    type: 'expense',
    category: 'Utilities',
    description: 'Internet renewal',
    amount: 79
  }
];

export const categories = {
  income: ['Salary', 'Freelance', 'Bonus', 'Investment'],
  expense: ['Groceries', 'Utilities', 'Entertainment', 'Shopping', 'Dining', 'Transportation', 'Healthcare']
};

export const colors = {
  income: '#10b981',
  expense: '#ef4444',
  categories: {
    'Groceries': '#84cc16',
    'Utilities': '#f59e0b',
    'Entertainment': '#ec4899',
    'Shopping': '#3b82f6',
    'Dining': '#f97316',
    'Transportation': '#06b6d4',
    'Healthcare': '#8b5cf6',
    'Salary': '#10b981',
    'Freelance': '#14b8a6',
    'Bonus': '#fbbf24'
  }
};
