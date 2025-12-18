
import React from 'react';
import { CreditCard, Wallet, ArrowUpRight, ArrowDownLeft, Plus, AlertCircle, Sparkles, Gift } from 'lucide-react';
import { Navbar } from '@/components/organisms/Navbar';
import { Button } from '@/components/atoms/Button';
import { useStore } from '@/store/useStore';
import { useNavigate } from 'react-router-dom';

const WalletPage: React.FC = () => {
  const { user, topUpWallet } = useStore();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <AlertCircle size={48} className="text-gray-300 mb-4" />
          <p className="text-gray-500">Please login to view your wallet.</p>
          <Button className="mt-4" onClick={() => navigate('/login')}>Login</Button>
        </div>
      </div>
    );
  }

  const handleTopUp = () => {
    topUpWallet(50.00); // Mock top up
  };

  const points = user.loyaltyPoints || 0;
  const nextReward = 1000;
  const progress = Math.min((points / nextReward) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl font-bold text-gray-900 mb-6">My Wallet</h1>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl p-8 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            <p className="text-brand-200 text-sm font-medium mb-1">Total Balance</p>
            <h2 className="text-4xl font-bold mb-6">${user.walletBalance.toFixed(2)}</h2>
            
            <div className="flex gap-3">
              <Button onClick={handleTopUp} className="bg-white text-brand-900 hover:bg-brand-50 border-none">
                <Plus size={18} className="mr-2" /> Top Up $50
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <CreditCard size={18} className="mr-2" /> Cards
              </Button>
            </div>
          </div>
        </div>

        {/* Loyalty Program */}
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 mb-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
           <div className="relative z-10">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <Sparkles className="text-orange-500 fill-orange-500" size={20} />
                  To-Eat Rewards
                </h3>
                <span className="text-2xl font-bold text-orange-600">{points} pts</span>
             </div>
             
             <div className="mb-4">
               <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                 <span>Progress to $10 Coupon</span>
                 <span>{points} / {nextReward}</span>
               </div>
               <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                 <div className="bg-gradient-to-r from-orange-400 to-red-500 h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
               </div>
             </div>

             <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-600">Earn 10 points for every $1 spent.</p>
                <Button size="sm" variant="secondary" className="gap-2" disabled={points < nextReward}>
                  <Gift size={16} /> Redeem
                </Button>
             </div>
           </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
            <Wallet size={20} className="text-gray-400" />
            Recent Transactions
          </h3>
          
          {user.transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No transactions yet.</p>
          ) : (
            <div className="space-y-6">
              {user.transactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tx.type === 'credit' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{tx.description}</p>
                      <p className="text-xs text-gray-500">{tx.date}</p>
                    </div>
                  </div>
                  <span className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                    {tx.type === 'credit' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WalletPage;
