import { create } from 'zustand'


interface Location {
  lat: number
  lng: number
}

export interface Threat {
  id: string;
  location: Location[]
  dangerLevel: string
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
  removeThreat: (threatId: string) => void
}

export const useThreats = create<Store>()((set) => ({
  threats: [],
  addThreat: (newThreat: Threat) => set((_state) => ({ threats: [..._state.threats, newThreat] })),
  removeThreat: (threatId: string) => set((_state) => ({ threats: _state.threats.filter(threat => threat?.id !== threatId) })),
}))

