import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex flex-col">
      {/* Navbar */}
      <nav className="relative z-50 border-b border-[#1e3a5f] bg-[#111827] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <svg width="28" height="28" className="sm:w-8 sm:h-8" viewBox="0 0 56 56" fill="none">
              <rect x="2" y="14" width="52" height="28" rx="6" stroke="#00d4ff" strokeWidth="1.5" fill="none" />
              <rect x="2" y="14" width="52" height="28" rx="6" fill="#00d4ff" fillOpacity="0.05" />
              <line x1="2" y1="28" x2="54" y2="28" stroke="#00d4ff" strokeWidth="0.75" strokeDasharray="4 3" />
              <line x1="16" y1="18" x2="16" y2="38" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
              <line x1="40" y1="18" x2="40" y2="38" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
              <path d="M20 22 Q28 34 36 22" stroke="#00d4ff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M20 34 Q28 22 36 34" stroke="#00d4ff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
            <span className="font-orbitron text-base sm:text-lg font-black tracking-wider"
              style={{ textShadow: "0 0 20px rgba(0,212,255,0.4)" }}>
              <span className="text-[#00d4ff]">Transformer</span>
              <span className="text-[#f59e0b]">GO</span>
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#1e3a5f] bg-[#0a0f1e]">
              <div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
              <span className="text-[#9ca3af] text-xs tracking-widest uppercase">
                {session.user?.name}
              </span>
            </div>
            <form action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}>
              <button type="submit"
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-[#1e3a5f] text-[#9ca3af] text-xs sm:text-sm font-medium hover:border-[#ef4444] hover:text-[#ef4444] transition-all duration-200 font-orbitron tracking-wider"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <div className="flex-1 relative">
        {children}
      </div>
    </div>
  );
}