import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreHorizontal, CreditCard, Wallet, ToggleLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

type PeriodType = 'yesterday' | 'thisMonth' | 'lastMonth';
type ViewType = 'revenue' | 'paymentMethods';

// Sample data
const DATA = {
  yesterday: [
    { time: '12a', value: 100 },
    { time: '3a', value: 120 },
    { time: '6a', value: 150 },
    { time: '9a', value: 220 },
    { time: '12p', value: 290 },
    { time: '3p', value: 350 },
    { time: '6p', value: 390 },
    { time: '9p', value: 415 },
  ],
  thisMonth: [
    { time: 'Week 1', value: 8500 },
    { time: 'Week 2', value: 15700 },
    { time: 'Week 3', value: 24982 },
    { time: 'Week 4', value: 0 }, // Future data
  ],
  lastMonth: [
    { time: 'Week 1', value: 12000 },
    { time: 'Week 2', value: 19000 },
    { time: 'Week 3', value: 32000 },
    { time: 'Week 4', value: 53281 },
  ],
};

// Payment method data
const PAYMENT_METHOD_DATA = {
  yesterday: [
    { name: 'Credit Card', value: 240 },
    { name: 'Wallet', value: 95 },
    { name: 'PayPal', value: 60 },
    { name: 'N/A', value: 20 },
  ],
  thisMonth: [
    { name: 'Credit Card', value: 14200 },
    { name: 'Wallet', value: 5300 },
    { name: 'PayPal', value: 4800 },
    { name: 'N/A', value: 682 },
  ],
  lastMonth: [
    { name: 'Credit Card', value: 30000 },
    { name: 'Wallet', value: 12281 },
    { name: 'PayPal', value: 8500 },
    { name: 'N/A', value: 2500 },
  ],
};

// Payment method colors
const PAYMENT_METHOD_COLORS = {
  'Credit Card': '#9b87f5',
  'Wallet': '#0EA5E9',
  'PayPal': '#F97316',
  'N/A': '#D9D9D9',
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
  const [view, setView] = useState<ViewType>('revenue');
  const [animating, setAnimating] = useState(false);
  const [data, setData] = useState(DATA[period]);
  const [paymentData, setPaymentData] = useState(PAYMENT_METHOD_DATA[period]);
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    // Animate chart transition
    setAnimating(true);
    
    const timer = setTimeout(() => {
      setData(DATA[period]);
      setPaymentData(PAYMENT_METHOD_DATA[period]);
      setAnimating(false);
      setChartKey(prevKey => prevKey + 1);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [period, view]);

  const toggleView = () => {
    setAnimating(true);
    setTimeout(() => {
      setView(view === 'revenue' ? 'paymentMethods' : 'revenue');
      setAnimating(false);
    }, 300);
  };

  const getCurrentTotal = () => {
    if (period === 'yesterday') return '€415';
    if (period === 'lastMonth') return '€53,281';
    return '€24,982';
  };

  // Calculate total value of payment methods for the current period
  const calculatePaymentMethodsTotal = () => {
    return PAYMENT_METHOD_DATA[period].reduce((sum, item) => sum + item.value, 0);
  };

  // Calculate total value of revenue for the current period
  const calculateRevenueTotal = () => {
    return DATA[period][DATA[period].length - 1].value;
  };

  return (
    <Card className="animate-fade-in-up">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-lg">Revenue</CardTitle>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleView} 
            className="flex items-center gap-2"
          >
            {view === 'revenue' ? (
              <>
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Payment Methods</span>
              </>
            ) : (
              <>
                <ToggleLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Revenue Chart</span>
              </>
            )}
          </Button>
          
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
          {view === 'revenue' ? (
            <div className="relative h-full">
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
              
              {/* Total value overlay for revenue chart */}
              <div className="absolute top-2 right-8 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border/40 shadow-sm">
                <span className="text-xs font-medium">Total: {formatCurrency(calculateRevenueTotal())}</span>
              </div>
            </div>
          ) : (
            <div className="relative h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  key={chartKey}
                  data={paymentData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                  barGap={8}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
                  <XAxis 
                    dataKey="name" 
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
                  <Legend 
                    align="center" 
                    verticalAlign="bottom"
                    wrapperStyle={{ paddingTop: 15 }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={1000}>
                    {paymentData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={PAYMENT_METHOD_COLORS[entry.name as keyof typeof PAYMENT_METHOD_COLORS]} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              
              {/* Total value overlay for payment methods chart */}
              <div className="absolute top-2 right-8 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border/40 shadow-sm">
                <span className="text-xs font-medium">Total: {formatCurrency(calculatePaymentMethodsTotal())}</span>
              </div>
            </div>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-2 text-right">
          {view === 'revenue' ? (
            <>
              {period === 'yesterday' && 'Current value: €415'}
              {period === 'lastMonth' && 'Final value: €53,281'}  
              {period === 'thisMonth' && 'Current value: €24,982'}
            </>
          ) : (
            `Total: ${getCurrentTotal()}`
          )}
        </div>
      </CardContent>
    </Card>
  );
}
