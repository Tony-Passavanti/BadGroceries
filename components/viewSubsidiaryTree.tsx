'use client';

import React from 'react';

interface Subsidiary {
  name: string;
}

interface ViewSubsidiaryTreeProps {
  companyName: string;
  subsidiaries: Subsidiary[];
}

export default function ViewSubsidiaryTree( { companyName, subsidiaries } : ViewSubsidiaryTreeProps) 
{
  return (
    <div className="flex flex-col items-center p-8 gap-8">
      {/* parent company */}
      <div className="px-8 py-6 border-2 border-text-bright rounded-xl bg-bg-panel text-xl font-bold text-center min-w-[250px] shadow-lg text-text-bright">
        {companyName}
      </div>

      {/* connecting lines container */}
      {subsidiaries.length > 0 && (
        <div className="flex flex-col items-center w-full">
          {/* vertical line from parent */}
          <div className="w-[3px] h-10 bg-border" />

          {/* horizontal line */}
          {subsidiaries.length > 1 && (
            <div className="h-[3px] bg-border relative" style={{ width: `${Math.min(subsidiaries.length * 220, 1200)}px` }}>
              {/* vertical lines down to children */}
              {subsidiaries.map((_, index) => (
                <div
                  key={index}
                  className="absolute top-0 w-[3px] h-10 bg-border -translate-x-1/2"
                  style={{ left: `${(100 / subsidiaries.length) * index + (50 / subsidiaries.length)}%` }}
                />
              ))}
            </div>
          )}

          {/* single vertical line for single child */}
          {subsidiaries.length === 1 && (
            <div className="w-[3px] h-10 bg-border" />
          )}

          {/* subsidiaries row */}
          <div className="flex gap-6 justify-center flex-wrap max-w-[1400px]">
            {subsidiaries.map((subsidiary, index) => (
              <div
                key={index}
                className="px-6 py-4 border-2 border-text-secondary rounded-lg bg-bg-panel text-sm text-center min-w-[200px] max-w-[250px] shadow-sm"
              >
                <div className="font-semibold text-text-bright">
                  {subsidiary.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* no subsidiaries message */}
      {subsidiaries.length === 0 && (
        <div className="p-4 text-text-secondary italic">
          No subsidiaries listed
        </div>
      )}
    </div>
  );
}


