import { create } from 'zustand'

type DangerLevel = "God" | "Dragon" | "Tiger" | "Wolf"

interface Threat {
  id: string;
  location: [{
    lat: number
    lng: number
  }]
  dangerLevel: DangerLevel
  monsterName: string
  monster: {
    name: string
    description: string
    url: string
  }
}

interface Store {
  threats: Threat[];
  addThreat: (newThreat: Threat) => void
}

export const useThreats = create<Store>()((set) => ({
  threats: [],
  addThreat: (newThreat: Threat) => set((_state) => ({ threats: [..._state.threats, newThreat] })),
}))

