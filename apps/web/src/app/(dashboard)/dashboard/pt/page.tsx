"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { computePT, PTOutputs } from "@/lib/computations/pt";

const ptSchema = z.object({
  burden: z.coerce.number().positive(),
  voltageRating: z.coerce.number().positive(),
  classType: z.string().min(1),
  stc: z.coerce.number().positive(),
  bdvOil: z.coerce.number().positive(),
  primaryToSecondary: z.coerce.number().positive(),
  primaryToEarth: z.coerce.number().positive(),
  secondaryToEarth: z.coerce.number().positive(),
});

type PTFormData = z.infer<typeof ptSchema>;

export default function PTPage() {
  const [results, setResults] = useState<PTOutputs | null>(null);
  const [predictions, setPredictions] = useState<Record<string, number> | null>(null);
  const [predicting, setPredicting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [computed, setComputed] = useState(false);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm({
  resolver: zodResolver(ptSchema),
  defaultValues: {
    burden: 15,
    voltageRating: 11,
    classType: "0.2",
    stc: 13,
    bdvOil: 40,
    primaryToSecondary: 28,
    primaryToEarth: 28,
    secondaryToEarth: 3,
  },
});

  function onCompute(data: PTFormData) {
    const output = computePT(data);
    setResults(output);
    setPredictions(null);
    setComputed(true);
  }

  async function onPredict() {
  const data = getValues();
  setPredicting(true);
  try {
    const res = await fetch("/api/predict/pt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        specification: data.voltageRating,
        burden: data.burden,
        class_type: parseFloat(data.classType),
        bdv_oil: data.bdvOil,
        primary_to_secondary: data.primaryToSecondary,
        primary_to_earth: data.primaryToEarth,
        secondary_to_earth: data.secondaryToEarth,
      }),
    });
    const json = await res.json();
    setPredictions(json.predictions);
  } catch {
    setPredictions(null);
  }
  setPredicting(false);
}

  const inputClass = "w-full px-3 py-2.5 rounded-lg bg-[#0a0f1e] border border-[#1e3a5f] text-[#e2e8f0] text-sm placeholder-[#374151] outline-none transition-all duration-200 focus:border-[#f59e0b] focus:shadow-[0_0_10px_rgba(245,158,11,0.15)]";
  const labelClass = "text-[#9ca3af] text-xs font-medium tracking-widest uppercase mb-1.5 block";
  const selectClass = `${inputClass} cursor-pointer`;

  return (
    <main className="relative min-h-[calc(100vh-4rem)] px-4 py-6 sm:px-6 lg:px-8 overflow-hidden">

      {/* Background grid */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,158,11,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-2">
            <a href="/dashboard" className="text-[#9ca3af] text-sm hover:text-[#f59e0b] transition-colors">
              Dashboard
            </a>
            <span className="text-[#374151]">/</span>
            <span className="text-[#f59e0b] text-sm font-medium">PT Calculator</span>
          </div>
          <h1 className="font-orbitron text-2xl sm:text-3xl font-bold text-[#e2e8f0]"
            style={{ textShadow: "0 0 20px rgba(245,158,11,0.2)" }}>
            Potential Transformer
            <span className="text-[#f59e0b]"> Calculator</span>
          </h1>
          <p className="text-[#9ca3af] text-sm mt-1">
            Enter parameters to compute transformer design specifications.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left — Form */}
          <div className="rounded-2xl border border-[#1e3a5f] bg-[#111827] p-5 sm:p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#f59e0b] rounded-tl-2xl opacity-50" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#f59e0b] rounded-br-2xl opacity-50" />

            <h2 className="font-orbitron text-sm font-bold text-[#f59e0b] tracking-widest uppercase mb-5">
              Input Parameters
            </h2>

            <form onSubmit={handleSubmit(onCompute)} className="flex flex-col gap-4">

              {/* Burden + Voltage */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Burden (VA)</label>
                  <select {...register("burden")} className={selectClass}>
                    <option value={10}>10 VA</option>
                    <option value={15}>15 VA</option>
                    <option value={20}>20 VA</option>
                    <option value={25}>25 VA</option>
                    <option value={30}>30 VA</option>
                    <option value={50}>50 VA</option>
                  </select>
                  {errors.burden && <p className="text-[#ef4444] text-xs mt-1">{errors.burden.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Voltage (kV)</label>
                  <select {...register("voltageRating")} className={selectClass}>
                    <option value={11}>11 kV</option>
                    <option value={22}>22 kV</option>
                    <option value={33}>33 kV</option>
                  </select>
                </div>
              </div>

              {/* Class + STC */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Accuracy Class</label>
                  <select {...register("classType")} className={selectClass}>
                    {["0.1", "0.2", "0.5", "1", "3"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>STC (kA)</label>
                  <select {...register("stc")} className={selectClass}>
                    {[10, 13, 16, 20, 25].map(s => (
                      <option key={s} value={s}>{s} kA</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Advanced toggle */}
              <button type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-[#9ca3af] text-xs hover:text-[#f59e0b] transition-colors duration-200 mt-1"
              >
                <span className="text-[#f59e0b]">{showAdvanced ? "▼" : "▶"}</span>
                Advanced Parameters (for ML Prediction)
              </button>

              {showAdvanced && (
                <div className="flex flex-col gap-3 p-4 rounded-xl border border-[#1e3a5f] bg-[#0a0f1e]">
                  <p className="text-[#9ca3af] text-xs leading-relaxed">
                    These dielectric test values are used by the ML model. Defaults are typical lab values.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>BDV Oil (kV)</label>
                      <input type="number" step="0.1" {...register("bdvOil")} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Primary-Secondary (kV)</label>
                      <input type="number" step="0.1" {...register("primaryToSecondary")} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Primary-Earth (kV)</label>
                      <input type="number" step="0.1" {...register("primaryToEarth")} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Secondary-Earth (kV)</label>
                      <input type="number" step="0.1" {...register("secondaryToEarth")} className={inputClass} />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button type="submit"
                className="w-full py-3 rounded-lg font-orbitron font-semibold tracking-wider text-[#0a0f1e] text-sm transition-all duration-300 relative overflow-hidden group mt-2"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  boxShadow: "0 0 20px rgba(245,158,11,0.3)",
                }}
              >
                <span className="relative z-10">Compute Parameters</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </button>
            </form>
          </div>

          {/* Right — Results */}
          <div className="flex flex-col gap-4">
            {!computed ? (
              <div className="rounded-2xl border border-[#1e3a5f] bg-[#111827] p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
                <div className="w-16 h-16 rounded-2xl border border-[#1e3a5f] bg-[#0a0f1e] flex items-center justify-center mb-4">
                  <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                    <rect x="6" y="10" width="36" height="28" rx="4" stroke="#374151" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
                <p className="text-[#374151] font-orbitron text-sm tracking-wider">
                  Results will appear here
                </p>
                <p className="text-[#374151] text-xs mt-2">
                  Fill in the parameters and click Compute
                </p>
              </div>
            ) : (
              <>
                {results && (
                  <div className="rounded-2xl border border-[#1e3a5f] bg-[#111827] p-5 sm:p-6 relative overflow-hidden"
                    style={{ animation: "fadeIn 0.4s ease" }}
                  >
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#f59e0b] rounded-tl-2xl opacity-50" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#f59e0b] rounded-br-2xl opacity-50" />

                    <h2 className="font-orbitron text-sm font-bold text-[#f59e0b] tracking-widest uppercase mb-4">
                      Computed Results
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { label: "Cross-Section Area", value: `${results.crossSectionArea} mm²` },
                        { label: "Wire Width", value: `${results.wireWidth} mm` },
                        { label: "Insulation Layers", value: results.insulationLayers },
                        { label: "Primary Turns", value: results.primaryTurns },
                        { label: "Secondary Turns", value: results.secondaryTurns },
                      ].map((item) => (
                        <div key={item.label} className="p-3 rounded-xl bg-[#0a0f1e] border border-[#1e3a5f]">
                          <p className="text-[#9ca3af] text-xs uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="text-[#f59e0b] font-orbitron font-bold text-sm">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <button onClick={onPredict} disabled={predicting}
                      className="w-full mt-4 py-3 rounded-lg font-orbitron font-semibold tracking-wider text-sm transition-all duration-300 border border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff15] disabled:opacity-50"
                    >
                      {predicting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-3 h-3 rounded-full border-2 border-[#00d4ff] border-t-transparent animate-spin" />
                          Predicting Errors...
                        </span>
                      ) : (
                        "Predict Errors with ML →"
                      )}
                    </button>
                  </div>
                )}

                {predictions && (
                  <div className="rounded-2xl border border-[#00d4ff44] bg-[#111827] p-5 sm:p-6 relative overflow-hidden"
                    style={{ animation: "fadeIn 0.4s ease" }}
                  >
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00d4ff] rounded-tl-2xl opacity-50" />
                    <h2 className="font-orbitron text-sm font-bold text-[#00d4ff] tracking-widest uppercase mb-4">
                      ML Error Predictions
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {Object.entries(predictions).map(([key, val]) => (
                        <div key={key} className="p-2.5 rounded-xl bg-[#0a0f1e] border border-[#1e3a5f]">
                          <p className="text-[#9ca3af] text-xs mb-1">{key}</p>
                          <p className={`font-orbitron font-bold text-sm ${Math.abs(val) > 1 ? "text-[#ef4444]" : "text-[#00d4ff]"}`}>
                            {val > 0 ? "+" : ""}{val.toFixed(4)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}