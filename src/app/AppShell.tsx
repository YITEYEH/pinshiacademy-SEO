import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Sidebar } from '@/app/components/Sidebar';
import { Topbar } from '@/app/components/Topbar';
import { PAGE_TITLES, pageIdToPath, pathToPageId } from '@/app/navigation';
import { getSupabase } from '@/lib/supabase';
import { getMyProfile } from '@/lib/profilesRepo';
import { countLlmCompletesThisMonth } from '@/lib/usageRepo';

export function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = pathToPageId(location.pathname);
  const title = PAGE_TITLES[currentPage] ?? 'Dashboard';
  const onNavigate = (id: string) => navigate(pageIdToPath(id));
  const [planLabel, setPlanLabel] = useState<string>('Free');
  const [llmThisMonth, setLlmThisMonth] = useState<number | null>(null);

  useEffect(() => {
    if (!getSupabase()) return;
    let cancelled = false;
    void (async () => {
      const profile = await getMyProfile().catch(() => null);
      const usage = await countLlmCompletesThisMonth().catch(() => null);
      if (cancelled) return;
      if (profile?.plan) setPlanLabel(profile.plan);
      if (typeof usage === 'number') setLlmThisMonth(usage);
    })();
    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  return (
    <div className="size-full flex bg-muted/30">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar pageTitle={title} plan={planLabel} llmUsageThisMonth={llmThisMonth} />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
