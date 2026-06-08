import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-10 overflow-hidden">

      {/* Animated grid */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #00d4ff 0%, #1e40af 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00d4ff33] bg-[#00d4ff11] text-[#00d4ff] text-xs font-semibold tracking-widest uppercase mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
            Select Transformer Type
          </div>
          <h2 className="font-orbitron text-2xl sm:text-3xl lg:text-4xl font-bold text-[#e2e8f0] mb-3"
            style={{ textShadow: "0 0 30px rgba(0,212,255,0.2)" }}>
            Choose Your Calculator
          </h2>
          <p className="text-[#9ca3af] text-sm sm:text-base max-w-md mx-auto">
            Select the type of transformer you want to design and analyse.
          </p>
        </div>

        {/* Transformer type cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">

          {/* CT Card */}
          <Link href="/dashboard/ct"
            className="group relative rounded-2xl border border-[#1e3a5f] bg-[#111827] p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:border-[#00d4ff66] hover:shadow-[0_0_40px_rgba(0,212,255,0.1)]"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00d4ff] rounded-tl-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#00d4ff] rounded-br-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 70%)" }}
            />

            <div className="relative z-10 flex flex-col items-center text-center gap-4 sm:gap-5">
              {/* CT Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-[#1e3a5f] bg-[#0a0f1e] flex items-center justify-center group-hover:border-[#00d4ff44] transition-all duration-300"
                style={{ boxShadow: "0 0 20px rgba(0,212,255,0.05)" }}>
                <svg width="40" height="40" className="sm:w-48 sm:h-48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="18" stroke="#00d4ff" strokeWidth="1.5" fill="none" />
                  <circle cx="24" cy="24" r="18" fill="#00d4ff" fillOpacity="0.03" />
                  <circle cx="24" cy="24" r="10" stroke="#00d4ff" strokeWidth="1" strokeDasharray="3 2" fill="none" opacity="0.5" />
                  <line x1="6" y1="24" x2="14" y2="24" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                  <line x1="34" y1="24" x2="42" y2="24" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="24" cy="24" r="3" fill="#00d4ff" />
                  <path d="M19 19 Q24 24 29 19" stroke="#00d4ff" strokeWidth="1" fill="none" opacity="0.6" />
                  <path d="M19 29 Q24 24 29 29" stroke="#00d4ff" strokeWidth="1" fill="none" opacity="0.6" />
                </svg>
              </div>

              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="font-orbitron text-xl sm:text-2xl font-bold text-[#00d4ff]">CT</span>
                  <span className="text-[#374151] text-sm">|</span>
                  <span className="text-[#9ca3af] text-sm">Current Transformer</span>
                </div>
                <p className="text-[#9ca3af] text-xs sm:text-sm leading-relaxed">
                  Calculate core size, turns, insulation, wire cross-sections and predict ratio & phase errors.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {["Core Size", "Turns", "Insulation", "Error Prediction"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-[#0a0f1e] border border-[#1e3a5f] text-[#9ca3af] text-xs group-hover:border-[#00d4ff33] transition-colors duration-300">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-[#00d4ff] text-sm font-medium group-hover:gap-3 transition-all duration-300">
                <span>Open Calculator</span>
                <span>→</span>
              </div>
            </div>
          </Link>

          {/* PT Card */}
          <Link href="/dashboard/pt"
            className="group relative rounded-2xl border border-[#1e3a5f] bg-[#111827] p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:border-[#f59e0b66] hover:shadow-[0_0_40px_rgba(245,158,11,0.1)]"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#f59e0b] rounded-tl-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#f59e0b] rounded-br-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.05) 0%, transparent 70%)" }}
            />

            <div className="relative z-10 flex flex-col items-center text-center gap-4 sm:gap-5">
              {/* PT Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-[#1e3a5f] bg-[#0a0f1e] flex items-center justify-center group-hover:border-[#f59e0b44] transition-all duration-300"
                style={{ boxShadow: "0 0 20px rgba(245,158,11,0.05)" }}>
                <svg width="40" height="40" className="sm:w-48 sm:h-48" viewBox="0 0 48 48" fill="none">
                  <rect x="6" y="10" width="36" height="28" rx="4" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
                  <rect x="6" y="10" width="36" height="28" rx="4" fill="#f59e0b" fillOpacity="0.03" />
                  <line x1="6" y1="24" x2="42" y2="24" stroke="#f59e0b" strokeWidth="0.75" strokeDasharray="3 2" opacity="0.4" />
                  <line x1="16" y1="10" x2="16" y2="38" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="32" y1="10" x2="32" y2="38" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M19 17 Q24 24 29 17" stroke="#f59e0b" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  <path d="M19 31 Q24 24 29 31" stroke="#f59e0b" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  <circle cx="16" cy="24" r="2" fill="#f59e0b" />
                  <circle cx="32" cy="24" r="2" fill="#f59e0b" />
                </svg>
              </div>

              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="font-orbitron text-xl sm:text-2xl font-bold text-[#f59e0b]">PT</span>
                  <span className="text-[#374151] text-sm">|</span>
                  <span className="text-[#9ca3af] text-sm">Potential Transformer</span>
                </div>
                <p className="text-[#9ca3af] text-xs sm:text-sm leading-relaxed">
                  Calculate cross-section area, wire width, insulation layers and predict voltage ratio errors.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {["Cross-Section", "Wire Width", "Insulation", "Error Prediction"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-[#0a0f1e] border border-[#1e3a5f] text-[#9ca3af] text-xs group-hover:border-[#f59e0b33] transition-colors duration-300">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-[#f59e0b] text-sm font-medium group-hover:gap-3 transition-all duration-300">
                <span>Open Calculator</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom stats bar */}
        <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto">
          {[
            { value: "222", label: "CT Training Samples" },
            { value: "160", label: "PT Training Samples" },
            { value: "ML", label: "Real Predictions" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-3 rounded-xl border border-[#1e3a5f] bg-[#111827]">
              <div className="font-orbitron text-lg sm:text-xl font-bold text-[#00d4ff]">{stat.value}</div>
              <div className="text-[#9ca3af] text-xs mt-1 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}