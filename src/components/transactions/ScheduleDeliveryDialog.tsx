
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

type ExportFormat = "excel" | "csv" | "json" | "pdf";

interface ScheduledDelivery {
  id: number;
  name: string;
  format: ExportFormat;
  recurrence: string;
  time: string;
  emails: string;
  subject: string;
  customMessage: string;
  includeLinks: boolean;
  deliveryTimeZone: string;
  created: string;
}

interface ScheduleDeliveryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalCount: number;
}

export function ScheduleDeliveryDialog({ open, onOpenChange, totalCount }: ScheduleDeliveryDialogProps) {
  const [activeTab, setActiveTab] = useState("list");
  const [format, setFormat] = useState<ExportFormat>("excel");
  const [scheduleName, setScheduleName] = useState("");
  const [recurrence, setRecurrence] = useState("daily");
  const [time, setTime] = useState("8:00 am");
  const [emailAddresses, setEmailAddresses] = useState("");
  const [subject, setSubject] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [includeLinks, setIncludeLinks] = useState(false);
  const [deliveryTimeZone, setDeliveryTimeZone] = useState("us-new-york");
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Mock scheduled deliveries data - in a real app this would come from a backend
  const [scheduledDeliveries, setScheduledDeliveries] = useState<ScheduledDelivery[]>([
    {
      id: 1,
      name: "Daily Transaction Report",
      format: "excel",
      recurrence: "daily",
      time: "8:00 am",
      emails: "admin@company.com",
      subject: "Daily Transaction Report",
      customMessage: "Please find the daily transaction report attached.",
      includeLinks: false,
      deliveryTimeZone: "us-new-york",
      created: "2024-01-15"
    },
    {
      id: 2,
      name: "Weekly Summary",
      format: "csv",
      recurrence: "weekly",
      time: "9:00 am", 
      emails: "finance@company.com, manager@company.com",
      subject: "Weekly Transaction Summary",
      customMessage: "",
      includeLinks: true,
      deliveryTimeZone: "us-new-york",
      created: "2024-01-10"
    }
  ]);

  const resetForm = () => {
    setScheduleName("");
    setEmailAddresses("");
    setSubject("");
    setCustomMessage("");
    setFormat("excel");
    setRecurrence("daily");
    setTime("8:00 am");
    setIncludeLinks(false);
    setDeliveryTimeZone("us-new-york");
    setEditingId(null);
  };

  const handleSave = () => {
    if (!scheduleName.trim()) {
      toast.error("Please enter a schedule name");
      return;
    }
    
    if (!emailAddresses.trim()) {
      toast.error("Please enter email addresses");
      return;
    }

    const newDelivery: ScheduledDelivery = {
      id: editingId || Date.now(),
      name: scheduleName,
      format,
      recurrence,
      time,
      emails: emailAddresses,
      subject: subject || `${scheduleName} Report`,
      customMessage,
      includeLinks,
      deliveryTimeZone,
      created: new Date().toISOString().split('T')[0]
    };

    if (editingId) {
      setScheduledDeliveries(prev => 
        prev.map(delivery => delivery.id === editingId ? newDelivery : delivery)
      );
      toast.success("Delivery schedule updated", {
        description: `${scheduleName} has been updated successfully`
      });
    } else {
      setScheduledDeliveries(prev => [...prev, newDelivery]);
      toast.success("Delivery schedule saved", {
        description: `${scheduleName} will be delivered ${recurrence} at ${time}`
      });
    }
    
    resetForm();
    setActiveTab("list");
  };

  const handleEdit = (delivery: ScheduledDelivery) => {
    setScheduleName(delivery.name);
    setFormat(delivery.format);
    setRecurrence(delivery.recurrence);
    setTime(delivery.time);
    setEmailAddresses(delivery.emails);
    setSubject(delivery.subject);
    setCustomMessage(delivery.customMessage);
    setIncludeLinks(delivery.includeLinks);
    setDeliveryTimeZone(delivery.deliveryTimeZone);
    setEditingId(delivery.id);
    setActiveTab("settings");
  };

  const handleDelete = (id: number) => {
    setScheduledDeliveries(prev => prev.filter(delivery => delivery.id !== id));
    toast.success("Delivery schedule deleted");
  };

  const handleTestNow = () => {
    toast.success("Test email sent", {
      description: "A test email has been sent to the specified addresses"
    });
  };

  const handleCreateNew = () => {
    resetForm();
    setActiveTab("settings");
  };

  const handleIncludeLinksChange = (checked: boolean | "indeterminate") => {
    setIncludeLinks(checked === true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <DialogTitle className="text-xl font-normal">Schedule delivery</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="overflow-y-auto flex-1">
          {activeTab === "list" ? (
            <div className="space-y-4">
              {scheduledDeliveries.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No previous scheduled deliveries.
                </p>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {scheduledDeliveries.length} scheduled {scheduledDeliveries.length === 1 ? 'delivery' : 'deliveries'}
                  </p>
                  {scheduledDeliveries.map((delivery) => (
                    <div key={delivery.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{delivery.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {delivery.format.toUpperCase()} • {delivery.recurrence} at {delivery.time}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            To: {delivery.emails}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleEdit(delivery)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(delivery.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <Button 
                onClick={handleCreateNew}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create new
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="settings" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="advanced">Advanced options</TabsTrigger>
              </TabsList>
              
              <TabsContent value="settings" className="mt-4 space-y-4">
                <div className="space-y-3">
                  <h3 className="text-base font-medium">Format</h3>
                  <RadioGroup value={format} onValueChange={setFormat as (value: string) => void} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="excel" id="format-excel" />
                      <Label htmlFor="format-excel" className="text-sm">Excel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="csv" id="format-csv" />
                      <Label htmlFor="format-csv" className="text-sm">CSV</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="json" id="format-json" />
                      <Label htmlFor="format-json" className="text-sm">JSON</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pdf" id="format-pdf" />
                      <Label htmlFor="format-pdf" className="text-sm">PDF</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="schedule-name" className="text-base font-medium">Schedule name</Label>
                  <Input 
                    id="schedule-name" 
                    value={scheduleName} 
                    onChange={(e) => setScheduleName(e.target.value)}
                    placeholder="Enter schedule name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="recurrence" className="text-base font-medium">Recurrence</Label>
                    <Select value={recurrence} onValueChange={setRecurrence}>
                      <SelectTrigger id="recurrence">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="time" className="text-base font-medium">Time</Label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger id="time">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6:00 am">6:00 am</SelectItem>
                        <SelectItem value="8:00 am">8:00 am</SelectItem>
                        <SelectItem value="12:00 pm">12:00 pm</SelectItem>
                        <SelectItem value="3:00 pm">3:00 pm</SelectItem>
                        <SelectItem value="6:00 pm">6:00 pm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="email-addresses" className="text-base font-medium">Email addresses</Label>
                  <Input 
                    id="email-addresses" 
                    value={emailAddresses} 
                    onChange={(e) => setEmailAddresses(e.target.value)}
                    placeholder="Enter email addresses separated by commas"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="advanced" className="mt-4 space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="subject" className="text-base font-medium">Subject</Label>
                  <Input 
                    id="subject" 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Email subject"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="custom-message" className="text-base font-medium">Custom message</Label>
                  <Textarea 
                    id="custom-message" 
                    value={customMessage} 
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Add a custom message to the email"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground text-right">{customMessage.length}/500</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="include-links" 
                    checked={includeLinks}
                    onCheckedChange={handleIncludeLinksChange}
                  />
                  <Label htmlFor="include-links" className="text-sm">Include links</Label>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="delivery-timezone" className="text-base font-medium">Delivery time zone</Label>
                  <Select value={deliveryTimeZone} onValueChange={setDeliveryTimeZone}>
                    <SelectTrigger id="delivery-timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us-new-york">U.S. - New York</SelectItem>
                      <SelectItem value="us-los-angeles">U.S. - Los Angeles</SelectItem>
                      <SelectItem value="europe-london">Europe - London</SelectItem>
                      <SelectItem value="europe-stockholm">Europe - Stockholm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
        
        {activeTab !== "list" && (
          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleTestNow}
            >
              Test now
            </Button>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setActiveTab("list");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {editingId ? "Update" : "Save"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
