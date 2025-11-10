
'use client';
// 'use server';

import React, { useState } from 'react';
// import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default function HomePage() {
  const [company, setCompany] = useState('');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    setError(null);
    setData(null);

    const res = await fetch('/api/subsidiaries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company }),
    });

    if (!res.ok) {
      const err = await res.json();
      setError(err.error || 'Error');
      return;
    }

    const json = await res.json();
    setData(json.data || []);
  }

  /* async function supabaseSearch() {
    setError(null);
    setData(null);

    const supabase = await createClient();
    const { data: company } = await supabase.from("company").select()
  }*/

  return (
    <main style={{ maxWidth: 800, margin: '2rem auto', padding: 20 }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Subsidiary Finder</h1>

      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter a company name"
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={handleSearch} style={{ padding: 8, border: '2px solid black', borderRadius: '10px', backgroundColor: '#f2f2f2',
          fontWeight: 'bold', cursor: 'pointer' }}>
          Search
        </button>
      </div>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {data && data.length > 0 && (
        <div style={{ marginTop: 20 }}>
          {data.map((item: any, i: number) => (
            <Link href={{pathname: '/viewgraph', query: {heading: item?.companyName}}} key={i}>
              <div className='company-clickable' key={i} style={{ marginBottom: 15, fontSize: '1.5rem', border: '1px solid black',
            borderRadius: '10px', padding: '10px', backgroundColor: '#f2f2f2', cursor: 'pointer' }}>
                <strong>{item.companyName}</strong>
                <ul>
                  {/* {item.subsidiaries?.map((s: any, j: number) => (
                    <li key={j} style={{fontSize: '1rem'}}>{item.subsidiaries.length}</li>
                  )) ?? <li>No subsidiaries listed.</li>} */}
                  <li style={{fontSize: '1rem'}}>Subsidary companies: {item.subsidiaries.length}</li>
                  <li style={{fontSize: '1rem'}}>Tags: **some tags**</li>
                </ul>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
