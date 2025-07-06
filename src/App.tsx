
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TransactionDetails from "./pages/TransactionDetails";
import ZoneRevenue from "./pages/ZoneRevenue";
import Reports from "./pages/Reports";
import ApiDocs from "./pages/ApiDocs";
import RemittanceConfig from "./pages/RemittanceConfig";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/transactions" element={<TransactionDetails />} />
          <Route path="/zone-revenue" element={<ZoneRevenue />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/api-docs" element={<ApiDocs />} />
          <Route path="/remittance-config" element={<RemittanceConfig />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
