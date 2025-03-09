
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, MoreHorizontal, MapPin } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PeriodType = 'thisMonth' | 'lastMonth';

type ZoneData = {
  id: string;
  name: string;
  revenue: number;
  isUnderperforming: boolean;
};

// Zone data for different periods
const ZONE_DATA = {
  thisMonth: [
    { id: 'zone1', name: 'Downtown District', revenue: 5823, isUnderperforming: false },
    { id: 'zone2', name: 'Airport Zone', revenue: 4270, isUnderperforming: false },
    { id: 'zone3', name: 'Shopping Center', revenue: 3524, isUnderperforming: true },
    { id: 'zone4', name: 'Business Park', revenue: 1357, isUnderperforming: true },
    { id: 'zone5', name: 'Residential Area', revenue: 523, isUnderperforming: true },
  ],
  lastMonth: [
    { id: 'zone1', name: 'Downtown District', revenue: 6125, isUnderperforming: false },
    { id: 'zone2', name: 'Airport Zone', revenue: 5842, isUnderperforming: false },
    { id: 'zone3', name: 'Shopping Center', revenue: 4612, isUnderperforming: false },
    { id: 'zone4', name: 'Business Park', revenue: 2912, isUnderperforming: true },
    { id: 'zone5', name: 'Residential Area', revenue: 1104, isUnderperforming: true },
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

export function ZonesRevenueCard() {
  const [period, setPeriod] = useState<PeriodType>('thisMonth');
  const [zones, setZones] = useState<ZoneData[]>(ZONE_DATA[period]);
  const [animating, setAnimating] = useState(false);

  // Calculate average revenue
  const calculateAverageRevenue = () => {
    const total = ZONE_DATA[period].reduce((sum, zone) => sum + zone.revenue, 0);
    return Math.round(total / ZONE_DATA[period].length);
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
          {/* Average Revenue Circle */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-sm text-muted-foreground mb-2">Average</div>
            <div className="relative h-36 w-36">
              <div className="absolute inset-0 rounded-full bg-purple-100 dark:bg-purple-950/20"></div>
              <div 
                className="absolute inset-0 rounded-full border-8 border-purple-600 dark:border-purple-400"
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                  opacity: 0.9
                }}
              ></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{formatCurrency(calculateAverageRevenue())}</span>
              </div>
            </div>
          </div>
          
          {/* Zone List */}
          <div>
            <h3 className="font-medium text-sm mb-3">Underperforming areas</h3>
            <div className={`space-y-2 ${animating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
              {zones
                .filter(zone => zone.isUnderperforming)
                .map(zone => (
                <div 
                  key={zone.id}
                  className="flex items-center justify-between bg-red-50 dark:bg-red-950/20 p-2 rounded-md"
                >
                  <div className="text-red-600 dark:text-red-400 font-medium">
                    {formatCurrency(zone.revenue)}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1 text-sm">{zone.name}</span>
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
