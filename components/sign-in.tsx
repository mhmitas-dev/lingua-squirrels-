"use client"

import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client'
import { User } from '@supabase/supabase-js'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from 'lucide-react'

const SignInButton = ({ user }: { user: User | null }) => {
    const supabase = getSupabaseBrowserClient()
    const [currentUser, setCurrentUser] = useState<User | null>(user);

    const handleGoogleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: 'https://linguasquirrels.vercel.app/',
            },
        })
    }

    async function handleSignOut() {
        await supabase.auth.signOut();
        setCurrentUser(null);
    }

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setCurrentUser(session?.user ?? null);
            }
        );

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, [supabase])

    return (
        <div>
            {currentUser ? (
                <ProfileMenu user={currentUser} handleSignOut={handleSignOut} />
            ) :
                <Button onClick={handleGoogleSignIn}>Sign In</Button>
            }
        </div>
    )
}

export default SignInButton;


function ProfileMenu({ user, handleSignOut }: { user: User; handleSignOut: () => Promise<void> }) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        dateStyle: "short",
        timeStyle: "short",
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" className='flex items-center gap-3 rounded-full cursor-pointer pl-0 border-2'>
                    <div className='size-9 rounded-full overflow-hidden'>
                        <img className='' src={user.user_metadata?.avatar_url || ""} alt="Avatar" />
                    </div>
                    <div className=''>
                        <p>{user.user_metadata?.full_name}</p>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                <div>
                    <div className='size-24 my-4 mb-2 rounded-full overflow-hidden mx-auto'>
                        <img className='' src={user.user_metadata?.avatar_url || ""} alt="Avatar" />
                    </div>
                    <div className='p-2 text-muted-foreground text-xs'>
                        <p>Name: {user.user_metadata?.full_name}</p>
                        <p>Email: {user.email}</p>
                        <p>Created At: {formatter.format(new Date(user.created_at))}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Delete Account</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className='flex justify-between'>
                    <span>Log out</span>
                    <LogOut />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}