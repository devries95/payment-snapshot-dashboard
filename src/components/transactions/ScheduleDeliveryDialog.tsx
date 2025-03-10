
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { toast } from "sonner";

type ExportFormat = "excel" | "csv" | "json" | "pdf";

interface ScheduleDeliveryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalCount: number;
}

export function ScheduleDeliveryDialog({ open, onOpenChange, totalCount }: ScheduleDeliveryDialogProps) {
  const [activeTab, setActiveTab] = useState("settings");
  const [format, setFormat] = useState<ExportFormat>("excel");
  const [scheduleName, setScheduleName] = useState("");
  const [recurrence, setRecurrence] = useState("daily");
  const [time, setTime] = useState("8:00 am");
  const [emailAddresses, setEmailAddresses] = useState("");

  const handleSave = () => {
    toast.success("Delivery schedule saved", {
      description: `${scheduleName} will be delivered ${recurrence} at ${time}`
    });
    onOpenChange(false);
  };

  const handleTestNow = () => {
    toast.success("Test email sent", {
      description: "A test email has been sent to the specified addresses"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-3xl font-normal">Schedule delivery</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <DialogDescription className="text-base text-muted-foreground py-2">
          Paragraph descriptive of the modal tasks.
        </DialogDescription>
        
        <Tabs defaultValue="settings" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="settings" className="text-lg py-4">Settings</TabsTrigger>
            <TabsTrigger value="advanced" className="text-lg py-4">Advanced options</TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings" className="mt-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Format</h3>
              <RadioGroup value={format} onValueChange={setFormat as (value: string) => void} className="space-y-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="excel" id="format-excel" />
                  <Label htmlFor="format-excel" className="text-base font-normal">Excel</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="csv" id="format-csv" />
                  <Label htmlFor="format-csv" className="text-base font-normal">CSV</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="json" id="format-json" />
                  <Label htmlFor="format-json" className="text-base font-normal">JSON</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="pdf" id="format-pdf" />
                  <Label htmlFor="format-pdf" className="text-base font-normal">PDF</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="schedule-name" className="text-xl font-medium">Schedule name</Label>
              <Input 
                id="schedule-name" 
                value={scheduleName} 
                onChange={(e) => setScheduleName(e.target.value)}
                className="h-12"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recurrence" className="text-xl font-medium">Recurrence</Label>
                <Select value={recurrence} onValueChange={setRecurrence}>
                  <SelectTrigger id="recurrence" className="h-12">
                    <SelectValue placeholder="Daily" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time" className="text-xl font-medium">Time</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger id="time" className="h-12">
                    <SelectValue placeholder="8:00 am" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8:00 am">8:00 am</SelectItem>
                    <SelectItem value="12:00 pm">12:00 pm</SelectItem>
                    <SelectItem value="3:00 pm">3:00 pm</SelectItem>
                    <SelectItem value="6:00 pm">6:00 pm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email-addresses" className="text-xl font-medium">Email addresses</Label>
              <Input 
                id="email-addresses" 
                value={emailAddresses} 
                onChange={(e) => setEmailAddresses(e.target.value)}
                placeholder="Enter email addresses separated by commas"
                className="h-12"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="mt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Advanced options will be available soon.</p>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-between items-center mt-6 gap-4">
          <Button
            variant="outline"
            onClick={handleTestNow}
            className="h-12"
          >
            Test now
          </Button>
          
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-12 w-28"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="h-12 w-28 bg-purple-600 hover:bg-purple-700"
            >
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
