import { getSupabase } from '@/lib/supabase';

export type WritingTemplateRow = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  prompt_body: string;
  settings: Record<string, unknown> | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

function requireClient() {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase 未設定');
  return sb;
}

const DEFAULTS: Omit<WritingTemplateRow, 'id' | 'user_id' | 'created_at' | 'updated_at'>[] = [
  {
    name: 'SEO 部落格模板',
    description: '一般部落格：前言、多個 H2、結論',
    prompt_body: `你是一位專業 SEO 寫手。主題：{topic}。請用繁體中文撰寫，自然融入關鍵字，段落清晰。`,
    settings: { tone: 'professional', h2Count: 5 },
    is_default: true,
  },
  {
    name: '電商導購模板',
    description: '強調轉換與 CTA',
    prompt_body: `你是電商文案。產品主題：{topic}。請用繁體中文，強調賣點與行動呼籲。`,
    settings: { tone: 'sales', h2Count: 4 },
    is_default: false,
  },
];

export async function listTemplates(): Promise<WritingTemplateRow[]> {
  const sb = requireClient();
  const { data, error } = await sb.from('writing_templates').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  const rows = (data ?? []) as WritingTemplateRow[];
  if (rows.length > 0) return rows;
  await seedDefaultsIfEmpty();
  const { data: data2, error: err2 } = await sb.from('writing_templates').select('*').order('created_at', { ascending: false });
  if (err2) throw err2;
  return (data2 ?? []) as WritingTemplateRow[];
}

async function seedDefaultsIfEmpty() {
  const sb = requireClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) return;
  for (const d of DEFAULTS) {
    await sb.from('writing_templates').insert({
      user_id: user.id,
      name: d.name,
      description: d.description,
      prompt_body: d.prompt_body,
      settings: d.settings,
      is_default: d.is_default,
    });
  }
}

export async function deleteTemplate(id: string): Promise<void> {
  const sb = requireClient();
  const { error } = await sb.from('writing_templates').delete().eq('id', id);
  if (error) throw error;
}

export async function updateTemplate(
  id: string,
  patch: Partial<Pick<WritingTemplateRow, 'name' | 'description' | 'prompt_body' | 'settings' | 'is_default'>>,
): Promise<WritingTemplateRow> {
  const sb = requireClient();
  const { data, error } = await sb.from('writing_templates').update(patch).eq('id', id).select().single();
  if (error) throw error;
  return data as WritingTemplateRow;
}

/** 將目前使用者的模板全部設為非預設，再將指定 id 設為預設 */
export async function setDefaultTemplate(id: string): Promise<void> {
  const sb = requireClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) throw new Error('未登入');
  const { error: e1 } = await sb.from('writing_templates').update({ is_default: false }).eq('user_id', user.id);
  if (e1) throw e1;
  const { error: e2 } = await sb.from('writing_templates').update({ is_default: true }).eq('id', id);
  if (e2) throw e2;
}

export async function createTemplate(input: {
  name: string;
  description?: string;
  prompt_body: string;
}): Promise<WritingTemplateRow> {
  const sb = requireClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) throw new Error('未登入');
  const { data, error } = await sb
    .from('writing_templates')
    .insert({
      user_id: user.id,
      name: input.name,
      description: input.description ?? null,
      prompt_body: input.prompt_body,
      is_default: false,
    })
    .select()
    .single();
  if (error) throw error;
  return data as WritingTemplateRow;
}
