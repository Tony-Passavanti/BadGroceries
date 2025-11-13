'use server';

import { createClient } from '@/utils/supabase/server';

export async function supabaseSearch(name: string) {
    const supabase = await createClient();

    const {data: comptags, error: err} = await supabase
        .from('company')
        .select('company_id, name, company_tag(tag(tag_name))')
        .ilike('name', `%${name}%`);
    // console.log('Supabase search data:', JSON.stringify(comptags, null, 2), 'error:', err);

    const companyIds = comptags?.map((c: any) => c.company_id).filter(Boolean) || [];

    // Initialize array to hold final company data
    const companyData: any[] = [];

    // Looping through companies to get their subsidiaries
    for (const company of comptags || []) {
        const tags = company.company_tag
            ?.map((ct: any) => ct.tag?.tag_name)
            .filter(Boolean)
            .join(', ') || 'None';

        // // Finding subsidiary company IDs
        // const { data: subsidiaryRows, error: subErr } = await supabase
        //     .from('company_parents')
        //     .select('company_id')
        //     .eq('parent', company.company_id);

        // if (subErr) console.error('Error fetching subsidiaries:', subErr);

        // const subsidiaryIds = subsidiaryRows?.map((r: any) => r.company_id) || [];

        // // Retrieving subsidiary names
        // let subsidiaryNames: string[] = [];
        // if (subsidiaryIds.length > 0) {
        //     const { data: subsData, error: subsErr } = await supabase
        //         .from('company')
        //         .select('company_id, name')
        //         .in('company_id', subsidiaryIds as any[]);
        //     if (subsErr) console.error('Error fetching subsidiary names:', subsErr);
        //     subsidiaryNames = (subsData || []).map((s: any) => s.name);
        // }

        let subsidiaryNames: string[] = [];
        const {data: test, error: errtest} = await supabase
            .from('company_parents')
            .select('company!company_parents_company_id_fkey(name)')
            .eq('parent', company.company_id);
        subsidiaryNames = (test || []).map((t: any) => t.company.name);
        console.log('Subsidiary names from test query for', company.name, ':', subsidiaryNames);

        companyData.push({
            name: company.name,
            tags,
            subsidiaries: subsidiaryNames
        });

        console.log(JSON.stringify(companyData, null, 2));
    }

    return {
        error: err ? String((err as any).message ?? err) : undefined,
        data: companyData
    };
}