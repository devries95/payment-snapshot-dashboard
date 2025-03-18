
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
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
  const [selectedFormats, setSelectedFormats] = useState<ExportFormat[]>(["excel"]);
  const [dataAmount, setDataAmount] = useState<ExportDataAmount>("all");

  const formats: { id: ExportFormat; label: string }[] = [
    { id: "excel", label: "Excel" },
    { id: "csv", label: "CSV" },
    { id: "json", label: "JSON" },
    { id: "pdf", label: "PDF" },
  ];

  const handleFormatToggle = (format: ExportFormat) => {
    setSelectedFormats((prev) =>
      prev.includes(format)
        ? prev.filter((f) => f !== format)
        : [...prev, format]
    );
  };

  const handleSelectAll = () => {
    if (selectedFormats.length === formats.length) {
      setSelectedFormats([]);
    } else {
      setSelectedFormats(formats.map(f => f.id));
    }
  };

  const handleExport = () => {
    if (selectedFormats.length === 0) return;
    selectedFormats.forEach(format => {
      onExport(format, dataAmount);
    });
    onOpenChange(false);
  };

  const isAllSelected = selectedFormats.length === formats.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-3xl font-normal">Download</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">Format</h3>
              <Button
                variant="ghost"
                onClick={handleSelectAll}
                className="h-8 text-sm hover:bg-accent"
              >
                {isAllSelected ? "Deselect all" : "Select all"}
              </Button>
            </div>
            <div className="space-y-3">
              {formats.map((format) => (
                <div key={format.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`format-${format.id}`} 
                    checked={selectedFormats.includes(format.id)}
                    onCheckedChange={() => handleFormatToggle(format.id)}
                  />
                  <Label htmlFor={`format-${format.id}`} className="text-base font-normal">
                    {format.label}
                  </Label>
                </div>
              ))}
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
            disabled={selectedFormats.length === 0}
            className="w-32 h-12 bg-purple-600 hover:bg-purple-700 text-base"
          >
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
