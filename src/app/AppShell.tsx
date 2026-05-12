import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Sidebar } from '@/app/components/Sidebar';
import { Topbar } from '@/app/components/Topbar';
import { Sheet, SheetContent } from '@/app/components/ui/sheet';
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
    <div className="flex size-full min-h-0 bg-muted/30">
      <div className="hidden shrink-0 lg:block">
        <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      </div>
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-[min(20rem,88vw)] gap-0 border-r p-0 sm:max-w-xs">
          <Sidebar
            currentPage={currentPage}
            onNavigate={onNavigate}
            onNavigateComplete={() => setMobileNavOpen(false)}
            className="h-full w-full max-w-none border-0"
          />
        </SheetContent>
      </Sheet>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar
          pageTitle={title}
          plan={planLabel}
          llmUsageThisMonth={llmThisMonth}
          onOpenMobileNav={() => setMobileNavOpen(true)}
        />
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
