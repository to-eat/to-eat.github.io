
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { UtensilsCrossed } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-8 animate-bounce">
          <UtensilsCrossed size={64} className="text-gray-400" />
        </div>
        
        <h1 className="font-serif text-5xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Oops! The plate is empty.</h2>
        <p className="text-gray-500 max-w-md mb-8">
          We couldn't find the page you were looking for. It might have been eaten, moved, or deleted.
        </p>
        
        <div className="flex gap-4">
          <Button onClick={() => navigate('/feed')}>Go to Feed</Button>
          <Button variant="outline" onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;