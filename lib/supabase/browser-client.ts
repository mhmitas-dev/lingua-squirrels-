// lib/supabase/browser-client.ts
"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
// 1. Import the generated type
import type { Database } from "@/lib/database.types";

// 2. Use the imported type for the client
let client: SupabaseClient<Database> | null = null;

// 3. Update the function signature and client creation
export function getSupabaseBrowserClient(): SupabaseClient<Database> {
    if (client) {
        return client;
    }
    // ... environment variable checks ...

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
            "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
        );
    }

    // Pass the generated type here
    client = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
    return client;
}