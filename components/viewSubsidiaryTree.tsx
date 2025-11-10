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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      gap: '2rem'
    }}>
      {/* Parent Company */}
      <div style={{
        padding: '1.5rem 2rem',
        border: '3px solid #2563eb',
        borderRadius: '12px',
        backgroundColor: '#dbeafe',
        fontSize: '1.25rem',
        fontWeight: 'bold',
        textAlign: 'center',
        minWidth: '250px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        {companyName}
      </div>

      {/* Connecting Lines Container */}
      {subsidiaries.length > 0 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}>
          {/* Vertical Line from Parent */}
          <div style={{
            width: '3px',
            height: '40px',
            backgroundColor: '#6b7280'
          }} />

          {/* Horizontal Line */}
          {subsidiaries.length > 1 && (
            <div style={{
              width: `${Math.min(subsidiaries.length * 220, 1200)}px`,
              height: '3px',
              backgroundColor: '#6b7280',
              position: 'relative'
            }}>
              {/* Vertical Lines Down to Children */}
              {subsidiaries.map((_, index) => (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    left: `${(100 / subsidiaries.length) * index + (50 / subsidiaries.length)}%`,
                    top: '0',
                    width: '3px',
                    height: '40px',
                    backgroundColor: '#6b7280',
                    transform: 'translateX(-50%)'
                  }}
                />
              ))}
            </div>
          )}

          {/* Single Vertical Line for Single Child */}
          {subsidiaries.length === 1 && (
            <div style={{
              width: '3px',
              height: '40px',
              backgroundColor: '#6b7280'
            }} />
          )}

          {/* Subsidiaries Row */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxWidth: '1400px',
            marginTop: subsidiaries.length > 1 ? '0' : '0'
          }}>
            {subsidiaries.map((subsidiary, index) => (
              <div
                key={index}
                style={{
                  padding: '1rem 1.5rem',
                  border: '2px solid #10b981',
                  borderRadius: '8px',
                  backgroundColor: '#d1fae5',
                  fontSize: '0.95rem',
                  textAlign: 'center',
                  minWidth: '200px',
                  maxWidth: '250px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                  {subsidiary.name}
                </div>
                {subsidiary.jurisdiction && (
                  <div style={{
                    fontSize: '0.85rem',
                    color: '#374151',
                    marginTop: '0.25rem'
                  }}>
                    {subsidiary.jurisdiction}
                  </div>
                )}
                {subsidiary.ownershipPercentage && (
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    marginTop: '0.25rem',
                    fontStyle: 'italic'
                  }}>
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
        <div style={{
          padding: '1rem',
          color: '#6b7280',
          fontStyle: 'italic'
        }}>
          No subsidiaries listed
        </div>
      )}
    </div>
  );
}
