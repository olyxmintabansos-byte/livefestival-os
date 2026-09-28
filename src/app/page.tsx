'use client';

import React from 'react';
import Link from 'next/link';
import {
  Flame,
  Volume2,
  Radio,
  Users,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Ticket
} from 'lucide-react';
import { useFestival } from '@/context/FestivalContext';
import { StageZone } from '@/types/festival';

export default function FestivalCommandPage() {
  const { stages, updateStageCrowd, updateStageStatus, alerts, dismissAlert } = useFestival();

  const stageKeys: StageZone[] = ['MAIN_STAGE', 'ELECTRIC_FOREST', 'BASS_DOME', 'SANCTUARY'];

  return (
    <div className="min-h-screen bg-[#0b0a10] text-white pb-20 font-mono">
      {/* Hero Maximalist Header */}
      <div className="bg-[#12101b] border-b-4 border-[#ff007f] px-4 py-8 relative overflow-hidden">
        <div className="hazard-stripe-lime h-2 w-full absolute top-0 left-0" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
          <div>
            <div className="inline-block bg-[#ff4d00] text-black font-black text-xs px-2.5 py-0.5 uppercase tracking-widest maximal-badge mb-2">
              ● REAL-TIME DISPATCH COCKPIT // 4 ACTIVE STAGES
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white flex flex-wrap items-center gap-3">
              FESTIVAL <span className="text-[#d4ff00]">STAGE MATRIX</span>
              <span className="text-xs px-3 py-1 bg-[#7000ff] text-white border-2 border-white font-bold">
                DAY 02 • NIGHT SHIFT
              </span>
            </h1>
            <p className="text-sm text-zinc-300 mt-2 max-w-2xl font-bold">
              Multi-stage audio limiters, pyrotechnic status, crowd capacity thresholds, and live artist run-sheet synchronization.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/crowd/"
              className="px-5 py-3 bg-[#d4ff00] hover:bg-[#bfe600] text-black font-black text-sm uppercase tracking-wider border-2 border-white shadow-[5px_5px_0px_#ff007f] cursor-pointer"
            >
              <span>INGRESS & CROWD HEATMAP →</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Active Emergency Alert Bar */}
        {alerts.length > 0 && (
          <div className="border-4 border-[#ff4d00] bg-[#1a0a0e] p-4 shadow-[6px_6px_0px_#000]">
            <div className="flex items-center gap-2 text-xs font-black text-[#ff4d00] uppercase mb-2">
              <AlertTriangle className="w-5 h-5 text-[#ff4d00] animate-bounce" />
              <span>LIVE INCIDENT & SOUND DISPATCH NOTICES ({alerts.length})</span>
            </div>
            <div className="space-y-2">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#2a0e14] p-3 border-2 border-[#ff4d00]/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-black bg-[#ff4d00] px-2 py-0.5">
                      {alert.zone}
                    </span>
                    <span className="text-xs text-zinc-400 font-bold">{alert.timestamp}</span>
                    <span className="text-xs text-white font-bold">{alert.message}</span>
                  </div>
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="px-3 py-1 bg-black hover:bg-zinc-800 text-[#d4ff00] border border-zinc-700 text-xs font-bold self-end sm:self-auto cursor-pointer"
                  >
                    DISMISS
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4 Multi-Stage Maximalist Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stageKeys.map((key) => {
            const stage = stages[key];
            const occupancyPct = Math.round((stage.currentCrowd / stage.capacity) * 100);
            const isHighCrowd = occupancyPct >= 85;
            const isSPLHigh = stage.currentSPL >= stage.maxAllowedSPL;

            return (
              <div
                key={key}
                className="maximal-card p-6 relative flex flex-col justify-between"
                style={{ borderColor: stage.colorHex }}
              >
                <div>
                  {/* Top Bar with Status Tag */}
                  <div className="flex items-center justify-between mb-4 border-b-2 border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: stage.colorHex }} />
                      <h2 className="text-base font-black uppercase tracking-wider" style={{ color: stage.colorHex }}>
                        {stage.name}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      {stage.pyroEnabled && (
                        <span className="px-2 py-0.5 bg-[#ff4d00] text-black text-[10px] font-black border border-black flex items-center gap-1">
                          <Flame className="w-3 h-3" /> PYRO ARMED
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-black border text-white text-[10px] font-black uppercase">
                        {stage.status}
                      </span>
                    </div>
                  </div>

                  {/* Active Artist Card */}
                  <div className="bg-black/80 border-2 border-zinc-800 p-4 mb-4">
                    <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                      NOW PERFORMING (HEADLINER)
                    </div>
                    <div className="text-2xl font-black text-white mt-1 tracking-tight">
                      {stage.currentArtist}
                    </div>
                    <div className="text-xs text-[#d4ff00] font-bold mt-0.5">{stage.genre}</div>

                    <div className="mt-3 pt-2 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                      <span>UP NEXT: <strong className="text-white">{stage.nextArtist}</strong></span>
                      <span className="flex items-center gap-1 text-[#ff007f] font-bold">
                        <Clock className="w-3.5 h-3.5" /> 22:15 SET
                      </span>
                    </div>
                  </div>

                  {/* SPL Decibel and Capacity Meters */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {/* Decibel SPL */}
                    <div className={`p-3 border-2 ${isSPLHigh ? 'bg-[#ff007f]/20 border-[#ff007f]' : 'bg-black border-zinc-800'}`}>
                      <div className="flex items-center justify-between text-xs font-bold text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Volume2 className="w-3.5 h-3.5 text-[#d4ff00]" /> SOUND SPL
                        </span>
                        <span className="text-[10px]">MAX: {stage.maxAllowedSPL} dB</span>
                      </div>
                      <div className={`text-2xl font-black mt-1 ${isSPLHigh ? 'text-[#ff007f]' : 'text-white'}`}>
                        {stage.currentSPL} <span className="text-xs font-normal">dBA</span>
                      </div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">
                        {isSPLHigh ? '⚠ COMPRESSION ENGAGED' : '✓ COMPLIANT W/ CITY LIMITS'}
                      </div>
                    </div>

                    {/* Crowd Occupancy */}
                    <div className={`p-3 border-2 ${isHighCrowd ? 'bg-[#ff4d00]/20 border-[#ff4d00]' : 'bg-black border-zinc-800'}`}>
                      <div className="flex items-center justify-between text-xs font-bold text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-[#ff007f]" /> CAPACITY
                        </span>
                        <span className="text-[10px]">{occupancyPct}%</span>
                      </div>
                      <div className={`text-2xl font-black mt-1 ${isHighCrowd ? 'text-[#ff4d00]' : 'text-white'}`}>
                        {stage.currentCrowd.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">
                        OF {stage.capacity.toLocaleString()} MAX
                      </div>
                    </div>
                  </div>
                </div>

                {/* Control Actions */}
                <div className="pt-4 border-t-2 border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateStageCrowd(key, -500)}
                      className="px-2.5 py-1 bg-black hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-zinc-300 cursor-pointer"
                    >
                      -500 CROWD
                    </button>
                    <button
                      onClick={() => updateStageCrowd(key, 500)}
                      className="px-2.5 py-1 bg-black hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-zinc-300 cursor-pointer"
                    >
                      +500 CROWD
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      const nextStatus = stage.status === 'LIVE' ? 'CHANGE_OVER' : 'LIVE';
                      updateStageStatus(key, nextStatus);
                    }}
                    className="px-3 py-1 bg-[#d4ff00] hover:bg-[#bfe600] text-black font-black text-xs uppercase border border-black cursor-pointer"
                  >
                    TOGGLE: {stage.status}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
