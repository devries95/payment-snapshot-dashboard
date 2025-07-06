
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ZoneRevenueBreakdown } from "@/components/dashboard/ZoneRevenueBreakdown";

export default function ZoneRevenue() {
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
            <h1 className="text-xl font-semibold">Zone Revenue Analysis</h1>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto p-4 sm:p-6">
          <div className="mb-4">
            <h1 className="text-3xl font-bold">Revenue by Zone & Payment Method</h1>
            <p className="text-muted-foreground mt-2">
              Analyze revenue distribution across zones and payment methods to identify trends and opportunities.
            </p>
          </div>
          
          <ZoneRevenueBreakdown />
        </div>
      </main>
    </div>
  );
}
