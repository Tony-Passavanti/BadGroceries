
'use client';

import React, { useState } from 'react';

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
        <button onClick={handleSearch} style={{ padding: 8 }}>
          Search
        </button>
      </div>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {data && data.length > 0 && (
        <div style={{ marginTop: 20 }}>
          {data.map((item: any, i: number) => (
            <div key={i} style={{ marginBottom: 15 }}>
              <strong>{item.companyName}</strong>
              <ul>
                {item.subsidiaries?.map((s: any, j: number) => (
                  <li key={j}>{s.name}</li>
                )) ?? <li>No subsidiaries listed.</li>}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
