import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Lightbulb, TrendingUp, Target, AlertCircle, Award, Zap, BarChart3, Brain } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function InsightsSection() {
  const {
    calculateBalance,
    calculateTotalIncome,
    calculateTotalExpenses,
    getHighestSpendingCategory,
    getMonthlyComparison,
    getSpendingByCategory,
    getSortedTransactions
  } = useFinance();

  const balance = calculateBalance();
  const income = calculateTotalIncome();
  const expenses = calculateTotalExpenses();
  const highestCategory = getHighestSpendingCategory();
  const monthlyData = getMonthlyComparison();
  const spendingByCategory = getSpendingByCategory();
  const allTransactions = getSortedTransactions();

  const savingsRate = income > 0 ? ((income - expenses) / income * 100).toFixed(1) : 0;
  const avgMonthlyExpense = expenses / (monthlyData.length || 1);
  const avgMonthlyIncome = income / (monthlyData.length || 1);
  const spendingRatio = income > 0 ? ((expenses / income) * 100).toFixed(1) : 0;
  
  const highestIncomeMonth = monthlyData.length > 0
    ? monthlyData.reduce((prev, current) => current.income > prev.income ? current : prev)
    : null;

  const highestExpenseMonth = monthlyData.length > 0
    ? monthlyData.reduce((prev, current) => current.expense > prev.expense ? current : prev)
    : null;

  const calculateTrend = () => {
    if (monthlyData.length < 2) return null;
    const recentBalance = monthlyData[monthlyData.length - 1].income - monthlyData[monthlyData.length - 1].expense;
    const previousBalance = monthlyData[monthlyData.length - 2].income - monthlyData[monthlyData.length - 2].expense;
    return {
      direction: recentBalance > previousBalance ? 'up' : 'down',
      change: Math.abs(recentBalance - previousBalance).toFixed(2)
    };
  };

  const trend = calculateTrend();
  const financialScore = Math.min(100, Math.max(0, 50 + (savingsRate >= 20 ? 20 : 0) + (spendingRatio <= 80 ? 15 : 0) + (balance > 0 ? 15 : 0)));

  const MetricCard = ({ icon: Icon, label, value, color, bgColor }) => (
    <div className={`card card-hover bg-gradient-to-br ${bgColor} border-0 relative overflow-hidden group`}>
      <div className="absolute -right-8 -top-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-40 h-40" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">{label}</p>
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
        <p className="text-4xl font-bold text-slate-900 dark:text-slate-50">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
        <div className="relative">
          <h2 className="section-title mb-2">Financial Intelligence</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl">
            Powered by AI to help you optimize spending and grow your wealth
          </p>
        </div>
      </div>

      <div className="card bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-0 text-white shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <Award className="w-8 h-8" />
                Financial Health Score
              </h3>
              <p className="text-sm opacity-90">Your overall wellness rating</p>
            </div>
            <div className="text-6xl font-black opacity-20">{financialScore}</div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-end gap-6">
              <div className="flex-1">
                <div className="relative w-full bg-white/20 rounded-full h-4 overflow-hidden backdrop-blur-sm border border-white/30">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-300 via-green-300 to-emerald-400 transition-all duration-500"
                    style={{ width: `${financialScore}%` }}
                  />
                </div>
                <div className="flex justify-between mt-3 text-sm">
                  <span>Poor</span>
                  <span className="font-bold">{financialScore}/100</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm opacity-90 mt-4">
              {financialScore >= 70 ? '🎉 Outstanding! Your finances are thriving!' : 
               financialScore >= 50 ? '📈 Good trajectory. Keep optimizing!' : 
               '⚠️ Room for improvement. Focus on savings!'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={Target}
          label="Savings Rate"
          value={`${savingsRate}%`}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          bgColor="from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900"
        />
        <MetricCard
          icon={TrendingUp}
          label="Monthly Avg Income"
          value={`$${avgMonthlyIncome.toFixed(0)}`}
          color="bg-gradient-to-r from-emerald-500 to-emerald-600"
          bgColor="from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900"
        />
        <MetricCard
          icon={BarChart3}
          label="Spending Ratio"
          value={`${spendingRatio}%`}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
          bgColor="from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900"
        />
        <MetricCard
          icon={Zap}
          label="Trend"
          value={trend?.direction === 'up' ? '↑ Up' : '↓ Down'}
          color={trend?.direction === 'up' ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'}
          bgColor={trend?.direction === 'up' ? 'from-green-50 to-green-100 dark:from-green-950 dark:to-green-900' : 'from-red-50 to-red-100 dark:from-red-950 dark:to-red-900'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card border-l-4 border-purple-500 shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-500" />
            Key Observations
          </h3>
          <div className="space-y-4">
            {highestCategory && (
              <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950 rounded-xl border-l-4 border-rose-500 hover:shadow-md transition-shadow">
                <p className="text-sm font-bold text-rose-900 dark:text-rose-200 uppercase tracking-wide mb-1">Top Spending</p>
                <p className="text-2xl font-bold text-rose-900 dark:text-rose-100">{highestCategory.name}</p>
                <div className="mt-2 text-sm text-rose-700 dark:text-rose-300">
                  <p>${highestCategory.value.toFixed(2)} • {((highestCategory.value / expenses) * 100).toFixed(1)}% of total</p>
                </div>
              </div>
            )}

            {highestIncomeMonth && (
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-xl border-l-4 border-emerald-500 hover:shadow-md transition-shadow">
                <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wide mb-1">Best Income Month</p>
                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{highestIncomeMonth.month}</p>
                <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-300">${highestIncomeMonth.income.toFixed(2)}</p>
              </div>
            )}

            {highestExpenseMonth && (
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-xl border-l-4 border-amber-500 hover:shadow-md transition-shadow">
                <p className="text-sm font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wide mb-1">Peak Spending Month</p>
                <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">{highestExpenseMonth.month}</p>
                <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">${highestExpenseMonth.expense.toFixed(2)}</p>
              </div>
            )}

            <div className={`p-4 rounded-xl border-l-4 ${balance >= 0 ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-emerald-500' : 'bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 border-red-500'} hover:shadow-md transition-shadow`}>
              <p className={`text-sm font-bold uppercase tracking-wide mb-1 ${balance >= 0 ? 'text-emerald-900 dark:text-emerald-200' : 'text-red-900 dark:text-red-200'}`}>
                Balance Status
              </p>
              <p className={`text-2xl font-bold ${balance >= 0 ? 'text-emerald-900 dark:text-emerald-100' : 'text-red-900 dark:text-red-100'}`}>
                ${balance.toFixed(2)}
              </p>
              <p className={`mt-2 text-sm ${balance >= 0 ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
                {balance >= 0 ? '✓ Healthy Position' : '⚠️ Needs Attention'}
              </p>
            </div>
          </div>
        </div>

        <div className="card border-l-4 border-yellow-500 shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-6 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            Smart Recommendations
          </h3>
          <div className="space-y-3">
            {savingsRate < 20 && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500 rounded-lg">
                <p className="font-semibold text-yellow-900 dark:text-yellow-200 text-sm">Boost Savings Habit</p>
                <p className="text-xs text-yellow-800 dark:text-yellow-300 mt-1">Target 20-30% of income. You're at {savingsRate}%.</p>
              </div>
            )}

            {savingsRate >= 20 && (
              <div className="p-3 bg-green-50 dark:bg-green-950 border-l-4 border-green-500 rounded-lg">
                <p className="font-semibold text-green-900 dark:text-green-200 text-sm">🌟 Excellent Savings!</p>
                <p className="text-xs text-green-800 dark:text-green-300 mt-1">Outstanding discipline at {savingsRate}%!</p>
              </div>
            )}

            {spendingRatio > 90 && (
              <div className="p-3 bg-red-50 dark:bg-red-950 border-l-4 border-red-500 rounded-lg">
                <p className="font-semibold text-red-900 dark:text-red-200 text-sm">Optimize Spending</p>
                <p className="text-xs text-red-800 dark:text-red-300 mt-1">Reduce spending ratio from {spendingRatio}% to 80%.</p>
              </div>
            )}

            {highestCategory && (
              <div className="p-3 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 rounded-lg">
                <p className="font-semibold text-blue-900 dark:text-blue-200 text-sm">Watch {highestCategory.name}</p>
                <p className="text-xs text-blue-800 dark:text-blue-300 mt-1">{((highestCategory.value / expenses) * 100).toFixed(0)}% of budget goes here.</p>
              </div>
            )}

            {balance > expenses * 2 && (
              <div className="p-3 bg-purple-50 dark:bg-purple-950 border-l-4 border-purple-500 rounded-lg">
                <p className="font-semibold text-purple-900 dark:text-purple-200 text-sm">Consider Investing</p>
                <p className="text-xs text-purple-800 dark:text-purple-300 mt-1">Strong savings! Explore investment options.</p>
              </div>
            )}

            {trend?.direction === 'up' && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950 border-l-4 border-emerald-500 rounded-lg">
                <p className="font-semibold text-emerald-900 dark:text-emerald-200 text-sm">📈 Momentum Rising</p>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1">+${trend.change} improvement! Keep it up!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {monthlyData.length > 0 && (
        <>
          {/* Spending Forecast */}
          <div className="card border-l-4 border-indigo-500 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-1 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-indigo-500" />
              Predictive Analytics
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Based on your spending patterns</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 rounded-xl">
                <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide mb-2">Avg Monthly Spend</p>
                <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">${avgMonthlyExpense.toFixed(0)}</p>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2">
                  {monthlyData.length > 0 ? 'Based on ' + monthlyData.length + ' months' : 'Need more data'}
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-950 rounded-xl">
                <p className="text-xs font-semibold text-violet-700 dark:text-violet-300 uppercase tracking-wide mb-2">Est. Annual Spend</p>
                <p className="text-2xl font-bold text-violet-900 dark:text-violet-100">${(avgMonthlyExpense * 12).toFixed(0)}</p>
                <p className="text-xs text-violet-600 dark:text-violet-400 mt-2">
                  ${(avgMonthlyExpense * 12 / 12).toFixed(0)}/month avg
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 rounded-xl">
                <p className="text-xs font-semibold text-pink-700 dark:text-pink-300 uppercase tracking-wide mb-2">Projected Balance</p>
                <p className="text-2xl font-bold text-pink-900 dark:text-pink-100">
                  ${(balance + (avgMonthlyIncome - avgMonthlyExpense) * 3).toFixed(0)}
                </p>
                <p className="text-xs text-pink-600 dark:text-pink-400 mt-2">
                  In next 3 months
                </p>
              </div>
            </div>
          </div>

          {/* Monthly Trends */}
          {/* Monthly Trends */}
          <div className="card shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-6">Monthly Trends</h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={monthlyData}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.3}/>
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#f97316" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '2px solid #3b82f6',
                    borderRadius: '12px',
                    color: '#f1f5f9'
                  }}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="income" fill="url(#incomeGrad)" radius={[12, 12, 0, 0]} name="Income" />
                <Bar dataKey="expense" fill="url(#expenseGrad)" radius={[12, 12, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-0 shadow-md">
          <p className="text-sm font-bold uppercase text-blue-700 dark:text-blue-300 tracking-wider">Total Transactions</p>
          <p className="text-4xl font-bold text-blue-900 dark:text-blue-100 mt-2">{allTransactions.length}</p>
        </div>
        <div className="card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-0 shadow-md">
          <p className="text-sm font-bold uppercase text-purple-700 dark:text-purple-300 tracking-wider">Categories</p>
          <p className="text-4xl font-bold text-purple-900 dark:text-purple-100 mt-2">{spendingByCategory.length}</p>
        </div>
        <div className="card bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-0 shadow-md">
          <p className="text-sm font-bold uppercase text-emerald-700 dark:text-emerald-300 tracking-wider">Months Tracked</p>
          <p className="text-4xl font-bold text-emerald-900 dark:text-emerald-100 mt-2">{monthlyData.length}</p>
        </div>
      </div>
    </div>
  );
}
