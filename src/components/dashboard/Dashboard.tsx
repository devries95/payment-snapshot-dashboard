
import { useState, useEffect } from 'react';
import { StatCard } from './StatCard';
import { RevenueChart } from './RevenueChart';
import { TransactionChart } from './TransactionChart';
import { ReportsList } from './ReportsList';
import { PaymentTrendsChart } from './PaymentTrendsChart';
import { ZonesRevenueCard } from './ZonesRevenueCard';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  
  // Get yesterday's date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayFormatted = yesterday.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Get current month
  const currentMonth = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
  
  // Get last month
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const lastMonthFormatted = lastMonth.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

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
              title="Yesterday's revenue" 
              value="€4,156" 
              isLoading={loading}
              className="h-[115px]"
              id="yesterday-revenue"
              dateInfo={yesterdayFormatted}
              type="revenue"
            />
            <StatCard 
              title="Current month's revenue" 
              value="€24,982" 
              isLoading={loading}
              className="h-[115px]"
              id="current-month-revenue"
              dateInfo={currentMonth}
              type="revenue"
            />
            <StatCard 
              title="Last month's revenue" 
              value="€53,281" 
              isLoading={loading}
              className="h-[115px]"
              id="last-month-revenue"
              dateInfo={lastMonthFormatted}
              type="revenue"
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
              title="Yesterday's transactions" 
              value="1,324" 
              isLoading={loading}
              className="h-[115px]"
              id="yesterday-transactions"
              dateInfo={yesterdayFormatted}
              type="transaction"
            />
            <StatCard 
              title="Current month's transactions" 
              value="7,827" 
              isLoading={loading}
              className="h-[115px]"
              id="current-month-transactions"
              dateInfo={currentMonth}
              type="transaction"
            />
            <StatCard 
              title="Last month's transactions" 
              value="15,625" 
              isLoading={loading}
              className="h-[115px]"
              id="last-month-transactions"
              dateInfo={lastMonthFormatted}
              type="transaction"
            />
          </div>
        </div>
      </div>
      
      {/* Payment Trends Chart */}
      <div className="mb-6">
        <div className="mb-2">
          <h2 className="text-lg font-medium">Payment Analysis</h2>
          <p className="text-sm text-muted-foreground">Monthly payment trends and analytics</p>
        </div>
        <PaymentTrendsChart />
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
      
      {/* Transaction Analysis & Zone Revenue Section */}
      <div className="mb-6">
        <div className="mb-2">
          <h2 className="text-lg font-medium">Zone Analysis</h2>
          <p className="text-sm text-muted-foreground">Revenue analysis by geographic zone</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ZonesRevenueCard />
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
