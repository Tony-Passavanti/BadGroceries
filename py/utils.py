'''
utility functions for console UI and formatting.
'''

import os
import shutil
from config import ERROR, PURPLE, RESET

WIDTH = shutil.get_terminal_size().columns - 2


def heading(text: str = f'- BadGroceries Admin Console -', subtitle: bool = True):
    '''print a capitalized heading bordered with equal signs.'''
    capitalized = text.upper()
    print('\n' + '=' * WIDTH)
    print(f'  {PURPLE}\033[1m{capitalized:^{WIDTH}}\033[0m')
    if subtitle:
        print(f'\033[3m{"This tool allows you to search for subsidiaries and publish them into the database.":^{WIDTH}}\033[0m')
    print('=' * WIDTH + '\n')


def get_user_input(prompt: str, allow_empty: bool = False) -> str:
    '''get input from user with optional validation.'''
    while True:
        user_input = input(prompt).strip()
        if user_input or allow_empty:
            return user_input
        print(f'{ERROR} input cannot be empty. please try again.')


def confirm(prompt: str) -> bool:
    '''get yes/no confirmation from user.'''
    while True:
        response = input(prompt).strip().lower()
        if response in ('y', 'yes'):
            return True
        elif response in ('n', 'no'):
            return False
        print(f'{ERROR} please enter y/yes or n/no.')