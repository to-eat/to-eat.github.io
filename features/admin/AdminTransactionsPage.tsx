
import React from 'react';
import { FileText, Download, ArrowUpRight, ArrowDownLeft, Filter } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { useDataStore } from '@/store/useDataStore';
import { toast } from 'sonner';

const AdminTransactionsPage: React.FC = () => {
  const { orders } = useDataStore();

  // Generate transactions based on orders
  // In a real app, this would come from a separate transactions table API
  const transactions = orders.flatMap(order => {
    const paymentTx = {
      id: `TX-${order.id.split('-')[1]}`,
      type: 'Payment',
      amount: order.total,
      status: 'Completed',
      date: order.date,
      entity: order.customerName,
      method: order.paymentMethod === 'card' ? 'Credit Card' : order.paymentMethod === 'wallet' ? 'Wallet' : 'Cash',
      description: `Order Payment #${order.id}`
    };

    const commissionTx = {
      id: `CM-${order.id.split('-')[1]}`,
      type: 'Commission',
      amount: order.total * 0.15, // 15% platform fee
      status: 'Completed',
      date: order.date,
      entity: 'Platform Revenue',
      method: 'Internal',
      description: `Commission from Order #${order.id}`
    };

    return [paymentTx, commissionTx];
  });

  const handleExport = () => {
    // Simple CSV Export Logic
    const headers = ['Transaction ID', 'Type', 'Entity', 'Date', 'Amount', 'Status', 'Method'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(tx => [
        tx.id,
        tx.type,
        `"${tx.entity}"`,
        `"${tx.date}"`,
        tx.amount.toFixed(2),
        tx.status,
        tx.method
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'to-eat_transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Transactions exported successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Financial Transactions</h1>
           <p className="text-gray-500 text-sm">Audit trail of all payments, commissions, and refunds.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter size={16} /> Filter
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download size={16} /> Export CSV
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-semibold">Transaction ID</th>
              <th className="px-6 py-4 font-semibold">Type</th>
              <th className="px-6 py-4 font-semibold">Entity</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((tx, idx) => (
              <tr key={`${tx.id}-${idx}`} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono text-sm font-medium text-gray-900">
                  {tx.id}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    {tx.type === 'Payment' && <ArrowDownLeft size={16} className="text-green-500" />}
                    {tx.type === 'Commission' && <ArrowDownLeft size={16} className="text-blue-500" />}
                    {tx.type === 'Payout' && <ArrowUpRight size={16} className="text-orange-500" />}
                    {tx.type}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-900">{tx.entity}</p>
                  <p className="text-xs text-gray-500">{tx.method}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {tx.date}
                </td>
                <td className={`px-6 py-4 font-bold text-sm ${tx.type === 'Payment' || tx.type === 'Commission' ? 'text-green-600' : 'text-gray-900'}`}>
                  {tx.type === 'Payment' || tx.type === 'Commission' ? '+' : ''}{tx.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    tx.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                    tx.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTransactionsPage;
