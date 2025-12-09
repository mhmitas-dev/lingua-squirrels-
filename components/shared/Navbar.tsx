import React from 'react'
import SignInButton from '../sign-in'
import { createSupabaseServerClient } from '@/lib/supabase/server-client';

const Navbar = async () => {

    const supabase = await createSupabaseServerClient()
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <nav className="w-full border-b border-border bg-card/80 backdrop-blur z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <img src="/images/logo-squirrel.png" alt="app-logo" className="h-9 w-9" />
                    <span className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
                        Lingua Squirrels
                    </span>
                </div>

                <SignInButton user={user} />
            </div>
        </nav>
    )
}

export default Navbar