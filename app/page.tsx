import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col bg-background overflow-hidden">

      {/* Navbar */}
      <nav className="w-full border-b border-border bg-card/80 backdrop-blur z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <img src="/images/logo-squirrel.png" alt="app-logo" className="h-9 w-9" />
            <span className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
              Lingua Squirrels
            </span>
          </div>

          <Button disabled size="sm">Sign In</Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20 
                    grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Text Block */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-foreground">
              Talk to the <span className="text-primary">World</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
              Learn a language for free by chatting with native speakers around the world.
            </p>

            <div className="pt-2 flex justify-center lg:justify-start">
              <Button disabled size="lg">Start Learning</Button>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/images/Gemini_Generated_Image_ajb5nzajb5nzajb5.png"
              alt="Language exchange"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 
                     rounded-xl shadow-xl object-contain"
            />
          </div>

        </div>
      </section>

      {/* Bottom Banner */}
      <div className="fixed bottom-0 w-full bg-destructive text-destructive-foreground text-center py-2 text-sm font-medium">
        This app is under development — coming soon!
      </div>

    </main>

  );
}
