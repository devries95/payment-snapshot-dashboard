import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

type PeriodType = 'today' | 'lastMonth' | 'thisMonth';

// Sample data
const DATA = {
  today: [
    { time: '12a', value: 100 },
    { time: '3a', value: 120 },
    { time: '6a', value: 150 },
    { time: '9a', value: 220 },
    { time: '12p', value: 290 },
    { time: '3p', value: 350 },
    { time: '6p', value: 390 },
    { time: '9p', value: 415 },
  ],
  lastMonth: [
    { time: 'Week 1', value: 12000 },
    { time: 'Week 2', value: 19000 },
    { time: 'Week 3', value: 32000 },
    { time: 'Week 4', value: 53281 },
  ],
  thisMonth: [
    { time: 'Week 1', value: 8500 },
    { time: 'Week 2', value: 15700 },
    { time: 'Week 3', value: 24982 },
    { time: 'Week 4', value: 0 }, // Future data
  ],
};

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function RevenueChart() {
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

  return (
    <Card className="animate-fade-in-up">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-lg">Revenue by time period</CardTitle>
        </div>
        
        <div className="flex items-center gap-4">
          <Tabs defaultValue={period} value={period} onValueChange={(value) => setPeriod(value as PeriodType)}>
            <TabsList>
              <TabsTrigger value="today" className="text-xs">Today</TabsTrigger>
              <TabsTrigger value="lastMonth" className="text-xs">Last month</TabsTrigger>
              <TabsTrigger value="thisMonth" className="text-xs">This month</TabsTrigger>
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
        <div className={`chart-container h-[280px] ${animating ? 'opacity-0' : 'opacity-100'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              key={chartKey}
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(270, 70%, 65%)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(270, 70%, 65%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
              <XAxis 
                dataKey="time" 
                tickLine={false}
                axisLine={false}
                stroke="var(--chart-axis)"
                fontSize={12}
              />
              <YAxis 
                tickFormatter={(value) => formatCurrency(value)}
                tickLine={false}
                axisLine={false}
                stroke="var(--chart-axis)"
                fontSize={12}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value as number), 'Revenue']}
                contentStyle={{ 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: '1px solid hsl(var(--border))'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(270, 70%, 65%)" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorValue)" 
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-muted-foreground mt-2 text-right">
          {period === 'today' && 'Current value: €415'}
          {period === 'lastMonth' && 'Final value: €53,281'}  
          {period === 'thisMonth' && 'Current value: €24,982'}
        </div>
      </CardContent>
    </Card>
  );
}
