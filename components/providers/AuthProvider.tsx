"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

type AuthContextType = {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
    children,
    initialSession, // <--- Key optimization: pass server session here
}: {
    children: React.ReactNode;
    initialSession: Session | null;
}) {
    const supabase = getSupabaseBrowserClient();
    const [session, setSession] = useState<Session | null>(initialSession);
    const [user, setUser] = useState<User | null>(initialSession?.user ?? null);
    const [isLoading, setIsLoading] = useState(!initialSession);

    useEffect(() => {
        // 1. Set up the Real-time Auth Listener
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            // This handles sign-in, sign-out, and token refreshes automatically
            console.log("Auth event:", event);
            setSession(session);
            setUser(session?.user ?? null);
            setIsLoading(false);

            if (event === 'SIGNED_OUT') {
                // Optional: Clear any local caches or redirect
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase]);

    return (
        <AuthContext.Provider value={{ user, session, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}