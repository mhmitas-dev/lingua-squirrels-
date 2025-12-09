import AuthProvider from "@/components/providers/AuthProvider"; // Import the new provider
import Navbar from "@/components/shared/Navbar";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import React from "react";

// This is a Server Component, so we can fetch data directly
const Layout = async ({ children }: { children: React.ReactNode }) => {
    const supabase = await createSupabaseServerClient();

    // Fetch session efficiently on the server
    const {
        data: { session },
    } = await supabase.auth.getSession();

    return (
        <div className="flex flex-col min-h-screen">
            {/* Wrap everything in the provider */}
            <AuthProvider initialSession={session}>
                <Navbar />
                <main className="flex-1">{children}</main>
            </AuthProvider>
        </div>
    );
};

export default Layout;