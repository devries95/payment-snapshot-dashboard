
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Copy, Eye, Key, Settings } from 'lucide-react';

const ApiDocs = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/95 sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">API Documentation</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="flex mb-8">
            <div className="w-1/4 pr-8">
              <h2 className="text-lg font-semibold mb-6">General</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                  <Key size={16} />
                  <span>Authentication</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                  <Settings size={16} />
                  <span>SMS template</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                  <Settings size={16} />
                  <span>Email templates</span>
                </div>
              </div>

              <h2 className="text-lg font-semibold mt-8 mb-4">Organization</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                  <Settings size={16} />
                  <span>Settings</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                  <Settings size={16} />
                  <span>Roles and permissions</span>
                </div>
              </div>
            </div>
            
            <div className="w-3/4">
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">API keys</h1>
                <p className="text-muted-foreground">Manage API keys for this instance.</p>
              </div>
              
              <div className="bg-black rounded-lg p-4 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-white font-medium">Quick Copy</div>
                  <Button size="sm" variant="outline" className="text-xs flex items-center gap-1 bg-transparent text-white border-white/30">
                    <Copy size={14} />
                    Copy
                  </Button>
                </div>
                <div className="text-xs text-white/70 mb-3">Choose your framework and paste the code into your environment file.</div>
                
                <pre className="bg-black/80 p-3 rounded text-sm text-white/80 font-mono">
                  <div className="mb-2">  <span className="text-green-400">env</span>_store1</div>
                  <div className="mb-2">  REST_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_Y2x1cmtnoUVJY2Fzw5Y50Y5OXJ</div>
                  <div>  CLERK_SECRET_KEY=sk_live_...........................</div>
                </pre>
                
                <div className="text-xs text-white/60 mt-3">These are are the same Public and Secret keys as you see below.</div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-medium mb-2">Publishable key</h2>
                <p className="text-sm text-muted-foreground mb-4">This key should be used in your frontend code. It can be safely shared, and does not need to be kept secret.</p>
                
                <div className="flex justify-between items-center p-4 border rounded-md bg-muted/20">
                  <div className="font-mono text-sm">pk_live_Y2x1cmtnoUVJY2Fzw5Y50Y5OXJ</div>
                  <Button size="sm" variant="ghost" className="text-xs h-8 w-8 p-0">
                    <Copy size={14} />
                  </Button>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-medium mb-2">Secret keys</h2>
                <p className="text-sm text-muted-foreground mb-4">Securely manage these sensitive keys. Do not share them with anyone. If you suspect that one of your secret keys has been compromised, you should create a new key, update your code, then delete the compromised key.</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-md bg-muted/20">
                    <div>
                      <div className="text-sm font-medium">Default secret key</div>
                      <div className="font-mono text-xs text-muted-foreground">sk_live_Y2x1cmtnoUVJY2Fzw5Y50Y5OXJ</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Copy size={14} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md bg-muted/20">
                    <div>
                      <div className="text-sm font-medium">Test</div>
                      <div className="font-mono text-xs text-muted-foreground">sk_live_Y2x1cmtnoUVJY2Fzw5Y50Y5OXJ</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Copy size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline" className="flex items-center gap-2">
                  <span>Add new key</span>
                  <ChevronDown size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApiDocs;
