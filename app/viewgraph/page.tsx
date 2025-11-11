import React from 'react';
import ViewSubsidiaryTree from '@/components/viewSubsidiaryTree';

// dummy subsidiary companies so I can do tests and stuff
const STUB_SUBSIDIARIES = [
  { name: "totally real LLC and not fake at all" },
  { name: "murloc & sons" },
  { name: "only fans but instead its dads named Dan telling you they're proud of you, OnlyDans" },
  { name: "fuck you jerry" }
];

export default async function Viewgraph({ searchParams }: { searchParams: Promise<{heading?: string }> }) {
    const params = await searchParams;
    return (
        <main>
            <ViewSubsidiaryTree
                companyName={params.heading || 'Unknown Company'}
                subsidiaries={ STUB_SUBSIDIARIES }
            />
        </main>
    );
}