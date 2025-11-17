'use server';

import { createClient } from '@/utils/supabase/server';

interface TagRow {
  tag?: {
    tag_name?: string | null;
  } | null;
}

interface CompanyRow {
  company_id: number;
  name: string;
  company_tag: TagRow[] | null;
}

interface SubsidiaryRow {
  company: {
    name: string | null;
  } | null;
}

export interface SupabaseSearchResult {
  name: string;
  tags: string;
  subsidiaries: string[];
}

export async function supabaseSearch(name: string) {
  const supabase = await createClient();

  const { data: rawCompanies, error: err } = await supabase
    .from('company')
    .select('company_id, name, company_tag(tag(tag_name))')
    .ilike('name', `%${name}%`);

  const companyRows: CompanyRow[] = Array.isArray(rawCompanies) ? rawCompanies : [];
  const companyData: SupabaseSearchResult[] = [];

  for (const company of companyRows) {
    const tags =
      company.company_tag
        ?.map((ct) => ct.tag?.tag_name)
        .filter((tag): tag is string => Boolean(tag && tag.trim().length > 0))
        .join(', ') || 'None';

    const { data: rawSubsidiaries, error: subsErr } = await supabase
      .from('company_parents')
      .select('company!company_parents_company_id_fkey(name)')
      .eq('parent', company.company_id);

    if (subsErr) {
      console.error('Error fetching subsidiary names:', subsErr);
      continue;
    }

    const subsidiaryRows: SubsidiaryRow[] = Array.isArray(rawSubsidiaries) ? rawSubsidiaries : [];
    const subsidiaries = subsidiaryRows
      .map((record) => record.company?.name ?? '')
      .filter((name): name is string => typeof name === 'string' && name.trim().length > 0);

    companyData.push({
      name: company.name,
      tags,
      subsidiaries,
    });
  }

  return {
    error: err?.message,
    data: companyData,
  };
}
