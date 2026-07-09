import { PropertySummary } from "../types/property";

/**
 * Données factices — à retirer dès que src/api/properties/properties.api.ts
 * est branché sur le back-end NestJS. Sert uniquement à développer l'UI.
 */
export const MOCK_PROPERTIES: PropertySummary[] = [
  {
    id: "1",
    title: "Studio meublé proche mer",
    city: "Dakar",
    neighborhood: "Ngor",
    price: 120000,
    type: "studio",
    rooms: 1,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    ],
    isVerified: true,
  },
  {
    id: "2",
    title: "Chambre dans colocation calme",
    city: "Dakar",
    neighborhood: "Mermoz",
    price: 65000,
    type: "chambre",
    rooms: 1,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ],
    isVerified: false,
  },
  {
    id: "3",
    title: "Appartement 3 pièces climatisé",
    city: "Dakar",
    neighborhood: "Sacré-Cœur",
    price: 350000,
    type: "appartement",
    rooms: 3,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    isVerified: true,
  },
  {
    id: "4",
    title: "Colocation étudiante Point E",
    city: "Dakar",
    neighborhood: "Point E",
    price: 55000,
    type: "colocation",
    rooms: 1,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
    ],
    isVerified: true,
  },
  {
    id: "5",
    title: "Studio moderne Almadies",
    city: "Dakar",
    neighborhood: "Almadies",
    price: 180000,
    type: "studio",
    rooms: 1,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
    ],
    isVerified: false,
  },
];
