import { supabaseSearch } from "@/components/supabaseSearch";

export async function POST(request: Request) {
    const { name } = await request.json();
    const result = await supabaseSearch(name);
    return Response.json(result);
}