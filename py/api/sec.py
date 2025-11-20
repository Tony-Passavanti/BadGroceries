'''
factory class for the SEC API
'''

from __future__ import annotations

from dataclasses import dataclass
from typing import Any
import requests
from config import SEC_KEY, SEC_SUBS_URL


@dataclass(frozen = True)
class SecAPI:
    api_key: str


    @classmethod
    def create(cls) -> 'SecAPI':
        '''create a new SEC API client instance.'''
        return cls(api_key = SEC_KEY)


    def search_subsidiaries(self, company_name: str, from_index: int = 0, size: int = 50, sort_order: str = 'desc') -> dict[str, Any]:
        '''search for company subsidiaries by company name.'''
        clean_name = company_name.replace('"', '')
        safe_name = f'"{clean_name}"' if ' ' in company_name else company_name

        payload = {
            'query': f'companyName:{safe_name}',
            'from': from_index,
            'size': size,
            'sort': [{'filedAt': {'order': sort_order}}]
        }
        headers = {
            'Content-Type': 'application/json',
            'Authorization': self.api_key
        }
        response = requests.post(SEC_SUBS_URL, json = payload, headers = headers)
        response.raise_for_status()
        return response.json()


if __name__ == '__main__':
    import sys; sys.dont_write_bytecode = True
    from pprint import pprint

    sec = SecAPI.create()
    try:
        result = sec.search_subsidiaries('Apple Inc', size = 2)
        print('Search result:')
        pprint(result)
    except Exception as e:
        print(f'Error: {e}')