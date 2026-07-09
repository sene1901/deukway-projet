import { create } from "zustand";
import { Property } from "../types/property";

interface FavoritesState {
  items: Record<string, Property>;
  toggleFavorite: (property: Property) => void;
  isFavorite: (id: string) => boolean;
  list: () => Property[];
}

/**
 * Stockage en mémoire pour le MVP front-end. À remplacer par un appel à
 * src/api/favorites/favorites.api.ts (persistant côté back-end) +
 * éventuellement un cache local (SecureStore) pour le mode hors-ligne.
 */
export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  items: {},
  toggleFavorite: (property) =>
    set((state) => {
      const next = { ...state.items };
      if (next[property.id]) {
        delete next[property.id];
      } else {
        next[property.id] = property;
      }
      return { items: next };
    }),
  isFavorite: (id) => Boolean(get().items[id]),
  list: () => Object.values(get().items).sort((a, b) => (a.title > b.title ? 1 : -1)),
}));
