import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Trash2, Edit2, Plus, Search } from 'lucide-react';
import { categories, colors } from '../data/mockData';

const ActionButton = ({ title, disabled, onClick, children, className = '' }) => (
  <button
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
    title={disabled ? 'Admin only feature' : title}
    className={`btn ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
  >
    {children}
  </button>
);

export default function TransactionsSection() {
  const {
    getSortedTransactions,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    userRole,
    addTransaction,
    updateTransaction,
    deleteTransaction
  } = useFinance();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: 'expense',
    category: 'Groceries',
    description: '',
    amount: ''
  });

  const transactions = getSortedTransactions();

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (userRole !== 'admin') {
      alert('Viewer mode: cannot add transactions.');
      return;
    }
    if (!formData.description || !formData.amount) {
      alert('Please fill in all fields');
      return;
    }
    
    try {
      addTransaction({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      setFormData({
        type: 'expense',
        category: 'Groceries',
        description: '',
        amount: ''
      });
      setShowAddForm(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdateTransaction = (e, id) => {
    e.preventDefault();
    if (userRole !== 'admin') {
      alert('Viewer mode: cannot edit transactions.');
      return;
    }
    try {
      updateTransaction(id, {
        ...formData,
        amount: parseFloat(formData.amount)
      });
      setEditingId(null);
      setFormData({
        type: 'expense',
        category: 'Groceries',
        description: '',
        amount: ''
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        deleteTransaction(id);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleEditClick = (transaction) => {
    setEditingId(transaction.id);
    setFormData({
      type: transaction.type,
      category: transaction.category,
      description: transaction.description,
      amount: transaction.amount.toString()
    });
  };

  const expenseCategories = categories.expense;
  const incomeCategories = categories.income;
  const currentCategories = formData.type === 'income' ? incomeCategories : expenseCategories;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="section-title">Transactions</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Current role: <span className={userRole === 'admin' ? 'text-emerald-500' : 'text-amber-400'}>{userRole}</span>
          </p>
        </div>

        {userRole === 'admin' ? (
          <ActionButton
            title="Add Transaction"
            disabled={false}
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary"
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </ActionButton>
        ) : (
          <span className="text-sm text-slate-500 dark:text-slate-400">Viewer mode: read-only (Add/Edit/Delete disabled)</span>
        )}
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && userRole === 'admin' && (
        <div className="card border-2 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              {editingId ? 'Edit Transaction' : 'Add New Transaction'}
            </h3>
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
                setFormData({
                  type: 'expense',
                  category: 'Groceries',
                  description: '',
                  amount: ''
                });
              }}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
            >
              ✕
            </button>
          </div>

          <form onSubmit={(e) => editingId ? handleUpdateTransaction(e, editingId) : handleAddTransaction(e)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({
                    ...formData,
                    type: e.target.value,
                    category: e.target.value === 'income' ? 'Salary' : 'Groceries'
                  })}
                  className="input"
                  disabled={userRole !== 'admin'}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input"
                  disabled={userRole !== 'admin'}
                >
                  {currentCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Weekly groceries"
                  className="input"
                  disabled={userRole !== 'admin'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  className="input"
                  disabled={userRole !== 'admin'}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={userRole !== 'admin'}>
                {editingId ? 'Update' : 'Add'} Transaction
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                  setFormData({
                    type: 'expense',
                    category: 'Groceries',
                    description: '',
                    amount: ''
                  });
                }}
                className="btn btn-secondary"
                disabled={userRole !== 'admin'}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters and Search */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search transactions..."
              value={filters.searchTerm}
              onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
              className="input"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="input"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="input"
          >
            <option value="all">All Categories</option>
            {[...new Set([...expenseCategories, ...incomeCategories])].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Sort Controls */}
        <div className="mt-4 flex gap-2">
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input py-1 text-sm"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </label>
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="btn btn-secondary text-sm"
          >
            {sortOrder === 'desc' ? '↓ Descending' : '↑ Ascending'}
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card overflow-x-auto">
        {transactions.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="text-left px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">
                  Date
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">
                  Description
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">
                  Category
                </th>
                <th className="text-right px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">
                  Amount
                </th>
                <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">
                  Type
                </th>
                <th className="text-center px-4 py-3 font-semibold text-slate-900 dark:text-slate-50">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <td className="px-4 py-3 text-slate-900 dark:text-slate-50">
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: '2-digit'
                    })}
                  </td>
                  <td className="px-4 py-3 text-slate-900 dark:text-slate-50">
                    {transaction.description}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-medium">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-slate-50">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${
                      transaction.type === 'income'
                        ? 'badge-success'
                        : 'badge-danger'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {userRole === 'admin' ? (
                      <div className="flex justify-center gap-2">
                        <ActionButton
                          title="Edit"
                          disabled={false}
                          onClick={() => handleEditClick(transaction)}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-2"
                        >
                          <Edit2 className="w-4 h-4" />
                        </ActionButton>
                        <ActionButton
                          title="Delete"
                          disabled={false}
                          onClick={() => handleDeleteTransaction(transaction.id)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </ActionButton>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500 dark:text-slate-400">Read-only</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">
              No transactions found. {userRole === 'admin' && 'Add one to get started!'}
            </p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {transactions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              Total Transactions
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              {transactions.length}
            </p>
          </div>
          <div className="card">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              Total Amount
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              ${transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </p>
          </div>
          <div className="card">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              Average Amount
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              ${(transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length).toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
