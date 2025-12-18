
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Mail, Lock, ArrowRight, User, Phone, Briefcase, Bike, ShieldCheck } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/atoms/Button';
import { Role } from '@/types';

interface SignupForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
}

const SignupPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>();
  const registerUser = useStore((state) => state.register);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>('user');

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    const user = await registerUser({ ...data, role: selectedRole });
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

  const roles = [
    { id: 'user', label: 'Eater', icon: User, desc: 'Browse and order food' },
    { id: 'partner', label: 'Partner', icon: Briefcase, desc: 'Manage your restaurant' },
    { id: 'rider', label: 'Rider', icon: Bike, desc: 'Deliver orders' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-brand-500 p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <ChefHat size={32} className="text-white" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-white mb-2">Join To-Eat</h1>
          <p className="text-brand-100">Create your account today</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Role Selection */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {roles.map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r.id as Role)}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                    selectedRole === r.id 
                      ? 'border-brand-500 bg-brand-50 text-brand-600' 
                      : 'border-gray-100 hover:border-brand-200 text-gray-500'
                  }`}
                >
                  <r.icon size={24} className="mb-2" />
                  <span className="font-bold text-sm">{r.label}</span>
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <input
                  {...register('name', { required: 'Name is required' })}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                />
                <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                    })}
                    type="email"
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                  />
                  <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
                </div>
                {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <input
                    {...register('phone', { required: 'Phone is required' })}
                    type="tel"
                    placeholder="+20 1xx xxx xxxx"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                  />
                  <Phone size={18} className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                />
                <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full py-3 text-base flex items-center justify-center gap-2 mt-4"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
              <ArrowRight size={18} />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="font-bold text-brand-600 hover:underline">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
