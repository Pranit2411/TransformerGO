"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 10 + 8,
  delay: Math.random() * 5,
  color: i % 3 === 0 ? "#f59e0b" : "#00d4ff",
}));

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (result?.error) {
      setError("Invalid username or password");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0f1e] px-4 py-8 overflow-hidden relative">

      {/* Animated grid */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "gridMove 20s linear infinite",
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #00d4ff 0%, #1e40af 40%, transparent 70%)",
            filter: "blur(80px)",
            animation: "breathe 6s ease-in-out infinite",
          }}
        />
      </div>

      {/* Floating particles */}
      {mounted && PARTICLES.map((p) => (
        <div key={p.id} className="absolute rounded-full pointer-events-none z-0"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Scanning line */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-30"
          style={{ animation: "scan 6s linear infinite" }}
        />
      </div>

      {/* Form */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div className="text-center mb-6 sm:mb-8">
          <Link href="/">
            <h1 className="font-orbitron text-2xl sm:text-3xl font-black tracking-wider"
              style={{ textShadow: "0 0 30px rgba(0,212,255,0.5)" }}>
              <span className="text-[#00d4ff]">Transformer</span>
              <span className="text-[#f59e0b]">GO</span>
            </h1>
          </Link>
          <p className="text-[#9ca3af] text-xs sm:text-sm mt-2 tracking-widest uppercase">
            Sign in to your account
          </p>
        </div>

        <div className="rounded-2xl border border-[#1e3a5f] bg-[#111827] p-6 sm:p-8 relative overflow-hidden"
          style={{ boxShadow: "0 0 40px rgba(0,0,0,0.6), 0 0 80px rgba(0,212,255,0.07)" }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-[#00d4ff] rounded-tl-2xl opacity-60" />
          <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-[#00d4ff] rounded-tr-2xl opacity-60" />
          <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-[#f59e0b] rounded-bl-2xl opacity-60" />
          <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-[#f59e0b] rounded-br-2xl opacity-60" />

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[#9ca3af] text-xs font-medium tracking-widest uppercase">
                Username
              </label>
              <input type="text" value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username" required
                className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-[#0a0f1e] border border-[#1e3a5f] text-[#e2e8f0] text-sm placeholder-[#374151] outline-none transition-all duration-200 focus:border-[#00d4ff] focus:shadow-[0_0_15px_rgba(0,212,255,0.2)]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#9ca3af] text-xs font-medium tracking-widest uppercase">
                Password
              </label>
              <input type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" required
                className="w-full px-4 py-2.5 sm:py-3 rounded-lg bg-[#0a0f1e] border border-[#1e3a5f] text-[#e2e8f0] text-sm placeholder-[#374151] outline-none transition-all duration-200 focus:border-[#00d4ff] focus:shadow-[0_0_15px_rgba(0,212,255,0.2)]"
              />
            </div>

            {error && (
              <div className="px-4 py-3 rounded-lg bg-[#ef444415] border border-[#ef4444] text-[#ef4444] text-sm">
                ⚠ {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 sm:py-3.5 rounded-lg font-orbitron font-semibold tracking-wider text-[#0a0f1e] text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-1 relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #00d4ff, #0ea5e9)",
                boxShadow: "0 0 25px rgba(0,212,255,0.35)",
              }}
            >
              <span className="relative z-10">{loading ? "Signing in..." : "Login"}</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </button>
          </form>

          <div className="flex items-center gap-3 my-5 sm:my-6">
            <div className="flex-1 h-px bg-[#1e3a5f]" />
            <span className="text-[#374151] text-xs tracking-widest">OR</span>
            <div className="flex-1 h-px bg-[#1e3a5f]" />
          </div>

          <p className="text-center text-[#9ca3af] text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#00d4ff] hover:underline font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.1); opacity: 0.25; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
          50% { transform: translateY(-10px) translateX(-10px); opacity: 0.6; }
          75% { transform: translateY(-25px) translateX(5px); opacity: 0.9; }
        }
        @keyframes scan {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </main>
  );
}