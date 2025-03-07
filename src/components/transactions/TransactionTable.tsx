
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Download, Filter, Settings } from "lucide-react";

// Mock transaction data
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
  
  // Filter transactions based on search term
  const filteredTransactions = mockTransactions.filter(transaction => 
    Object.values(transaction).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * parseInt(pageSize), 
    currentPage * parseInt(pageSize)
  );
  
  const totalPages = Math.ceil(filteredTransactions.length / parseInt(pageSize));
  
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
          <Button variant="outline" size="icon" className="h-10 w-10">
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
              <TableHead>Supplier name</TableHead>
              <TableHead>Zone description</TableHead>
              <TableHead>Zone code</TableHead>
              <TableHead>Station</TableHead>
              <TableHead>Department location</TableHead>
              <TableHead>Parking ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.supplier}</TableCell>
                <TableCell>{transaction.zone}</TableCell>
                <TableCell>{transaction.zoneCode}</TableCell>
                <TableCell>{transaction.station}</TableCell>
                <TableCell>{transaction.department}</TableCell>
                <TableCell>{transaction.parking}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
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
    </div>
  );
}
