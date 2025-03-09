
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, MoreHorizontal, Download } from "lucide-react";
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
  description: string;
};

const REPORTS: Report[] = [
  { 
    id: "1", 
    title: "Remittance advice", 
    description: "Displays the amount owed by EasyPark"
  },
  { 
    id: "2", 
    title: "Transaction overview", 
    description: "Displays each individual parking transaction"
  },
  { 
    id: "3", 
    title: "Commission report", 
    description: "Displays parking transactions based on different roles"
  },
  { 
    id: "4", 
    title: "Fines overview", 
    description: "Displays all parking fines that were paid"
  },
];

export function ReportsList() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (id: string) => {
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
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {REPORTS.map((report) => (
            <Card 
              key={report.id}
              className="bg-muted/40 hover:bg-muted/60 transition-colors duration-200 border rounded-lg overflow-hidden"
            >
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-base">{report.title}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 flex items-center justify-center gap-2"
                    onClick={() => handleDownload(report.id)}
                    disabled={downloadingId === report.id}
                  >
                    <Download className={`h-4 w-4 ${downloadingId === report.id ? 'animate-pulse' : ''}`} />
                    {downloadingId === report.id ? 'Downloading...' : 'Download'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
