# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BadGroceries.report is a Next.js 16 web platform for exploring corporate ownership and subsidiary relationships. It compiles data from multiple public and commercial sources to show how companies are connected, with features for searching companies, viewing interactive ownership graphs, and reviewing verified records.

## Development Commands

### Installation
```sh
npm ci              # Install dependencies using lock file (preferred)
npm install         # Or install/update dependencies from package.json
```

### Development
```sh
npm run dev         # Start development server on http://localhost:3000
make dev            # Alternative via Makefile
```

### Production Build
```sh
npm run build       # Build for production
npm start           # Start production server
make build          # Alternative via Makefile
make start          # Start production via Makefile
```

### Linting
```sh
npm run lint        # Run ESLint
```

### Cleaning
```sh
make clean          # Remove .next, node_modules, .turbo, and .vercel
make rebuild        # Clean, install, and rebuild
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Runtime**: React 19.2
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **External API**: SEC API for subsidiary data
- **TypeScript**: Strict mode enabled

### Project Structure
- `app/` - Next.js App Router pages and API routes
  - `app/page.tsx` - Home page with company search
  - `app/about/page.tsx` - About page
  - `app/viewgraph/page.tsx` - Company ownership graph view
  - `app/api/subsidiaries/route.ts` - SEC API proxy endpoint
  - `app/layout.tsx` - Root layout with auth state
- `components/` - React components
  - `layoutShell.tsx` - Client-side auth wrapper
  - `menuBar.tsx` - Navigation bar
  - `authModal.tsx` - Authentication modal
  - `searchForCompany.tsx` - Company search component
- `utils/supabase/` - Supabase client utilities
  - `server.ts` - Server-side Supabase client
  - `client.ts` - Browser-side Supabase client
  - `signup.ts` - Authentication helpers
- `SQL Schema/` - Database schema and sample data

### Authentication Flow
- Root layout (`app/layout.tsx`) fetches user on server
- `LayoutShell` component wraps all pages with auth state management
- Uses Supabase SSR for cookie-based sessions
- Server components use `utils/supabase/server.ts`
- Client components use `utils/supabase/client.ts`

### Database Schema
The PostgreSQL schema includes:
- `Company` - Core company records with name and description
- `Company_Parents` - Parent-subsidiary relationships (self-referencing)
- `Tag` - Company tags/categories
- `Company_Tag` - Many-to-many company-tag relationships
- `Forum` - Discussion posts
- `Company_Forum` - Posts associated with companies
- `Forum_Replies` - Threaded replies

### External API Integration
The `/api/subsidiaries` endpoint:
- Proxies requests to SEC API (`https://api.sec-api.io/subsidiaries`)
- Requires `SEC_API_KEY` environment variable
- Returns subsidiary data for company searches
- Uses Lucene query syntax for company name matching

### TypeScript Configuration
- Path alias: `@/*` maps to project root
- Strict mode enabled
- Target: ES2017
- JSX: react-jsx (Next.js auto-imports React)

### Environment Variables
Required in `.env.local`:
- `SEC_API_KEY` - SEC API authentication key
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous/public key

### Build Configuration
- Uses webpack builder (specified via `--webpack` flag)
- Tailwind CSS 4 with PostCSS
- ESLint with Next.js recommended configs
