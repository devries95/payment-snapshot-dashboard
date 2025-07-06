
import { MoreHorizontal, Banknote, CreditCard, Car, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

type AdditionalMetric = {
  label: string;
  value: string;
  trend?: 'up' | 'down';
  trendValue?: string;
};

type StatCardProps = {
  title: string;
  value: string;
  className?: string;
  isLoading?: boolean;
  id?: string;
  dateInfo?: string;
  type?: 'revenue' | 'transaction';
  additionalMetrics?: AdditionalMetric[];
};

export function StatCard({ 
  title, 
  value, 
  className, 
  isLoading = false, 
  id = "transactions",
  dateInfo,
  type = 'transaction',
  additionalMetrics = []
}: StatCardProps) {
  return (
    <Card className={cn("stat-card overflow-hidden animate-fade-in-up", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-1 space-y-0 pt-3 px-4">
        <CardTitle className="text-xs font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-6 w-6 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Download report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="px-4 pt-0 pb-3">
        {isLoading ? (
          <div className="h-6 w-20 bg-muted animate-pulse rounded"></div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold">{value}</div>
              {type === 'revenue' ? (
                <CreditCard className="h-5 w-5 text-blue-500" />
              ) : (
                <Car className="h-5 w-5 text-blue-500" />
              )}
            </div>
            {dateInfo && (
              <div className="text-xs text-muted-foreground">{dateInfo}</div>
            )}
            
            {/* Additional Metrics */}
            {additionalMetrics.length > 0 && (
              <div className="space-y-2 pt-2 border-t">
                {additionalMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{metric.label}</span>
                      {metric.trend && (
                        <div className={cn(
                          "flex items-center gap-1",
                          metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        )}>
                          {metric.trend === 'up' ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {metric.trendValue && (
                            <span className="text-xs font-medium">{metric.trendValue}</span>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-semibold">{metric.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
