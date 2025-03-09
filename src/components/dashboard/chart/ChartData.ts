
// Sample data for different periods
export const PAYMENT_DATA = {
  yesterday: [
    { date: '12a', amount: 100, transactions: 10 },
    { date: '3a', amount: 120, transactions: 14 },
    { date: '6a', amount: 150, transactions: 22 },
    { date: '9a', amount: 220, transactions: 35 },
    { date: '12p', amount: 290, transactions: 42 },
    { date: '3p', amount: 350, transactions: 58 },
    { date: '6p', amount: 390, transactions: 67 },
    { date: '9p', amount: 415, transactions: 74 },
  ],
  thisMonth: [
    { date: '1 Apr', amount: 5680, transactions: 245 },
    { date: '5 Apr', amount: 7450, transactions: 312 },
    { date: '10 Apr', amount: 6780, transactions: 287 },
    { date: '15 Apr', amount: 8120, transactions: 342 },
    { date: '20 Apr', amount: 7890, transactions: 331 },
    { date: '25 Apr', amount: 8560, transactions: 364 },
    { date: '30 Apr', amount: 9800, transactions: 410 },
  ],
  lastMonth: [
    { date: '1 Mar', amount: 4200, transactions: 180 },
    { date: '5 Mar', amount: 5600, transactions: 230 },
    { date: '10 Mar', amount: 6100, transactions: 255 },
    { date: '15 Mar', amount: 7300, transactions: 300 },
    { date: '20 Mar', amount: 8500, transactions: 350 },
    { date: '25 Mar', amount: 9200, transactions: 380 },
    { date: '31 Mar', amount: 10800, transactions: 450 },
  ],
};

export type PeriodType = 'yesterday' | 'thisMonth' | 'lastMonth';

// Format currency
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// Format number with commas
export const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value);
};
