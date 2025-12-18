
import React from 'react';
import { useStore } from '@/store/useStore';
import { Navigate, useLocation } from 'react-router-dom';
import { Role } from '@/types';
import { toast } from 'sonner';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, allowedRoles }) => {
  const user = useStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    // Redirect to login while saving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If user is logged in but doesn't have permission
    // Check role to redirect to appropriate dashboard to avoid loop
    if (user.role === 'admin' && !allowedRoles.includes('admin')) {
       return <Navigate to="/admin/dashboard" replace />;
    }
    if (user.role === 'partner' && !allowedRoles.includes('partner')) {
       return <Navigate to="/partner/dashboard" replace />;
    }
    if (user.role === 'rider' && !allowedRoles.includes('rider')) {
       return <Navigate to="/rider/dashboard" replace />;
    }
    
    // Fallback for normal users trying to access restricted areas
    return <Navigate to="/feed" replace />;
  }

  return <>{children}</>;
};
