
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="col-span-1 animate-fade-in-up">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-lg font-semibold flex items-center">
          Reports
          <Link to="/reports">
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {REPORTS.map((report) => (
          <Card 
            key={report.id}
            className="overflow-hidden bg-blue-50 hover:bg-blue-100 border-none transition-colors duration-200"
          >
            <CardContent className="p-4 flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-base">{report.title}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  aria-label="Download"
                  onClick={() => handleDownload(report.id)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-auto pt-4">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => handleDownload(report.id)}
                  disabled={downloadingId === report.id}
                >
                  <Download className={`h-4 w-4 ${downloadingId === report.id ? 'animate-pulse' : ''}`} />
                  {downloadingId === report.id ? 'Downloading...' : 'Download Report'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
