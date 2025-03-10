
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from './chart/ChartData';

type PeriodType = 'yesterday' | 'thisMonth' | 'lastMonth';

// Sample data for credit card types with monetary values
const DATA = {
  yesterday: [
    { name: 'Visa', value: 1450 },
    { name: 'Mastercard', value: 1670 },
    { name: 'Discovery', value: 820 },
    { name: 'Amex', value: 500 },
    { name: 'N/A', value: 216 },
  ],
  thisMonth: [
    { name: 'Visa', value: 32300 },
    { name: 'Mastercard', value: 38970 },
    { name: 'Discovery', value: 5800 },
    { name: 'N/A', value: 1200 },
  ],
  lastMonth: [
    { name: 'Visa', value: 64550 },
    { name: 'Mastercard', value: 71200 },
    { name: 'Discovery', value: 15200 },
    { name: 'N/A', value: 5300 },
  ],
};

// Colors for the bar chart segments
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function TransactionChart() {
  const [period, setPeriod] = useState<PeriodType>('thisMonth');
  const [animating, setAnimating] = useState(false);
  const [data, setData] = useState(DATA[period]);
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    // Animate chart transition
    setAnimating(true);
    
    const timer = setTimeout(() => {
      setData(DATA[period]);
      setAnimating(false);
      setChartKey(prevKey => prevKey + 1);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [period]);

  // Calculate total revenue
  const totalRevenue = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <Card className="animate-fade-in-up">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-lg">Credit Card Tyope Revenue</CardTitle>
        </div>
        
        <div className="flex items-center gap-4">
          <Tabs defaultValue={period} value={period} onValueChange={(value) => setPeriod(value as PeriodType)}>
            <TabsList>
              <TabsTrigger value="yesterday" className="text-xs">Yesterday</TabsTrigger>
              <TabsTrigger value="thisMonth" className="text-xs">This month</TabsTrigger>
              <TabsTrigger value="lastMonth" className="text-xs">Last month</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Download CSV</DropdownMenuItem>
              <DropdownMenuItem>View full report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`chart-container h-[280px] ${animating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
          <div className="relative h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                key={chartKey}
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barGap={8}
              >
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value)}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  stroke="rgba(0,0,0,0.3)"
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(value as number), 'Revenue']}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid hsl(var(--border))'
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={1000}>
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            
            {/* Total revenue overlay */}
            <div className="absolute top-2 right-8 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border/40 shadow-sm">
              <span className="text-xs font-medium">Total: {formatCurrency(totalRevenue)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
