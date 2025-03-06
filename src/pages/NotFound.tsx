
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="max-w-md w-full px-8 animate-fade-in-up">
        <div className="text-center space-y-6">
          <h1 className="text-9xl font-bold text-primary/20">404</h1>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Page not found</h2>
            <p className="text-muted-foreground">
              We couldn't find the page you were looking for.
            </p>
          </div>
          <Button className="mt-8" asChild>
            <a href="/" className="flex items-center gap-2">
              <HomeIcon className="h-4 w-4" />
              Return to Dashboard
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
