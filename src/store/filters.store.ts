import { create } from "zustand";
import { HousingType } from "../types/property";

export interface SearchFilters {
  city: string | null;
  neighborhood: string | null;
  type: HousingType | null;
  priceMin: number | null;
  priceMax: number | null;
  meuble: boolean;
  eauIncluse: boolean;
  electriciteIncluse: boolean;
  wifi: boolean;
  parking: boolean;
  climatisation: boolean;
  animauxAcceptes: boolean;
}

export const DEFAULT_FILTERS: SearchFilters = {
  city: null,
  neighborhood: null,
  type: null,
  priceMin: null,
  priceMax: null,
  meuble: false,
  eauIncluse: false,
  electriciteIncluse: false,
  wifi: false,
  parking: false,
  climatisation: false,
  animauxAcceptes: false,
};

interface FiltersState {
  filters: SearchFilters;
  query: string;
  setQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  activeFilterCount: () => number;
}

const BOOLEAN_KEYS: (keyof SearchFilters)[] = [
  "meuble",
  "eauIncluse",
  "electriciteIncluse",
  "wifi",
  "parking",
  "climatisation",
  "animauxAcceptes",
];

export const useFiltersStore = create<FiltersState>((set, get) => ({
  filters: DEFAULT_FILTERS,
  query: "",
  setQuery: (query) => set({ query }),
  setFilters: (partial) =>
    set((state) => ({ filters: { ...state.filters, ...partial } })),
  resetFilters: () => set({ filters: DEFAULT_FILTERS }),
  activeFilterCount: () => {
    const f = get().filters;
    let count = 0;
    if (f.type) count += 1;
    if (f.priceMin !== null) count += 1;
    if (f.priceMax !== null) count += 1;
    BOOLEAN_KEYS.forEach((key) => {
      if (f[key]) count += 1;
    });
    return count;
  },
}));
