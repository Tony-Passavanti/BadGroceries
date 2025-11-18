// app/api/subsidiaries/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // ensures Node runtime if deployed to edge

const SEC_SUBS_URL = 'https://api.sec-api.io/subsidiaries';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const company = (body?.company || '').trim();

    if (!company) {
      return NextResponse.json({ error: 'Missing required field: company' }, { status: 400 });
    }

    // build Lucene query that searches by company name (wrap in quotes when contains spaces)
    const safeName = company.includes(' ') ? `"${company.replace(/"/g, '')}"` : company;
    const payload = {
      query: `companyName:${safeName}`,
      from: 0,
      size: 50,
      sort: [{ filedAt: { order: 'desc' } }],
    };

    const res = await fetch(SEC_SUBS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // sec-api expects the API key in the Authorization header (plain key)
        'Authorization': process.env.SEC_API_KEY ?? '',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('sec-api returned non-ok:', res.status, text);
      return NextResponse.json({ error: 'Subsidiary service error', detail: text }, { status: res.status });
    }

    const data = await res.json();
    // data has structure: { total: {...}, data: [ { companyName, ticker, cik, subsidiaries: [...] }, ... ] }
    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error('Error in /api/subsidiaries:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
