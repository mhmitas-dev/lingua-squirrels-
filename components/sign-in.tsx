"use client";

import { Button } from "./ui/button";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { User } from "@supabase/supabase-js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider"; // Import the hook
import Image from "next/image";

const SignInButton = () => {
    // 1. Consume the global state instead of creating local state
    const { user, isLoading } = useAuth();
    const supabase = getSupabaseBrowserClient();
    // console.log("SignInButton user:", user)
    const handleGoogleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                // 2. Fix: Use window.location.origin to support localhost AND production automatically
                redirectTo: `${window.location.origin}/`,
            },
        });
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        // No need to manually set state null; the AuthProvider listener handles it!
        window.location.reload();
    };

    // Optional: Render a loading skeleton or nothing while checking session
    if (isLoading) return null;

    return (
        <div>
            {user ? (
                <ProfileMenu user={user} handleSignOut={handleSignOut} />
            ) : (
                <Button onClick={handleGoogleSignIn}>Sign In</Button>
            )}
        </div>
    );
};

export default SignInButton;

// ProfileMenu remains largely the same, just receiving the user object
function ProfileMenu({
    user,
    handleSignOut,
}: {
    user: User;
    handleSignOut: () => Promise<void>;
}) {
    const formatter = new Intl.DateTimeFormat("en-US", {
        dateStyle: "short",
        timeStyle: "short",
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    className="flex items-center gap-3 rounded-full cursor-pointer pl-0 border-2"
                >
                    <div className="size-9 rounded-full overflow-hidden">
                        <Image
                            className=""
                            src={user.user_metadata?.avatar_url || ""}
                            alt="Avatar"
                            width={36}
                            height={36}
                        />
                    </div>
                    <div className="">
                        <p>{user.user_metadata?.full_name}</p>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <div>
                    <div className="size-24 my-4 mb-2 rounded-full overflow-hidden mx-auto">
                        <Image
                            className=""
                            src={user.user_metadata?.avatar_url || ""}
                            alt="Avatar"
                            width={96}
                            height={96}
                        />
                    </div>
                    <div className="p-2 text-muted-foreground text-xs">
                        <p>Name: {user.user_metadata?.full_name}</p>
                        <p>Email: {user.email}</p>
                        {user.created_at && (
                            <p>
                                Created At: {formatter.format(new Date(user.created_at))}
                            </p>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Delete Account</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleSignOut}
                    className="flex justify-between"
                >
                    <span>Log out</span>
                    <LogOut className="w-4 h-4" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}