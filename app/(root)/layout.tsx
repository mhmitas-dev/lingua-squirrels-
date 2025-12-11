import AuthProvider from "@/components/providers/AuthProvider";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const supabase = await createSupabaseServerClient();

    // Secure: verify cookie → fetch user from server
    const { data: { user } } = await supabase.auth.getUser();

    // If user exists, load session for hydration
    let session = null;
    if (user) {
        const { data: { session: serverSession } } = await supabase.auth.getSession();
        session = serverSession ?? null;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <AuthProvider initialSession={session}>
                <main className="flex-1">{children}</main>
            </AuthProvider>
        </div>
    );
};

export default Layout;
