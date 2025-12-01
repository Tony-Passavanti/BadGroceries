'''
admin console for querying SEC API and publishing subsidiary data into Supabase.
simple terminal-based interface for demonstration purposes.
'''
import sys
sys.dont_write_bytecode = True

import time
from api.sec import SecAPI
from api.supa import Supa
from config import CLEAR, OK, WARN, ERROR, PURPLE, RESET, INFO
from utils import heading, get_user_input, confirm

# global delay for status messages
STATUS_DELAY = 1.5

DB = Supa.create()
SEC = SecAPI.create()


def display_subsidiaries(company_data: dict, total_count: int):
    '''display subsidiaries in a readable format.'''
    company_name = company_data.get('companyName', 'N/A')
    subsidiaries = company_data.get('subsidiaries', [])

    print(f'{PURPLE}  Subsidiaries for {company_name} (total {total_count}):{RESET}')
    print(f'{PURPLE}  ' + '-' * 56 + RESET)

    for idx, sub in enumerate(subsidiaries, 1):
        sub_name = sub.get('name', 'N/A')
        print(f'{PURPLE}  {idx}. {sub_name}{RESET}')

    print(f'{PURPLE}  ' + '-' * 56 + f'\n{RESET}')


def main():
    '''main admin console loop.'''
    while True:
        print(CLEAR)
        heading()
        # ask for company to search
        company_name = get_user_input(f'  {PURPLE}Company Search:{RESET} ')

        # confirm the input
        print(f'{PURPLE}  You entered: {RESET}"{company_name}"')
        if not confirm(f'{PURPLE}  Is this correct? [y/n]: {RESET}'):
            print(f'{WARN} Let\'s try again.\n')
            time.sleep(STATUS_DELAY)
            continue

        # query SEC API
        print(f'\n{INFO} Querying SEC API.{RESET}')
        time.sleep(STATUS_DELAY)
        try:
            company_data, total_subs = SEC.get_recent_subsidiaries(company_name)

            if company_data is None or total_subs == 0:
                print(f'{ERROR} No results for "{company_name}"')
                time.sleep(STATUS_DELAY)
                if not confirm(f'\n{PURPLE}  Try another search? [y/n]: {RESET}'):
                    break
                print(CLEAR)
                continue

            # display results
            print(f'{OK} Found company match.\n')
            time.sleep(STATUS_DELAY)

            # display subsidiaries
            display_subsidiaries(company_data, total_subs)

            # ask for approval
            if not confirm(f'{PURPLE}  Publish these subsidiaries? [y/n]: {RESET}'):
                print(f'{WARN} Subsidiaries not published.')
                time.sleep(STATUS_DELAY)
                if not confirm(f'\n{PURPLE}  Try another search? [y/n]: {RESET}'):
                    break
                print(CLEAR)
                continue

            # insert into Supabase
            print(f'\n{INFO} Publishing subsidiaries into Supabase.')
            time.sleep(STATUS_DELAY)

            try:
                # use the official company name from SEC API, not user input
                official_company_name = company_data.get('companyName', company_name)
                parent_id = DB.get_or_create_company(official_company_name)
                DB.insert_subsidiaries(parent_id, [company_data])
                # count subsidiaries
                num_subs = len(company_data.get('subsidiaries', []))
                print(f'{OK} Successfully published {num_subs} subsidiaries')
                time.sleep(STATUS_DELAY)
            except Exception as db_error:
                print(f'{ERROR} Failed to publish: {db_error}')
                time.sleep(STATUS_DELAY)

            # ask if user wants to continue
            if not confirm(f'\n{PURPLE}  Publish another company? [y/n]: {RESET}'):
                break

            print(CLEAR)

        except Exception as e:
            print(f'{ERROR} {e}')
            time.sleep(STATUS_DELAY)
            if not confirm(f'\n{PURPLE}  Try again? [y/n]: {RESET}'):
                break
            print(CLEAR)

    print(f'\n{PURPLE}  Thank you for using BadGroceries Admin Console{RESET}')
    print(f'{PURPLE}  Goodbye!{RESET}\n')


if __name__ == '__main__':
    main()
