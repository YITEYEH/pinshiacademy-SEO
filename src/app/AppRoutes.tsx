import { Navigate, createBrowserRouter, useNavigate } from 'react-router';
import { AppShell } from '@/app/AppShell';
import { ProtectedRoute } from '@/app/auth/ProtectedRoute';
import { LoginPage } from '@/app/auth/LoginPage';
import { RegisterPage } from '@/app/auth/RegisterPage';
import { ForgotPasswordPage } from '@/app/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '@/app/auth/ResetPasswordPage';
import { LandingPage } from '@/app/marketing/LandingPage';
import { FeaturesPage } from '@/app/marketing/pages/FeaturesPage';
import { PricingPage } from '@/app/marketing/pages/PricingPage';
import { BlogPage } from '@/app/marketing/pages/BlogPage';
import { ProductPreviewPage } from '@/app/marketing/pages/ProductPreviewPage';
import { pageIdToPath } from '@/app/navigation';
import { Dashboard } from '@/app/components/Dashboard';
import { NewArticle } from '@/app/components/NewArticle';
import { Articles } from '@/app/components/Articles';
import { Account } from '@/app/components/Account';
import { Keywords } from '@/app/components/Keywords';
import { Settings } from '@/app/components/Settings';
import { ComingSoonPage } from '@/app/components/ComingSoonPage';
import { TemplateManager } from '@/app/components/TemplateManager';

function DashboardRoute() {
  const navigate = useNavigate();
  return <Dashboard onNavigate={(id) => navigate(pageIdToPath(id))} />;
}

function NewArticleRoute() {
  const navigate = useNavigate();
  return <NewArticle onNavigate={(id) => navigate(pageIdToPath(id))} />;
}

function ArticlesRoute() {
  const navigate = useNavigate();
  return <Articles onNavigate={(id) => navigate(pageIdToPath(id))} />;
}

function AccountRoute() {
  const navigate = useNavigate();
  return <Account onNavigate={(id) => navigate(pageIdToPath(id))} />;
}

function KeywordsRoute() {
  const navigate = useNavigate();
  return <Keywords onNavigate={(id) => navigate(pageIdToPath(id))} />;
}

function SettingsRoute() {
  const navigate = useNavigate();
  return <Settings onNavigate={(id) => navigate(pageIdToPath(id))} />;
}

function TemplatesRoute() {
  const navigate = useNavigate();
  return <TemplateManager onNavigate={(id) => navigate(pageIdToPath(id))} />;
}

/** Data Router：useBlocker 等 API 需要此模式（不可只用 BrowserRouter） */
export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/features', element: <FeaturesPage /> },
  { path: '/pricing', element: <PricingPage /> },
  { path: '/blog', element: <BlogPage /> },
  { path: '/demo', element: <ProductPreviewPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          { path: 'dashboard', element: <DashboardRoute /> },
          { path: 'new-article', element: <NewArticleRoute /> },
          { path: 'articles', element: <ArticlesRoute /> },
          { path: 'templates', element: <TemplatesRoute /> },
          { path: 'keywords', element: <KeywordsRoute /> },
          { path: 'coming-soon/:featureId', element: <ComingSoonPage /> },
          { path: 'account', element: <AccountRoute /> },
          { path: 'settings', element: <SettingsRoute /> },
          { path: '*', element: <Navigate to="/dashboard" replace /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
