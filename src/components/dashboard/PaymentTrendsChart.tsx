
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChartHeader } from './chart/ChartHeader';
import { ChartSummary } from './chart/ChartSummary';
import { ChartLegend } from './chart/ChartLegend';
import { PaymentLineChart } from './chart/PaymentLineChart';
import { PAYMENT_DATA, PeriodType, formatCurrency, formatNumber } from './chart/ChartData';

export function PaymentTrendsChart() {
  const [period, setPeriod] = useState<PeriodType>('thisMonth');
  const [chartKey, setChartKey] = useState(0);
  const [animating, setAnimating] = useState(false);
  
  // Get current data based on selected period
  const currentData = PAYMENT_DATA[period];
  
  // Calculate totals for current period
  const totalAmount = currentData.reduce((sum, item) => sum + item.amount, 0);
  const totalTransactions = currentData.reduce((sum, item) => sum + item.transactions, 0);

  const handlePeriodChange = (value: string) => {
    setAnimating(true);
    setTimeout(() => {
      setPeriod(value as PeriodType);
      setChartKey(prev => prev + 1);
      setAnimating(false);
    }, 300);
  };

  return (
    <Card className="animate-fade-in-up col-span-1">
      <ChartHeader 
        title="Cleared transactions" 
        period={period} 
        onPeriodChange={handlePeriodChange} 
      />
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap justify-between items-center">
            <ChartSummary 
              totalAmount={totalAmount}
              totalTransactions={totalTransactions}
              formatCurrency={formatCurrency}
              formatNumber={formatNumber}
            />
            <ChartLegend />
          </div>
          
          <PaymentLineChart 
            data={currentData}
            chartKey={chartKey}
            animating={animating}
          />
        </div>
      </CardContent>
    </Card>
  );
}
