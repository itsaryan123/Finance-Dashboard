import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockTransactions, initialBalance } from '../data/mockData';

const FinanceContext = createContext();

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
};

export const FinanceProvider = ({ children }) => {
  // Role state - determines what user can do
  const [userRole, setUserRole] = useState('viewer');
  
  // Transaction state
  const [transactions, setTransactions] = useState([]);
  
  // Filters state
  const [filters, setFilters] = useState({
    type: 'all', // 'all', 'income', 'expense'
    category: 'all',
    searchTerm: ''
  });
  
  // Sorting state
  const [sortBy, setSortBy] = useState('date'); // 'date', 'amount'
  const [sortOrder, setSortOrder] = useState('desc');
  
  // UI state
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Initialize data from localStorage
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    const savedRole = localStorage.getItem('userRole');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions(mockTransactions);
    }
    
    if (savedRole) setUserRole(savedRole.toLowerCase() === 'admin' ? 'admin' : 'viewer');
    if (savedDarkMode) setIsDarkMode(JSON.parse(savedDarkMode));
  }, []);
  
  // Persist transactions to localStorage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);
  
  // Persist role to localStorage
  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);
  
  // Persist dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  
  // Calculate total balance
  const calculateBalance = () => {
    return transactions.reduce((acc, transaction) => {
      return transaction.type === 'income' 
        ? acc + transaction.amount 
        : acc - transaction.amount;
    }, initialBalance);
  };
  
  // Calculate total income
  const calculateTotalIncome = () => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
  };
  
  // Calculate total expenses
  const calculateTotalExpenses = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
  };
  
  // Filter transactions based on current filter state
  const getFilteredTransactions = () => {
    let filtered = [...transactions];
    
    // Apply type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type);
    }
    
    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(t => t.category === filters.category);
    }
    
    // Apply search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(t =>
        t.description.toLowerCase().includes(term) ||
        t.category.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  };
  
  // Get sorted transactions
  const getSortedTransactions = () => {
    const filtered = getFilteredTransactions();
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'amount') {
        comparison = a.amount - b.amount;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  };
  
  // Get spending breakdown by category
  const getSpendingByCategory = () => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const breakdown = {};
    
    expenses.forEach(t => {
      breakdown[t.category] = (breakdown[t.category] || 0) + t.amount;
    });
    
    return Object.entries(breakdown)
      .map(([category, amount]) => ({
        name: category,
        value: amount
      }))
      .sort((a, b) => b.value - a.value);
  };
  
  // Get balance trend data for last 30 days
  const getBalanceTrend = () => {
    let balance = initialBalance;
    const trend = [];
    const today = new Date();
    
    // Generate last 30 days
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Calculate balance up to this date
      const txnUpToDate = transactions.filter(t => t.date <= dateStr);
      const balanceAtDate = txnUpToDate.reduce((acc, t) => {
        return t.type === 'income' ? acc + t.amount : acc - t.amount;
      }, initialBalance);
      
      trend.push({
        date: dateStr,
        formattedDate: date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        balance: balanceAtDate
      });
    }
    
    return trend;
  };
  
  // Get highest spending category
  const getHighestSpendingCategory = () => {
    const breakdown = getSpendingByCategory();
    return breakdown.length > 0 ? breakdown[0] : null;
  };
  
  // Get monthly comparison
  const getMonthlyComparison = () => {
    const months = {};
    
    transactions.forEach(t => {
      const date = new Date(t.date);
      const month = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
      
      if (!months[month]) {
        months[month] = { income: 0, expense: 0 };
      }
      
      if (t.type === 'income') {
        months[month].income += t.amount;
      } else {
        months[month].expense += t.amount;
      }
    });
    
    return Object.entries(months)
      .slice(-6) // Last 6 months
      .map(([month, data]) => ({
        month,
        ...data
      }));
  };
  
  // Add a new transaction (only admin)
  const addTransaction = (transaction) => {
    if (userRole !== 'admin') {
      throw new Error('Only admins can add transactions');
    }
    
    const newTransaction = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...transaction
    };
    
    setTransactions([newTransaction, ...transactions]);
  };
  
  // Edit a transaction (only admin)
  const updateTransaction = (id, updates) => {
    if (userRole !== 'admin') {
      throw new Error('Only admins can edit transactions');
    }
    
    setTransactions(
      transactions.map(t => t.id === id ? { ...t, ...updates } : t)
    );
  };
  
  // Delete a transaction (only admin)
  const deleteTransaction = (id) => {
    if (userRole !== 'admin') {
      throw new Error('Only admins can delete transactions');
    }
    
    setTransactions(transactions.filter(t => t.id !== id));
  };
  
  // Export transactions as JSON
  const exportAsJSON = () => {
    const dataStr = JSON.stringify(transactions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `transactions-${new Date().toLocaleDateString()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  // Export transactions as CSV
  const exportAsCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Date,Type,Category,Description,Amount\n';
    
    transactions.forEach(t => {
      csvContent += `${t.date},${t.type},${t.category},${t.description},${t.amount}\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `transactions-${new Date().toLocaleDateString()}.csv`);
    link.click();
  };
  
  const value = {
    // State
    userRole,
    transactions,
    filters,
    sortBy,
    sortOrder,
    isDarkMode,
    
    // Setters
    setUserRole,
    setFilters,
    setSortBy,
    setSortOrder,
    setIsDarkMode,
    
    // Calculations
    calculateBalance,
    calculateTotalIncome,
    calculateTotalExpenses,
    getFilteredTransactions,
    getSortedTransactions,
    getSpendingByCategory,
    getBalanceTrend,
    getHighestSpendingCategory,
    getMonthlyComparison,
    
    // Actions
    addTransaction,
    updateTransaction,
    deleteTransaction,
    exportAsJSON,
    exportAsCSV
  };
  
  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
