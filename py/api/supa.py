'''
factory class for the Supabase client
'''

from __future__ import annotations

from dataclasses import dataclass
from supabase import create_client, Client
from config import SUPABASE_URL, SUPABASE_KEY


@dataclass(frozen = True)
class Supa:
    client: Client

    @classmethod
    def create(cls) -> 'Supa':
        '''create a new Supabase client instance.'''
        client = create_client(SUPABASE_URL, SUPABASE_KEY)
        return cls(client = client)


if __name__ == '__main__':
    import sys; sys.dont_write_bytecode = True
    from pprint import pprint
    
    # test connection
    supa = Supa.create()
    print(f'Connected to Supabase at: {SUPABASE_URL}')
    print(f'Client type: {type(supa.client)}')

    # try a simple query to verify connection
    try:
        # list tables or do a simple health check
        result = supa.client.table('company').select('*').limit(1).execute()
        print(f'in Borat voice: "Great Success!" Found {len(result.data)} record(s)')
        if result.data:
            pprint(f'Sample record: {result.data[0]}')
    except Exception as e:
        print(f'✗ fatality: {e}')

