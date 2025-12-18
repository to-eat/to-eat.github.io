import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {

  const navigate = useNavigate();

  return (
    <footer className="bg-brand-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div className="col-span-1 md:col-span-1">
            <h3 className="font-serif text-2xl font-bold text-brand-500 mb-4">TO EAT</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Discover, order, and cook amazing food from the best chefs and restaurants near you.
            </p>
            <div className="flex space-x-4">

              <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand-500 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="http://www.youtube.com/@too-eat" className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand-500 transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Discover</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => navigate('/discover')} className="hover:text-brand-500">Trending</button></li>
              <li><button onClick={() => navigate('/feed')} className="hover:text-brand-500">Near Me</button></li>
              <li><button onClick={() => navigate('/feed')} className="hover:text-brand-500">Popular</button></li>
              <li><button onClick={() => navigate('/discover')} className="hover:text-brand-500">Top Rated</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">For You</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => navigate('/favorites')} className="hover:text-brand-500">Saved</button></li>
              <li><button onClick={() => navigate('/profile')} className="hover:text-brand-500">Orders</button></li>
              <li><button onClick={() => navigate('/feed')} className="hover:text-brand-500">Meal Plans</button></li>
              <li><button onClick={() => navigate('/profile')} className="hover:text-brand-500">Settings</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-500">Help Center</a></li>
              <li><a href="#" className="hover:text-brand-500">Contact Us</a></li>
              <li><a href="#" className="hover:text-brand-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-500">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© Created with &hearts; by <code>0xQ4B4S</code></p>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="h-10 w-10 bg-white/10 rounded flex items-center justify-center hover:bg-brand-500 transition-colors"
            >
              <ChevronUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
