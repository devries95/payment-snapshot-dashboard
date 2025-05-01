import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, Minus, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Types for the form values
type RemittanceLevel = "company" | "facility" | "lot" | "venue";
type RemittanceItem = { id: string; name: string; facilityId?: string; facilityName?: string };
type RemittanceGrouping = { id: string; name: string; items: string[] };

type RemittanceFormValues = {
  remittanceLevel: RemittanceLevel;
  selectedItems: Record<string, boolean>;
  groups: RemittanceGrouping[];
};

// Default company information
const defaultCompany = {
  id: "company-1",
  name: "ABC Parking Corp"
};

export default function RemittanceConfig() {
  const navigate = useNavigate();
  const [remittanceLevel, setRemittanceLevel] = useState<RemittanceLevel>("company");
  const [groupings, setGroupings] = useState<RemittanceGrouping[]>([]);
  const [showGroupConfig, setShowGroupConfig] = useState(false);
  
  // State for user-created items
  const [facilities, setFacilities] = useState<RemittanceItem[]>([]);
  const [lots, setLots] = useState<RemittanceItem[]>([]);
  const [venues, setVenues] = useState<RemittanceItem[]>([]);
  
  // State for adding new items
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemId, setNewItemId] = useState("");
  const [newItemType, setNewItemType] = useState<"facility" | "lot" | "venue">("facility");
  const [newItemParentId, setNewItemParentId] = useState<string>("");
  
  // Form for handling the remittance configuration
  const form = useForm<RemittanceFormValues>({
    defaultValues: {
      remittanceLevel: "company",
      selectedItems: {},
      groups: [],
    },
  });

  // Get all items based on the selected level
  const getItemsByLevel = (level: RemittanceLevel) => {
    switch (level) {
      case "company":
        return [defaultCompany];
      case "facility":
        return facilities;
      case "lot":
        return lots;
      case "venue":
        return venues;
      default:
        return [];
    }
  };

  // Handle level change
  const handleLevelChange = (value: RemittanceLevel) => {
    setRemittanceLevel(value);
    form.setValue("remittanceLevel", value);
    
    // Reset selections when changing levels
    form.setValue("selectedItems", {});
    setGroupings([]);
    setShowGroupConfig(false);
  };

  // Get the current items based on the remittance level
  const currentItems = getItemsByLevel(remittanceLevel);

  // Helper function to check if an item is already in a group
  const isItemInGroup = (itemId: string) => {
    return groupings.some(group => group.items.includes(itemId));
  };

  // Handle adding a new group
  const addGroup = () => {
    const newGroup: RemittanceGrouping = {
      id: `group-${groupings.length + 1}`,
      name: `Group ${groupings.length + 1}`,
      items: [],
    };
    setGroupings([...groupings, newGroup]);
  };

  // Handle removing a group
  const removeGroup = (groupId: string) => {
    setGroupings(groupings.filter(group => group.id !== groupId));
  };

  // Handle adding an item to a group
  const addItemToGroup = (groupId: string, itemId: string) => {
    setGroupings(groupings.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          items: [...group.items, itemId],
        };
      }
      return group;
    }));
  };

  // Handle removing an item from a group
  const removeItemFromGroup = (groupId: string, itemId: string) => {
    setGroupings(groupings.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          items: group.items.filter(id => id !== itemId),
        };
      }
      return group;
    }));
  };

  // Add a new item
  const handleAddItem = () => {
    if (!newItemName || !newItemId) {
      toast.error("Item name and ID are required");
      return;
    }

    const newItem = {
      id: newItemId,
      name: newItemName,
    };

    if (newItemType === "facility") {
      setFacilities([...facilities, newItem]);
    } else if (newItemType === "lot") {
      const parentFacility = facilities.find(f => f.id === newItemParentId);
      if (!parentFacility && newItemParentId) {
        toast.error("Selected parent facility not found");
        return;
      }

      setLots([...lots, {
        ...newItem,
        facilityId: newItemParentId,
        facilityName: parentFacility?.name || ""
      }]);
    } else if (newItemType === "venue") {
      const parentFacility = facilities.find(f => f.id === newItemParentId);
      if (!parentFacility && newItemParentId) {
        toast.error("Selected parent facility not found");
        return;
      }

      setVenues([...venues, {
        ...newItem,
        facilityId: newItemParentId,
        facilityName: parentFacility?.name || ""
      }]);
    }

    // Reset form
    setNewItemName("");
    setNewItemId("");
    setIsAddingItem(false);
    toast.success(`Added new ${newItemType}: ${newItemName}`);
  };

  // Delete an item
  const deleteItem = (level: RemittanceLevel, itemId: string) => {
    if (level === "facility") {
      setFacilities(facilities.filter(item => item.id !== itemId));
      // Also delete related lots and venues
      setLots(lots.filter(lot => lot.facilityId !== itemId));
      setVenues(venues.filter(venue => venue.facilityId !== itemId));
    } else if (level === "lot") {
      setLots(lots.filter(item => item.id !== itemId));
    } else if (level === "venue") {
      setVenues(venues.filter(item => item.id !== itemId));
    }
    
    // Remove from any groups
    setGroupings(groupings.map(group => ({
      ...group,
      items: group.items.filter(id => id !== itemId)
    })));
    
    toast.success("Item deleted");
  };

  // Handle form submission
  const onSubmit = (data: RemittanceFormValues) => {
    // Validate that at least one item is selected
    const hasSelectedItems = Object.values(data.selectedItems).some(selected => selected);
    
    if (!hasSelectedItems && data.remittanceLevel !== "company") {
      toast.error("Please select at least one item for remittance");
      return;
    }

    // Format the data for saving
    const remittanceConfig = {
      level: data.remittanceLevel,
      items: Object.entries(data.selectedItems)
        .filter(([_, selected]) => selected)
        .map(([id]) => id),
      groupings: groupings,
    };

    // In a real app, this would be saved to the backend
    console.log("Saving remittance configuration:", remittanceConfig);
    
    // Show success message
    toast.success("Remittance configuration saved successfully");
    
    // Navigate back to the dashboard
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/95 sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            <h1 className="text-xl font-semibold">Remittance Configuration</h1>
          </div>
          <div>
            <Button onClick={form.handleSubmit(onSubmit)}>
              <Save className="mr-2 h-4 w-4" />
              Save Configuration
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto p-4 sm:p-6">
          <Card>
            <CardHeader>
              <CardTitle>Configure Remittance Logic</CardTitle>
              <CardDescription>
                Specify how funds should be remitted within your company structure.
                By default, all funds are remitted to the company.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Remittance Level Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Remittance Level</h3>
                    <p className="text-sm text-muted-foreground">
                      Select the level at which remittances should be processed
                    </p>
                    
                    <RadioGroup 
                      value={remittanceLevel} 
                      onValueChange={(value) => handleLevelChange(value as RemittanceLevel)}
                      className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="company" id="company" />
                        <FormLabel htmlFor="company">Company (Default)</FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="facility" id="facility" />
                        <FormLabel htmlFor="facility">Facilities</FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="lot" id="lot" />
                        <FormLabel htmlFor="lot">Lots</FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="venue" id="venue" />
                        <FormLabel htmlFor="venue">Venues</FormLabel>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Add Item Section (for non-company levels) */}
                  {remittanceLevel !== "company" && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Manage {remittanceLevel === "facility" ? "Facilities" : remittanceLevel === "lot" ? "Lots" : "Venues"}</h3>
                        <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
                          <DialogTrigger asChild>
                            <Button>
                              <Plus className="mr-2 h-4 w-4" />
                              Add {remittanceLevel === "facility" ? "Facility" : remittanceLevel === "lot" ? "Lot" : "Venue"}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add New {remittanceLevel === "facility" ? "Facility" : remittanceLevel === "lot" ? "Lot" : "Venue"}</DialogTitle>
                              <DialogDescription>
                                Enter the details for the new {remittanceLevel}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <FormLabel>Name</FormLabel>
                                <Input 
                                  value={newItemName}
                                  onChange={(e) => setNewItemName(e.target.value)}
                                  placeholder={`${remittanceLevel === "facility" ? "Facility" : remittanceLevel === "lot" ? "Lot" : "Venue"} name`}
                                />
                              </div>
                              <div className="space-y-2">
                                <FormLabel>ID</FormLabel>
                                <Input 
                                  value={newItemId}
                                  onChange={(e) => setNewItemId(e.target.value)}
                                  placeholder={`Unique identifier`}
                                />
                              </div>
                              
                              {/* Parent facility selection for lots and venues */}
                              {(remittanceLevel === "lot" || remittanceLevel === "venue") && (
                                <div className="space-y-2">
                                  <FormLabel>Parent Facility</FormLabel>
                                  <Select 
                                    value={newItemParentId} 
                                    onValueChange={setNewItemParentId}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a facility" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {facilities.length > 0 ? (
                                        facilities.map((facility) => (
                                          <SelectItem key={facility.id} value={facility.id}>
                                            {facility.name}
                                          </SelectItem>
                                        ))
                                      ) : (
                                        <SelectItem key="no-facilities" value="no-facilities-available" disabled>
                                          No facilities available
                                        </SelectItem>
                                      )}
                                    </SelectContent>
                                  </Select>
                                  {facilities.length === 0 && (
                                    <FormDescription>
                                      You need to create facilities first
                                    </FormDescription>
                                  )}
                                </div>
                              )}
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsAddingItem(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleAddItem} disabled={
                                !newItemName || 
                                !newItemId || 
                                ((remittanceLevel === "lot" || remittanceLevel === "venue") && facilities.length === 0)
                              }>
                                Add {remittanceLevel === "facility" ? "Facility" : remittanceLevel === "lot" ? "Lot" : "Venue"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      
                      {/* Display existing items */}
                      {currentItems.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {currentItems.map((item) => (
                            <Card key={item.id} className="p-4">
                              <div className="flex items-start justify-between">
                                <FormField
                                  control={form.control}
                                  name={`selectedItems.${item.id}`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1 space-y-2">
                                      <div className="flex items-center space-x-2">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value || false}
                                            onCheckedChange={field.onChange}
                                          />
                                        </FormControl>
                                        <div>
                                          <FormLabel className="font-medium">{item.name}</FormLabel>
                                          {'facilityName' in item && item.facilityName && (
                                            <p className="text-xs text-muted-foreground">
                                              {item.facilityName}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </FormItem>
                                  )}
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteItem(remittanceLevel, item.id)}
                                  className="text-destructive"
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center p-8 border rounded-md bg-muted/20">
                          <p className="text-muted-foreground">
                            No {remittanceLevel === "facility" ? "facilities" : remittanceLevel === "lot" ? "lots" : "venues"} created yet.
                            Add some using the button above.
                          </p>
                        </div>
                      )}
                      
                      {/* Grouping Configuration Section */}
                      {currentItems.length > 0 && (
                        <div className="mt-8 space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">Remittance Groupings</h3>
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setShowGroupConfig(!showGroupConfig)}
                            >
                              {showGroupConfig ? "Hide" : "Show"} Grouping Options
                            </Button>
                          </div>
                          
                          {showGroupConfig && (
                            <div className="space-y-6 border rounded-md p-4">
                              <p className="text-sm text-muted-foreground">
                                Create groups to combine multiple items into a single remittance unit. 
                                Items can only be in one group at a time.
                              </p>
                              
                              <div className="flex justify-end">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={addGroup}
                                  className="flex items-center gap-2"
                                >
                                  <Plus className="h-4 w-4" />
                                  Add Group
                                </Button>
                              </div>
                              
                              {groupings.length > 0 && (
                                <div className="space-y-4">
                                  {groupings.map((group) => (
                                    <Card key={group.id} className="p-4">
                                      <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                          <h4 className="font-medium">{group.name}</h4>
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeGroup(group.id)}
                                            className="text-destructive"
                                          >
                                            <Minus className="h-4 w-4 mr-1" />
                                            Remove Group
                                          </Button>
                                        </div>
                                        
                                        <div>
                                          <h5 className="text-sm mb-2">Add Items to Group:</h5>
                                          
                                          <div className="space-y-2">
                                            {group.items.length > 0 ? (
                                              <div className="space-y-2">
                                                <h6 className="text-xs font-medium">Current Items:</h6>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                  {group.items.map((itemId) => {
                                                    const item = currentItems.find(i => i.id === itemId);
                                                    return item ? (
                                                      <div key={itemId} className="flex items-center justify-between bg-muted p-2 rounded-md">
                                                        <span className="text-xs">{item.name}</span>
                                                        <Button
                                                          type="button"
                                                          variant="ghost"
                                                          size="sm"
                                                          onClick={() => removeItemFromGroup(group.id, itemId)}
                                                          className="h-6 w-6 p-0"
                                                        >
                                                          <Minus className="h-3 w-3" />
                                                        </Button>
                                                      </div>
                                                    ) : null;
                                                  })}
                                                </div>
                                              </div>
                                            ) : (
                                              <p className="text-xs text-muted-foreground italic">No items in this group yet</p>
                                            )}
                                            
                                            <div className="mt-4">
                                              <h6 className="text-xs font-medium mb-2">Available Items:</h6>
                                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {currentItems
                                                  .filter(item => !isItemInGroup(item.id))
                                                  .map((item) => (
                                                    <div key={item.id} className="flex items-center justify-between bg-background border p-2 rounded-md">
                                                      <span className="text-xs">{item.name}</span>
                                                      <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => addItemToGroup(group.id, item.id)}
                                                        className="h-6 w-6 p-0"
                                                      >
                                                        <Plus className="h-3 w-3" />
                                                      </Button>
                                                    </div>
                                                  ))}
                                              </div>
                                              {currentItems.filter(item => !isItemInGroup(item.id)).length === 0 && (
                                                <p className="text-xs text-muted-foreground italic">All items have been assigned to groups</p>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Card>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
