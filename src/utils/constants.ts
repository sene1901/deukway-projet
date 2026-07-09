import { HousingType } from "../types/property";

export const VILLES = [
  "Dakar",
  "Thiès",
  "Saint-Louis",
  "Mbour",
  "Ziguinchor",
  "Touba",
  "Rufisque",
  "Kaolack",
];

export const QUARTIERS_DAKAR = [
  "Plateau",
  "Almadies",
  "Mermoz",
  "Sacré-Cœur",
  "Ouakam",
  "Yoff",
  "Ngor",
  "Point E",
  "Liberté 6",
  "Parcelles Assainies",
  "Grand Yoff",
  "Fann",
];

export const HOUSING_TYPES: { key: HousingType; label: string }[] = [
  { key: "chambre", label: "Chambre" },
  { key: "studio", label: "Studio" },
  { key: "colocation", label: "Colocation" },
  { key: "appartement", label: "Appartement" },
];

export const QUICK_FILTERS = [
  { key: "meuble", label: "Meublé" },
  { key: "wifi", label: "Wifi" },
  { key: "parking", label: "Parking" },
  { key: "climatisation", label: "Climatisation" },
];

export const CURRENCY_SUFFIX = "FCFA";
