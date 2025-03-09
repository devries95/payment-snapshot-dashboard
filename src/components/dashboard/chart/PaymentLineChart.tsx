
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatNumber } from './ChartData';

interface PaymentData {
  date: string;
  amount: number;
  transactions: number;
}

interface PaymentLineChartProps {
  data: PaymentData[];
  chartKey: number;
  animating: boolean;
}

export function PaymentLineChart({ data, chartKey, animating }: PaymentLineChartProps) {
  return (
    <div className={`h-[280px] ${animating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          key={chartKey}
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorTrans" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
          <XAxis 
            dataKey="date" 
            tickLine={false}
            axisLine={false}
            stroke="rgba(0,0,0,0.3)"
            fontSize={12}
          />
          <YAxis 
            yAxisId="left"
            tickFormatter={(value) => `€${value}`}
            tickLine={false}
            axisLine={false}
            stroke="rgba(0,0,0,0.3)"
            fontSize={12}
            domain={['auto', 'auto']}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tickFormatter={(value) => `${value}`}
            tickLine={false}
            axisLine={false}
            stroke="rgba(0,0,0,0.3)"
            fontSize={12}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'Payment Amount') return [formatCurrency(value as number), name];
              if (name === 'Transactions') return [formatNumber(value as number), name];
              return [value, name];
            }}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{ 
              borderRadius: '8px', 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid hsl(var(--border))'
            }}
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="amount"
            name="Payment Amount" 
            stroke="#8B5CF6"
            strokeWidth={3}
            dot={{ r: 0 }}
            activeDot={{ r: 6, fill: "#8B5CF6" }}
            fill="url(#colorAmount)"
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="transactions"
            name="Transactions" 
            stroke="#0EA5E9" 
            strokeWidth={3}
            dot={{ r: 0 }}
            activeDot={{ r: 6, fill: "#0EA5E9" }}
            fill="url(#colorTrans)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
