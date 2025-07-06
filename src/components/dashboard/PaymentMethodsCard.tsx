
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Wallet, Apple } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for payment methods
const paymentMethodsData = [
  {
    method: "CREDIT_CARD",
    label: "Credit Card",
    amount: "€18,425.30",
    percentage: 68.5,
    icon: CreditCard,
    color: "text-blue-500"
  },
  {
    method: "WALLET",
    label: "Digital Wallet", 
    amount: "€5,832.15",
    percentage: 21.7,
    icon: Wallet,
    color: "text-green-500"
  },
  {
    method: "GOOGLE_PAY",
    label: "Google Pay",
    amount: "€1,964.80",
    percentage: 7.3,
    icon: Wallet,
    color: "text-orange-500"
  },
  {
    method: "APPLE_PAY", 
    label: "Apple Pay",
    amount: "€678.25",
    percentage: 2.5,
    icon: Apple,
    color: "text-gray-600"
  }
];

export function PaymentMethodsCard() {
  return (
    <Card className="overflow-hidden animate-fade-in-up">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Payment Methods Revenue
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {paymentMethodsData.map((method) => {
          const Icon = method.icon;
          return (
            <div key={method.method} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon className={cn("h-4 w-4", method.color)} />
                <div>
                  <div className="text-sm font-medium">{method.label}</div>
                  <div className="text-xs text-muted-foreground">{method.percentage}%</div>
                </div>
              </div>
              <div className="text-sm font-semibold">{method.amount}</div>
            </div>
          );
        })}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>Total Revenue</span>
            <span>€26,900.50</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
