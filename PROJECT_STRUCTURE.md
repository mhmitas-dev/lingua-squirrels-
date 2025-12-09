# Lingua Squirrels - Project Structure

A Next.js application for language exchange with authentication via Supabase and Google OAuth.

## Project Overview

**Name:** Lingua Squirrels  
**Version:** 0.1.0  
**Framework:** Next.js 16.0.8  
**Language:** TypeScript  
**Styling:** Tailwind CSS v4  
**Database/Auth:** Supabase  

---

## Directory Structure

```
lingua-squirrels/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles & Tailwind theme config
│   ├── layout.tsx               # Root layout
│   ├── favicon.ico              # Favicon
│   └── (root)/                  # Root route group
│       ├── layout.tsx           # Root group layout
│       └── page.tsx             # Home page (hero + sign-in)
│
├── components/                  # React components
│   ├── sign-in.tsx              # Sign-in button & user profile dropdown
│   ├── home/                    # Home page specific components
│   │   └── WelcomeHero.tsx      # Welcome hero section
│   ├── shared/                  # Shared components
│   │   └── Navbar.tsx           # Navigation bar
│   └── ui/                      # UI primitives (shadcn/ui)
│       ├── button.tsx           # Button component
│       ├── card.tsx             # Card component
│       └── dropdown-menu.tsx    # Dropdown menu component
│
├── lib/                         # Utility functions & libraries
│   ├── utils.ts                 # General utility functions
│   └── supabase/                # Supabase configuration
│       ├── browser-client.ts    # Browser-side Supabase client
│       └── server-client.ts     # Server-side Supabase client
│
├── public/                      # Static assets
│   ├── images/                  # Image files
│   │   └── Gemini_Generated_Image_ajb5nzajb5nzajb5.png
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── .vscode/                     # VS Code configuration
├── .next/                       # Build output (generated)
├── node_modules/                # Dependencies (generated)
├── .git/                        # Git repository
├── .gitignore                   # Git ignore rules
├── .env.local                   # Environment variables (local)
│
├── package.json                 # Project dependencies & scripts
├── package-lock.json            # Dependency lock file
├── tsconfig.json                # TypeScript configuration
├── next.config.ts               # Next.js configuration
├── postcss.config.mjs           # PostCSS configuration
├── eslint.config.mjs            # ESLint configuration
├── components.json              # shadcn/ui configuration
├── next-env.d.ts                # Next.js TypeScript types
└── README.md                    # Project documentation
```

---

## Key Files & Purposes

### App Layer (`app/`)
- **`layout.tsx`** - Root layout, likely contains Navbar and global layout wrapper
- **`page.tsx`** - Home page with hero section and call-to-action
- **`globals.css`** - Tailwind CSS v4 theme configuration with custom color variables

### Components (`components/`)
- **`sign-in.tsx`** - Authentication component with Google OAuth and user profile menu
- **`Navbar.tsx`** - Navigation header
- **`WelcomeHero.tsx`** - Hero section for home page
- **UI Components** - shadcn/ui primitives (Button, Card, DropdownMenu)

### Libraries (`lib/`)
- **`browser-client.ts`** - Supabase client for client-side operations
- **`server-client.ts`** - Supabase client for server-side operations
- **`utils.ts`** - Helper functions

---

## Dependencies

### Production
- **next** (16.0.8) - React framework
- **react** / **react-dom** (19.2.1) - UI library
- **@supabase/supabase-js** (2.87.0) - Supabase client
- **@supabase/ssr** (0.8.0) - Supabase SSR utilities
- **tailwindcss** (4) - CSS framework
- **@radix-ui/react-dropdown-menu** (2.1.16) - Dropdown menu primitives
- **@radix-ui/react-slot** (1.2.4) - Slot component
- **lucide-react** (0.556.0) - Icon library
- **class-variance-authority** (0.7.1) - Component styling
- **clsx** (2.1.1) - Conditional class names
- **tailwind-merge** (3.4.0) - Merge Tailwind classes

### Development
- **typescript** (5) - Type safety
- **@tailwindcss/postcss** (4) - Tailwind PostCSS plugin
- **eslint** (9) - Code linting
- **eslint-config-next** (16.0.8) - Next.js ESLint config
- **tw-animate-css** (1.4.0) - Animation utilities

---

## Key Features

✅ **Authentication** - Google OAuth via Supabase  
✅ **User Profiles** - User metadata display (avatar, name, email, creation date)  
✅ **Responsive Design** - Mobile-first with Tailwind CSS v4  
✅ **Type Safe** - Full TypeScript support  
✅ **Modern UI** - shadcn/ui components  
✅ **Under Development** - In-progress banner on home page  

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## Environment Setup

Required environment variables in `.env.local`:
- Supabase project URL
- Supabase public key
- Google OAuth configuration

---

## Architecture Notes

- **App Router** - Uses Next.js 13+ App Router structure
- **Client/Server Split** - Separate Supabase clients for browser and server
- **Component Organization** - UI primitives in `ui/`, shared components in `shared/`
- **Styling** - Tailwind CSS v4 with custom theme via CSS variables
