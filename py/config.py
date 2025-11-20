import os, sys
sys.dont_write_bytecode = True

from pathlib import Path
from dotenv import load_dotenv

# paths / files
ROOT = Path(__file__).parent.parent
ENV = ROOT / '.env.local'

# envars
load_dotenv(ENV)
SUPABASE_URL = os.environ.get('NEXT_PUBLIC_SUPABASE_URL')
SUPABASE_KEY = os.environ.get('NEXT_PUBLIC_SUPABASE_ANON_KEY')
SEC_KEY = os.environ.get('SEC_API_KEY')

assert SUPABASE_URL, "NEXT_PUBLIC_SUPABASE_URL environment variable is not set"
assert SUPABASE_KEY, "NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable is not set"
assert SEC_KEY, "SEC_API_KEY environment variable is not set"