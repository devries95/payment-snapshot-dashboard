
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
  const averageAmount = Math.round(totalAmount / totalTransactions);
  const averageItemsPerSale = 2.8; // Example static value

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
              <div className="text-sm text-muted-foreground">This month your payments total</div>
              <div className="text-3xl font-bold">{formatCurrency(totalAmount)}</div>
              <div className="text-xs text-muted-foreground mt-1">That's €1,780.24 more than this time last month!</div>
            </div>
            
            <div className="flex flex-col items-end gap-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Average Payment Value</div>
                <div className="text-2xl font-bold">{formatCurrency(averageAmount)}</div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Average Items Per Payment</div>
                <div className="text-2xl font-bold">{averageItemsPerSale}</div>
                <div className="text-xs text-muted-foreground mt-1">0.35 items than last month</div>
              </div>
            </div>
          </div>
          
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={DATA}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
                <XAxis 
                  dataKey="date" 
                  tickLine={false}
                  axisLine={false}
                  stroke="var(--chart-axis)"
                  fontSize={12}
                />
                <YAxis 
                  tickFormatter={(value) => `${value}`}
                  tickLine={false}
                  axisLine={false}
                  stroke="var(--chart-axis)"
                  fontSize={12}
                  domain={[0, 10000]}
                />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'amount') return [formatCurrency(value as number), 'Amount'];
                    if (name === 'transactions') return [formatNumber(value as number), 'Transactions'];
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
                  type="monotone" 
                  dataKey="amount" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: "hsl(var(--primary))" }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="transactions" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: "hsl(var(--secondary))" }}
                  activeDot={{ r: 6 }}
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
