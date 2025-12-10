"use client";
import { useAuth } from "@/components/providers/AuthProvider";
import SignInButton from "../sign-in";

const Navbar = () => {
    const { isLoading } = useAuth(); // Instant access!

    return (
        <nav className="w-full border-b border-border bg-card/80 backdrop-blur z-10">
            <div className="custom-container flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <img src="/images/logo-squirrel.png" alt="app-logo" className="h-9 w-9" />
                    <span className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
                        Lingua Squirrels
                    </span>
                </div>

                <div>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) :
                        <SignInButton />
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;