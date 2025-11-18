
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface CompanySearchResult {
  name: string;
  tags: string;
  subsidiaries: string[];
}

type ApiCompanyPayload = Partial<CompanySearchResult>;

function normalizeCompany(payload: ApiCompanyPayload): CompanySearchResult {
  return {
    name: payload.name ?? 'Unknown Company',
    tags: payload.tags ?? 'None',
    subsidiaries: Array.isArray(payload.subsidiaries) ? payload.subsidiaries : [],
  };
}

export default function HomePage() {
  const [company, setCompany] = useState('');
  const [data, setData] = useState<CompanySearchResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  async function handleSearch() {
    setError(null);
    setData(null);
    setSearched(false);

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

    const json: { data?: ApiCompanyPayload[] } = await res.json();
    const normalized = Array.isArray(json.data) ? json.data.map(normalizeCompany) : [];
    setData(normalized);

    setSearched(true);
  }

  const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // handleSearch();
      setSearched(false);
      const res = await fetch('/api/supasearch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: company }),
      });
      const result: { data?: ApiCompanyPayload[] } = await res.json();
      const normalized = Array.isArray(result.data) ? result.data.map(normalizeCompany) : [];
      setData(normalized);

      setSearched(true);
    }
  }

  return (
    <main className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-text-bright">Company Search</h1>

      <div className="flex gap-2 mt-3">
        <input
          onKeyDown={handleSubmit}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter a company name"
          className="flex-1 px-3 py-2 rounded-lg border border-border bg-bg-panel text-text-primary outline-none focus:border-text-bright"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded-lg font-bold cursor-pointer"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {data && data.length > 0 && (
        <div className="mt-5 space-y-4">
          {data.map((item, i) => {
            const subsidiariesParam = encodeURIComponent(JSON.stringify(item.subsidiaries));
            return (
              <Link href={`/viewgraph?heading=${encodeURIComponent(item?.name || '')}&subsidiaries=${subsidiariesParam}`} key={i}>
                <div className="company-clickable mb-2 border border-border rounded-lg p-4 bg-bg-panel cursor-pointer hover:bg-hover transition-colors">
                  <strong className="text-xl text-text-bright">{item.name}</strong>
                  <ul className="mt-2 text-text-primary">
                    <li>Subsidiary companies: {item.subsidiaries.length}</li>
                    <li>Tags: {item.tags}</li>
                  </ul>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {searched && (!data || data.length === 0) && (
        <div className="py-20 text-lg text-text-secondary italic text-center">
          No results found
        </div>
      )}
    </main>
  );
}
