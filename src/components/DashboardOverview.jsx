import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { TrendingUp, TrendingDown, Wallet, Target, AlertCircle, ArrowUpRight, ArrowDownLeft, Zap, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, Area, AreaChart, LineChart, Line } from 'recharts';
import { colors } from '../data/mockData';

export default function DashboardOverview() {
  const {
    calculateBalance,
    calculateTotalIncome,
    calculateTotalExpenses,
    getBalanceTrend,
    getMonthlyComparison,
    getSpendingByCategory,
    transactions
  } = useFinance();

  const balance = calculateBalance();
  const income = calculateTotalIncome();
  const expenses = calculateTotalExpenses();
  const savingsRate = income > 0 ? ((income - expenses) / income * 100) : 0;
  const balanceTrend = getBalanceTrend();
  const monthlyData = getMonthlyComparison();
  const spendingByCategory = getSpendingByCategory();

  // Prepare pie chart data with colors
  const pieData = spendingByCategory.map(item => ({
    name: item.name,
    value: item.amount,
    fill: colors.categories[item.name] || '#6b7280'
  }));

  // Calculate financial metrics
  const avgMonthlyExpense = expenses / 4;
  const healthScore = Math.min(100, Math.max(0, 100 - (expenses / income * 100) + savingsRate));

  // Calculate weekly spending
  const getWeeklySpending = () => {
    const weekly = {};
    const today = new Date();
    transactions.forEach(t => {
      const txDate = new Date(t.date);
      const daysAgo = Math.floor((today - txDate) / (1000 * 60 * 60 * 24));
      const week = Math.floor(daysAgo / 7);
      if (week <= 4) {
        const weekLabel = week === 0 ? 'This Week' : `${week} weeks ago`;
        if (!weekly[weekLabel]) weekly[weekLabel] = 0;
        if (t.type === 'expense') weekly[weekLabel] += t.amount;
      }
    });
    return Object.entries(weekly).reverse().map(([week, amount]) => ({ week, amount }));
  };

  const weeklyData = getWeeklySpending();

  // Find spending alerts (categories exceeding average)
  const avgCategorySpend = expenses / (spendingByCategory.length || 1);
  const spendingAlerts = spendingByCategory
    .filter(cat => cat.amount > avgCategorySpend * 1.2)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  const MetricCard = ({ label, value, subtext, icon: Icon, color, suffix = '' }) => (
    <div className={`card card-hover bg-gradient-to-br ${color} border-0 relative overflow-hidden group`}>
      <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className="w-32 h-32" />
      </div>
      <div className="relative z-10">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-2">
          <Icon className="w-4 h-4" />
          {label}
        </p>
        <p className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-1">
          {value}{suffix}
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400">{subtext}</p>
      </div>
    </div>
  );

  const SummaryCard = ({ label, value, icon: Icon, trend, color }) => (
    <div className={`card card-hover bg-gradient-to-br ${color} text-white border-0`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm opacity-90 font-medium mb-2">
            {label}
          </p>
          <p className="text-3xl font-bold">
            ${value.toFixed(2)}
          </p>
          {trend && (
            <p className={`text-xs mt-3 flex items-center gap-1 ${
              trend.direction === 'up' ? 'opacity-100' : 'opacity-75'
            }`}>
              {trend.direction === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {trend.percentage}% this month
            </p>
          )}
        </div>
        <Icon className="w-12 h-12 opacity-20" />
      </div>
    </div>
  );

  const HealthBar = ({ score, label }) => (
    <div>
      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-between">
        <span>{label}</span>
        <span className="text-lg font-bold text-blue-600">{score.toFixed(0)}/100</span>
      </p>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 rounded-full ${
            score >= 70 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
            score >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
            'bg-gradient-to-r from-red-500 to-rose-500'
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h2 className="section-title mb-8">Financial Overview</h2>
        
        {/* Primary Metrics - 3 Column */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <SummaryCard
            label="Account Balance"
            value={balance}
            icon={Wallet}
            trend={{ direction: balance >= 0 ? 'up' : 'down', percentage: 5 }}
            color="from-blue-500 to-blue-600"
          />
          <SummaryCard
            label="Total Income"
            value={income}
            icon={ArrowDownLeft}
            trend={{ direction: 'up', percentage: 12 }}
            color="from-emerald-500 to-teal-600"
          />
          <SummaryCard
            label="Total Expenses"
            value={expenses}
            icon={ArrowUpRight}
            trend={{ direction: 'down', percentage: 8 }}
            color="from-orange-500 to-red-600"
          />
        </div>

        {/* Secondary Metrics - 4 Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            label="Savings Rate"
            value={savingsRate.toFixed(1)}
            subtext={`${(income - expenses).toFixed(2)} saved`}
            icon={Target}
            color="from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-950"
            suffix="%"
          />
          <MetricCard
            label="Health Score"
            value={healthScore.toFixed(0)}
            subtext={healthScore >= 70 ? 'Excellent' : healthScore >= 50 ? 'Good' : 'Needs work'}
            icon={AlertCircle}
            color="from-sky-50 to-cyan-50 dark:from-sky-950 dark:to-cyan-950"
            suffix=""
          />
          <MetricCard
            label="Avg Monthly"
            value={avgMonthlyExpense.toFixed(0)}
            subtext="Spending"
            icon={TrendingDown}
            color="from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950"
            suffix=""
          />
          <MetricCard
            label="Active Months"
            value={monthlyData.length}
            subtext="With transactions"
            icon={TrendingUp}
            color="from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950"
            suffix=""
          />
        </div>

        {/* Financial Health Bar */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6">Financial Health</h3>
          <HealthBar score={healthScore} label="Overall Financial Health" />
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-4">
            {healthScore >= 70 
              ? '✨ Your finances are in great shape! Keep maintaining this discipline.' 
              : healthScore >= 50 
              ? '📈 Good progress! Consider optimizing your spending categories.' 
              : '⚠️ Time to review your spending habits and create a better budget.'}
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Balance Trend Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Balance Trend
            </h3>
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-medium">
              Last 30 Days
            </span>
          </div>
          {balanceTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={balanceTrend}>
                <defs>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="formattedDate" 
                  tick={{ fontSize: 11 }}
                  stroke="#94a3b8"
                />
                <YAxis 
                  tick={{ fontSize: 11 }}
                  stroke="#94a3b8"
                  label={{ value: '$', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#balanceGradient)"
                  isAnimationActive={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-slate-600 dark:text-slate-400 text-center py-12">
              No data available
            </p>
          )}
        </div>

        {/* Monthly Comparison Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Monthly Breakdown
            </h3>
            <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full font-medium">
              Income vs Expense
            </span>
          </div>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 11 }}
                  stroke="#94a3b8"
                />
                <YAxis 
                  tick={{ fontSize: 11 }}
                  stroke="#94a3b8"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                <Legend />
                <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expenses" fill="#f97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-slate-600 dark:text-slate-400 text-center py-12">
              No data available
            </p>
          )}
        </div>
      </div>

      {/* Weekly Spending & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Spending Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                Weekly Spending
              </h3>
            </div>
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-medium">
              Last 4 Weeks
            </span>
          </div>
          {weeklyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="week" 
                  tick={{ fontSize: 11 }}
                  stroke="#94a3b8"
                />
                <YAxis 
                  tick={{ fontSize: 11 }}
                  stroke="#94a3b8"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                <Bar dataKey="amount" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-slate-600 dark:text-slate-400 text-center py-8">
              No weekly data available
            </p>
          )}
        </div>

        {/* Spending Alerts */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                Spending Alerts
              </h3>
            </div>
            <span className="text-xs bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full font-medium">
              High Spending
            </span>
          </div>
          {spendingAlerts.length > 0 ? (
            <div className="space-y-3">
              {spendingAlerts.map((alert, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-amber-900 dark:text-amber-300">
                      {alert.name}
                    </p>
                    <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                      ${alert.amount.toFixed(2)} - {Math.round((alert.amount / avgCategorySpend - 1) * 100)}% above average
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <TrendingDown className="w-12 h-12 text-green-500 mx-auto mb-3 opacity-50" />
              <p className="text-sm text-slate-600 dark:text-slate-400">
                All spending is within normal range ✨
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Spending Categories */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Spending by Category
          </h3>
          <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full font-medium">
            {spendingByCategory.length} categories
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="col-span-full text-slate-600 dark:text-slate-400 text-center py-8">
              No spending data
            </p>
          )}
          <div className="flex flex-col justify-center space-y-3">
            {spendingByCategory.map((category, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors.categories[category.name] || '#6b7280' }}
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {category.name}
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-50">
                  ${category.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
