// src/types/claimed-item.types.ts
export interface ClaimedItem {
  id: number;
  itemDescription: string;
  claimedBy: string;
  releasedBy: string;
  releasedDate: string;
  claimedContactInformation: string;
  filePath: string | null;
  createdAt: string;
  updatedAt: string;
  userId?: number;
}