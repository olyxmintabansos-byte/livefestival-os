'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Flame,
  CheckCircle2,
  Clock,
  Radio,
  Sliders,
  FileCheck,
  ShieldCheck,
  Music,
  Users,
  AlertTriangle,
  Zap,
  Coffee,
  Mic2
} from 'lucide-react';
import { useFestival } from '@/context/FestivalContext';

interface ArtistRider {
  id: string;
  name: string;
  stage: string;
  slotTime: string;
  pyroStatus: 'APPROVED' | 'STANDBY' | 'NOT_REQUESTED';
  backlineReady: boolean;
  hospitalityDelivered: boolean;
  rfMicChannel: string;
  dressingRoom: string;
  riderItems: { item: string; fulfilled: boolean }[];
}

const INITIAL_RIDERS: ArtistRider[] = [
  {
    id: 'art-1',
    name: 'SUBTRONIC OVERDRIVE',
    stage: 'SOLARIS INFINITY STAGE (MAIN)',
    slotTime: '21:00 - 22:30',
    pyroStatus: 'APPROVED',
    backlineReady: true,
    hospitalityDelivered: true,
    rfMicChannel: 'CH 14 (584.200 MHz)',
    dressingRoom: 'VILLA DELUXE 01',
    riderItems: [
      { item: '4x Pioneer CDJ-3000 + DJM-A9 Mixer', fulfilled: true },
      { item: '6x Flame Projectors (Stage Lip Sync)', fulfilled: true },
      { item: 'Cold-pressed Ginger Immunity Shots (x24)', fulfilled: true },
      { item: 'Black Hand Towels (x12, 100% Cotton)', fulfilled: true },
    ],
  },
  {
    id: 'art-2',
    name: 'CHLOE X HELIX',
    stage: 'KINETIC JUNGLE',
    slotTime: '20:30 - 22:00',
    pyroStatus: 'STANDBY',
    backlineReady: true,
    hospitalityDelivered: true,
    rfMicChannel: 'CH 08 (552.100 MHz)',
    dressingRoom: 'GREEN ROOM B-03',
    riderItems: [
      { item: 'Moog Subsequent 37 + Roland TR-8S', fulfilled: true },
      { item: 'Custom Cryo CO2 Jet Cannons', fulfilled: true },
      { item: 'Organic Coconut Water & Fresh Berries', fulfilled: true },
      { item: 'Private Security Escort to Front-of-House', fulfilled: false },
    ],
  },
  {
    id: 'art-3',
    name: 'GRAVITY DROPPER',
    stage: 'SUB-ATOMIC BASS DOME',
    slotTime: '21:15 - 22:45',
    pyroStatus: 'APPROVED',
    backlineReady: true,
    hospitalityDelivered: false,
    rfMicChannel: 'CH 04 (512.450 MHz)',
    dressingRoom: 'DOME COMPOUND 02',
    riderItems: [
      { item: '2x Sub-woofer Tactile Bass Haptic Floor Units', fulfilled: true },
      { item: '30W High-Speed RGB Lasers Protocol Clearance', fulfilled: true },
      { item: 'Vegan Protein Bowls (x6)', fulfilled: false },
      { item: 'Electrolyte Hydration Salts & Alkaline Water', fulfilled: true },
    ],
  },
  {
    id: 'art-4',
    name: 'THE NEON ORCHESTRA (LIVE)',
    stage: 'SOLARIS INFINITY STAGE (MAIN)',
    slotTime: '22:45 - 00:15',
    pyroStatus: 'STANDBY',
    backlineReady: false,
    hospitalityDelivered: true,
    rfMicChannel: 'CH 16-24 (Multi-Mic RF Array)',
    dressingRoom: 'MAIN PAVILION SUITE A',
    riderItems: [
      { item: '16x DPA 4099 Clip-on String Microphones', fulfilled: true },
      { item: 'Steinway Model D Grand Piano (440Hz Tuned)', fulfilled: false },
      { item: 'Sparkular Cold Pyro Fountains (12 Units)', fulfilled: true },
      { item: 'Champagne Laurent-Perrier Brut (x4)', fulfilled: true },
    ],
  },
];

