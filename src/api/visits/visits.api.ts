import { apiClient } from "../../api/clients";
import { Visit, VisitSlot } from "../../types/visit";

/**
 * Couche API pure pour la réservation de visites (6.8). Pas encore branchée
 * sur un vrai back-end — voir les fallbacks mock dans les écrans concernés.
 */
export const visitsApi = {
  async requestVisit(propertyId: string, slot: VisitSlot): Promise<Visit> {
    const { data } = await apiClient.post<Visit>(`/properties/${propertyId}/visits`, slot);
    return data;
  },

  async getMyVisits(): Promise<Visit[]> {
    const { data } = await apiClient.get<Visit[]>("/visits/me");
    return data;
  },

  async cancelVisit(visitId: string): Promise<void> {
    await apiClient.delete(`/visits/${visitId}`);
  },
};
