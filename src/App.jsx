import React from 'react';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import './styles/globals.css';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import TransactionsSection from './components/TransactionsSection';
import InsightsSection from './components/InsightsSection';

function AppContent() {
  const { isDarkMode } = useFinance();
  const [activeTab, setActiveTab] = React.useState('dashboard');

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* Header */}
        <Header onMenuToggle={() => setIsSidebarOpen((open) => !open)} />
        
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 max-w-7xl">
            {activeTab === 'dashboard' && <DashboardOverview />}
            {activeTab === 'transactions' && <TransactionsSection />}
            {activeTab === 'insights' && <InsightsSection />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
}
