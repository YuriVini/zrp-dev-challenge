import { create } from 'zustand'
import { Threat } from './useThreats';

export enum BATTLE_STATUS {
  FIGHTING = "fighting",
  FINISHED = "finished",
}

interface Battle {
  id: string
  hero: HomeApi.HeroesResponse;
  threat: Threat
  status: BATTLE_STATUS
}

interface Store {
  battles: Battle[]
  addBattle: (newBattle: Battle) => void
  endBattle: (battleId: string) => void
}

export const useBattles = create<Store>()((set) => ({
  battles: [],
  addBattle: (newBattle: Battle) => set((_state) => ({ battles: [..._state.battles, newBattle] })),
  endBattle: (battleId: string) => set((_state) => ({ battles: _state.battles.map(battle => battle?.id === battleId ? { ...battle, status: BATTLE_STATUS.FINISHED } : battle) })),
}))

