# BadGroceries Publish to Supabase <!-- omit in toc -->

Python utilities for managing company data, querying the SEC API, and syncing with Supabase.

## Table of Contents <!-- omit in toc -->
- [Setup](#setup)
  - [Install Dependencies](#install-dependencies)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Usage](#usage)
  - [Testing the SEC API](#testing-the-sec-api)
  - [Testing Supabase Connection](#testing-supabase-connection)
- [Data Pipeline](#data-pipeline)
- [Requirements.txt](#requirementstxt)


## Setup

*__I'm on Ubuntu, so some of the CLI commands are going to be different if you're on Windows. I'm confident you'll be able to navigate the differences.__*

*__Mac people should be fine.__*

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Environment Variables

Make sure you have `.env.local` in the root (`BadGroceries/`) with the following:

```py
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SEC_API_KEY=your_sec_api_key
```

>The program `asserts` these envars; it'll shut'er down safely if there were any issues getting these vals.

## Project Structure

```
py/
├── config.py           # environment config and constants
├── console.py          # admin console for data querying and storage
├── utils.py            # utility functions
├── api/
│   ├── sec.py         # SEC API client for subsidiary data
│   └── supa.py        # Supabase client wrapper
```

## Usage

### Testing the SEC API

To make importing classes not a pain in the ass, it's easier just to turn everything into a module.

>To the uninitiated, this doesn't change anything; just make sure to use the `-m` arg when executing a PY file so it's ran as module (_as demonstrated below_).

```bash
cd py/
```

```bash
# from inside py/
python -m api.sec
```

### Testing Supabase Connection

```bash
# from inside py/
python -m api.supa
```

## Data Pipeline

The planned workflow for ingesting SEC subsidiary data into Supabase:

1. query SEC API via `SecAPI.search_subsidiaries(company_name)`
2. transform SEC response data to match database schema
3. insert/update company records via Supabase client
4. create parent-subsidiary relationships in `company_parents` table

>__NOTE:__ Supabase client handles all database operations (no `SQLAlchemy` needed). The `supabase` kit already has the goods: `.insert()`, `.update()`, `.select()`, etc.

## [Requirements.txt](./requirements.txt)

- `supabase` - Supabase client for database operations
- `python-dotenv` - environment variable management
- `requests` - HTTP client for SEC API calls
