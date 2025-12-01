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

    def get_or_create_company(self, company_name: str) -> int:
        '''get existing company id or create new company, return company_id.'''
        result = self.client.table('company').select('company_id').eq('name', company_name).execute()

        if result.data:
            return result.data[0]['company_id']
        else:
            insert_result = self.client.table('company').insert({
                'name': company_name,
                'descript': ''
            }).execute()
            return insert_result.data[0]['company_id']

    def insert_subsidiaries(self, parent_company_id: int, subsidiaries: list[dict]) -> bool:
        '''insert subsidiaries and their parent relationship into database.'''
        try:
            for sub in subsidiaries:
                sub_name = sub.get('companyName', 'Unknown')
                sub_id = self.get_or_create_company(sub_name)

                # insert parent-subsidiary relationship
                self.client.table('company_parents').insert({
                    'company_id': sub_id,
                    'parent': parent_company_id
                }).execute()

            return True
        except Exception as e:
            raise Exception(f'failed to insert subsidiaries: {e}')


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
    