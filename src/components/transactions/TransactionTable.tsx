
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Download, Filter, Settings } from "lucide-react";
import { ColumnConfig, ColumnSettingsDrawer } from "./ColumnSettingsDrawer";

// Define all available columns
const allColumns: ColumnConfig[] = [
  { id: "supplier", label: "Supplier name", visible: true },
  { id: "zone", label: "Zone description", visible: true },
  { id: "zoneCode", label: "Zone code", visible: true },
  { id: "station", label: "Station", visible: true },
  { id: "department", label: "Department location", visible: true },
  { id: "parking", label: "Parking ID", visible: true },
  { id: "date", label: "Date", visible: true },
  { id: "amount", label: "Amount", visible: true },
  { id: "orderId", label: "Order ID", visible: false },
  { id: "paymentId", label: "Payment ID", visible: false },
  { id: "clientId", label: "Client ID", visible: false },
  { id: "customerPhone", label: "Customer phone", visible: false },
  { id: "email", label: "Email", visible: false },
  { id: "timeZone", label: "Time zone", visible: false },
  { id: "localTimeStart", label: "Local time start", visible: false },
  { id: "localTimeStop", label: "Local time stop", visible: false },
  { id: "duration", label: "Duration", visible: false },
  { id: "paidMinutes", label: "Paid minutes", visible: false },
  { id: "insertTime", label: "Insert time", visible: false },
  { id: "paymentTime", label: "Payment time", visible: false },
  { id: "approved", label: "Approved", visible: false },
  { id: "paymentMethod", label: "Payment method", visible: false },
];

// Extended mock transaction data with all possible fields
const mockTransactions = Array(50).fill(null).map((_, i) => ({
  id: i + 1,
  supplier: "Philadelphia",
  zone: "Philadelphia, PA",
  zoneCode: "972524",
  station: "Outlying 5 NPH",
  department: "44U",
  parking: `790,658,${Math.floor(Math.random() * 999)}`,
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
}));

type TransactionTableProps = {
  title: string;
  description?: string;
};

export function TransactionTable({ title, description }: TransactionTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("1D");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [columns, setColumns] = useState<ColumnConfig[]>(allColumns);
  
  // Get only visible columns
  const visibleColumns = columns.filter(col => col.visible);
  
  // Filter transactions based on search term
  const filteredTransactions = mockTransactions.filter(transaction => 
    Object.entries(transaction)
      .filter(([key]) => visibleColumns.some(col => col.id === key))
      .some(([_, value]) => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
  );
  
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * parseInt(pageSize), 
    currentPage * parseInt(pageSize)
  );
  
  const totalPages = Math.ceil(filteredTransactions.length / parseInt(pageSize));
  
  const handleColumnChange = (updatedColumns: ColumnConfig[]) => {
    setColumns(updatedColumns);
  };
  
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">
            {filteredTransactions.length} transactions
          </p>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex rounded-md border">
            <Button 
              variant={activeFilter === "Custom" ? "secondary" : "ghost"} 
              onClick={() => setActiveFilter("Custom")}
              className="rounded-l-md rounded-r-none h-10"
            >
              Custom
            </Button>
            <Button 
              variant={activeFilter === "1D" ? "secondary" : "ghost"} 
              onClick={() => setActiveFilter("1D")}
              className="rounded-none h-10"
            >
              1D
            </Button>
            <Button 
              variant={activeFilter === "7D" ? "secondary" : "ghost"} 
              onClick={() => setActiveFilter("7D")}
              className="rounded-none h-10"
            >
              7D
            </Button>
            <Button 
              variant={activeFilter === "1M" ? "secondary" : "ghost"} 
              onClick={() => setActiveFilter("1M")}
              className="rounded-r-md rounded-l-none h-10"
            >
              1M
            </Button>
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
          <Button className="bg-primary text-white">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.map((column) => (
                <TableHead key={column.id}>{column.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                {visibleColumns.map((column) => (
                  <TableCell key={`${transaction.id}-${column.id}`}>
                    {transaction[column.id as keyof typeof transaction]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
    </div>
  );
}
