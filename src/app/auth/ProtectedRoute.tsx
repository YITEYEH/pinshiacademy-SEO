import { Navigate, Outlet, useLocation } from 'react-router';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/app/auth/AuthProvider';

export function ProtectedRoute() {
  const { user, loading, supabaseConfigured } = useAuth();
  const location = useLocation();

  if (!supabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
        <div className="max-w-md text-center text-muted-foreground text-sm">
          請設定 <code className="text-xs bg-white px-1 rounded border">.env</code> 中的 Supabase 變數後重新整理。
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-muted/30">
        <Loader2 className="w-8 h-8 animate-spin text-brand-link" />
        <p className="text-sm text-muted-foreground">載入工作階段…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
