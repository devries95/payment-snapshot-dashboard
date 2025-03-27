
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Filter, Settings, Download, CalendarIcon, X, ChevronDown } from "lucide-react";
import { ColumnSettingsDrawer } from "./ColumnSettingsDrawer";
import { ExportDialog } from "./ExportDialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { DateRange } from "react-day-picker";

export type ColumnConfig = {
  id: string;
  label: string;
  visible: boolean;
  sticky?: boolean; // Indicates if the column should be fixed
};

// Sample operators
const operators = [
  { value: "stockholm", label: "Stockholm Parking" },
  { value: "gothenburg", label: "Gothenburg City Parking" },
  { value: "malmo", label: "Malmö Parking Authority" },
  { value: "uppsala", label: "Uppsala Municipal Parking" },
  { value: "linkoping", label: "Linköping Parking Services" },
  { value: "orebro", label: "Örebro Parking Management" },
  { value: "vasteras", label: "Västerås City Parking" },
];

const allColumns: ColumnConfig[] = [
  { id: "supplier", label: "Supplier name", visible: true, sticky: true },
  { id: "zone", label: "Zone description", visible: true },
  { id: "zoneCode", label: "Zone code", visible: true },
  { id: "station", label: "Station", visible: true },
  { id: "department", label: "Department location", visible: true },
  { id: "parking", label: "Parking ID", visible: true },
  { id: "date", label: "Date", visible: true, sticky: true },
  { id: "amount", label: "Amount", visible: true, sticky: true },
  { id: "orderId", label: "Order ID", visible: true },
  { id: "paymentId", label: "Payment ID", visible: true },
  { id: "clientId", label: "Client ID", visible: true },
  { id: "customerPhone", label: "Customer phone", visible: true },
  { id: "email", label: "Email", visible: true },
  { id: "timeZone", label: "Time zone", visible: true },
  { id: "localTimeStart", label: "Local time start", visible: false },
  { id: "localTimeStop", label: "Local time stop", visible: false },
  { id: "duration", label: "Duration", visible: false },
  { id: "paidMinutes", label: "Paid minutes", visible: false },
  { id: "insertTime", label: "Insert time", visible: false },
  { id: "paymentTime", label: "Payment time", visible: false },
  { id: "approved", label: "Approved", visible: false },
  { id: "paymentMethod", label: "Payment method", visible: false },
];

