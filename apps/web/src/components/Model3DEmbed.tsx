"use client";
import { useState } from "react";

const MODEL_URLS = {
  "Epoxy/Dry": "https://sketchfab.com/models/2d1e67715d15453996afa9cbea8ff6f5/embed",
  "Oil Cooled": "https://sketchfab.com/models/24bdbf43519840f691e3ace4fae233f5/embed",
};

export function Model3DEmbed({ type }: { type: "Epoxy/Dry" | "Oil Cooled" }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="rounded-2xl border border-[#1e3a5f] bg-[#111827] overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e3a5f]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
          <span className="font-orbitron text-xs text-[#00d4ff] tracking-widest uppercase">
            3D Model — {type}
          </span>
        </div>
        <span className="text-[#9ca3af] text-xs">Sketchfab</span>
      </div>

      {/* Loading overlay */}
      {!loaded && (
        <div className="absolute inset-0 top-10 flex items-center justify-center bg-[#111827] z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#00d4ff] border-t-transparent animate-spin" />
            <span className="text-[#9ca3af] text-xs font-orbitron tracking-widest">
              Loading 3D Model...
            </span>
          </div>
        </div>
      )}

      <iframe
        title={`3D Model — ${type}`}
        src={MODEL_URLS[type]}
        width="100%"
        height="400"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        className="block"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}