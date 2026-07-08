// src/api/lost-items.ts
import { api } from './client';

export interface LostItem {
  id: number;
  itemDescription: string;
  dateReported: string;
  reportedBy: string;
  contactNumber: string;
  isDone: boolean;
  isExpired: boolean;
  dateTransferred: string | null;
  isSeen: boolean;
  filePath: string | null;
  createdAt: string;
  updatedAt: string;
  userId?: number;
}

export interface CreateLostItemRequest {
  itemDescription: string;
  reportedBy?: string;
  contactNumber?: string;
  filePath?: string | null;
  userId?: number | null;
}

export interface LostItemsQueryParams {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}

// ✅ NEW: Match the backend response shape
export interface LostItemsResponse {
  success: boolean;
  data: {
    items: LostItem[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    dateFrom: string | null;
    dateTo: string | null;
    searchTerm: string | null;
    sortBy: string;
    sortDirection: string;
  };
}

// Keep this for other endpoints if needed
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

export const lostItemsApi = {
  // ✅ Use the correct response type
  getMyLostItems: (params: LostItemsQueryParams = {}): Promise<LostItemsResponse> => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', String(params.page));
    if (params.pageSize) queryParams.append('pageSize', String(params.pageSize));
    if (params.searchTerm) queryParams.append('searchTerm', params.searchTerm);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortDirection) queryParams.append('sortDirection', params.sortDirection);
    return api.get<LostItemsResponse>(`/user/UserLostItems?${queryParams.toString()}`);
  },

  reportLostItem: (data: CreateLostItemRequest): Promise<{ success: boolean; id: number; message: string }> =>
    api.post<{ success: boolean; id: number; message: string }>('/user/UserLostItems', data),

  getLostItemDetails: (id: number): Promise<{ success: boolean; data: LostItem }> =>
    api.get<{ success: boolean; data: LostItem }>(`/user/UserLostItems/${id}`),

  cancelReport: (id: number): Promise<{ success: boolean; message: string }> =>
    api.delete<{ success: boolean; message: string }>(`/user/UserLostItems/${id}`),

  // Add to lostItemsApi object
  getMyLostItemsCount: (): Promise<number> => {
    // Fetch first page with pageSize=1 just to get the totalCount
    return lostItemsApi.getMyLostItems({ page: 1, pageSize: 1 })
      .then(response => response.data.totalCount || 0)
      .catch(() => 0);
  },
};