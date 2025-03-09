
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

type PeriodType = 'thisMonth' | 'lastMonth';

type ZoneData = {
  id: string;
  name: string;
  revenue: number;
  color: string;
  isUnderperforming: boolean;
};

// Zone data for different periods with colors
const ZONE_DATA = {
  thisMonth: [
    { id: 'zone1', name: 'Downtown District', revenue: 5823, color: '#4285F4', isUnderperforming: true },
    { id: 'zone2', name: 'Airport Zone', revenue: 4270, color: '#34A853', isUnderperforming: true },
    { id: 'zone3', name: 'Shopping Center', revenue: 3524, color: '#FBBC05', isUnderperforming: true },
    { id: 'zone4', name: 'Business Park', revenue: 2357, color: '#EA4335', isUnderperforming: true },
    { id: 'zone5', name: 'Residential Area', revenue: 1980, color: '#8B5CF6', isUnderperforming: true },
    { id: 'zone6', name: 'University Campus', revenue: 1523, color: '#D946EF', isUnderperforming: true },
    { id: 'zone7', name: 'Industrial District', revenue: 1120, color: '#0EA5E9', isUnderperforming: true },
  ],
  lastMonth: [
    { id: 'zone1', name: 'Downtown District', revenue: 6125, color: '#4285F4', isUnderperforming: true },
    { id: 'zone2', name: 'Airport Zone', revenue: 5842, color: '#34A853', isUnderperforming: true },
    { id: 'zone3', name: 'Shopping Center', revenue: 4612, color: '#FBBC05', isUnderperforming: true },
    { id: 'zone4', name: 'Business Park', revenue: 2912, color: '#EA4335', isUnderperforming: true },
    { id: 'zone5', name: 'Residential Area', revenue: 2104, color: '#8B5CF6', isUnderperforming: true },
    { id: 'zone6', name: 'University Campus', revenue: 1780, color: '#D946EF', isUnderperforming: true },
    { id: 'zone7', name: 'Industrial District', revenue: 1350, color: '#0EA5E9', isUnderperforming: true },
  ],
};

// Format currency for display
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Format for tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-2 border shadow-sm rounded-md text-sm">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-muted-foreground">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export function ZonesRevenueCard() {
  const [period, setPeriod] = useState<PeriodType>('thisMonth');
  const [zones, setZones] = useState<ZoneData[]>(ZONE_DATA[period]);
  const [animating, setAnimating] = useState(false);

  // Calculate total revenue
  const calculateTotalRevenue = () => {
    return ZONE_DATA[period].reduce((sum, zone) => sum + zone.revenue, 0);
  };

  useEffect(() => {
    // Animate zone data transition
    setAnimating(true);
    
    const timer = setTimeout(() => {
      setZones(ZONE_DATA[period]);
      setAnimating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [period]);

  return (
    <Card className="animate-fade-in-up h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg">Revenue by Zone</CardTitle>
        </div>
        
        <div className="flex items-center gap-4">
          <Tabs defaultValue={period} value={period} onValueChange={(value) => setPeriod(value as PeriodType)}>
            <TabsList>
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
              <DropdownMenuItem>Download report</DropdownMenuItem>
              <DropdownMenuItem>View all zones</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="flex flex-col items-center justify-center">
            <div className="h-48 w-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={zones}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="revenue"
                    nameKey="name"
                    animationDuration={750}
                  >
                    {zones.map((zone) => (
                      <Cell key={zone.id} fill={zone.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{formatCurrency(calculateTotalRevenue())}</span>
                <span className="text-xs text-muted-foreground">Total Amount</span>
              </div>
            </div>
          </div>
          
          {/* Zone List */}
          <div className="flex flex-col h-full justify-between">
            <div className={`space-y-3 ${animating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
              {zones.map(zone => (
                <div 
                  key={zone.id}
                  className={`flex items-center justify-between p-2 rounded-md transition-colors ${
                    zone.isUnderperforming ? 'bg-gray-100 dark:bg-gray-800' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: zone.color }}
                    ></div>
                    <span className="text-sm font-medium">{zone.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{formatCurrency(zone.revenue)}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
