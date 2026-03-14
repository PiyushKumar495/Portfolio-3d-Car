import { create } from 'zustand'

interface GameState {
  currentSection: string | null
  setCurrentSection: (section: string) => void
  clearSection: () => void
  showUI: boolean
  setShowUI: (show: boolean) => void
  collectibles: { coins: number; stars: number }
  addCollectible: (type: 'coins' | 'stars') => void
  vehicleData: { speed: number; position: { x: number; z: number }; boostActive: boolean; boostCooldown: number }
  setVehicleData: (data: Partial<GameState['vehicleData']>) => void
  goals: { blue: number; red: number }
  addGoal: (team: 'blue' | 'red') => void
}

export const useGameStore = create<GameState>((set) => ({
  currentSection: null,
  setCurrentSection: (section) => set({ currentSection: section }),
  clearSection: () => set({ currentSection: null }),
  showUI: true,
  setShowUI: (show) => set({ showUI: show }),
  collectibles: { coins: 0, stars: 0 },
  addCollectible: (type) => set((state) => ({
    collectibles: { ...state.collectibles, [type]: state.collectibles[type] + 1 }
  })),
  vehicleData: { speed: 0, position: { x: 0, z: 0 }, boostActive: false, boostCooldown: 100 },
  setVehicleData: (data) => set((state) => ({
    vehicleData: { ...state.vehicleData, ...data }
  })),
  goals: { blue: 0, red: 0 },
  addGoal: (team) => set((state) => ({
    goals: { ...state.goals, [team]: state.goals[team] + 1 }
  }))
}))
