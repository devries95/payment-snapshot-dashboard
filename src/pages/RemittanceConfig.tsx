
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Mock data for the company hierarchy
const mockCompanyData = {
  id: "company-1",
  name: "ABC Parking Corp",
  facilities: [
    {
      id: "facility-1",
      name: "Downtown Facility",
      lots: [
        { id: "lot-1", name: "Lot X" },
        { id: "lot-2", name: "Lot Y" },
      ],
      venues: [
        { id: "venue-1", name: "Stadium Venue" },
        { id: "venue-2", name: "Concert Hall" },
      ]
    },
    {
      id: "facility-2",
      name: "Airport Facility",
      lots: [
        { id: "lot-3", name: "Lot Z" },
        { id: "lot-4", name: "Lot W" },
      ],
      venues: [
        { id: "venue-3", name: "Terminal Venue" }
      ]
    }
  ]
};

// Types for the form values
type RemittanceLevel = "company" | "facility" | "lot" | "venue";
type RemittanceItem = { id: string; name: string; facilityId?: string; facilityName?: string };
type RemittanceGrouping = { id: string; name: string; items: string[] };

type RemittanceFormValues = {
  remittanceLevel: RemittanceLevel;
  selectedItems: Record<string, boolean>;
  groups: RemittanceGrouping[];
};

export default function RemittanceConfig() {
  const navigate = useNavigate();
  const [remittanceLevel, setRemittanceLevel] = useState<RemittanceLevel>("company");
  const [groupings, setGroupings] = useState<RemittanceGrouping[]>([]);
  const [showGroupConfig, setShowGroupConfig] = useState(false);
  
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
        return [{ id: mockCompanyData.id, name: mockCompanyData.name }];
      case "facility":
        return mockCompanyData.facilities.map(facility => ({ id: facility.id, name: facility.name }));
      case "lot":
        return mockCompanyData.facilities.flatMap(facility => 
          facility.lots.map(lot => ({ id: lot.id, name: lot.name, facilityId: facility.id, facilityName: facility.name }))
        );
      case "venue":
        return mockCompanyData.facilities.flatMap(facility => 
          facility.venues.map(venue => ({ id: venue.id, name: venue.name, facilityId: facility.id, facilityName: facility.name }))
        );
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

                  {/* Item Selection Section (only shown for non-company levels) */}
                  {remittanceLevel !== "company" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Select Items</h3>
                      <p className="text-sm text-muted-foreground">
                        Choose which items to include in remittance processing
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentItems.map((item) => (
                          <Card key={item.id} className="p-4">
                            <div className="flex items-start space-x-3">
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
                                        {'facilityName' in item && (
                                          <p className="text-xs text-muted-foreground">
                                            {item.facilityName}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </Card>
                        ))}
                      </div>
                      
                      {/* Grouping Configuration Section */}
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
