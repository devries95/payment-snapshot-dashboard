
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Copy, Eye, Key, Settings, FileCode, Server, Lock, Shield, Bell, Mail } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

type ApiSection = {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

const ApiDocs = () => {
  const [activeSection, setActiveSection] = useState<string>("authentication");

  const sections: ApiSection[] = [
    {
      id: "authentication",
      title: "Authentication",
      icon: <Key size={16} />,
      content: (
        <div>
          <h1 className="text-2xl font-bold mb-6">Authentication</h1>
          <p className="text-muted-foreground mb-4">
            The API uses API keys to authenticate requests. You can view and manage your API keys in the API settings section.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-4">Authentication Methods</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Bearer Token</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Pass your API key in the Authorization header with the Bearer scheme:
              </p>
              <pre className="bg-muted p-3 rounded overflow-x-auto">
                <code>Authorization: Bearer YOUR_API_KEY</code>
              </pre>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Query Parameter</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Alternatively, you can pass your API key as a query parameter:
              </p>
              <pre className="bg-muted p-3 rounded overflow-x-auto">
                <code>https://api.example.com/endpoint?api_key=YOUR_API_KEY</code>
              </pre>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "sms_template",
      title: "SMS template",
      icon: <Bell size={16} />,
      content: (
        <div>
          <h1 className="text-2xl font-bold mb-6">SMS Templates</h1>
          <p className="text-muted-foreground mb-4">
            Configure and manage templates for SMS notifications sent through the API.
          </p>
          <div className="space-y-6">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Template Variables</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Use these variables in your templates to personalize messages:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><code>{{customer_name}}</code> - Customer's full name</li>
                <li><code>{{amount}}</code> - Payment amount</li>
                <li><code>{{date}}</code> - Transaction date</li>
                <li><code>{{reference}}</code> - Transaction reference</li>
              </ul>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Example API Request</h3>
              <pre className="bg-muted p-3 rounded overflow-x-auto">
                <code>{`POST /api/v1/send-sms
{
  "template_id": "payment-confirmation",
  "phone": "+1234567890",
  "variables": {
    "customer_name": "John Doe",
    "amount": "$45.00",
    "date": "2023-04-15",
    "reference": "TRX123456"
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "email_templates",
      title: "Email templates",
      icon: <Mail size={16} />,
      content: (
        <div>
          <h1 className="text-2xl font-bold mb-6">Email Templates</h1>
          <p className="text-muted-foreground mb-4">
            Create and manage email templates for transactional emails sent through the API.
          </p>
          <div className="space-y-6">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">HTML and Text Templates</h3>
              <p className="text-sm text-muted-foreground mb-3">
                You can define both HTML and plain text versions of your email templates.
              </p>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Supported Variables</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Use these variables in your templates to personalize emails:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><code>{{first_name}}</code> - Recipient's first name</li>
                <li><code>{{last_name}}</code> - Recipient's last name</li>
                <li><code>{{order_id}}</code> - Order identifier</li>
                <li><code>{{invoice_number}}</code> - Invoice number</li>
                <li><code>{{payment_amount}}</code> - Payment amount</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "settings",
      title: "Settings",
      icon: <Settings size={16} />,
      content: (
        <div>
          <h1 className="text-2xl font-bold mb-6">API Settings</h1>
          <p className="text-muted-foreground mb-4">
            Configure global settings for your API integration.
          </p>
          <div className="space-y-6">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Rate Limits</h3>
              <p className="text-sm text-muted-foreground mb-3">
                The API has the following rate limits:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Standard tier: 100 requests per minute</li>
                <li>Premium tier: 1000 requests per minute</li>
                <li>Enterprise tier: Custom limits available</li>
              </ul>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Webhook Configuration</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Set up webhooks to receive real-time notifications for events:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Transaction completed</li>
                <li>Payment failed</li>
                <li>Customer created</li>
                <li>Subscription updated</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "roles_permissions",
      title: "Roles and permissions",
      icon: <Shield size={16} />,
      content: (
        <div>
          <h1 className="text-2xl font-bold mb-6">Roles and Permissions</h1>
          <p className="text-muted-foreground mb-4">
            Configure access control for your API keys and users.
          </p>
          <div className="space-y-6">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Available Roles</h3>
              <p className="text-sm text-muted-foreground mb-3">
                The system supports the following predefined roles:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Admin:</strong> Full access to all API endpoints and dashboard features</li>
                <li><strong>Operator:</strong> Access to payment processing and reporting APIs</li>
                <li><strong>Viewer:</strong> Read-only access to reporting and analytics endpoints</li>
                <li><strong>Developer:</strong> Access to test endpoints and development tools</li>
              </ul>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Custom Permissions</h3>
              <p className="text-sm text-muted-foreground mb-3">
                You can also create custom permission sets for fine-grained access control.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

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
          <div className="flex">
            {/* Sidebar Navigation */}
            <div className="w-1/4 pr-8">
              <h2 className="text-lg font-semibold mb-6">General</h2>
              <div className="space-y-3">
                {sections.slice(0, 3).map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 text-sm font-medium w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {section.icon}
                    <span>{section.title}</span>
                  </button>
                ))}
              </div>

              <h2 className="text-lg font-semibold mt-8 mb-4">Organization</h2>
              <div className="space-y-3">
                {sections.slice(3).map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 text-sm font-medium w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {section.icon}
                    <span>{section.title}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Content Area */}
            <div className="w-3/4">
              {sections.find(section => section.id === activeSection)?.content}
              
              {activeSection === "authentication" && (
                <div className="mt-8">
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
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApiDocs;
