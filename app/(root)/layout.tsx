import Navbar from "@/components/shared/Navbar";
import AuthProvider from "@/components/providers/AuthProvider";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const supabase = await createSupabaseServerClient();

    // 1. Security Check: Use getUser() to verify the token with Supabase server
    // This ensures the user hasn't been banned or deleted since the cookie was set.
    const {
        data: { user },
    } = await supabase.auth.getUser();
    // console.log("See the DB user:", user)

    // 2. Hydration: Only if the user is verified, get the session tokens
    // We pass this to the client so it knows the user is logged in immediately.
    let session = null;
    if (user) {
        const { data } = await supabase.auth.getSession();
        session = data.session;
    }


    return (
        <div className="flex flex-col min-h-screen">
            {/* Pass the verified session to the provider */}
            <AuthProvider initialSession={session}>
                <Navbar />
                <main className="flex-1">{children}</main>
            </AuthProvider>
        </div>
    );
};

export default Layout;