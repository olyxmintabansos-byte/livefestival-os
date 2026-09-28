'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StageZone,
  StageInfo,
  IngressGate,
  FestivalAlert,
  FestivalContextType
} from '@/types/festival';

const INITIAL_STAGES: Record<StageZone, StageInfo> = {
  MAIN_STAGE: {
    id: 'MAIN_STAGE',
    name: 'SOLARIS INFINITY STAGE',
    genre: 'ELECTRONIC & ARENA POP',
    colorHex: '#d4ff00', // Acid Lime
    currentArtist: 'SUBTRONIC OVERDRIVE',
    nextArtist: 'THE NEON ORCHESTRA (LIVE)',
    currentSPL: 102.4,
    maxAllowedSPL: 105.0,
    capacity: 45000,
    currentCrowd: 38200,
    status: 'LIVE',
    pyroEnabled: true,
  },
  ELECTRIC_FOREST: {
    id: 'ELECTRIC_FOREST',
    name: 'KINETIC JUNGLE',
    genre: 'MELODIC TECHNO & HOUSE',
    colorHex: '#ff007f', // Hot Pink
    currentArtist: 'CHLOE X HELIX',
    nextArtist: 'KINETIC SOULS B2B REPLICANT',
    currentSPL: 99.8,
    maxAllowedSPL: 102.0,
    capacity: 22000,
    currentCrowd: 19450,
    status: 'LIVE',
    pyroEnabled: false,
  },
  BASS_DOME: {
    id: 'BASS_DOME',
    name: 'SUB-ATOMIC BASS DOME',
    genre: 'DRUM & BASS / DUBSTEP',
    colorHex: '#ff4d00', // Electric Orange
    currentArtist: 'GRAVITY DROPPER',
    nextArtist: 'VOID RUNNER',
    currentSPL: 104.2,
    maxAllowedSPL: 105.0,
    capacity: 18000,
    currentCrowd: 17100,
    status: 'LIVE',
    pyroEnabled: true,
  },
  SANCTUARY: {
    id: 'SANCTUARY',
    name: 'ZENITH CHILL SANCTUARY',
    genre: 'AMBIENT DOWNTEMPO & modular',
    colorHex: '#7000ff', // Ultra Violet
    currentArtist: 'SOLAR DRIFT PROJECT',
    nextArtist: 'AURA RESONANCE',
    currentSPL: 84.5,
    maxAllowedSPL: 90.0,
    capacity: 8000,
    currentCrowd: 4620,
    status: 'LIVE',
    pyroEnabled: false,
  },
};

const INITIAL_GATES: IngressGate[] = [
  { id: 'gate-n', name: 'GATE A (NORTH METRO PLAZA)', direction: 'NORTH', scansPerMinute: 240, totalIngressToday: 32400, status: 'MODERATE', queueWaitMinutes: 6 },
  { id: 'gate-s', name: 'GATE B (SOUTH SHUTTLE TERMINAL)', direction: 'SOUTH', scansPerMinute: 310, totalIngressToday: 28900, status: 'CONGESTED', queueWaitMinutes: 14 },
  { id: 'gate-e', name: 'GATE C (EAST CAMPING GROUNDS)', direction: 'EAST', scansPerMinute: 110, totalIngressToday: 14100, status: 'CLEAR', queueWaitMinutes: 2 },
  { id: 'gate-v', name: 'VIP & ARTIST DIAMOND GATE', direction: 'VIP', scansPerMinute: 45, totalIngressToday: 3970, status: 'CLEAR', queueWaitMinutes: 1 },
];

const INITIAL_ALERTS: FestivalAlert[] = [
  { id: 'a-1', timestamp: '21:14:02', severity: 'WARNING', zone: 'BASS_DOME', message: 'SPL Peak reached 104.8 dB (Threshold 105 dB). Front-of-House limiters engaged.', acknowledged: false },
  { id: 'a-2', timestamp: '21:10:45', severity: 'INFO', zone: 'MAIN_STAGE', message: 'Pyrotechnic flame cannons armed for headline drop at 21:30:00.', acknowledged: false },
  { id: 'a-3', timestamp: '21:05:12', severity: 'CRITICAL', zone: 'GATE B', message: 'Queue buffer surging past 12 minutes. Deploying turnstile rover team B-2.', acknowledged: false },
];

const LOCAL_STORAGE_KEY = 'livefestival_os_state_v1';

const FestivalContext = createContext<FestivalContextType | undefined>(undefined);

export function FestivalProvider({ children }: { children: React.ReactNode }) {
  const [stages, setStages] = useState<Record<StageZone, StageInfo>>(INITIAL_STAGES);
  const [gates, setGates] = useState<IngressGate[]>(INITIAL_GATES);
  const [alerts, setAlerts] = useState<FestivalAlert[]>(INITIAL_ALERTS);
  const [soundAlarmMuted, setSoundAlarmMuted] = useState<boolean>(false);
  const [festivalBpmClock, setFestivalBpmClock] = useState<number>(128);

  // Load persistence
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.stages) setStages(parsed.stages);
        if (parsed.alerts) setAlerts(parsed.alerts);
      }
    } catch {}
  }, []);

  // Save persistence
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ stages, alerts }));
    } catch {}
  }, [stages, alerts]);

  // Live Telemetry Loop (Decibels fluctuate slightly, crowd increments)
  useEffect(() => {
    const timer = setInterval(() => {
      setStages((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          const zone = k as StageZone;
          const delta = (Math.random() - 0.48) * 0.8;
          next[zone] = {
            ...next[zone],
            currentSPL: parseFloat((next[zone].currentSPL + delta).toFixed(1)),
          };
        });
        return next;
      });
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const updateStageCrowd = (zone: StageZone, delta: number) => {
    setStages((prev) => ({
      ...prev,
      [zone]: {
        ...prev[zone],
        currentCrowd: Math.max(0, Math.min(prev[zone].capacity, prev[zone].currentCrowd + delta)),
      },
    }));
  };

  const updateStageStatus = (zone: StageZone, status: StageInfo['status']) => {
    setStages((prev) => ({
      ...prev,
      [zone]: { ...prev[zone], status },
    }));
  };

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const toggleSoundAlarmMute = () => {
    setSoundAlarmMuted((prev) => !prev);
  };

  const totalAttendees = Object.values(stages).reduce((sum, s) => sum + s.currentCrowd, 0);

  return (
    <FestivalContext.Provider
      value={{
        stages,
        updateStageCrowd,
        updateStageStatus,
        gates,
        alerts,
        dismissAlert,
        totalAttendees,
        festivalBpmClock,
        soundAlarmMuted,
        toggleSoundAlarmMute,
      }}
    >
      {children}
    </FestivalContext.Provider>
  );
}

export function useFestival() {
  const context = useContext(FestivalContext);
  if (!context) throw new Error('useFestival must be used within a FestivalProvider');
  return context;
}
