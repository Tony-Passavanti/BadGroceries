'''
placeholder for the console / UI the administrator will work with for all related data querying, formatting, and storing in supabase
'''

from api.sec import SecAPI
from api.supa import Supa


db = Supa.create()      # database client
sec = SecAPI.create()   # SEC pipeline

# TODO: setup admin console
