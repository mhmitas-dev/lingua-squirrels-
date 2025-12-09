import WelcomeHero from "@/components/home/WelcomeHero";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export default async function Home() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log({ user })

  return (
    <main className="min-h-[clac(100vh-64px)] w-full flex flex-col bg-background overflow-hidden">
      {/* Hero */}
      <WelcomeHero />

      {/* Bottom Banner */}
      {/* <div className="fixed bottom-0 w-full text-center py-2 text-sm font-medium" style={{ backgroundColor: 'red', color: 'white' }}>
        This app is under development — coming soon!
      </div> */}

    </main>

  );
}
