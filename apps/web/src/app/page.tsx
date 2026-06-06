"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0f1e]">
      {/* Animated grid background */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #00d4ff 0%, #1e40af 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Floating circuit nodes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {mounted && [
          { top: "15%", left: "10%", size: 6, color: "#00d4ff", delay: "0s" },
          { top: "70%", left: "8%", size: 4, color: "#f59e0b", delay: "1s" },
          { top: "25%", left: "85%", size: 5, color: "#00d4ff", delay: "0.5s" },
          { top: "75%", left: "88%", size: 7, color: "#f59e0b", delay: "1.5s" },
          { top: "50%", left: "5%", size: 3, color: "#00d4ff", delay: "2s" },
          { top: "45%", left: "92%", size: 4, color: "#00d4ff", delay: "0.8s" },
        ].map((node, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: node.top,
              left: node.left,
              width: node.size,
              height: node.size,
              backgroundColor: node.color,
              boxShadow: `0 0 ${node.size * 3}px ${node.color}`,
              animation: `pulse 3s ease-in-out ${node.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* SVG circuit lines */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-15" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="30%" x2="20%" y2="30%" stroke="#00d4ff" strokeWidth="0.5" />
        <line x1="80%" y1="70%" x2="100%" y2="70%" stroke="#00d4ff" strokeWidth="0.5" />
        <line x1="15%" y1="0" x2="15%" y2="30%" stroke="#00d4ff" strokeWidth="0.5" />
        <line x1="85%" y1="70%" x2="85%" y2="100%" stroke="#00d4ff" strokeWidth="0.5" />
        <circle cx="15%" cy="30%" r="3" fill="#f59e0b" />
        <circle cx="85%" cy="70%" r="3" fill="#f59e0b" />
        <line x1="0" y1="70%" x2="12%" y2="70%" stroke="#1e40af" strokeWidth="0.5" />
        <line x1="88%" y1="30%" x2="100%" y2="30%" stroke="#1e40af" strokeWidth="0.5" />
      </svg>

      {/* Main content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {/* Badge */}
        <div className="mb-6 px-4 py-1.5 rounded-full border border-[#00d4ff33] bg-[#00d4ff11] text-[#00d4ff] text-xs font-semibold tracking-widest uppercase">
          Electrical Engineering Tool
        </div>

        {/* Logo */}
        <div className="mb-4 flex items-center gap-4">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
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
          <h1 className="font-orbitron text-6xl font-black tracking-wider"
            style={{ textShadow: "0 0 40px rgba(0,212,255,0.4)" }}>
            <span className="text-[#00d4ff]">Transformer</span>
            <span className="text-[#f59e0b]">GO</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-[#e2e8f0] text-xl font-light mb-3 tracking-wide">
          Transformer Parameter Calculator & ML Error Predictor
        </p>
        <p className="text-[#9ca3af] text-sm mb-10 max-w-lg leading-relaxed">
          Design Current Transformers and Potential Transformers with engineering precision.
          Predict measurement errors using real machine-learning models trained on lab data.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            href="/login"
            className="group relative px-10 py-3.5 rounded-lg font-orbitron font-semibold tracking-wider text-[#0a0f1e] overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #0ea5e9)",
              boxShadow: "0 0 30px rgba(0,212,255,0.35), 0 4px 15px rgba(0,0,0,0.3)",
            }}
          >
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </Link>
          <Link
            href="/register"
            className="group px-10 py-3.5 rounded-lg font-orbitron font-semibold tracking-wider text-[#00d4ff] border border-[#00d4ff] transition-all duration-300 hover:bg-[#00d4ff15]"
            style={{ boxShadow: "0 0 20px rgba(0,212,255,0.1)" }}
          >
            Register
          </Link>
        </div>

        {/* Divider */}
        <div className="w-full max-w-md h-px mb-10"
          style={{ background: "linear-gradient(90deg, transparent, #1e3a5f, transparent)" }}
        />

        {/* Feature cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-2xl">
          {[
            { icon: "⚡", label: "CT Calculator", desc: "Current Transformer design" },
            { icon: "🔌", label: "PT Calculator", desc: "Potential Transformer design" },
            { icon: "🤖", label: "ML Prediction", desc: "Real error prediction" },
            { icon: "📦", label: "3D Models", desc: "Interactive Sketchfab embeds" },
            { icon: "🖨️", label: "Export & Print", desc: "Print-ready results" },
            { icon: "🔒", label: "Secure Auth", desc: "JWT session management" },
          ].map((f) => (
            <div
              key={f.label}
              className="flex flex-col items-start gap-1 p-4 rounded-xl border border-[#1e3a5f] bg-[#111827] hover:border-[#00d4ff44] transition-all duration-300"
              style={{ backdropFilter: "blur(10px)" }}
            >
              <span className="text-xl mb-1">{f.icon}</span>
              <span className="text-[#e2e8f0] text-sm font-semibold">{f.label}</span>
              <span className="text-[#9ca3af] text-xs">{f.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 z-0"
        style={{ background: "linear-gradient(to top, #0a0f1e, transparent)" }}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </main>
  );
}