
export function ChartLegend() {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full bg-[#8B5CF6] mr-2"></div>
        <span className="text-xs">Payment Amount</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full bg-[#0EA5E9] mr-2"></div>
        <span className="text-xs">Transactions</span>
      </div>
    </div>
  );
}
