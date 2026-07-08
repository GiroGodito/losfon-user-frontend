// src/api/claimed-items.ts
import { api } from './client';

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

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export const claimedItemsApi = {
  getMyClaimedItems: (page = 1, pageSize = 10): Promise<PaginatedResponse<ClaimedItem>> =>
    api.get<PaginatedResponse<ClaimedItem>>(`/user/UserClaimedItems?page=${page}&pageSize=${pageSize}`),

  getClaimedItemDetails: (id: number): Promise<{ success: boolean; data: ClaimedItem }> =>
    api.get<{ success: boolean; data: ClaimedItem }>(`/user/UserClaimedItems/${id}`),

  // Add to claimedItemsApi object
  getMyClaimedItemsCount: (): Promise<number> => {
    return claimedItemsApi.getMyClaimedItems(1, 1)
      .then(response => response.pagination?.totalCount || 0)
      .catch(() => 0);
  },
};