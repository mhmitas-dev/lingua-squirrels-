import Navbar from "@/components/shared/Navbar";
import AuthProvider from "@/components/providers/AuthProvider";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const supabase = await createSupabaseServerClient();

    // Secure: verify cookie → fetch user from server
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.error("Supabase auth error:", userError.message);
    }

    // If user exists, load session for hydration
    let session = null;
    if (user) {
        const { data: { session: serverSession }, error: sessionError } =
            await supabase.auth.getSession();

        if (sessionError) {
            console.error("Session load error:", sessionError.message);
        }

        session = serverSession ?? null;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <AuthProvider initialSession={session}>
                <Navbar />
                <main className="flex-1">{children}</main>
            </AuthProvider>
        </div>
    );
};

export default Layout;
