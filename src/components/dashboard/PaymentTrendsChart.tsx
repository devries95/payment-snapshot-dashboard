
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

// Sample data for payment trends
const DATA = [
  { date: '1 Apr', amount: 5680, transactions: 245 },
  { date: '5 Apr', amount: 7450, transactions: 312 },
  { date: '10 Apr', amount: 6780, transactions: 287 },
  { date: '15 Apr', amount: 8120, transactions: 342 },
  { date: '20 Apr', amount: 7890, transactions: 331 },
  { date: '25 Apr', amount: 8560, transactions: 364 },
  { date: '30 Apr', amount: 9800, transactions: 410 },
];

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

export function PaymentTrendsChart() {
  // Calculate totals
  const totalAmount = DATA.reduce((sum, item) => sum + item.amount, 0);
  const totalTransactions = DATA.reduce((sum, item) => sum + item.transactions, 0);

  return (
    <Card className="animate-fade-in-up col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-lg">Payment Trends</CardTitle>
        </div>
        
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
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap justify-between">
            <div className="mb-4">
              <div className="text-sm text-muted-foreground">This month</div>
              <div className="text-3xl font-bold">{formatCurrency(totalAmount)}</div>
            </div>
          </div>
          
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={DATA}
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
                <Legend />
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
          
          <div className="text-xs text-muted-foreground mt-2 text-right">
            All Outlets • {formatNumber(totalTransactions)} transactions this month
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
