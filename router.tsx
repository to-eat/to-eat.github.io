
import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard } from '@/components/layouts/AuthGuard';
import { ScrollToTop } from '@/components/utils/ScrollToTop';

// Lazy load pages
const LandingPage = lazy(() => import('@/features/landing/LandingPage'));
const FeedPage = lazy(() => import('@/features/feed/FeedPage'));
const DiscoverPage = lazy(() => import('@/features/discover/DiscoverPage'));
const FavoritesPage = lazy(() => import('@/features/favorites/FavoritesPage'));
const CheckoutPage = lazy(() => import('@/features/checkout/CheckoutPage'));
const OrderTrackingPage = lazy(() => import('@/features/orders/OrderTrackingPage'));
const CookModePage = lazy(() => import('@/features/cooking/CookModePage'));
const ProductDetails = lazy(() => import('@/features/product/ProductDetails'));
const RestaurantPage = lazy(() => import('@/features/restaurant/RestaurantPage'));
const ProfilePage = lazy(() => import('@/features/profile/ProfilePage'));
const ChefsPage = lazy(() => import('@/features/chefs/ChefsPage'));
const ChefDetails = lazy(() => import('@/features/chefs/ChefDetails'));
const LoginPage = lazy(() => import('@/features/auth/LoginPage'));
const SignupPage = lazy(() => import('@/features/auth/SignupPage'));
const WalletPage = lazy(() => import('@/features/wallet/WalletPage'));
const SupportPage = lazy(() => import('@/features/support/SupportPage'));
const NotificationsPage = lazy(() => import('@/features/notifications/NotificationsPage'));
const OffersPage = lazy(() => import('@/features/offers/OffersPage'));

// Partner Pages
const PartnerLayout = lazy(() => import('@/features/partner/components/PartnerLayout'));
const PartnerDashboard = lazy(() => import('@/features/partner/PartnerDashboard'));
const PartnerOrdersPage = lazy(() => import('@/features/partner/PartnerOrdersPage'));
const PartnerMenuPage = lazy(() => import('@/features/partner/PartnerMenuPage'));
const PartnerFinancePage = lazy(() => import('@/features/partner/PartnerFinancePage'));
const PartnerSettingsPage = lazy(() => import('@/features/partner/PartnerSettingsPage'));
const PartnerReviewsPage = lazy(() => import('@/features/partner/PartnerReviewsPage'));
const PartnerKDSPage = lazy(() => import('@/features/partner/PartnerKDSPage'));

// Admin Pages
const AdminLayout = lazy(() => import('@/features/admin/components/AdminLayout'));
const AdminDashboard = lazy(() => import('@/features/admin/AdminDashboard'));
const AdminRestaurantsPage = lazy(() => import('@/features/admin/AdminRestaurantsPage'));
const AdminUsersPage = lazy(() => import('@/features/admin/AdminUsersPage'));
const AdminOrdersPage = lazy(() => import('@/features/admin/AdminOrdersPage'));
const AdminMarketingPage = lazy(() => import('@/features/admin/AdminMarketingPage'));
const AdminSystemPage = lazy(() => import('@/features/admin/AdminSystemPage'));
const AdminSettingsPage = lazy(() => import('@/features/admin/AdminSettingsPage'));
const AdminTransactionsPage = lazy(() => import('@/features/admin/AdminTransactionsPage'));

// Rider Pages
const RiderLayout = lazy(() => import('@/features/rider/components/RiderLayout'));
const RiderDashboard = lazy(() => import('@/features/rider/RiderDashboard'));
const RiderDeliveryPage = lazy(() => import('@/features/rider/RiderDeliveryPage'));
const RiderEarningsPage = lazy(() => import('@/features/rider/RiderEarningsPage'));
const RiderProfilePage = lazy(() => import('@/features/rider/RiderProfilePage'));

// Misc Pages
const NotFoundPage = lazy(() => import('@/features/misc/NotFoundPage'));
const ComingSoonPage = lazy(() => import('@/features/misc/ComingSoonPage'));

const Loading = () => (
  <div className="flex h-screen w-full items-center justify-center text-brand-500">
    <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
);

export const Router: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/chefs" element={<ChefsPage />} />
          <Route path="/chef/:id" element={<ChefDetails />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />

          {/* Protected User Routes (Any Authenticated Role) */}
          <Route path="/favorites" element={<AuthGuard><FavoritesPage /></AuthGuard>} />
          <Route path="/checkout" element={<AuthGuard><CheckoutPage /></AuthGuard>} />
          <Route path="/tracking/:id" element={<AuthGuard><OrderTrackingPage /></AuthGuard>} />
          <Route path="/cook/:orderId/:itemId" element={<AuthGuard><CookModePage /></AuthGuard>} />
          <Route path="/profile" element={<AuthGuard><ProfilePage /></AuthGuard>} />
          <Route path="/wallet" element={<AuthGuard><WalletPage /></AuthGuard>} />
          <Route path="/notifications" element={<AuthGuard><NotificationsPage /></AuthGuard>} />

          {/* Partner App Routes (Protected) */}
          <Route path="/partner" element={<AuthGuard allowedRoles={['partner']}><PartnerLayout /></AuthGuard>}>
            <Route index element={<Navigate to="/partner/dashboard" replace />} />
            <Route path="dashboard" element={<PartnerDashboard />} />
            <Route path="orders" element={<PartnerOrdersPage />} />
            <Route path="menu" element={<PartnerMenuPage />} />
            <Route path="reviews" element={<PartnerReviewsPage />} />
            <Route path="finance" element={<PartnerFinancePage />} />
            <Route path="settings" element={<PartnerSettingsPage />} />
            <Route path="kds" element={<PartnerKDSPage />} />
            <Route path="*" element={<Navigate to="/partner/dashboard" replace />} />
          </Route>

          {/* Admin App Routes (Protected) */}
          <Route path="/admin" element={<AuthGuard allowedRoles={['admin']}><AdminLayout /></AuthGuard>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="restaurants" element={<AdminRestaurantsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="marketing" element={<AdminMarketingPage />} />
            <Route path="transactions" element={<AdminTransactionsPage />} />
            <Route path="system" element={<AdminSystemPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>

          {/* Rider App Routes (Protected) */}
          <Route path="/rider" element={<AuthGuard allowedRoles={['rider']}><RiderLayout /></AuthGuard>}>
            <Route index element={<Navigate to="/rider/dashboard" replace />} />
            <Route path="dashboard" element={<RiderDashboard />} />
            <Route path="delivery/:id" element={<RiderDeliveryPage />} />
            <Route path="earnings" element={<RiderEarningsPage />} />
            <Route path="profile" element={<RiderProfilePage />} />
            <Route path="*" element={<Navigate to="/rider/dashboard" replace />} />
          </Route>

          {/* Catch All */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};
