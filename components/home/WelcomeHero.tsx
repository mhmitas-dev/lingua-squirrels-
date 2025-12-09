
const WelcomeHero = () => {
    return (
        <section className="flex-1 flex items-center">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                {/* Text Block */}
                <div className="space-y-6 text-center lg:text-left">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-foreground">
                        Talk to the <span className="text-primary">World</span>
                    </h1>

                    <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
                        Learn a language for free by chatting with native speakers around the world.
                    </p>
                    <p className="text-base font-black sm:text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
                        Sign In to get started!
                    </p>
                </div>

                {/* Image */}
                <div className="flex justify-center">
                    <img
                        src="/images/Gemini_Generated_Image_ajb5nzajb5nzajb5.png"
                        alt="Language exchange"
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-xl shadow-xl object-contain"
                    />
                </div>

            </div>
        </section>
    )
}

export default WelcomeHero