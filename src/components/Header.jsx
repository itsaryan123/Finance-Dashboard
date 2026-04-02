import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Moon, Sun, LogOut } from 'lucide-react';

export default function Header({ onMenuToggle }) {
  const { userRole, setUserRole, isDarkMode, setIsDarkMode } = useFinance();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const handleRoleChange = (role) => {
    setUserRole(role);
    setShowRoleMenu(false);
  };

  return (
    <header className="bg-gradient-to-r from-slate-50 via-blue-50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-700/50 sticky top-0 z-10 shadow-sm backdrop-blur-md bg-opacity-95 dark:bg-opacity-95">
      <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <div className="group cursor-pointer">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-blue-600">
            Finance Dashboard
          </h1>
          <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300" />
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            🚀 Smart money management for modern life
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            title="Open menu"
          >
            ☰
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-all duration-200 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md group"
            title="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600 group-hover:scale-110 transition-transform" />
            )}
          </button>

          {/* Quick Role Toggle */}
          <button
            onClick={() => setUserRole(userRole === 'admin' ? 'viewer' : 'admin')}
            className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-semibold text-sm hover:opacity-90 transition"
            title="Toggle role"
          >
            {userRole === 'admin' ? 'Switch to Viewer' : 'Switch to Admin'}
          </button>

          {/* Current role badge */}
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${userRole === 'admin' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100' : 'bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100'}`}>
            Role: {userRole}
          </span>

          {/* Role Switcher menu fallback (optional) */}
          <div className="relative group">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg font-semibold text-sm transform hover:scale-105 active:scale-95"
              title="Open role menu"
            >
              <span>
                {userRole === 'admin' ? '👨‍💼 Admin' : '👁️ Viewer'}
              </span>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 overflow-hidden animate-fade-in">
                <button
                  onClick={() => handleRoleChange('viewer')}
                  className={`block w-full text-left px-5 py-3 text-sm font-medium transition-all duration-200 ${
                    userRole === 'viewer'
                      ? 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  👁️ Viewer Mode
                  <span className="block text-xs opacity-75 mt-1">Read-only access</span>
                </button>
                <button
                  onClick={() => handleRoleChange('admin')}
                  className={`block w-full text-left px-5 py-3 text-sm font-medium border-t border-slate-200 dark:border-slate-700 transition-all duration-200 ${
                    userRole === 'admin'
                      ? 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  👨‍💼 Admin Mode
                  <span className="block text-xs opacity-75 mt-1">Full access to all features</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