export default function ArtistHospitalityPage() {
  const [riders, setRiders] = useState<ArtistRider[]>(INITIAL_RIDERS);
  const [selectedArtist, setSelectedArtist] = useState<ArtistRider>(INITIAL_RIDERS[0]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const toggleRiderItem = (artistId: string, itemIdx: number) => {
    setRiders((prev) =>
      prev.map((art) => {
        if (art.id !== artistId) return art;
        const updatedItems = [...art.riderItems];
        updatedItems[itemIdx].fulfilled = !updatedItems[itemIdx].fulfilled;
        const allFulfilled = updatedItems.every((x) => x.fulfilled);
        return {
          ...art,
          riderItems: updatedItems,
          hospitalityDelivered: allFulfilled,
        };
      })
    );
  };

  const togglePyroApproval = (artistId: string) => {
    setRiders((prev) =>
      prev.map((art) => {
        if (art.id !== artistId) return art;
        const nextStatus = art.pyroStatus === 'APPROVED' ? 'STANDBY' : 'APPROVED';
        return { ...art, pyroStatus: nextStatus };
      })
    );
    setToastMsg('PYROTECHNIC LICENSED SAFETY PROTOCOL UPDATED');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0b0a10] text-white pb-20 font-mono">
      {/* Banner */}
      <div className="bg-[#12101b] border-b-4 border-[#ff4d00] px-4 py-8 relative overflow-hidden">
        <div className="hazard-stripe h-2 w-full absolute top-0 left-0" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
          <div>
            <div className="inline-block bg-[#ff007f] text-black font-black text-xs px-2.5 py-0.5 uppercase tracking-widest maximal-badge mb-2">
              ● BACKSTAGE & ARTIST HOSPITALITY OPERATIONS
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tight text-white flex items-center gap-3">
              ARTIST RIDERS <span className="text-[#d4ff00]">& TECH SPECS</span>
            </h1>
            <p className="text-sm text-zinc-300 mt-1 font-bold">
              Backline sound gear verification, dressing room catering checklists, RF wireless microphone frequencies, and licensed pyrotechnic sign-offs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/safety/"
              className="px-4 py-2.5 bg-[#d4ff00] hover:bg-[#bfe600] text-black font-black text-xs uppercase border-2 border-white shadow-[4px_4px_0px_#ff007f] cursor-pointer"
            >
              <span>SPL SENSORS & EMERGENCY →</span>
            </Link>
          </div>
        </div>
      </div>

      {toastMsg && (
        <div className="bg-[#ff4d00] text-black font-black text-xs py-2 px-4 text-center sticky top-20 z-40 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-black" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Headliner Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {riders.map((artist) => {
            const isSelected = selectedArtist.id === artist.id;
            return (
              <div
                key={artist.id}
                onClick={() => setSelectedArtist(artist)}
                className={`p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#181424] border-[#d4ff00] shadow-[6px_6px_0px_#ff007f]'
                    : 'bg-[#121018] border-zinc-700 hover:border-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-black uppercase mb-2">
                    <span className="text-[#d4ff00]">{artist.slotTime}</span>
                    <span
                      className={`px-1.5 py-0.5 border ${
                        artist.pyroStatus === 'APPROVED'
                          ? 'bg-[#ff4d00] text-black border-black'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}
                    >
                      {artist.pyroStatus === 'APPROVED' ? '🔥 PYRO OK' : 'PYRO HOLD'}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white leading-snug">{artist.name}</h3>
                  <div className="text-xs text-zinc-400 mt-1">{artist.stage}</div>

                  <div className="mt-4 pt-3 border-t border-zinc-800 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">BACKLINE:</span>
                      <strong className={artist.backlineReady ? 'text-emerald-400' : 'text-amber-400'}>
                        {artist.backlineReady ? '✓ READY' : '⏳ IN PROGRESS'}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">RF FREQ:</span>
                      <strong className="text-white">{artist.rfMicChannel.split(' ')[0]}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">SUITE:</span>
                      <strong className="text-[#d4ff00]">{artist.dressingRoom}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-zinc-400">
                    {artist.riderItems.filter((i) => i.fulfilled).length} / {artist.riderItems.length} ITEMS
                  </span>
                  <span className="text-[#ff007f] font-black">INSPECT →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Headliner Detailed Rider & Pyrotechnics Station */}
        <div className="maximal-card p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-zinc-800 pb-5 mb-6">
            <div>
              <div className="inline-block bg-[#7000ff] text-white text-[10px] font-black px-2 py-0.5 uppercase mb-1">
                ACTIVE RIDER INSPECTOR
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white">{selectedArtist.name}</h2>
              <p className="text-xs text-zinc-300 mt-1">
                {selectedArtist.stage} • Set Time: {selectedArtist.slotTime} • Compound: {selectedArtist.dressingRoom}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => togglePyroApproval(selectedArtist.id)}
                className={`px-4 py-2 text-xs font-black uppercase border-2 cursor-pointer transition-all flex items-center gap-2 ${
                  selectedArtist.pyroStatus === 'APPROVED'
                    ? 'bg-[#ff4d00] text-black border-black shadow-[4px_4px_0px_#d4ff00]'
                    : 'bg-zinc-800 text-zinc-300 border-zinc-600'
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>{selectedArtist.pyroStatus === 'APPROVED' ? 'PYRO APPROVED (CLICK TO HOLD)' : 'APPROVE PYRO SHOW'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hospitality & Catering Checklist */}
            <div className="space-y-3">
              <h3 className="text-sm font-black text-[#d4ff00] uppercase tracking-wider flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#d4ff00]" />
                <span>DRESSING ROOM HOSPITALITY & CATERING ITEMS</span>
              </h3>

              <div className="space-y-2">
                {selectedArtist.riderItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleRiderItem(selectedArtist.id, idx)}
                    className={`p-3 border-2 flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      item.fulfilled
                        ? 'bg-[#152414] border-emerald-500 text-emerald-200'
                        : 'bg-black border-zinc-700 text-zinc-300 hover:border-white'
                    }`}
                  >
                    <span className="text-xs font-bold">{item.item}</span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 border ${
                        item.fulfilled
                          ? 'bg-emerald-500 text-black border-black'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}
                    >
                      {item.fulfilled ? 'DELIVERED' : 'PENDING'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Backline Audio & RF Wireless Telemetry */}
            <div className="space-y-3">
              <h3 className="text-sm font-black text-[#ff007f] uppercase tracking-wider flex items-center gap-2">
                <Mic2 className="w-4 h-4 text-[#ff007f]" />
                <span>TECHNICAL STAGE BACKLINE & RF INTERFERENCE MONITOR</span>
              </h3>

              <div className="bg-black p-4 border-2 border-zinc-800 space-y-3 text-xs">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400">ASSIGNED RF FREQUENCY:</span>
                  <strong className="text-white font-mono">{selectedArtist.rfMicChannel}</strong>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400">RF NOISE FLOOR:</span>
                  <strong className="text-emerald-400 font-mono">-98 dBm (Clean Spectrum)</strong>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400">IN-EAR MONITOR (IEM) PACK:</span>
                  <strong className="text-white font-mono">Stereo Ch A/B (Shure PSM 1000)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">FIRE CHIEF SAFETY PERMIT:</span>
                  <strong className="text-[#d4ff00] font-mono">PERMIT #FEST-2026-992-FLAME</strong>
                </div>
              </div>

              <div className="p-3 bg-[#1e1528] border-2 border-[#7000ff] text-xs text-zinc-300">
                <span className="text-[#d4ff00] font-bold block mb-1">STAGE HANDOVER PROTOCOL:</span>
                FOH sound engineer must receive artist USB sticks and test audio channels at least 45 minutes prior to live slot.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
