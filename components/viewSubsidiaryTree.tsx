'use client';

import React from 'react';

interface Subsidiary {
  name: string;
  jurisdiction?: string;
  ownershipPercentage?: string;
}

interface ViewSubsidiaryTreeProps {
  companyName: string;
  subsidiaries: Subsidiary[];
}

export default function ViewSubsidiaryTree({
  companyName,
  subsidiaries
}: ViewSubsidiaryTreeProps) {
  return (
    <div className="flex flex-col items-center p-8 gap-8">
      {/* Parent Company */}
      <div className="px-8 py-6 border-2 border-text-bright rounded-xl bg-bg-panel text-xl font-bold text-center min-w-[250px] shadow-lg text-text-bright">
        {companyName}
      </div>

      {/* Connecting Lines Container */}
      {subsidiaries.length > 0 && (
        <div className="flex flex-col items-center w-full">
          {/* Vertical Line from Parent */}
          <div className="w-[3px] h-10 bg-border" />

          {/* Horizontal Line */}
          {subsidiaries.length > 1 && (
            <div className="h-[3px] bg-border relative" style={{ width: `${Math.min(subsidiaries.length * 220, 1200)}px` }}>
              {/* Vertical Lines Down to Children */}
              {subsidiaries.map((_, index) => (
                <div
                  key={index}
                  className="absolute top-0 w-[3px] h-10 bg-border -translate-x-1/2"
                  style={{ left: `${(100 / subsidiaries.length) * index + (50 / subsidiaries.length)}%` }}
                />
              ))}
            </div>
          )}

          {/* Single Vertical Line for Single Child */}
          {subsidiaries.length === 1 && (
            <div className="w-[3px] h-10 bg-border" />
          )}

          {/* Subsidiaries Row */}
          <div className="flex gap-6 justify-center flex-wrap max-w-[1400px]">
            {subsidiaries.map((subsidiary, index) => (
              <div
                key={index}
                className="px-6 py-4 border-2 border-text-secondary rounded-lg bg-bg-panel text-sm text-center min-w-[200px] max-w-[250px] shadow-sm"
              >
                <div className="font-semibold mb-2 text-text-bright">
                  {subsidiary.name}
                </div>
                {subsidiary.jurisdiction && (
                  <div className="text-xs text-text-primary mt-1">
                    {subsidiary.jurisdiction}
                  </div>
                )}
                {subsidiary.ownershipPercentage && (
                  <div className="text-xs text-text-secondary mt-1 italic">
                    {subsidiary.ownershipPercentage}% ownership
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Subsidiaries Message */}
      {subsidiaries.length === 0 && (
        <div className="p-4 text-text-secondary italic">
          No subsidiaries listed
        </div>
      )}
    </div>
  );
}
