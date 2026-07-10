  import { HousingType, PropertyAmenities } from "../../types/property";

export interface CreatePropertyPayload {
  title: string;
  description: string;
  city: string;
  neighborhood: string;
  price: number;
  type: HousingType;
  rooms: number;
  surface: number;
  amenities: PropertyAmenities;
}

export interface UpdatePropertyPayload extends Partial<CreatePropertyPayload> {
  isAvailable?: boolean;
}

export interface PropertySearchParams {
  city?: string;
  neighborhood?: string;
  type?: HousingType;
  priceMin?: number;
  priceMax?: number;
  rooms?: number;
}
