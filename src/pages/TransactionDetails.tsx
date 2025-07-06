
import { useNavigate } from "react-router-dom";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { PaymentMethodsCard } from "@/components/dashboard/PaymentMethodsCard";

export default function TransactionDetails() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/95 sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            <h1 className="text-xl font-semibold">Payment Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            {/* Keep the same header actions as the main dashboard */}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto p-4 sm:p-6">
          <div className="mb-4">
            <h1 className="text-3xl font-bold">Transactions</h1>
          </div>
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard 
              title="Today's Transactions" 
              value="1,245" 
              dateInfo="24 May, 2023" 
              type="transaction" 
              id="transactions"
              additionalMetrics={[
                { label: "Avg. per hour", value: "52", trend: "up", trendValue: "+8%" },
                { label: "Peak hour", value: "14:00", trend: "up", trendValue: "127" },
                { label: "Success rate", value: "98.2%" }
              ]}
            />
            <StatCard 
              title="Today's Revenue" 
              value="€32,621.50" 
              dateInfo="24 May, 2023" 
              type="revenue" 
              id="revenue"
              additionalMetrics={[
                { label: "Avg. transaction", value: "€26.20", trend: "up", trendValue: "+12%" },
                { label: "Largest payment", value: "€458.90" },
                { label: "vs. yesterday", value: "+€2,105", trend: "up", trendValue: "+6.9%" }
              ]}
            />
            <PaymentMethodsCard />
          </div>
          
          <div className="space-y-2">
            <TransactionTable title="Transactions" description="Detailed view of transactions" />
            <p className="text-xs text-muted-foreground">
              Table displays up to 5,000 rows. KPI calculations and exports include all data.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