// Generate mock transactions with operator information
const generateMockTransactions = () => {
  return Array(50).fill(null).map((_, i) => {
    // Randomly select an operator
    const randomOperator = operators[Math.floor(Math.random() * operators.length)];
    
    return {
      id: i + 1,
      supplier: randomOperator.label,
      supplierValue: randomOperator.value,
      zone: `${randomOperator.label.split(' ')[0]} Zone ${Math.floor(Math.random() * 10) + 1}`,
      zoneCode: `${Math.floor(Math.random() * 999999)}`,
      station: `${randomOperator.label.split(' ')[0]} Station ${Math.floor(Math.random() * 15) + 1}`,
      department: `Dept ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 100)}`,
      parking: `${Math.floor(Math.random() * 999)},${Math.floor(Math.random() * 999)},${Math.floor(Math.random() * 999)}`,
      date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      amount: `€${(Math.random() * 1000).toFixed(2)}`,
      orderId: `ORD-${Math.floor(1000000 + Math.random() * 9000000)}`,
      paymentId: `PAY-${Math.floor(1000000 + Math.random() * 9000000)}`,
      clientId: `CLT-${Math.floor(10000 + Math.random() * 90000)}`,
      customerPhone: `+1 ${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      email: `customer${i}@example.com`,
      timeZone: "EST",
      localTimeStart: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      localTimeStop: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      duration: `${Math.floor(Math.random() * 180)} mins`,
      paidMinutes: `${Math.floor(Math.random() * 180)} mins`,
      insertTime: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      paymentTime: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      approved: Math.random() > 0.2 ? "Yes" : "No",
      paymentMethod: ["Credit Card", "PayPal", "Apple Pay", "Google Pay"][Math.floor(Math.random() * 4)],
    };
  });
};

const mockTransactions = generateMockTransactions();

type TransactionTableProps = {
  title: string;
  description?: string;
};

export function TransactionTable({ title, description }: TransactionTableProps) {
  // Use state for selected operators with multi-select
  const [selectedOperators, setSelectedOperators] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [columns, setColumns] = useState<ColumnConfig[]>(allColumns);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  
  // Date range picker state
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    to: new Date()
  });
  
  const visibleColumns = columns.filter(col => col.visible);
  
  const filteredTransactions = mockTransactions.filter(transaction => 
    selectedOperators.length === 0 || selectedOperators.includes(transaction.supplierValue)
  );
  
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * parseInt(pageSize), 
    currentPage * parseInt(pageSize)
  );
  
  const totalPages = Math.ceil(filteredTransactions.length / parseInt(pageSize));
  
  const handleColumnChange = (updatedColumns: ColumnConfig[]) => {
    setColumns(updatedColumns);
  };

  const handleExportCSV = () => {
    toast.success("Exporting transactions as CSV", {
      description: "Your download will start shortly."
    });
    
    console.log(`Exporting transactions in CSV format`);
  };

  const toggleOperator = (value: string) => {
    setSelectedOperators(current => 
      current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
    );
  };
  
  const clearOperators = () => {
    setSelectedOperators([]);
  };
  
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-3 mb-4 justify-between">
        <div className="flex-1 max-w-md">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedOperators.length === 0 
                  ? "All operators" 
                  : `${selectedOperators.length} selected`}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              {operators.map((operator) => (
                <DropdownMenuCheckboxItem
                  key={operator.value}
                  checked={selectedOperators.includes(operator.value)}
                  onCheckedChange={() => toggleOperator(operator.value)}
                >
                  {operator.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {selectedOperators.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedOperators.map(operatorValue => {
                const operator = operators.find(op => op.value === operatorValue);
                return (
                  <Badge 
                    key={operatorValue} 
                    variant="secondary" 
                    className="flex items-center gap-1"
                  >
                    {operator?.label}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => toggleOperator(operatorValue)}
                    />
                  </Badge>
                );
              })}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs" 
                onClick={clearOperators}
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 justify-end">
          {/* Date Range Picker */}
          <div className="flex-shrink-0">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-[280px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Select date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={(range) => {
                    if (range) setDateRange(range);
                  }}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Filter className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10"
            onClick={() => setDrawerOpen(true)}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button 
            variant="secondary"
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleExportCSV}
          >
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border relative">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {visibleColumns.map((column) => (
                  <TableHead
                    key={column.id}
                    className={cn(
                      column.sticky && "sticky left-0 bg-background z-20 shadow-[1px_0_0_0_hsl(var(--border))]",
                      "whitespace-nowrap"
                    )}
                  >
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  {visibleColumns.map((column) => (
                    <TableCell
                      key={`${transaction.id}-${column.id}`}
                      className={cn(
                        column.sticky && "sticky left-0 bg-background z-20 shadow-[1px_0_0_0_hsl(var(--border))]",
                        "whitespace-nowrap"
                      )}
                    >
                      {transaction[column.id as keyof typeof transaction]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page</span>
          <Select value={pageSize} onValueChange={setPageSize}>
            <SelectTrigger className="w-16">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setCurrentPage(1)} 
            disabled={currentPage === 1}
          >
            <span>«</span>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1}
          >
            <span>‹</span>
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
            disabled={currentPage === totalPages}
          >
            <span>›</span>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setCurrentPage(totalPages)} 
            disabled={currentPage === totalPages}
          >
            <span>»</span>
          </Button>
        </div>
      </div>
      
      <ColumnSettingsDrawer 
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        columns={columns}
        onApplyChanges={handleColumnChange}
      />
      
      <ExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        onExport={(format, dataAmount) => {
          toast.success(`Exporting ${dataAmount === "all" ? "all" : "limited"} transactions as ${format.toUpperCase()}`, {
            description: "Your download will start shortly."
          });
        }}
        totalCount={filteredTransactions.length}
      />
    </div>
  );
}
