function LabHero() {
    return (
        <div className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA] rounded-[32px] p-10 text-white shadow-xl">

            <p className="uppercase tracking-[0.3em] text-violet-100 text-xs font-medium">
                LABORATORY DASHBOARD
            </p>

            <h1 className="text-5xl font-bold mt-3">
                Good Morning, Lab Team 🧪
            </h1>

            <p className="mt-3 text-violet-100 text-xl">
                Delivering accurate diagnostics, one sample at a time.
            </p>

            <div className="grid grid-cols-3 gap-8 mt-10">

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">

                    <p className="text-violet-100 text-sm uppercase tracking-wide">
                        Tests Today
                    </p>

                    <p className="text-3xl font-bold mt-2">
                        58
                    </p>

                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">

                    <p className="text-violet-100 text-sm uppercase tracking-wide">
                        Pending Reports
                    </p>

                    <p className="text-3xl font-bold mt-2">
                        12
                    </p>

                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">

                    <p className="text-violet-100 text-sm uppercase tracking-wide">
                        Critical Cases
                    </p>

                    <p className="text-3xl font-bold mt-2">
                        3
                    </p>

                </div>

            </div>

        </div>
    );
}

export default LabHero;