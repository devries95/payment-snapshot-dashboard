
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
    <div className="max-w-[1400px] mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-semibold mb-4 animate-fade-in-up">Overview</h1>
      
      {/* Combined KPIs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Revenue KPIs */}
        <div className="space-y-2">
          <div className="mb-2">
            <h2 className="text-lg font-medium">Revenue</h2>
            <p className="text-sm text-muted-foreground">Summary of payment revenue</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatCard 
              title="Today's revenue" 
              value="€4,156" 
              isLoading={loading}
              className="h-[100px]"
              id="todays-revenue"
            />
            <StatCard 
              title="Last month's revenue" 
              value="€53,281" 
              isLoading={loading}
              className="h-[100px]"
              id="last-month-revenue"
            />
            <StatCard 
              title="This month's revenue" 
              value="€24,982" 
              isLoading={loading}
              className="h-[100px]"
              id="this-month-revenue"
            />
          </div>
        </div>
        
        {/* Transactions KPIs */}
        <div className="space-y-2">
          <div className="mb-2">
            <h2 className="text-lg font-medium">Transactions</h2>
            <p className="text-sm text-muted-foreground">Number of payment transactions</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatCard 
              title="Today's transactions" 
              value="1,324" 
              isLoading={loading}
              className="h-[100px]"
              id="todays-transactions"
            />
            <StatCard 
              title="Last month's transactions" 
              value="15,625" 
              isLoading={loading}
              className="h-[100px]"
              id="last-month-transactions"
            />
            <StatCard 
              title="This month's transactions" 
              value="7,827" 
              isLoading={loading}
              className="h-[100px]"
              id="this-month-transactions"
            />
          </div>
        </div>
      </div>
      
      {/* Charts Section - Side by Side */}
      <div className="mb-6">
        <div className="mb-2">
          <h2 className="text-lg font-medium">Performance Metrics</h2>
          <p className="text-sm text-muted-foreground">Detailed visualization of revenue and transaction trends</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RevenueChart />
          <TransactionChart />
        </div>
      </div>
      
      {/* Reports Section */}
      <div className="mb-6">
        <div className="mb-2">
          <h2 className="text-lg font-medium">Recent Reports</h2>
          <p className="text-sm text-muted-foreground">Monthly financial summaries and payment analysis</p>
        </div>
        <div className="grid grid-cols-1">
          <ReportsList />
        </div>
      </div>
    </div>
  );
}
