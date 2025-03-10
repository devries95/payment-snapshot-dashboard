
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { RadioGroup } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type ExportFormat = "excel" | "csv" | "json" | "pdf";
type ExportDataAmount = "all" | "limited";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExport: (format: ExportFormat, dataAmount: ExportDataAmount) => void;
  totalCount: number;
}

export function ExportDialog({ open, onOpenChange, onExport, totalCount }: ExportDialogProps) {
  const [format, setFormat] = useState<ExportFormat>("excel");
  const [dataAmount, setDataAmount] = useState<ExportDataAmount>("all");

  const handleExport = () => {
    onExport(format, dataAmount);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-3xl font-normal">Download</DialogTitle>
        </div>
        
        <DialogDescription className="text-base text-muted-foreground py-2">
          Export your transaction data in various formats for analysis or record-keeping.
        </DialogDescription>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Format</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="format-excel" 
                  checked={format === "excel"} 
                  onCheckedChange={() => setFormat("excel")}
                />
                <Label htmlFor="format-excel" className="text-base font-normal">Excel</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="format-csv" 
                  checked={format === "csv"} 
                  onCheckedChange={() => setFormat("csv")}
                />
                <Label htmlFor="format-csv" className="text-base font-normal">CSV</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="format-json" 
                  checked={format === "json"} 
                  onCheckedChange={() => setFormat("json")}
                />
                <Label htmlFor="format-json" className="text-base font-normal">JSON</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="format-pdf" 
                  checked={format === "pdf"} 
                  onCheckedChange={() => setFormat("pdf")}
                />
                <Label htmlFor="format-pdf" className="text-base font-normal">PDF</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Data</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="data-all" 
                  checked={dataAmount === "all"} 
                  onCheckedChange={() => setDataAmount("all")}
                />
                <Label htmlFor="data-all" className="text-base font-normal">All results</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="data-limited" 
                  checked={dataAmount === "limited"} 
                  onCheckedChange={() => setDataAmount("limited")}
                />
                <Label htmlFor="data-limited" className="text-base font-normal">First 5000 rows</Label>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="w-32 h-12 text-base"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleExport} 
            className="w-32 h-12 bg-purple-600 hover:bg-purple-700 text-base"
          >
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
