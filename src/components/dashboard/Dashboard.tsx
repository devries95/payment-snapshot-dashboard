
import { useState, useEffect } from 'react';
import { StatCard } from './StatCard';
import { RevenueChart } from './RevenueChart';
import { TransactionChart } from './TransactionChart';
import { ReportsList } from './ReportsList';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto p-6 sm:p-8">
      <h1 className="text-3xl font-semibold mb-8 animate-fade-in-up">Overview</h1>
      
      {/* Revenue KPIs Section */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-medium">Revenue</h2>
          <p className="text-muted-foreground">Summary of payment revenue across different time periods</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <StatCard 
            title="Today's revenue" 
            value="€4,156" 
            isLoading={loading}
          />
          <StatCard 
            title="Last month's revenue" 
            value="€53,281" 
            isLoading={loading}
          />
          <StatCard 
            title="This month's revenue" 
            value="€24,982" 
            isLoading={loading}
          />
        </div>
      </div>
      
      {/* Transactions KPIs Section */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-medium">Transactions</h2>
          <p className="text-muted-foreground">Number of payment transactions processed</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <StatCard 
            title="Today's transactions" 
            value="1,324" 
            isLoading={loading}
          />
          <StatCard 
            title="Last month's transactions" 
            value="15,625" 
            isLoading={loading}
          />
          <StatCard 
            title="This month's transactions" 
            value="7,827" 
            isLoading={loading}
          />
        </div>
      </div>
      
      {/* Charts Section - Side by Side */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-medium">Performance Metrics</h2>
          <p className="text-muted-foreground">Detailed visualization of revenue and transaction trends</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <RevenueChart />
          <TransactionChart />
        </div>
      </div>
      
      {/* Reports Section */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-medium">Recent Reports</h2>
          <p className="text-muted-foreground">Monthly financial summaries and payment analysis</p>
        </div>
        <div className="grid grid-cols-1">
          <ReportsList />
        </div>
      </div>
    </div>
  );
}
