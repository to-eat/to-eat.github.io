
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Mail, Lock, ArrowRight, UserCircle, Bike, Shield } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/atoms/Button';

interface LoginForm {
  email: string;
}

const LoginPage: React.FC = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginForm>();
  const login = useStore((state) => state.login);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    // Password is hardcoded as mock for now, but API accepts it
    const user = await login(data.email, 'password');
    setIsLoading(false);
    
    if (user) {
      // Redirect based on role
      switch (user.role) {
        case 'partner':
          navigate('/partner/dashboard');
          break;
        case 'rider':
          navigate('/rider/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/feed');
      }
    }
  };

  const fillCredentials = (email: string) => {
    setValue('email', email);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-brand-500 p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <ChefHat size={32} className="text-white" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-white mb-2">To-Eat</h1>
          <p className="text-brand-100">Sign in to your account</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <input
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                />
                <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  defaultValue="password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                />
                <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full py-3 text-base flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
              <ArrowRight size={18} />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button onClick={() => navigate('/signup')} className="font-bold text-brand-600 hover:underline">
                Sign Up
              </button>
            </p>
          </div>

          {/* Quick Login Helpers */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-center text-xs text-gray-400 mb-4 uppercase font-bold tracking-wider">Quick Login (Demo)</p>
            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => fillCredentials('user@to-eat.com')} className="flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-50 text-xs text-gray-600 transition-colors">
                <UserCircle size={20} className="text-blue-500" /> User
              </button>
              <button onClick={() => fillCredentials('partner@to-eat.com')} className="flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-50 text-xs text-gray-600 transition-colors">
                <ChefHat size={20} className="text-orange-500" /> Partner
              </button>
              <button onClick={() => fillCredentials('rider@to-eat.com')} className="flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-50 text-xs text-gray-600 transition-colors">
                <Bike size={20} className="text-green-500" /> Rider
              </button>
              <button onClick={() => fillCredentials('admin@to-eat.com')} className="flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-50 text-xs text-gray-600 transition-colors">
                <Shield size={20} className="text-purple-500" /> Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
