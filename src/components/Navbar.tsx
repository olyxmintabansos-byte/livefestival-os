'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Zap,
  Flame,
  Volume2,
  VolumeX,
  Users,
  Compass,
  AlertOctagon,
  Radio,
  Sparkles,
  Ticket
} from 'lucide-react';
import { useFestival } from '@/context/FestivalContext';

export function Navbar() {
  const pathname = usePathname();
  const { totalAttendees, soundAlarmMuted, toggleSoundAlarmMute, alerts } = useFestival();

  const navLinks = [
    { href: '/', label: 'STAGE TIMETABLE', sub: 'COMMAND COCKPIT' },
    { href: '/crowd/', label: 'CROWD & INGRESS', sub: 'HEATMAP / GATES' },
    { href: '/artists/', label: 'ARTIST HOSPITALITY', sub: 'RIDERS & PYRO' },
    { href: '/safety/', label: 'SPL & EMERGENCY', sub: 'SENSOR GRID' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#06050a] border-b-4 border-[#d4ff00]">
      {/* High-Energy Kinetic Marquee Bar */}
      <div className="bg-[#d4ff00] text-black font-extrabold text-[11px] py-1 tracking-widest uppercase kinetic-marquee font-mono">
        <div className="kinetic-track flex gap-8">
          <span>⚡ LIVEFESTIVAL OS // 79,370 ATTENDEES IN VENUE</span>
          <span>● ALL 4 STAGES LIVE (100% SOUND OCCUPANCY)</span>
          <span>🔥 HEADLINE PYRO SHOW AT 21:30</span>
          <span>⚠ GATE B MODERATE BACKLOG (14 MIN WAIT)</span>
          <span>⚡ LIVEFESTIVAL OS // 79,370 ATTENDEES IN VENUE</span>
          <span>● ALL 4 STAGES LIVE (100% SOUND OCCUPANCY)</span>
          <span>🔥 HEADLINE PYRO SHOW AT 21:30</span>
          <span>⚠ GATE B MODERATE BACKLOG (14 MIN WAIT)</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-[#ff007f] border-2 border-white flex items-center justify-center shadow-[4px_4px_0px_#d4ff00] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
              <Zap className="w-7 h-7 text-black stroke-[3]" />
            </div>
            <div>
              <div className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5 font-mono">
                LIVE<span className="text-[#d4ff00]">FESTIVAL</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-[#ff4d00] text-black font-black border border-black rounded-none">
                  TITAN #39
                </span>
              </div>
              <div className="text-[10px] tracking-widest text-[#d4ff00] font-bold uppercase font-mono">
                MAXIMALISM • STAGE TELEMETRY & DISPATCH
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2 font-mono">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 font-black text-xs uppercase tracking-wider border-2 transition-all ${
                    isActive
                      ? 'bg-[#d4ff00] text-black border-white shadow-[4px_4px_0px_#ff007f]'
                      : 'bg-black text-white border-zinc-700 hover:border-[#d4ff00] hover:text-[#d4ff00]'
                  }`}
                >
                  <div>{item.label}</div>
                  <div className="text-[9px] opacity-75 font-normal tracking-tight">{item.sub}</div>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 font-mono">
            <div className="hidden sm:flex items-center gap-2 bg-[#171424] px-3 py-1.5 border-2 border-[#ff007f] text-xs">
              <Users className="w-4 h-4 text-[#d4ff00]" />
              <span className="text-zinc-400">VENUE:</span>
              <strong className="text-white font-extrabold">{totalAttendees.toLocaleString()}</strong>
            </div>

            <button
              onClick={toggleSoundAlarmMute}
              className={`p-2 border-2 font-bold cursor-pointer transition-all ${
                soundAlarmMuted
                  ? 'bg-zinc-800 border-zinc-600 text-zinc-400'
                  : 'bg-[#ff4d00] border-white text-black shadow-[3px_3px_0px_#000]'
              }`}
              title={soundAlarmMuted ? 'Sound Alarms Muted' : 'Sound Alarms Active'}
            >
              {soundAlarmMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
