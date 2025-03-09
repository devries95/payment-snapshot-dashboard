
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for different periods
const DATA = {
  yesterday: [
    { date: '12a', amount: 100, transactions: 10 },
    { date: '3a', amount: 120, transactions: 14 },
    { date: '6a', amount: 150, transactions: 22 },
    { date: '9a', amount: 220, transactions: 35 },
    { date: '12p', amount: 290, transactions: 42 },
    { date: '3p', amount: 350, transactions: 58 },
    { date: '6p', amount: 390, transactions: 67 },
    { date: '9p', amount: 415, transactions: 74 },
  ],
  thisMonth: [
    { date: '1 Apr', amount: 5680, transactions: 245 },
    { date: '5 Apr', amount: 7450, transactions: 312 },
    { date: '10 Apr', amount: 6780, transactions: 287 },
    { date: '15 Apr', amount: 8120, transactions: 342 },
    { date: '20 Apr', amount: 7890, transactions: 331 },
    { date: '25 Apr', amount: 8560, transactions: 364 },
    { date: '30 Apr', amount: 9800, transactions: 410 },
  ],
  lastMonth: [
    { date: '1 Mar', amount: 4200, transactions: 180 },
    { date: '5 Mar', amount: 5600, transactions: 230 },
    { date: '10 Mar', amount: 6100, transactions: 255 },
    { date: '15 Mar', amount: 7300, transactions: 300 },
    { date: '20 Mar', amount: 8500, transactions: 350 },
    { date: '25 Mar', amount: 9200, transactions: 380 },
    { date: '31 Mar', amount: 10800, transactions: 450 },
  ],
};

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// Format number with commas
const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value);
};

type PeriodType = 'yesterday' | 'thisMonth' | 'lastMonth';

export function PaymentTrendsChart() {
  const [period, setPeriod] = useState<PeriodType>('thisMonth');
  const [chartKey, setChartKey] = useState(0);
  const [animating, setAnimating] = useState(false);
  
  // Get current data based on selected period
  const currentData = DATA[period];
  
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
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-lg">Cleared Transactions</CardTitle>
        </div>
        
        <div className="flex items-center gap-4">
          <Tabs defaultValue={period} value={period} onValueChange={handlePeriodChange}>
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
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-baseline">
              <div className="mr-6">
                <div className="text-3xl font-bold">{formatCurrency(totalAmount)}</div>
              </div>
              
              <div className="text-lg font-medium text-muted-foreground">
                {formatNumber(totalTransactions)} transactions
              </div>
            </div>

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
          </div>
          
          <div className={`h-[280px] ${animating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                key={chartKey}
                data={currentData}
                margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTrans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
                <XAxis 
                  dataKey="date" 
                  tickLine={false}
                  axisLine={false}
                  stroke="rgba(0,0,0,0.3)"
                  fontSize={12}
                />
                <YAxis 
                  yAxisId="left"
                  tickFormatter={(value) => `€${value}`}
                  tickLine={false}
                  axisLine={false}
                  stroke="rgba(0,0,0,0.3)"
                  fontSize={12}
                  domain={['auto', 'auto']}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(value) => `${value}`}
                  tickLine={false}
                  axisLine={false}
                  stroke="rgba(0,0,0,0.3)"
                  fontSize={12}
                  domain={['auto', 'auto']}
                />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'Payment Amount') return [formatCurrency(value as number), name];
                    if (name === 'Transactions') return [formatNumber(value as number), name];
                    return [value, name];
                  }}
                  labelFormatter={(label) => `Date: ${label}`}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid hsl(var(--border))'
                  }}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="amount"
                  name="Payment Amount" 
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6, fill: "#8B5CF6" }}
                  fill="url(#colorAmount)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="transactions"
                  name="Transactions" 
                  stroke="#0EA5E9" 
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6, fill: "#0EA5E9" }}
                  fill="url(#colorTrans)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
