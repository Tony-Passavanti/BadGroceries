'''
admin console for querying SEC API and publishing subsidiary data into Supabase.
simple terminal-based interface for demonstration purposes.
'''
import sys
sys.dont_write_bytecode = True

from api.sec import SecAPI
from api.supa import Supa
from config import CLEAR, OK, WARN, ERROR
from utils import heading, get_user_input, confirm

DB = Supa.create()
SEC = SecAPI.create()


def display_subsidiaries(subsidiaries: list):
    '''display subsidiaries in a readable format.'''
    print('  retrieved subsidiaries (most recent):')
    print('  ' + '-' * 56)
    for idx, sub in enumerate(subsidiaries, 1):
        company_name = sub.get('companyName', 'N/A')
        filed_date = sub.get('filedAt', 'N/A')
        print(f'  {idx}. {company_name} (filed: {filed_date})')
    print('  ' + '-' * 56 + '\n')


def main():
    '''main admin console loop.'''

    print(CLEAR)
    heading()

    while True:
        # ask for company to search
        company_name = get_user_input('  query: ')

        # confirm the input
        print(f'\n  you entered: "{company_name}"')
        if not confirm('  is this correct? [y/n]: '):
            print(f'{WARN} let\'s try again.\n')
            continue

        # query SEC API
        print('\n  loading... querying SEC API...')
        try:
            subsidiaries, total_results = SEC.get_recent_subsidiaries(company_name)

            if total_results == 0:
                print(f'{ERROR} no results for "{company_name}"')
                if not confirm('\n  try another search? [y/n]: '):
                    break
                print(CLEAR)
                continue

            # display results
            print(f'{OK} found {total_results} total results')
            print(f'{OK} showing {len(subsidiaries)} most recent\n')

            # display subsidiaries
            display_subsidiaries(subsidiaries)

            # ask for approval
            if not confirm('  approve publishing these subsidiaries? [y/n]: '):
                print(f'{WARN} subsidiaries not published.')
                if not confirm('\n  try another search? [y/n]: '):
                    break
                print(CLEAR)
                continue

            # insert into Supabase
            print('\n  loading... publishing subsidiaries into Supabase...')

            try:
                parent_id = DB.get_or_create_company(company_name)
                DB.insert_subsidiaries(parent_id, subsidiaries)
                print(f'{OK} successfully published {len(subsidiaries)} subsidiaries')
            except Exception as db_error:
                print(f'{ERROR} failed to publish: {db_error}')

            # ask if user wants to continue
            if not confirm('\n  publish another company? [y/n]: '):
                break

            print(CLEAR)

        except Exception as e:
            print(f'{ERROR} {e}')
            if not confirm('\n  try again? [y/n]: '):
                break
            print(CLEAR)

    print('\n  thank you for using BadGroceries Admin Console')
    print('  goodbye!\n')


if __name__ == '__main__':
    main()
