
import { useEffect, useState } from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import { Button } from '@/components/ui/button';
import { Globe, User, FileCode } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // Simulate initial page load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/95 sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Payment Dashboard</h1>
          <div className="flex items-center gap-3">
            <Link to="/api-docs">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <FileCode className="h-[1rem] w-[1rem]" />
                <span>Set-up API</span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <Globe className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Content with Loading State */}
      <main className="flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[80vh]">
            <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        ) : (
          <Dashboard />
        )}
      </main>
    </div>
  );
};

export default Index;
