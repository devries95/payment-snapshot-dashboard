
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Report = {
  id: string;
  title: string;
};

const REPORTS: Report[] = [
  { id: "1", title: "Remittance advice" },
  { id: "2", title: "Invoice" },
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
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <h2 className="text-lg font-semibold">Reports</h2>
              <Link to="/reports">
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground mb-4">
            March 2025
          </div>
          
          <div className="flex flex-col gap-2">
            {REPORTS.map((report) => (
              <div 
                key={report.id}
                className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <span className="font-medium">{report.title}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-purple-600"
                  onClick={() => handleDownload(report.id)}
                  disabled={downloadingId === report.id}
                >
                  <Download className={`h-5 w-5 ${downloadingId === report.id ? 'animate-pulse' : ''}`} />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
