'use server';

import { createClient } from '@/utils/supabase/server';

export async function supabaseSearch(name: string) {
    const supabase = await createClient();
    const { data: names, error } = await supabase
        .from('company')
        .select('name')
        .ilike('name', `%${name}%`);

    const {data: comptags, error: err} = await supabase
        .from('company')
        .select('name, company_tag(tag_id)')
        .ilike('name', `%${name}%`);
    console.log('Supabase search data:', comptags, 'error:', err);

    return {
        error: error?.message,
        data: names
    };
}