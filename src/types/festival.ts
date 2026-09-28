export type StageZone = 'MAIN_STAGE' | 'ELECTRIC_FOREST' | 'BASS_DOME' | 'SANCTUARY';

export interface StageInfo {
  id: StageZone;
  name: string;
  genre: string;
  colorHex: string;
  currentArtist: string;
  nextArtist: string;
  currentSPL: number;
  maxAllowedSPL: number;
  capacity: number;
  currentCrowd: number;
  status: 'LIVE' | 'CHANGE_OVER' | 'SOUNDCHECK' | 'STANDBY';
  pyroEnabled: boolean;
}

export interface IngressGate {
  id: string;
  name: string;
  direction: 'NORTH' | 'SOUTH' | 'EAST' | 'VIP';
  scansPerMinute: number;
  totalIngressToday: number;
  status: 'CLEAR' | 'MODERATE' | 'CONGESTED';
  queueWaitMinutes: number;
}

export interface FestivalAlert {
  id: string;
  timestamp: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  zone: string;
  message: string;
  acknowledged: boolean;
}

export interface FestivalContextType {
  stages: Record<StageZone, StageInfo>;
  updateStageCrowd: (zone: StageZone, delta: number) => void;
  updateStageStatus: (zone: StageZone, status: StageInfo['status']) => void;
  gates: IngressGate[];
  alerts: FestivalAlert[];
  dismissAlert: (id: string) => void;
  totalAttendees: number;
  festivalBpmClock: number;
  soundAlarmMuted: boolean;
  toggleSoundAlarmMute: () => void;
}