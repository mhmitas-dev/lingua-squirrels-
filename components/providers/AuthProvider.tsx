"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
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
    initialSession,
}: {
    children: React.ReactNode;
    initialSession: Session | null;
}) {
    // Ensures one stable instance across renders
    const supabase = useMemo(() => getSupabaseBrowserClient(), []);

    const [session, setSession] = useState<Session | null>(initialSession);
    const [user, setUser] = useState<User | null>(initialSession?.user ?? null);
    const [isLoading, setIsLoading] = useState(!initialSession);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, newSession) => {
                // console.log("Auth event:", event);
                setSession(newSession);
                setUser(newSession?.user ?? null);
                setIsLoading(false);
            }
        );

        return () => authListener.subscription.unsubscribe();
    }, [supabase]);

    return (
        <AuthContext.Provider value={{ user, session, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
