import { getSupabase } from '@/lib/supabase';

export type ProfileRow = {
  id: string;
  full_name: string | null;
  plan: string;
  stripe_customer_id: string | null;
  subscription_status: string | null;
};

export async function getMyProfile(): Promise<ProfileRow | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) return null;
  const { data, error } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (error) return null;
  return data as ProfileRow | null;
}
