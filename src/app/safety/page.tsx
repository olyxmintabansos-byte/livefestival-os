'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Volume2,
  Wind,
  HeartPulse,
  AlertOctagon,
  ShieldAlert,
  CheckCircle2,
  Radio,
  Sparkles,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useFestival } from '@/context/FestivalContext';

interface SensorZone {
  id: string;
  name: string;
  splCurrent: number;
  splLimit: number;
  windSpeedKmh: number;
  temperatureC: number;
  status: 'SAFE' | 'WARNING' | 'BREACH';
}

const PERIMETER_SENSORS: SensorZone[] = [
  { id: 's-1', name: 'NORTH PERIMETER (RESIDENTIAL BUFFER)', splCurrent: 64.2, splLimit: 68.0, windSpeedKmh: 14, temperatureC: 21.5, status: 'SAFE' },
  { id: 's-2', name: 'EAST CAMPING SECTOR 4', splCurrent: 69.1, splLimit: 70.0, windSpeedKmh: 18, temperatureC: 20.8, status: 'WARNING' },
  { id: 's-3', name: 'SOUTH HIGHWAY CORRIDOR', splCurrent: 71.4, splLimit: 75.0, windSpeedKmh: 12, temperatureC: 22.0, status: 'SAFE' },
  { id: 's-4', name: 'WEST RIVERBANK ECOLOGICAL PARK', splCurrent: 58.7, splLimit: 65.0, windSpeedKmh: 16, temperatureC: 19.5, status: 'SAFE' },
];

