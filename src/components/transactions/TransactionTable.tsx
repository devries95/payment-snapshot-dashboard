
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Filter, Settings, Download, CalendarIcon, ChevronDown, X } from "lucide-react";
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
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type ColumnConfig = {
  id: string;
  label: string;
  visible: boolean;
  sticky?: boolean;
};

const operators = [
  { value: "stockholm", label: "Stockholm Parking" },
  { value: "gothenburg", label: "Gothenburg City Parking" },
  { value: "malmo", label: "Malmö Parking Authority" },
  { value: "uppsala", label: "Uppsala Municipal Parking" },
  { value: "linkoping", label: "Linköping Parking Services" },
  { value: "orebro", label: "Örebro Parking Management" },
  { value: "vasteras", label: "Västerås City Parking" },
];

// Normal parking columns
const allNormalColumns: ColumnConfig[] = [
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

// Reservation parking columns
const allReservationColumns: ColumnConfig[] = [
  { id: "micrositeId", label: "Microsite ID", visible: true, sticky: true },
  { id: "micrositeName", label: "Microsite Name", visible: true },
  { id: "paymentTransactionTerminalId", label: "Payment Transaction Terminal Id", visible: true },
  { id: "paymentTransactionMerchantId", label: "Payment Transaction Merchant Id", visible: true },
  { id: "paymentTransactionId", label: "Payment Transaction Id", visible: true },
  { id: "orderPromoCodeId", label: "Order Promo Code Id", visible: true },
  { id: "orderPromoCodeName", label: "Order Promo Code Name", visible: true },
  { id: "orderCompletedAt", label: "Order Completed At", visible: true },
  { id: "orderWorkflowState", label: "Order Workflow State", visible: true },
  { id: "reservationId", label: "Reservation Id", visible: true, sticky: true },
  { id: "reservationBeginAt", label: "Reservation Begin At", visible: true },
  { id: "reservationEndAt", label: "Reservation End At", visible: true },
  { id: "paymentTransactionAction", label: "Payment Transaction Action", visible: true },
  { id: "paymentTransactionSuccess", label: "Payment Transaction Success", visible: true },
  { id: "paymentTransactionAmount", label: "Payment Transaction Amount", visible: true, sticky: true },
  { id: "paymentTransactionCreatedAt", label: "Payment Transaction Created At", visible: true },
  { id: "paymentTransactionInstrument", label: "Payment Transaction Instrument", visible: true },
  { id: "orderId", label: "Order Id", visible: true },
  { id: "paymentCode", label: "Payment Code", visible: true },
  { id: "barcodeCode", label: "Barcode Code", visible: false },
  { id: "facilityId", label: "Facility Id", visible: false },
  { id: "facilityName", label: "Facility Name", visible: false },
  { id: "facilityCode", label: "Facility Code", visible: false },
  { id: "facilityTimeZone", label: "Facility Time Zone", visible: false },
  { id: "companyID", label: "Company ID", visible: false },
  { id: "companyName", label: "Company Name", visible: false },
  { id: "eventID", label: "Event ID", visible: false },
  { id: "eventName", label: "Event Name", visible: false },
  { id: "venueID", label: "Venue ID", visible: false },
  { id: "venueName", label: "Venue Name", visible: false },
  { id: "lotID", label: "Lot ID", visible: false },
  { id: "lotName", label: "Lot Name", visible: false },
  { id: "productID", label: "Product ID", visible: false },
  { id: "productName", label: "Product Name", visible: false },
  { id: "productPriceCalculationType", label: "Product Price Calculation Type", visible: false },
  { id: "productPricePeriodHours", label: "Product Price Period Hours", visible: false },
  { id: "productTypeID", label: "Product Type ID", visible: false },
  { id: "productTypeName", label: "Product Type Name", visible: false },
  { id: "lineItemID", label: "Line Item ID", visible: false },
  { id: "lineItemWorkflowState", label: "Line Item Workflow State", visible: false },
  { id: "lineItemTotal", label: "Line Item Total", visible: false },
  { id: "lineItemPrice", label: "Line Item Price", visible: false },
  { id: "lineItemParkmobileServiceFee", label: "Line Item Parkmobile Service Fee", visible: false },
  { id: "lineItemClientServiceFee", label: "Line Item Client Service Fee", visible: false },
  { id: "lineItemDeliveryFee", label: "Line Item Delivery Fee", visible: false },
  { id: "lineItemTax", label: "Line Item Tax", visible: false },
  { id: "lineItemDiscount", label: "Line Item Discount", visible: false },
  { id: "lineItemProcessingFee", label: "Line Item Processing Fee", visible: false },
  { id: "lineItemTransactionFee", label: "Line Item Transaction Fee", visible: false },
  { id: "amountOwedClient", label: "Amount Owed Client", visible: false },
  { id: "amountOwedParkmobile", label: "Amount Owed Parkmobile", visible: false },
];

// Generate mock normal transactions data
const generateMockTransactions = () => {
  return Array(50).fill(null).map((_, i) => {
    const randomOperator = operators[Math.floor(Math.random() * operators.length)];
    const parkingType = Math.random() > 0.7 ? 'reservation' : 'normal';
    
    return {
      id: i + 1,
      supplier: randomOperator.label,
      supplierValue: randomOperator.value,
      parkingType,
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
      timeZone: "EST"
    };
  });
};

// Generate mock reservation transactions data
const generateMockReservationTransactions = () => {
  return Array(50).fill(null).map((_, i) => {
    const randomOperator = operators[Math.floor(Math.random() * operators.length)];
    const beginDate = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);
    const endDate = new Date(beginDate.getTime() + Math.floor(Math.random() * 48) * 60 * 60 * 1000);
    
    return {
      id: i + 1,
      parkingType: 'reservation',
      supplierValue: randomOperator.value,
      micrositeId: `MSITE-${Math.floor(10000 + Math.random() * 90000)}`,
      micrositeName: `${randomOperator.label} Microsite`,
      paymentTransactionTerminalId: `TERM-${Math.floor(1000 + Math.random() * 9000)}`,
      paymentTransactionMerchantId: `MERCH-${Math.floor(100000 + Math.random() * 900000)}`,
      paymentTransactionId: `PTRANS-${Math.floor(1000000 + Math.random() * 9000000)}`,
      orderPromoCodeId: Math.random() > 0.7 ? `PROMO-${Math.floor(100 + Math.random() * 900)}` : '',
      orderPromoCodeName: Math.random() > 0.7 ? `SUMMER${Math.floor(Math.random() * 100)}` : '',
      orderCompletedAt: new Date(beginDate.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      orderWorkflowState: Math.random() > 0.9 ? 'PENDING' : 'COMPLETED',
      reservationId: `RES-${Math.floor(100000 + Math.random() * 900000)}`,
      reservationBeginAt: beginDate.toISOString(),
      reservationEndAt: endDate.toISOString(),
      paymentTransactionAction: 'PURCHASE',
      paymentTransactionSuccess: Math.random() > 0.05 ? 'TRUE' : 'FALSE',
      paymentTransactionAmount: `€${(Math.random() * 1000).toFixed(2)}`,
      paymentTransactionCreatedAt: new Date(beginDate.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      paymentTransactionInstrument: Math.random() > 0.5 ? 'CREDIT_CARD' : 'PAYPAL',
      orderId: `ORD-${Math.floor(1000000 + Math.random() * 9000000)}`,
      paymentCode: `PC-${Math.floor(1000 + Math.random() * 9000)}`,
      barcodeCode: `BAR-${Math.floor(10000000 + Math.random() * 90000000)}`,
      facilityId: `FAC-${Math.floor(100 + Math.random() * 900)}`,
      facilityName: `${randomOperator.label.split(' ')[0]} Facility`,
      facilityCode: `FC-${Math.floor(100 + Math.random() * 900)}`,
      facilityTimeZone: "CET",
      companyID: `COMP-${Math.floor(100 + Math.random() * 900)}`,
      companyName: randomOperator.label,
      eventID: `EV-${Math.floor(1000 + Math.random() * 9000)}`,
      eventName: `Parking Event ${Math.floor(Math.random() * 100)}`,
      venueID: `VEN-${Math.floor(100 + Math.random() * 900)}`,
      venueName: `${randomOperator.label.split(' ')[0]} Venue`,
      lotID: `LOT-${Math.floor(100 + Math.random() * 900)}`,
      lotName: `Parking Lot ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      productID: `PROD-${Math.floor(1000 + Math.random() * 9000)}`,
      productName: `Parking Slot ${Math.floor(Math.random() * 1000)}`,
      productPriceCalculationType: Math.random() > 0.5 ? 'FLAT' : 'HOURLY',
      productPricePeriodHours: `${Math.floor(Math.random() * 24) + 1}`,
      productTypeID: `PTYPE-${Math.floor(10 + Math.random() * 90)}`,
      productTypeName: 'RESERVATION',
      lineItemID: `ITEM-${Math.floor(10000 + Math.random() * 90000)}`,
      lineItemWorkflowState: 'COMPLETED',
      lineItemTotal: `€${(Math.random() * 1000).toFixed(2)}`,
      lineItemPrice: `€${(Math.random() * 800).toFixed(2)}`,
      lineItemParkmobileServiceFee: `€${(Math.random() * 50).toFixed(2)}`,
      lineItemClientServiceFee: `€${(Math.random() * 30).toFixed(2)}`,
      lineItemDeliveryFee: `€${(Math.random() * 20).toFixed(2)}`,
      lineItemTax: `€${(Math.random() * 100).toFixed(2)}`,
      lineItemDiscount: `€${(Math.random() * 50).toFixed(2)}`,
      lineItemProcessingFee: `€${(Math.random() * 25).toFixed(2)}`,
      lineItemTransactionFee: `€${(Math.random() * 15).toFixed(2)}`,
      amountOwedClient: `€${(Math.random() * 700).toFixed(2)}`,
      amountOwedParkmobile: `€${(Math.random() * 300).toFixed(2)}`
    };
  });
};

const mockNormalTransactions = generateMockTransactions();
const mockReservationTransactions = generateMockReservationTransactions();

type TransactionTableProps = {
  title: string;
  description?: string;
};

export function TransactionTable({ title, description }: TransactionTableProps) {
  const [selectedOperators, setSelectedOperators] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [normalColumns, setNormalColumns] = useState<ColumnConfig[]>(allNormalColumns);
  const [reservationColumns, setReservationColumns] = useState<ColumnConfig[]>(allReservationColumns);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [parkingType, setParkingType] = useState<'normal' | 'reservation'>('normal');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date()
  });
  
  // Get the appropriate columns based on parking type
  const columns = parkingType === 'normal' ? normalColumns : reservationColumns;
  const visibleColumns = columns.filter(col => col.visible);
  
  // Get the appropriate data based on parking type
  const allTransactions = parkingType === 'normal' 
    ? mockNormalTransactions 
    : mockReservationTransactions;
  
  const filteredTransactions = allTransactions.filter(transaction => 
    (selectedOperators.length === 0 || selectedOperators.includes(transaction.supplierValue))
  );
  
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * parseInt(pageSize), 
    currentPage * parseInt(pageSize)
  );
  
  const totalPages = Math.ceil(filteredTransactions.length / parseInt(pageSize));
  
  const handleColumnChange = (updatedColumns: ColumnConfig[]) => {
    if (parkingType === 'normal') {
      setNormalColumns(updatedColumns);
    } else {
      setReservationColumns(updatedColumns);
    }
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
        <div className="flex items-center gap-4">
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
          
          <ToggleGroup type="single" value={parkingType} onValueChange={(value) => value && setParkingType(value as 'normal' | 'reservation')}>
            <ToggleGroupItem value="normal" aria-label="Normal parking">
              Normal
            </ToggleGroupItem>
            <ToggleGroupItem value="reservation" aria-label="Reservation parking">
              Reservation
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-end">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-[280px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
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
                  setDateRange(range);
                }}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          
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
