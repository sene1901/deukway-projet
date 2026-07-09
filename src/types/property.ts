export type HousingType = "chambre" | "studio" | "colocation" | "appartement";

export interface PropertyAmenities {
  meuble: boolean;
  eauIncluse: boolean;
  electriciteIncluse: boolean;
  wifi: boolean;
  parking: boolean;
  climatisation: boolean;
  animauxAcceptes: boolean;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  city: string;
  neighborhood: string;
  price: number; // en FCFA / mois
  type: HousingType;
  rooms: number;
  surface: number; // m²
  images: string[];
  latitude: number;
  longitude: number;
  isVerified: boolean;
  isAvailable: boolean;
  amenities: PropertyAmenities;
  ownerId: string;
  createdAt: string;
}

export interface PropertySummary
  extends Pick<
    Property,
    | "id"
    | "title"
    | "city"
    | "neighborhood"
    | "price"
    | "type"
    | "rooms"
    | "images"
    | "isVerified"
  > {}
