import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { formatCurrency } from './chart/ChartData';
import { MoreHorizontal, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Generate revenue data for the whole year with worse projections
const generateRevenueData = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const data = [];
  
  // Monthly revenue values (first ~5 months are actual data, rest are projections)
  // We'll make the projections worse by reducing the values
  const monthlyRevenue = [
    32000, // January
    42000, // February
    56000, // March
    61000, // April
    52000, // May (current month in this example)
    49000, // June (projected - worse)
    43000, // July (projected - worse)
    38000, // August (projected - worse)
    40000, // September (projected - worse)
    42000, // October (projected - worse)
    45000, // November (projected - worse)
    48000  // December (projected - worse)
  ];
  
  // Create data points for each month
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  for (let i = 0; i < 12; i++) {
    data.push({
      month: months[i],
      revenue: monthlyRevenue[i],
      isProjected: i > currentMonth
    });
  }
  
  return data;
};

// Custom tooltip component that shows if data is projected
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const isProjected = payload[0].payload.isProjected;
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border shadow-sm rounded-md">
        <p className="font-medium">{label}</p>
        <p>{formatCurrency(payload[0].value)}</p>
        {isProjected && (
          <p className="text-xs text-muted-foreground mt-1">Projected revenue</p>
        )}
      </div>
    );
  }
  return null;
};

export function ProjectedRevenueChart() {
  const [data] = useState(generateRevenueData());
  
  // Find index of the current month to draw reference line
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentMonthName = data[currentMonth].month;
  
  // Calculate total projected annual revenue
  const totalProjectedRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  
  // Determine the current monthly value for the tooltip
  const currentMonthValue = data[currentMonth].revenue;
  
  return (
    <Card className="animate-fade-in-up">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg">Projected annual revenue</CardTitle>
          <CardDescription className="flex items-center gap-1">
            Based on historical payment data
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-[250px] text-xs">
                    Projections are calculated based on historical payment trends, seasonal patterns, and growth rates.
                    Actual results may vary.
                  </p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </CardDescription>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Download CSV</DropdownMenuItem>
            <DropdownMenuItem>View detailed report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      
      <CardContent>
        <div className="chart-container h-[280px] pb-8">
          <div className="relative h-full">
            {/* Move the legend here, above the chart */}
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#8884d8]"></div>
                <span className="text-xs text-muted-foreground">Actual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#82ca9d]"></div>
                <span className="text-xs text-muted-foreground">Projected</span>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 20, right: 30, left: 5, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                  </linearGradient>
                  <pattern id="projectedPattern" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                    <rect width="1" height="4" fill="#82ca9d" fillOpacity="0.3" />
                  </pattern>
                </defs>
                
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
                <XAxis 
                  dataKey="month" 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value)}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Reference line for current month */}
                <ReferenceLine 
                  x={currentMonthName} 
                  stroke="#8884d8" 
                  strokeDasharray="3 3" 
                  label={{ 
                    value: 'Current', 
                    position: 'top', 
                    fill: '#8884d8',
                    fontSize: 12 
                  }} 
                />
                
                {/* Actual data (past months) */}
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8884d8" 
                  fillOpacity={1}
                  fill="url(#actualGradient)" 
                  name="Revenue"
                />
                
                {/* Projected data (future months) with different styling */}
                <Area 
                  type="monotone" 
                  dataKey={(d) => d.isProjected ? d.revenue : null} 
                  stroke="#82ca9d" 
                  strokeDasharray="3 3"
                  fillOpacity={1}
                  fill="url(#projectedGradient)" 
                  name="Projected Revenue"
                />
              </AreaChart>
            </ResponsiveContainer>
            
            {/* Overlay showing projected annual total */}
            <div className="absolute top-2 right-8 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border/40 shadow-sm">
              <span className="text-xs font-medium">Projected Annual Total: {formatCurrency(totalProjectedRevenue)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
