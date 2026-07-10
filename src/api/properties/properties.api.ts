import { apiClient } from "../../api/clients";
import { Property } from "../../types/property";
import {
  CreatePropertyPayload,
  UpdatePropertyPayload,
  PropertySearchParams,
} from "./properties.types";

/**
 * Couche API pure (7.1, 7.3). Pas de state ici — voir
 * src/store/ownerProperties.store.ts pour l'état "mes annonces" côté
 * propriétaire. Pas encore branchée sur un vrai back-end.
 */
export const propertiesApi = {
  async search(params: PropertySearchParams): Promise<Property[]> {
    const { data } = await apiClient.get<Property[]>("/properties", { params });
    return data;
  },

  async getById(id: string): Promise<Property> {
    const { data } = await apiClient.get<Property>(`/properties/${id}`);
    return data;
  },

  async getMyProperties(): Promise<Property[]> {
    const { data } = await apiClient.get<Property[]>("/properties/mine");
    return data;
  },

  async create(payload: CreatePropertyPayload): Promise<Property> {
    const { data } = await apiClient.post<Property>("/properties", payload);
    return data;
  },

  async update(id: string, payload: UpdatePropertyPayload): Promise<Property> {
    const { data } = await apiClient.patch<Property>(`/properties/${id}`, payload);
    return data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/properties/${id}`);
  },

  async uploadMedia(id: string, imageUri: string): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      name: `property-${id}-${Date.now()}.jpg`,
      type: "image/jpeg",
    } as any);
    const { data } = await apiClient.post<{ url: string }>(
      `/properties/${id}/media`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return data;
  },
};
