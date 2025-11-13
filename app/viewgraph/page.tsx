import React from 'react';
import ViewSubsidiaryTree from '@/components/viewSubsidiaryTree';

// dummy subsidiary companies so I can do tests and stuff
// const STUB_SUBSIDIARIES = [
//   { name: "totally real LLC and not fake at all" },
//   { name: "murloc & sons" },
//   { name: "only fans but instead its dads named Dan telling you they're proud of you, OnlyDans" },
//   { name: "fuck you jerry" }
// ];

export default async function Viewgraph({ searchParams }: { searchParams: Promise<{heading?: string; subsidiaries?: string }> }) {
    const params = await searchParams;
    const STUB_SUBSIDIARIES = [ { name: "None" } ]

    // Parse subsidiaries from the query param (JSON array of strings)
    let subsidiaries = STUB_SUBSIDIARIES;
    if (params.subsidiaries) {
        try {
            const parsedSubs = JSON.parse(decodeURIComponent(params.subsidiaries));
            // Convert string array to array of objects with 'name' property
            subsidiaries = Array.isArray(parsedSubs)
                ? parsedSubs.map((name: string) => ({ name }))
                : STUB_SUBSIDIARIES;
        } catch (e) {
            console.error('Error parsing subsidiaries:', e);
        }
    }
    
    return (
        <main>
            <ViewSubsidiaryTree
                companyName={params.heading || 'Unknown Company'}
                subsidiaries={subsidiaries}
            />
        </main>
    );
}