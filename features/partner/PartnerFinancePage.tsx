
import React from 'react';
import { DollarSign, ArrowUpRight, ArrowDownLeft, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { useDataStore } from '@/store/useDataStore';
import { toast } from 'sonner';

const PartnerFinancePage: React.FC = () => {
  const { orders } = useDataStore();

  // Filter for completed orders to calculate earnings
  const completedOrders = orders.filter(o => o.status === 'Delivered');
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.total, 0);
  const platformFee = totalRevenue * 0.15; // 15% commission
  const netEarnings = totalRevenue - platformFee;

  // Generate dynamic transactions list from orders
  const transactions = completedOrders.slice(0, 10).map(order => ({
    id: `tx-${order.id}`,
    date: order.date,
    desc: `Earnings: Order #${order.id.split('-')[1]}`,
    amount: order.total * 0.85, // Net after commission
    type: 'earning'
  }));

  // Mock Payout
  if (transactions.length > 0) {
    transactions.unshift({
       id: 'tx-payout-1',
       date: 'Yesterday',
       desc: 'Weekly Payout',
       amount: -250.00,
       type: 'payout'
    });
  }

  const handleExport = () => {
    const headers = ['ID', 'Date', 'Description', 'Amount', 'Type'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(tx => [
        tx.id,
        `"${tx.date}"`,
        `"${tx.desc}"`,
        tx.type === 'payout' ? -Math.abs(tx.amount) : tx.amount,
        tx.type
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'partner_finance_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Finance report downloaded');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
          <p className="text-gray-500 text-sm">Track your earnings and payouts.</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={handleExport}>
          <Download size={16} />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
           <p className="text-gray-500 text-sm font-medium mb-1">Available Balance</p>
           <h2 className="text-3xl font-bold text-gray-900">${(netEarnings - 250).toFixed(2)}</h2>
           <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
             <ArrowUpRight size={12} /> Live Updates
           </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
           <p className="text-gray-500 text-sm font-medium mb-1">Total Earnings (Gross)</p>
           <h2 className="text-3xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
           <p className="text-gray-500 text-sm font-medium mb-1">Platform Commission (15%)</p>
           <div className="flex items-center gap-2 mt-1">
             <span className="text-xl font-bold text-red-600">-${platformFee.toFixed(2)}</span>
           </div>
           <p className="text-xs text-gray-400 mt-2">Deducted automatically</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-bold text-gray-900">Transaction History</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {transactions.length === 0 ? (
            <div className="p-6 text-center text-gray-400">No transactions yet.</div>
          ) : (
            transactions.map(tx => (
              <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'payout' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {tx.type === 'payout' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{tx.desc}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <span className={`font-bold ${tx.type === 'payout' ? 'text-gray-900' : 'text-green-600'}`}>
                  {tx.type === 'payout' ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerFinancePage;
