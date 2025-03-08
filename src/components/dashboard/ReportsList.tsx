
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowRight, MoreHorizontal, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

type Report = {
  id: string;
  title: string;
  date: string;
};

const REPORTS: Report[] = [
  { id: "1", title: "Remittance advice", date: "March 2025" },
  { id: "2", title: "Date overview", date: "March 2025" },
  { id: "3", title: "Zone overview", date: "March 2025" },
  { id: "4", title: "Transaction overview", date: "March 2025" },
];

export function ReportsList() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDownloadingId(id);
    
    // Simulate download
    setTimeout(() => {
      setDownloadingId(null);
    }, 1500);
  };

  return (
    <Card className="col-span-1 animate-fade-in-up">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          Reports
          <Link to="/reports">
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to="/reports">View all reports</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/reports">Create custom report</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="px-0">
        <div className="text-xs text-muted-foreground px-6 pb-2">
          {REPORTS[0].date}
        </div>
        <div className="space-y-1">
          {REPORTS.map((report) => (
            <Link 
              key={report.id}
              to="/reports"
              className="block report-item"
            >
              <div className="flex items-center justify-between px-6 py-3 hover:bg-accent/50 transition-colors">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{report.title}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={(e) => handleDownload(e, report.id)}
                  disabled={downloadingId === report.id}
                >
                  <Download className={`h-4 w-4 ${downloadingId === report.id ? 'animate-pulse' : ''}`} />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
