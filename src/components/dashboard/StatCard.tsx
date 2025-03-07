
import { MoreHorizontal } from "lucide-react";
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

type StatCardProps = {
  title: string;
  value: string;
  className?: string;
  isLoading?: boolean;
};

export function StatCard({ title, value, className, isLoading = false }: StatCardProps) {
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
          <div className="text-xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );
}
