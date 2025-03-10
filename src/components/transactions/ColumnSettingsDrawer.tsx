
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { GripVertical, X } from "lucide-react";

export type ColumnConfig = {
  id: string;
  label: string;
  visible: boolean;
  sticky?: boolean;
};

type ColumnSettingsDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columns: ColumnConfig[];
  onApplyChanges: (columns: ColumnConfig[]) => void;
};

export function ColumnSettingsDrawer({
  open,
  onOpenChange,
  columns,
  onApplyChanges,
}: ColumnSettingsDrawerProps) {
  const [localColumns, setLocalColumns] = useState<ColumnConfig[]>(columns);

  const handleVisibilityChange = (id: string) => {
    setLocalColumns((prev) =>
      prev.map((col) =>
        col.id === id ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleApplyChanges = () => {
    onApplyChanges(localColumns);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="fixed inset-y-0 right-0 h-full w-[350px] sm:w-[500px] border-l rounded-none flex flex-col bg-white">
        <DrawerHeader className="flex items-center justify-between p-4 border-b">
          <DrawerTitle className="text-xl font-semibold">Column settings</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        
        <div className="p-4 border-b">
          <h3 className="text-sm font-medium text-gray-500">Visibility and order</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y">
            {localColumns.map((column) => (
              <div
                key={column.id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={`column-${column.id}`}
                    checked={column.visible}
                    onCheckedChange={() => handleVisibilityChange(column.id)}
                    className="rounded-sm"
                  />
                  <label 
                    htmlFor={`column-${column.id}`} 
                    className="text-base font-medium cursor-pointer"
                  >
                    {column.label}
                  </label>
                </div>
                <GripVertical className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 flex gap-2 border-t mt-auto">
          <Button
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleApplyChanges}
          >
            Apply changes
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
