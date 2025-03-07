
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
      <DrawerContent className="fixed inset-y-0 right-0 h-full w-[350px] sm:w-[500px] border-l rounded-none flex flex-col">
        <DrawerHeader className="flex items-center justify-between border-b pb-4">
          <DrawerTitle className="text-2xl">Column settings</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="px-6 pt-6 flex-1 overflow-y-auto">
          <h3 className="text-lg font-medium mb-4">Visibility and order</h3>
          <div className="space-y-2">
            {localColumns.map((column) => (
              <div
                key={column.id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={`column-${column.id}`}
                    checked={column.visible}
                    onCheckedChange={() => handleVisibilityChange(column.id)}
                  />
                  <label htmlFor={`column-${column.id}`} className="text-base">
                    {column.label}
                  </label>
                </div>
                <GripVertical className="h-5 w-5 text-gray-500" />
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-6 flex gap-4 border-t mt-auto">
          <Button
            className="w-full bg-purple-700 hover:bg-purple-800 text-white"
            onClick={handleApplyChanges}
          >
            Apply changes
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
