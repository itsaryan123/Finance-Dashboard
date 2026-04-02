import React from 'react';
import { BarChart3, CreditCard, TrendingUp, Download } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

export default function Sidebar({ activeTab, setActiveTab, isOpen, onClose }) {
  const { exportAsJSON, exportAsCSV, userRole } = useFinance();
  const [showExportMenu, setShowExportMenu] = React.useState(false);
  const [showProfileDetails, setShowProfileDetails] = React.useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'insights', label: 'Insights', icon: TrendingUp }
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 text-white flex flex-col border-r border-slate-800/50 shadow-xl transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } md:relative md:translate-x-0 md:w-64`}>
      <div className="flex justify-between items-center p-4 md:hidden">
        <div className="font-bold text-white">Menu</div>
        <button
          onClick={onClose}
          className="text-white bg-slate-700 rounded-md px-2 py-1"
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-800/50 backdrop-blur-sm">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
            💰
          </div>
          <div>
            <h2 className="font-bold text-xl bg-gradient-to-r from-blue-300 via-blue-200 to-purple-300 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:to-purple-200 transition-all">
              FinTrack
            </h2>
            <p className="text-xs text-slate-400 font-medium">Pro Edition</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-3 opacity-75">
          📊 Menu
        </p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-semibold text-sm group relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity ${isActive ? 'opacity-20' : ''}`} />
              <Icon className={`w-5 h-5 relative transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Export Section */}
      <div className="p-4 border-t border-slate-800/50 backdrop-blur-sm space-y-3">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2 opacity-75">
          🛠️ Tools
        </p>
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="w-full flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-600 rounded-lg transition-all text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 transform hover:scale-105 active:scale-95 text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
          
          {showExportMenu && (
            <div className="absolute bottom-full mb-3 w-full bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-xl overflow-hidden z-10 animate-fade-in">
              <button
                onClick={() => {
                  exportAsJSON();
                  setShowExportMenu(false);
                }}
                className="block w-full text-left px-4 py-3 text-sm text-slate-200 hover:bg-slate-700/50 hover:text-white transition-all font-medium border-b border-slate-700/30"
              >
                <span className="text-lg">📄</span> Export as JSON
              </button>
              <button
                onClick={() => {
                  exportAsCSV();
                  setShowExportMenu(false);
                }}
                className="block w-full text-left px-4 py-3 text-sm text-slate-200 hover:bg-slate-700/50 hover:text-white transition-all font-medium"
              >
                <span className="text-lg">📊</span> Export as CSV
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4 border-t border-slate-800/50 backdrop-blur-sm">
        <div className="rounded-xl bg-slate-900/60 border border-slate-800/60 p-3 flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg">
              AP
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-100 truncate">Ava Patel</p>
            <p className="text-xs text-slate-400 truncate">ava.patel@fintrack.io</p>
          </div>
          <span className={`text-[10px] uppercase tracking-wide px-2 py-1 rounded-full font-semibold border ${
            userRole === 'admin'
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
          }`}>
            {userRole}
          </span>
        </div>
        <button
          className="mt-3 w-full text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg py-2 transition-colors"
          onClick={() => setShowProfileDetails(!showProfileDetails)}
          aria-expanded={showProfileDetails}
          aria-controls="sidebar-profile-details"
        >
          {showProfileDetails ? 'Hide profile' : 'View profile'}
        </button>

        {showProfileDetails && (
          <div
            id="sidebar-profile-details"
            className="mt-3 rounded-lg border border-slate-800/60 bg-slate-900/50 p-3 text-xs text-slate-300 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Role</span>
              <span className="font-semibold text-slate-200">{userRole}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Member since</span>
              <span className="font-semibold text-slate-200">Jan 2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Plan</span>
              <span className="font-semibold text-slate-200">Pro Edition</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Location</span>
              <span className="font-semibold text-slate-200">Mumbai, IN</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800/50 text-center backdrop-blur-sm">
        <p className="text-xs text-slate-500 leading-relaxed">
          <span className="block font-semibold text-slate-400 mb-1">Finance Dashboard</span>
          @copyright 2026 FinTrack Inc. All rights reserved.
        </p>
      </div>
    </aside>
  );
}
