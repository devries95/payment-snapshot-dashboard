
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreHorizontal } from "lucide-react";

type PeriodType = 'yesterday' | 'thisMonth' | 'lastMonth';

interface ChartHeaderProps {
  title: string;
  period: PeriodType;
  onPeriodChange: (value: string) => void;
}

export function ChartHeader({ title, period, onPeriodChange }: ChartHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center justify-between pb-3">
      <div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </div>
      
      <div className="flex items-center gap-4">
        <Tabs defaultValue={period} value={period} onValueChange={onPeriodChange}>
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
  );
}
