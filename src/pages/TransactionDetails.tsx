import { useNavigate, useParams } from "react-router-dom";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

// A mapping of transaction types to titles
const transactionTitles: Record<string, string> = {
  "todays-revenue": "Today's Revenue",
  "last-month-revenue": "Last Month's Revenue",
  "this-month-revenue": "This Month's Revenue",
  "todays-transactions": "Today's Transactions",
  "last-month-transactions": "Last Month's Transactions",
  "this-month-transactions": "This Month's Transactions",
  "yesterday-revenue": "Yesterday's Revenue",
  "transactions": "All Transactions"
};

export default function TransactionDetails() {
  const { id = "transactions" } = useParams();
  const navigate = useNavigate();
  
  // Get the title based on the id parameter, or default to "Transactions"
  const title = transactionTitles[id] || "Cleared transactions";
  
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
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-sm text-muted-foreground">726,173 transactions</p>
          </div>
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 border rounded-lg bg-card">
              <div className="text-sm text-muted-foreground">Total payment amount - All accounts</div>
              <div className="text-2xl font-bold mt-1">€4,156</div>
              <div className="text-xs text-muted-foreground mt-1">Jan 11, 2025</div>
            </div>
            <div className="p-4 border rounded-lg bg-card">
              <div className="text-sm text-muted-foreground">Total transactions - All accounts</div>
              <div className="text-2xl font-bold mt-1">1,324</div>
              <div className="text-xs text-muted-foreground mt-1">Jan 11, 2025</div>
            </div>
          </div>
          
          <TransactionTable title={title} description="Detailed view of transactions" />
        </div>
      </main>
    </div>
  );
}
