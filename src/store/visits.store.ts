import { create } from "zustand";
import { Visit } from "../types/visit";

interface VisitsState {
  visits: Visit[];
  addVisit: (visit: Visit) => void;
  cancelVisit: (id: string) => void;
}

/**
 * Stockage en mémoire pour le MVP front-end (comme favorites.store.ts).
 * À remplacer par src/api/visits/visits.api.ts + react-query une fois le
 * back-end NestJS branché.
 */
export const useVisitsStore = create<VisitsState>((set) => ({
  visits: [],
  addVisit: (visit) => set((state) => ({ visits: [visit, ...state.visits] })),
  cancelVisit: (id) =>
    set((state) => ({
      visits: state.visits.map((v) =>
        v.id === id ? { ...v, status: "annulee" as const } : v
      ),
    })),
}));
