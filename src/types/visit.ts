export type VisitStatus = "en_attente" | "confirmee" | "refusee" | "annulee" | "terminee";

export interface Visit {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyNeighborhood: string;
  date: string; // ISO date (YYYY-MM-DD)
  time: string; // HH:mm
  status: VisitStatus;
  createdAt: string;
}

export interface VisitSlot {
  date: string;
  time: string;
}
