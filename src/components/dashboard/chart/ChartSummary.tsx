
interface ChartSummaryProps {
  totalAmount: number;
  totalTransactions: number;
  formatCurrency: (value: number) => string;
  formatNumber: (value: number) => string;
}

export function ChartSummary({ 
  totalAmount, 
  totalTransactions, 
  formatCurrency, 
  formatNumber 
}: ChartSummaryProps) {
  return (
    <div className="flex flex-wrap justify-between items-center">
      <div className="flex items-baseline">
        <div className="mr-6">
          <div className="text-3xl font-bold">{formatCurrency(totalAmount)}</div>
        </div>
        
        <div className="text-lg font-medium text-muted-foreground">
          {formatNumber(totalTransactions)} transactions
        </div>
      </div>
    </div>
  );
}
