'use server';

import { createClient } from '@/utils/supabase/server';

interface TagRecord {
  tag_name?: string | null;
}

interface TagRow {
  tag?: TagRecord | TagRecord[] | null;
}

interface CompanyRow {
  company_id: number;
  name: string;
  company_tag: TagRow[] | null;
}

type SubsidiaryCompany = { name: string | null } | { name: string | null }[];

interface SubsidiaryRow {
  company: SubsidiaryCompany | null;
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
    const tagNames =
      company.company_tag?.flatMap((ct) => {
        if (!ct.tag) return [];
        const tagEntries = Array.isArray(ct.tag) ? ct.tag : [ct.tag];
        return tagEntries
          .map((tag) => tag?.tag_name)
          .filter((tagName): tagName is string => Boolean(tagName && tagName.trim().length > 0));
      }) ?? [];

    const tags = tagNames.length ? tagNames.join(', ') : 'None';

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
      .flatMap((record) => {
        if (!record.company) return [];
        const companies = Array.isArray(record.company) ? record.company : [record.company];
        return companies.map((entry) => entry.name ?? '');
      })
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
