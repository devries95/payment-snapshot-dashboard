
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Key } from 'lucide-react';

const ApiDocs = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/95 sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold">API Documentation</h1>
        </div>
      </header>
      
      <main className="flex-1 max-w-[1400px] mx-auto p-4 sm:p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">API docs</h1>
          <p className="text-muted-foreground">Retrieve financial metadata from our payment platform</p>
        </div>
        
        <div className="mb-8">
          <Button 
            variant="default" 
            className="bg-purple-700 hover:bg-purple-800 flex items-center gap-2"
          >
            <Key size={16} />
            Request access token
            <ChevronDown size={16} />
          </Button>
        </div>
        
        <div className="mb-8 bg-muted/50 p-6 rounded-lg">
          <h2 className="text-xl font-medium mb-2">Base URL</h2>
          <p className="text-sm text-muted-foreground mb-1">The base URL for all API requests is:</p>
          <p className="text-purple-600 font-medium">https://payment-dashboard-api.com</p>
        </div>
        
        <div className="mb-8 bg-muted/50 p-6 rounded-lg">
          <h2 className="text-xl font-medium mb-2">Endpoints</h2>
          <div className="mb-4">
            <p className="text-purple-600 font-medium mb-1">GET /transactions</p>
            <p className="text-muted-foreground">Returns a list of all transactions for a specified time frame.</p>
          </div>
          <div className="mb-4">
            <p className="text-purple-600 font-medium mb-1">GET /revenue</p>
            <p className="text-muted-foreground">Returns revenue data aggregated by timeframe and payment method.</p>
          </div>
        </div>
        
        <div className="mb-8 bg-muted/50 p-6 rounded-lg">
          <h2 className="text-xl font-medium mb-2">Parameters</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-medium">limit</span> (optional): The maximum number of transactions to return. Default is 1,000,000.
            </li>
            <li>
              <span className="font-medium">offset</span> (optional): The number of transactions to skip before starting to return results. Default is 0.
            </li>
            <li>
              <span className="font-medium">from_date</span> (optional): Start date for filtering transactions (YYYY-MM-DD).
            </li>
            <li>
              <span className="font-medium">to_date</span> (optional): End date for filtering transactions (YYYY-MM-DD).
            </li>
          </ul>
        </div>
        
        <div className="bg-muted/50 p-6 rounded-lg">
          <h2 className="text-xl font-medium mb-2">Response</h2>
          <p className="text-muted-foreground mb-2">Returns a JSON object with the following properties:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-medium">count</span>: The total number of transactions matching the query.
            </li>
            <li>
              <span className="font-medium">data</span>: Array of transaction objects, each with the following properties:
              <ul className="list-disc list-inside ml-6 mt-2">
                <li><span className="font-medium">id</span>: Unique transaction identifier.</li>
                <li><span className="font-medium">amount</span>: Transaction amount.</li>
                <li><span className="font-medium">currency</span>: Currency code.</li>
                <li><span className="font-medium">payment_method</span>: Method used for payment.</li>
                <li><span className="font-medium">date</span>: Transaction date and time.</li>
              </ul>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default ApiDocs;
