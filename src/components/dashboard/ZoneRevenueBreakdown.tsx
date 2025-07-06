
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, CreditCard, Wallet, Apple } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type PeriodType = 'thisMonth' | 'lastMonth';

// Payment method colors matching the existing design
const PAYMENT_COLORS = {
  CREDIT_CARD: '#4285F4',
  WALLET: '#34A853', 
  GOOGLE_PAY: '#FBBC05',
  APPLE_PAY: '#9E9E9E'
};

// Mock data for zone revenue breakdown
const ZONE_REVENUE_DATA = {
  thisMonth: [
    {
      zone: 'Downtown District',
      total: 5823,
      methods: {
        CREDIT_CARD: 3494, // 60%
        WALLET: 1165, // 20%
        GOOGLE_PAY: 699, // 12%
        APPLE_PAY: 465 // 8%
      }
    },
    {
      zone: 'Airport Zone',
      total: 4270,
      methods: {
        CREDIT_CARD: 2562, // 60%
        WALLET: 1281, // 30%
        GOOGLE_PAY: 341, // 8%
        APPLE_PAY: 86 // 2%
      }
    },
    {
      zone: 'Shopping Center',
      total: 3524,
      methods: {
        CREDIT_CARD: 2114, // 60%
        WALLET: 705, // 20%
        GOOGLE_PAY: 564, // 16%
        APPLE_PAY: 141 // 4%
      }
    },
    {
      zone: 'Business Park',
      total: 2357,
      methods: {
        CREDIT_CARD: 1650, // 70%
        WALLET: 471, // 20%
        GOOGLE_PAY: 165, // 7%
        APPLE_PAY: 71 // 3%
      }
    },
    {
      zone: 'Residential Area',
      total: 1980,
      methods: {
        CREDIT_CARD: 1188, // 60%
        WALLET: 594, // 30%
        GOOGLE_PAY: 138, // 7%
        APPLE_PAY: 60 // 3%
      }
    },
    {
      zone: 'University Campus',
      total: 1523,
      methods: {
        CREDIT_CARD: 761, // 50%
        WALLET: 456, // 30%
        GOOGLE_PAY: 243, // 16%
        APPLE_PAY: 63 // 4%
      }
    }
  ],
  lastMonth: [
    {
      zone: 'Downtown District',
      total: 6125,
      methods: {
        CREDIT_CARD: 3675,
        WALLET: 1225,
        GOOGLE_PAY: 735,
        APPLE_PAY: 490
      }
    },
    {
      zone: 'Airport Zone',
      total: 5842,
      methods: {
        CREDIT_CARD: 3505,
        WALLET: 1753,
        GOOGLE_PAY: 467,
        APPLE_PAY: 117
      }
    },
    {
      zone: 'Shopping Center',
      total: 4612,
      methods: {
        CREDIT_CARD: 2767,
        WALLET: 922,
        GOOGLE_PAY: 738,
        APPLE_PAY: 185
      }
    },
    {
      zone: 'Business Park',
      total: 2912,
      methods: {
        CREDIT_CARD: 2038,
        WALLET: 582,
        GOOGLE_PAY: 204,
        APPLE_PAY: 88
      }
    },
    {
      zone: 'Residential Area',
      total: 2104,
      methods: {
        CREDIT_CARD: 1262,
        WALLET: 631,
        GOOGLE_PAY: 147,
        APPLE_PAY: 64
      }
    },
    {
      zone: 'University Campus',
      total: 1780,
      methods: {
        CREDIT_CARD: 890,
        WALLET: 534,
        GOOGLE_PAY: 285,
        APPLE_PAY: 71
      }
    }
  ]
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const getPaymentMethodIcon = (method: string) => {
  switch (method) {
    case 'CREDIT_CARD':
      return CreditCard;
    case 'WALLET':
      return Wallet;
    case 'GOOGLE_PAY':
      return Wallet;
    case 'APPLE_PAY':
      return Apple;
    default:
      return CreditCard;
  }
};

const getPaymentMethodLabel = (method: string) => {
  switch (method) {
    case 'CREDIT_CARD':
      return 'Credit Card';
    case 'WALLET':
      return 'Digital Wallet';
    case 'GOOGLE_PAY':
      return 'Google Pay';
    case 'APPLE_PAY':
      return 'Apple Pay';
    default:
      return method;
  }
};

// Prepare data for the chart
const prepareChartData = (data: typeof ZONE_REVENUE_DATA.thisMonth) => {
  return data.map(zone => ({
    zone: zone.zone.replace(' ', '\n'), // Line break for better display
    'Credit Card': zone.methods.CREDIT_CARD,
    'Digital Wallet': zone.methods.WALLET,
    'Google Pay': zone.methods.GOOGLE_PAY,
    'Apple Pay': zone.methods.APPLE_PAY,
  }));
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, item: any) => sum + item.value, 0);
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border shadow-lg rounded-md">
        <p className="font-medium mb-2">{label.replace('\n', ' ')}</p>
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-1">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm">{item.dataKey}</span>
            </div>
            <span className="text-sm font-medium">{formatCurrency(item.value)}</span>
          </div>
        ))}
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between">
            <span className="font-medium">Total:</span>
            <span className="font-bold">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function ZoneRevenueBreakdown() {
  const [period, setPeriod] = useState<PeriodType>('thisMonth');
  
  const currentData = ZONE_REVENUE_DATA[period];
  const chartData = prepareChartData(currentData);
  
  const calculateTotalRevenue = () => {
    return currentData.reduce((sum, zone) => sum + zone.total, 0);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(calculateTotalRevenue())}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all zones and payment methods
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Top Performing Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{currentData[0]?.zone}</div>
            <p className="text-sm text-muted-foreground">{formatCurrency(currentData[0]?.total || 0)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Most Popular Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Credit Card</div>
            <p className="text-sm text-muted-foreground">~60% of all transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Revenue by Zone & Payment Method</CardTitle>
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
                    <DropdownMenuItem>Download chart</DropdownMenuItem>
                    <DropdownMenuItem>Export data</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="zone" 
                      className="text-xs"
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      className="text-xs"
                      tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="Credit Card" stackId="a" fill={PAYMENT_COLORS.CREDIT_CARD} />
                    <Bar dataKey="Digital Wallet" stackId="a" fill={PAYMENT_COLORS.WALLET} />
                    <Bar dataKey="Google Pay" stackId="a" fill={PAYMENT_COLORS.GOOGLE_PAY} />
                    <Bar dataKey="Apple Pay" stackId="a" fill={PAYMENT_COLORS.APPLE_PAY} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Zone Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Zone Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentData.map((zone, index) => (
                <div key={zone.zone} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{zone.zone}</h4>
                    <span className="text-sm font-semibold">{formatCurrency(zone.total)}</span>
                  </div>
                  
                  <div className="space-y-1">
                    {Object.entries(zone.methods).map(([method, amount]) => {
                      const Icon = getPaymentMethodIcon(method);
                      const percentage = ((amount / zone.total) * 100).toFixed(0);
                      
                      return (
                        <div key={method} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <Icon className="h-3 w-3" style={{ color: PAYMENT_COLORS[method as keyof typeof PAYMENT_COLORS] }} />
                            <span className="text-muted-foreground">{getPaymentMethodLabel(method)}</span>
                          </div>
                          <div className="text-right">
                            <div>{formatCurrency(amount)}</div>
                            <div className="text-muted-foreground">{percentage}%</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {index < currentData.length - 1 && <div className="border-b" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
