import { create } from "zustand";
import { Property } from "../types/property";
import { MOCK_PROPERTIES } from "../utils/mockData";

export type OwnerPropertyStatus = "active" | "suspendue";

export interface OwnerProperty extends Property {
  status: OwnerPropertyStatus;
}

interface OwnerPropertiesState {
  properties: OwnerProperty[];
  addProperty: (property: Property) => void;
  updateProperty: (id: string, patch: Partial<Property>) => void;
  removeProperty: (id: string) => void;
  toggleSuspend: (id: string) => void;
  renew: (id: string) => void;
}

/**
 * Stockage en mémoire pour le MVP front-end. On préremplit avec l'annonce
 * "owner-1" des mock data pour pouvoir démontrer modifier/suspendre/
 * supprimer sans back-end. À remplacer par
 * src/api/properties/properties.api.ts (getMyProperties/create/update/delete)
 * + react-query une fois le back-end NestJS branché.
 */
export const useOwnerPropertiesStore = create<OwnerPropertiesState>((set) => ({
  properties: MOCK_PROPERTIES.filter((p) => p.ownerId === "owner-1").map((p) => ({
    ...p,
    status: "active" as const,
  })),

  addProperty: (property) =>
    set((state) => ({
      properties: [{ ...property, status: "active" }, ...state.properties],
    })),

  updateProperty: (id, patch) =>
    set((state) => ({
      properties: state.properties.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    })),

  removeProperty: (id) =>
    set((state) => ({ properties: state.properties.filter((p) => p.id !== id) })),

  toggleSuspend: (id) =>
    set((state) => ({
      properties: state.properties.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "active" ? "suspendue" : "active" }
          : p
      ),
    })),

  renew: (id) =>
    set((state) => ({
      properties: state.properties.map((p) =>
        p.id === id ? { ...p, status: "active", createdAt: new Date().toISOString() } : p
      ),
    })),
}));
 