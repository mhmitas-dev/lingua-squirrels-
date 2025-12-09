"use client";

import Options from "@/components/home/Options";
import Rooms from "@/components/home/Rooms";
import WelcomeHero from "@/components/home/WelcomeHero";
import { useAuth } from "@/components/providers/AuthProvider";

export default function Home() {
  const { user, isLoading } = useAuth();

  return (
    <main className="min-h-[clac(100vh-64px)] w-full flex flex-col bg-background relative">
      {
        isLoading ? (
          <div className="text-xl text-center p-4"><span>Loading...</span></div>
        ) :
          user ? (
            <div>
              <Options />
              <Rooms />
            </div>
          ) : (
            <WelcomeHero />
          )
      }
    </main>
  );
}
