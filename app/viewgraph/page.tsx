import React from 'react';
import ViewSubsidiaryTree from '@/components/viewSubsidiaryTree';

// dummy subsidiary companies so I can do tests and stuff
// const STUB_SUBSIDIARIES = [
//   { name: "totally real LLC and not fake at all" },
//   { name: "murloc & sons" },
//   { name: "only fans but instead its dads named Dan telling you they're proud of you, OnlyDans" },
//   { name: "fuck you jerry" }
// ];

type SearchParams = Promise<{
  heading?: string;
  subsidiaries?: string;
  data?: string;
}>;

interface SubsidiaryItem {
  name: string;
}

const EMPTY_SUBSIDIARIES: SubsidiaryItem[] = [];

function parseStringArray(value: string | undefined): SubsidiaryItem[] {
  if (!value) return EMPTY_SUBSIDIARIES;

  try {
    const parsed = JSON.parse(decodeURIComponent(value));
    if (Array.isArray(parsed)) {
      return parsed
        .filter((name): name is string => typeof name === 'string' && name.trim().length > 0)
        .map((name) => ({ name }));
    }
  } catch (error) {
    console.error('Error parsing subsidiaries array', error);
  }

  return EMPTY_SUBSIDIARIES;
}

function parseCompanyPayload(value: string | undefined): { company?: string; subsidiaries: SubsidiaryItem[] } {
  if (!value) return { subsidiaries: EMPTY_SUBSIDIARIES };

  try {
    const decoded = decodeURIComponent(value);
    const parsed = JSON.parse(decoded);

    const companyPayload = Array.isArray(parsed) ? parsed[0] : parsed;
    if (!companyPayload || typeof companyPayload !== 'object') {
      return { subsidiaries: EMPTY_SUBSIDIARIES };
    }

    const company =
      typeof companyPayload.name === 'string' && companyPayload.name.trim().length > 0
        ? companyPayload.name
        : undefined;

    const subsidiaries = Array.isArray(companyPayload.subsidiaries)
      ? companyPayload.subsidiaries
          .filter((name: unknown): name is string => typeof name === 'string' && name.trim().length > 0)
          .map((name) => ({ name }))
      : EMPTY_SUBSIDIARIES;

    return { company, subsidiaries };
  } catch (error) {
    console.error('Error parsing company payload for view graph', error);
    return { subsidiaries: EMPTY_SUBSIDIARIES };
  }
}

export default async function Viewgraph({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const { company: companyFromPayload, subsidiaries: subsidiariesFromPayload } = parseCompanyPayload(params.data);

  const subsidiaries =
    subsidiariesFromPayload.length > 0 ? subsidiariesFromPayload : parseStringArray(params.subsidiaries);

  const companyName = companyFromPayload || params.heading || 'Unknown Company';

  return (
    <main>
      <ViewSubsidiaryTree companyName={companyName} subsidiaries={subsidiaries} />
    </main>
  );
}
