
import React, { useState } from 'react';
import { FileText, Download, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ReportType = {
  id: string;
  title: string;
  description: string;
  formats: Array<'excel' | 'pdf'>;
};

const REPORTS: ReportType[] = [
  {
    id: "1",
    title: "Remittance advice",
    description: "Displays the amount owed by EasyPark",
    formats: ['excel'],
  },
  {
    id: "2",
    title: "Date overview",
    description: "Displays all transactions by date",
    formats: ['excel'],
  },
  {
    id: "3",
    title: "Zone overview",
    description: "Displays all transactions per Parking Area",
    formats: ['excel'],
  },
  {
    id: "4",
    title: "Transaction overview",
    description: "Displays each individual parking transaction",
    formats: ['excel'],
  },
  {
    id: "5",
    title: "Commission report",
    description: "Displays parking transactions based on different roles",
    formats: ['excel'],
  },
  {
    id: "6",
    title: "Self-invoice",
    description: "Displays parking fees invoiced to EasyPark",
    formats: ['excel', 'pdf'],
  },
  {
    id: "7",
    title: "Fines overview",
    description: "Displays all parking fines that were paid",
    formats: ['excel'],
  },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const YEARS = [2025, 2024, 2023, 2022];

// Current month and year
const CURRENT_MONTH = MONTHS[8]; // September
const CURRENT_YEAR = 2025;

export default function Reports() {
  const [selectedMonth, setSelectedMonth] = useState(`${CURRENT_MONTH} ${CURRENT_YEAR}`);
  const [downloading, setDownloading] = useState<{id: string, format: string} | null>(null);

  const handleDownload = (id: string, format: string) => {
    setDownloading({ id, format });
    
    // Simulate download
    setTimeout(() => {
      setDownloading(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/95 sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Payment Dashboard</h1>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">Reports</h1>
          <div className="mb-1 text-sm">Month</div>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-full md:w-[240px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map(year => (
                <React.Fragment key={year}>
                  {MONTHS.map(month => (
                    <SelectItem key={`${month}-${year}`} value={`${month} ${year}`}>
                      {month} {year}
                    </SelectItem>
                  ))}
                </React.Fragment>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REPORTS.map((report) => (
            <Card key={report.id} className="p-4 h-full flex flex-col">
              <div className="mb-4">
                <h3 className="font-medium text-base">{report.title}</h3>
                <p className="text-sm text-muted-foreground">{report.description}</p>
              </div>
              
              <div className="flex gap-2 mt-auto">
                {report.formats.includes('excel') && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(report.id, 'excel')}
                    disabled={downloading?.id === report.id && downloading?.format === 'excel'}
                    className="flex items-center gap-2"
                  >
                    <Download className={`h-3.5 w-3.5 ${downloading?.id === report.id && downloading?.format === 'excel' ? 'animate-pulse' : ''}`} />
                    Download excel
                  </Button>
                )}
                
                {report.formats.includes('pdf') && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(report.id, 'pdf')}
                    disabled={downloading?.id === report.id && downloading?.format === 'pdf'}
                    className="flex items-center gap-2"
                  >
                    <FileText className={`h-3.5 w-3.5 ${downloading?.id === report.id && downloading?.format === 'pdf' ? 'animate-pulse' : ''}`} />
                    Download PDF
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
