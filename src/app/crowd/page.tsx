'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  Compass,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Radio,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { useFestival } from '@/context/FestivalContext';

export default function CrowdHeatmapPage() {
  const { gates, stages, totalAttendees } = useFestival();

  return (
    <div className="min-h-screen bg-[#0b0a10] text-white pb-20 font-mono">
      {/* Banner */}
      <div className="bg-[#12101b] border-b-4 border-[#d4ff00] px-4 py-8 relative overflow-hidden">
        <div className="hazard-stripe h-2 w-full absolute top-0 left-0" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
          <div>
            <div className="inline-block bg-[#d4ff00] text-black font-black text-xs px-2.5 py-0.5 uppercase tracking-widest maximal-badge mb-2">
              ● INGRESS GATES & CROWD TELEMETRY
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tight text-white flex items-center gap-3">
              CROWD DENSITY <span className="text-[#ff007f]">& INGRESS</span>
            </h1>
            <p className="text-sm text-zinc-300 mt-1 font-bold">
              Turnstile RFID scan rates, queue buffer latency, zone bottleneck safety alerts, and perimeter flow telemetry.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2.5 bg-black hover:bg-zinc-900 text-white font-bold text-xs uppercase border-2 border-white cursor-pointer"
            >
              <span>← RETURN TO STAGE MATRIX</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Total Ingress Overview KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#121018] border-2 border-white p-4 shadow-[4px_4px_0px_#d4ff00]">
            <span className="text-[10px] text-zinc-400 font-bold uppercase block">TOTAL SCANNED TODAY</span>
            <strong className="text-2xl font-black text-[#d4ff00] block mt-1">
              79,370
            </strong>
            <span className="text-xs text-zinc-400">93.4% of total ticket sales</span>
          </div>

          <div className="bg-[#121018] border-2 border-white p-4 shadow-[4px_4px_0px_#ff007f]">
            <span className="text-[10px] text-zinc-400 font-bold uppercase block">ACTIVE INGRESS VELOCITY</span>
            <strong className="text-2xl font-black text-[#ff007f] block mt-1">
              705 / MIN
            </strong>
            <span className="text-xs text-zinc-400">Across 4 main gate complexes</span>
          </div>

          <div className="bg-[#121018] border-2 border-white p-4 shadow-[4px_4px_0px_#ff4d00]">
            <span className="text-[10px] text-zinc-400 font-bold uppercase block">PEAK WAIT TIME</span>
            <strong className="text-2xl font-black text-[#ff4d00] block mt-1">
              14 MINS
            </strong>
            <span className="text-xs text-zinc-400">Gate B (South Shuttle Terminal)</span>
          </div>

          <div className="bg-[#121018] border-2 border-white p-4 shadow-[4px_4px_0px_#7000ff]">
            <span className="text-[10px] text-zinc-400 font-bold uppercase block">SAFETY EVAC CLEARANCE</span>
            <strong className="text-2xl font-black text-emerald-400 block mt-1">
              100% CLEAR
            </strong>
            <span className="text-xs text-zinc-400">All 18 emergency exits unobstructed</span>
          </div>
        </div>

        {/* Turnstile Ingress Gates Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2 border-b-2 border-zinc-800 pb-2">
            <Radio className="w-5 h-5 text-[#d4ff00]" />
            <span>PERIMETER INGRESS TURNSTILE GATES</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {gates.map((gate) => (
              <div
                key={gate.id}
                className="bg-[#14121d] border-2 border-white p-5 flex flex-col justify-between shadow-[5px_5px_0px_#000]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-2">
                    <span className="text-sm font-black text-white">{gate.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 font-black uppercase ${
                        gate.status === 'CLEAR'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500'
                          : gate.status === 'MODERATE'
                          ? 'bg-amber-950 text-amber-400 border border-amber-500'
                          : 'bg-[#ff4d00] text-black font-black'
                      }`}
                    >
                      {gate.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center my-4">
                    <div className="bg-black p-2 border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 block">SCAN RATE</span>
                      <strong className="text-lg font-black text-[#d4ff00]">
                        {gate.scansPerMinute} <span className="text-[10px] font-normal">/min</span>
                      </strong>
                    </div>

                    <div className="bg-black p-2 border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 block">TOTAL INGRESS</span>
                      <strong className="text-lg font-black text-white">
                        {gate.totalIngressToday.toLocaleString()}
                      </strong>
                    </div>

                    <div className="bg-black p-2 border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 block">QUEUE WAIT</span>
                      <strong className={`text-lg font-black ${gate.queueWaitMinutes > 10 ? 'text-[#ff4d00]' : 'text-emerald-400'}`}>
                        {gate.queueWaitMinutes}m
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-zinc-400 flex items-center justify-between border-t border-zinc-800 pt-3">
                  <span>RFID Tap Error Rate: &lt; 0.08%</span>
                  <span className="text-[#ff007f] font-bold">12 Turnstiles Online</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Venue Spatial Zone Heatmap Simulation */}
        <div className="bg-[#121018] border-2 border-white p-6 shadow-[6px_6px_0px_#ff007f]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-zinc-800 pb-4 mb-6">
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#ff007f]" />
                <span>SPATIAL CROWD DENSITY HEATMAP (AERIAL RADAR)</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Real-time optical camera flow detection and RFID beacon triangulation across the 120-acre festival grounds.
              </p>
            </div>
            <div className="text-xs font-bold text-[#d4ff00] bg-black px-3 py-1.5 border border-zinc-700">
              RADAR INTERVAL: 500ms REALTIME
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.values(stages).map((st) => {
              const densityPct = Math.round((st.currentCrowd / st.capacity) * 100);
              return (
                <div
                  key={st.id}
                  className="bg-black p-4 border-2 flex flex-col justify-between min-h-[160px]"
                  style={{ borderColor: st.colorHex }}
                >
                  <div>
                    <div className="text-xs font-black" style={{ color: st.colorHex }}>
                      {st.name}
                    </div>
                    <div className="text-3xl font-black text-white mt-2">{densityPct}%</div>
                    <div className="text-xs text-zinc-400">Crowd Density Factor</div>
                  </div>

                  <div className="w-full bg-zinc-900 h-3 border border-zinc-700 mt-4 overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${densityPct}%`,
                        backgroundColor: densityPct > 85 ? '#ff4d00' : st.colorHex,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
