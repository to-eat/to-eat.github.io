
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Construction } from 'lucide-react';

const ComingSoonPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <div className="w-24 h-24 bg-brand-100 rounded-full flex items-center justify-center mb-6">
          <Construction size={48} className="text-brand-600" />
        </div>
        
        <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">Coming Soon</h1>
        <p className="text-gray-500 max-w-md mb-8">
          We are currently cooking up this page. Stay tuned for updates!
        </p>
        
        <Button onClick={() => navigate('/feed')}>Back to Home</Button>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoonPage;
