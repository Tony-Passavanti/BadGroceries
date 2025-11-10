import React from 'react';

export default function Viewgraph({
    titleHeading,
}: {
    titleHeading: {
        name: string;
    }
}) {
    return (
        <main>
            <h1 style={{textAlign: 'center', fontWeight: 'bold', fontSize: '3rem'}}>Example</h1>
        </main>
    );
}