export default function SafetySensorGridPage() {
  const { stages, totalAttendees } = useFestival();
  const [sensors, setSensors] = useState<SensorZone[]>(PERIMETER_SENSORS);
  const [medicalTriageQueue, setMedicalTriageQueue] = useState<number>(4);
  const [waterStationsOnline, setWaterStationsOnline] = useState<number>(18);
  const [incidentDispatched, setIncidentDispatched] = useState<boolean>(false);

  const dispatchMedicRover = () => {
    setIncidentDispatched(true);
    setMedicalTriageQueue((prev) => Math.max(0, prev - 1));
    setTimeout(() => setIncidentDispatched(false), 3500);
  };

  return (
    <div className="min-h-screen bg-[#0b0a10] text-white pb-20 font-mono">
      {/* Banner */}
      <div className="bg-[#12101b] border-b-4 border-[#ff007f] px-4 py-8 relative overflow-hidden">
        <div className="hazard-stripe-lime h-2 w-full absolute top-0 left-0" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
          <div>
            <div className="inline-block bg-[#ff4d00] text-black font-black text-xs px-2.5 py-0.5 uppercase tracking-widest maximal-badge mb-2">
              ● ENVIRONMENTAL & MEDICAL SAFETY COMMAND
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tight text-white flex items-center gap-3">
              SPL NOISE & <span className="text-[#d4ff00]">EMERGENCY GRID</span>
            </h1>
            <p className="text-sm text-zinc-300 mt-1 font-bold">
              Perimeter noise ordinance compliance (ISO 1996), stage roof wind load telemetry, medical triage dispatch, and free hydration stations.
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

      {incidentDispatched && (
        <div className="bg-[#d4ff00] text-black font-black text-xs py-2 px-4 text-center sticky top-20 z-40 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-black" />
          <span>PARAMEDIC ROVER UNIT 03 DISPATCHED TO SUB-ATOMIC BASS DOME</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Environmental Safety KPI Deck */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#121018] border-2 border-white p-4 shadow-[4px_4px_0px_#d4ff00]">
            <span className="text-[10px] text-zinc-400 font-bold uppercase block">PEAK WIND GUST</span>
            <strong className="text-2xl font-black text-[#d4ff00] block mt-1">18 KM/H</strong>
            <span className="text-xs text-emerald-400">Truss limit: 65 km/h (SAFE)</span>
          </div>

          <div className="bg-[#121018] border-2 border-white p-4 shadow-[4px_4px_0px_#ff007f]">
            <span className="text-[10px] text-zinc-400 font-bold uppercase block">MEDICAL TRIAGE WAIT</span>
            <strong className="text-2xl font-black text-[#ff007f] block mt-1">
              {medicalTriageQueue} PATIENTS
            </strong>
            <span className="text-xs text-zinc-400">Minor blisters / hydration</span>
          </div>

          <div className="bg-[#121018] border-2 border-white p-4 shadow-[4px_4px_0px_#ff4d00]">
            <span className="text-[10px] text-zinc-400 font-bold uppercase block">FREE WATER POINTS</span>
            <strong className="text-2xl font-black text-white block mt-1">
              {waterStationsOnline} / 18 ONLINE
            </strong>
            <span className="text-xs text-emerald-400">Pressure: 4.2 Bar normal</span>
          </div>

          <div className="bg-[#121018] border-2 border-white p-4 shadow-[4px_4px_0px_#7000ff]">
            <span className="text-[10px] text-zinc-400 font-bold uppercase block">CITY NOISE COMPLIANCE</span>
            <strong className="text-2xl font-black text-emerald-400 block mt-1">98.2%</strong>
            <span className="text-xs text-zinc-400">Strict 70 dBA boundary limit</span>
          </div>
        </div>

        {/* Perimeter Noise Ordinance Sensors */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2 border-b-2 border-zinc-800 pb-2">
            <Volume2 className="w-5 h-5 text-[#d4ff00]" />
            <span>PERIMETER BOUNDARY DENSITOMETER & DECIBEL SENSORS (A-WEIGHTED)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sensors.map((sensor) => (
              <div
                key={sensor.id}
                className="bg-[#14121d] border-2 border-white p-5 flex flex-col justify-between shadow-[5px_5px_0px_#000]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-2">
                    <span className="text-sm font-black text-white">{sensor.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 font-black uppercase ${
                        sensor.status === 'SAFE'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500'
                          : sensor.status === 'WARNING'
                          ? 'bg-amber-950 text-amber-400 border border-amber-500'
                          : 'bg-[#ff007f] text-black font-black'
                      }`}
                    >
                      {sensor.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center my-4">
                    <div className="bg-black p-2 border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 block">CURRENT NOISE</span>
                      <strong className={`text-xl font-black ${sensor.splCurrent >= sensor.splLimit ? 'text-[#ff007f]' : 'text-white'}`}>
                        {sensor.splCurrent} <span className="text-[10px] font-normal">dBA</span>
                      </strong>
                    </div>

                    <div className="bg-black p-2 border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 block">CITY CEILING</span>
                      <strong className="text-xl font-black text-[#d4ff00]">
                        {sensor.splLimit} <span className="text-[10px] font-normal">dBA</span>
                      </strong>
                    </div>

                    <div className="bg-black p-2 border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 block">WIND GUST</span>
                      <strong className="text-xl font-black text-white">
                        {sensor.windSpeedKmh} <span className="text-[10px] font-normal">km/h</span>
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-zinc-400 flex items-center justify-between border-t border-zinc-800 pt-3">
                  <span>Sensor ID: {sensor.id.toUpperCase()} • Micro-Weather Barometer</span>
                  <span className="text-emerald-400 font-bold">{sensor.temperatureC}°C Ambient</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Dispatch Station */}
        <div className="maximal-card p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-zinc-800 pb-4 mb-5">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#ff4d00] font-bold flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-[#ff4d00]" />
                <span>FIRST RESPONDER & MEDICAL TRIAGE ROVER SYSTEM</span>
              </span>
              <p className="text-xs text-zinc-300 mt-1">
                4 Field Hospital Tents equipped with AED defibrillators, oxygen therapy, and fast-response paramedic golf rovers.
              </p>
            </div>

            <button
              onClick={dispatchMedicRover}
              className="px-5 py-2.5 bg-[#ff4d00] hover:bg-[#e04300] text-black font-black uppercase text-xs border-2 border-white shadow-[4px_4px_0px_#000] cursor-pointer"
            >
              DISPATCH EMERGENCY ROVER UNIT
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-black p-4 border border-zinc-800">
              <span className="text-zinc-500 font-bold uppercase block">HOSPITAL TENT ALPHA</span>
              <strong className="text-base text-white font-bold block mt-1">MAIN FIELD SECTOR 2</strong>
              <span className="text-emerald-400 text-[10px]">2 Doctors, 6 Registered Nurses on duty</span>
            </div>

            <div className="bg-black p-4 border border-zinc-800">
              <span className="text-zinc-500 font-bold uppercase block">HOSPITAL TENT BETA</span>
              <strong className="text-base text-[#d4ff00] font-bold block mt-1">BASS DOME PERIMETER</strong>
              <span className="text-emerald-400 text-[10px]">Ear protection distribution & chill pod</span>
            </div>

            <div className="bg-black p-4 border border-zinc-800">
              <span className="text-zinc-500 font-bold uppercase block">AMBULANCE CORRIDOR</span>
              <strong className="text-base text-[#d4ff00] font-bold block mt-1">GATE D EMERGENCY RUNWAY</strong>
              <span className="text-zinc-400 text-[10px]">3 Paramedic rigs standing by with direct hospital link</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
