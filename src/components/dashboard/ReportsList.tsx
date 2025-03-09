
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowRight, MoreHorizontal, Download, File } from "lucide-react";
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
  fileSize: string;
  fileType: string;
  iconColor: string;
};

const REPORTS: Report[] = [
  { 
    id: "1", 
    title: "Annual Report for Q2 2025", 
    date: "2.4 MB • DOCX", 
    fileSize: "2.4 MB", 
    fileType: "DOCX", 
    iconColor: "text-blue-500" 
  },
  { 
    id: "2", 
    title: "Annual Report for Q4 2024", 
    date: "6.8 MB • DOCX", 
    fileSize: "6.8 MB", 
    fileType: "DOCX", 
    iconColor: "text-blue-500" 
  },
  { 
    id: "3", 
    title: "Shareholder Meeting Notes", 
    date: "239 KB • MP4", 
    fileSize: "239 KB", 
    fileType: "MP4", 
    iconColor: "text-red-500" 
  },
  { 
    id: "4", 
    title: "Annual Report for Q1 2025", 
    date: "8.2 MB • DOCX", 
    fileSize: "8.2 MB", 
    fileType: "DOCX", 
    iconColor: "text-blue-500" 
  },
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

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'PDF':
        return <File className="h-10 w-10 text-red-500" />;
      case 'MP4':
        return <File className="h-10 w-10 text-red-500" />;
      case 'XLSX':
        return <File className="h-10 w-10 text-green-500" />;
      case 'DOCX':
      default:
        return <File className="h-10 w-10 text-blue-500" />;
    }
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
            <Link 
              key={report.id}
              to="/reports"
              className="block"
            >
              <div className="group relative border rounded-md p-4 hover:shadow-md transition-all duration-200">
                <div className="flex items-start mb-2">
                  {getFileIcon(report.fileType)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium line-clamp-2 min-h-[40px]">{report.title}</span>
                  <span className="text-xs text-muted-foreground mt-1">{report.fileSize} • {report.fileType}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => e.preventDefault()}>View details</DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => handleDownload(e, report.id)}>Download</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
