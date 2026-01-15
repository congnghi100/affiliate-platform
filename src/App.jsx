import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ServicesPage } from './pages/admin/ServicesPage';
import { CampaignsPage } from './pages/admin/CampaignsPage';
import { LeadsPage } from './pages/admin/LeadsPage';
import { BookingsPage } from './pages/admin/BookingsPage';
import { ReportsPage } from './pages/admin/ReportsPage';
import { AffiliatesPage } from './pages/admin/AffiliatesPage';
import { BrandsPage } from './pages/admin/BrandsPage';
import { AffiliateDashboard } from './pages/affiliate/AffiliateDashboard';
import { AffiliateLinksPage } from './pages/affiliate/AffiliateLinksPage';
import { AffiliateSettingsPage } from './pages/affiliate/AffiliateSettingsPage';
import { PayoutsPage } from './pages/affiliate/PayoutsPage';
import { AffiliateLeadsPage } from './pages/affiliate/AffiliateLeadsPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { UnauthorizedPage } from './pages/auth/UnauthorizedPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/login" element={<Navigate to="/login" replace />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['PLATFORM_ADMIN', 'BRAND_ADMIN']} />}>
          <Route element={<AppLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/services" element={<ServicesPage />} />
            <Route path="/admin/campaigns" element={<CampaignsPage />} />
            <Route path="/admin/leads" element={<LeadsPage />} />
            <Route path="/admin/bookings" element={<BookingsPage />} />
            <Route path="/admin/reports" element={<ReportsPage />} />
            <Route path="/admin/affiliates" element={<AffiliatesPage />} />
            <Route path="/admin/brands" element={<BrandsPage />} />
            {/* Add other admin routes here */}
          </Route>
        </Route>

        {/* Protected Affiliate Routes */}
        <Route element={<ProtectedRoute allowedRoles={['AFFILIATE']} />}>
          <Route element={<AppLayout />}>
            <Route path="/affiliate" element={<AffiliateDashboard />} />
            <Route path="/affiliate/links" element={<AffiliateLinksPage />} />
            <Route path="/affiliate/leads" element={<AffiliateLeadsPage />} />
            <Route path="/affiliate/payouts" element={<PayoutsPage />} />
            <Route path="/affiliate/settings" element={<AffiliateSettingsPage />} />
            {/* Add other affiliate routes here */}
          </Route>
        </Route>

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
