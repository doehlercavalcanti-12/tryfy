import { create } from 'zustand';

export interface GameState {
  status: 'idle' | 'matching' | 'playing' | 'completed';
  lastMatchId?: string;
  setStatus: (status: GameState['status']) => void;
  setLastMatch: (matchId: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  status: 'idle',
  lastMatchId: undefined,
  setStatus: (status) => set({ status }),
  setLastMatch: (lastMatchId) => set({ lastMatchId })
}));
