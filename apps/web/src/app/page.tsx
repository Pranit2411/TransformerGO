"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 10 + 8,
  delay: Math.random() * 5,
  color: i % 3 === 0 ? "#f59e0b" : "#00d4ff",
}));

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0f1e] px-4">

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
        <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] rounded-full opacity-15"
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
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-20"
          style={{ animation: "scan 8s linear infinite" }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {/* Badge */}
        <div className="mb-5 px-3 py-1.5 rounded-full border border-[#00d4ff33] bg-[#00d4ff11] text-[#00d4ff] text-xs font-semibold tracking-widest uppercase">
          Electrical Engineering Tool
        </div>

        {/* Logo */}
        <div className="mb-4 flex items-center gap-3">
          <svg width="40" height="40" className="sm:w-12 sm:h-12" viewBox="0 0 56 56" fill="none">
            <rect x="2" y="14" width="52" height="28" rx="6" stroke="#00d4ff" strokeWidth="1.5" fill="none" />
            <rect x="2" y="14" width="52" height="28" rx="6" fill="#00d4ff" fillOpacity="0.05" />
            <line x1="2" y1="28" x2="54" y2="28" stroke="#00d4ff" strokeWidth="0.75" strokeDasharray="4 3" />
            <line x1="16" y1="18" x2="16" y2="38" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <line x1="40" y1="18" x2="40" y2="38" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 22 Q28 34 36 22" stroke="#00d4ff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M20 34 Q28 22 36 34" stroke="#00d4ff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="16" cy="28" r="2.5" fill="#f59e0b" />
            <circle cx="40" cy="28" r="2.5" fill="#f59e0b" />
          </svg>
          <h1 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-black tracking-wider"
            style={{ textShadow: "0 0 40px rgba(0,212,255,0.4)" }}>
            <span className="text-[#00d4ff]">Transformer</span>
            <span className="text-[#f59e0b]">GO</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-[#e2e8f0] text-base sm:text-lg lg:text-xl font-light mb-3 tracking-wide">
          Transformer Parameter Calculator & ML Error Predictor
        </p>
        <p className="text-[#9ca3af] text-sm mb-8 sm:mb-10 max-w-lg leading-relaxed">
          Design Current Transformers and Potential Transformers with engineering precision.
          Predict measurement errors using real machine-learning models trained on lab data.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-14 w-full sm:w-auto">
          <Link href="/login"
            className="group relative px-8 sm:px-10 py-3.5 rounded-lg font-orbitron font-semibold tracking-wider text-[#0a0f1e] overflow-hidden transition-all duration-300 text-center"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #0ea5e9)",
              boxShadow: "0 0 30px rgba(0,212,255,0.35), 0 4px 15px rgba(0,0,0,0.3)",
            }}
          >
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </Link>
          <Link href="/register"
            className="px-8 sm:px-10 py-3.5 rounded-lg font-orbitron font-semibold tracking-wider text-[#00d4ff] border border-[#00d4ff] transition-all duration-300 hover:bg-[#00d4ff15] text-center"
            style={{ boxShadow: "0 0 20px rgba(0,212,255,0.1)" }}
          >
            Register
          </Link>
        </div>

        {/* Divider */}
        <div className="w-full max-w-md h-px mb-8 sm:mb-10"
          style={{ background: "linear-gradient(90deg, transparent, #1e3a5f, transparent)" }}
        />

        {/* Feature cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 w-full max-w-2xl">
          {[
            { icon: "⚡", label: "CT Calculator", desc: "Current Transformer design" },
            { icon: "🔌", label: "PT Calculator", desc: "Potential Transformer design" },
            { icon: "🤖", label: "ML Prediction", desc: "Real error prediction" },
            { icon: "📦", label: "3D Models", desc: "Interactive Sketchfab embeds" },
            { icon: "🖨️", label: "Export & Print", desc: "Print-ready results" },
            { icon: "🔒", label: "Secure Auth", desc: "JWT session management" },
          ].map((f) => (
            <div key={f.label}
              className="flex flex-col items-start gap-1 p-3 sm:p-4 rounded-xl border border-[#1e3a5f] bg-[#111827] hover:border-[#00d4ff44] transition-all duration-300"
            >
              <span className="text-lg sm:text-xl mb-1">{f.icon}</span>
              <span className="text-[#e2e8f0] text-xs sm:text-sm font-semibold">{f.label}</span>
              <span className="text-[#9ca3af] text-xs hidden sm:block">{f.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 z-0"
        style={{ background: "linear-gradient(to top, #0a0f1e, transparent)" }}
      />

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