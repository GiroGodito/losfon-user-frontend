// src/hooks/useLostItems.ts
import { useState, useEffect, useCallback } from 'react';
import { lostItemsApi } from '../api/lost-items';
import type { LostItem, LostItemsQueryParams } from '../api/lost-items';
import { useToast } from './useToast';
import { useRateLimiter } from './useRateLimiter';
import { eventStore } from '../store/eventStore';

const DEFAULT_PAGINATION = {
  page: 1,
  pageSize: 3,
  totalCount: 0,
  totalPages: 0,
  hasPreviousPage: false,
  hasNextPage: false,
};

export const useLostItems = (initialParams: LostItemsQueryParams = {}) => {
  const [items, setItems] = useState<LostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [params, setParams] = useState<LostItemsQueryParams>({
    page: 1,
    pageSize: 3,
    ...initialParams,
  });
  const { showToast } = useToast();
  const { isRateLimited, countdown, handleRateLimit, resetRateLimit } = useRateLimiter();

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('📡 Fetching lost items with params:', params);
      const response = await lostItemsApi.getMyLostItems(params);
      console.log('📥 Lost items response:', response);
      
      if (response && response.success) {
        const backendData = response.data;
        setItems(Array.isArray(backendData?.items) ? backendData.items : []);
        setPagination({
          page: backendData?.page || 1,
          pageSize: backendData?.pageSize || 10,
          totalCount: backendData?.totalCount || 0,
          totalPages: backendData?.totalPages || 0,
          hasPreviousPage: backendData?.hasPreviousPage || false,
          hasNextPage: backendData?.hasNextPage || false,
        });
      } else {
        setError('Failed to load lost items');
        setItems([]);
        setPagination(DEFAULT_PAGINATION);
      }
    } catch (error: any) {
      console.error('❌ Fetch lost items error:', error);
      setError(error.message || 'Failed to load lost items');
      setItems([]);
      setPagination(DEFAULT_PAGINATION);
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  const reportLostItem = useCallback(async (data: { itemDescription: string; filePath?: string | null }) => {
    try {
      // ✅ Check rate limit before making request
      if (isRateLimited) {
        const msg = `Too many reports. Please wait ${countdown} seconds.`;
        showToast(msg, 'error');
        throw new Error(msg);
      }

      const response = await lostItemsApi.reportLostItem(data);
      if (response.success) {
        showToast(response.message || 'Item reported successfully', 'success');
        resetRateLimit();
        await fetchItems();
        return response;
      } else {
        showToast(response.message || 'Failed to report item', 'error');
        throw new Error(response.message || 'Failed to report item');
      }
    } catch (error: any) {
      // ✅ Handle rate limit error
      const isRateLimit = handleRateLimit(error, 'reporting items');
      if (isRateLimit) {
        throw new Error(`Rate limited. Please wait.`);
      }
      
      const message = error.message || 'Failed to report item';
      showToast(message, 'error');
      throw error;
    }
  }, [fetchItems, showToast, handleRateLimit, isRateLimited, countdown, resetRateLimit]);

  const cancelReport = useCallback(async (id: number) => {
    try {
      const response = await lostItemsApi.cancelReport(id);
      if (response.success) {
        showToast(response.message || 'Report cancelled successfully', 'success');
        await fetchItems();
        return response;
      } else {
        showToast(response.message || 'Failed to cancel report', 'error');
        throw new Error(response.message || 'Failed to cancel report');
      }
    } catch (error: any) {
      const message = error.message || 'Failed to cancel report';
      showToast(message, 'error');
      throw error;
    }
  }, [fetchItems, showToast]);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setParams(prev => ({ ...prev, page }));
    }
  }, [pagination.totalPages]);

  const changePageSize = useCallback((pageSize: number) => {
    setParams(prev => ({ ...prev, pageSize, page: 1 }));
  }, []);

  const search = useCallback((searchTerm: string) => {
    setParams(prev => ({ ...prev, searchTerm, page: 1 }));
  }, []);

  const sort = useCallback((sortBy: string, sortDirection?: 'ASC' | 'DESC') => {
    setParams(prev => ({ ...prev, sortBy, sortDirection, page: 1 }));
  }, []);

  useEffect(() => {
    fetchItems();
    
    const unsubscribeItemFound = eventStore.subscribe('itemFound', (data) => {
      console.log('🔄 Refreshing lost items due to item found notification');
      setTimeout(() => fetchItems(), 500);
    });

    const unsubscribeNewItem = eventStore.subscribe('newLostItem', (data) => {
      console.log('🔄 Refreshing lost items due to new item report');
      setTimeout(() => fetchItems(), 500);
    });

    const unsubscribeItemsUpdated = eventStore.subscribe('itemsUpdated', (data) => {
      console.log('🔄 Refreshing lost items due to itemsUpdated event');
      setTimeout(() => fetchItems(), 500);
    });
    
    const pollInterval = setInterval(() => {
      console.log('🔄 Polling lost items (fallback)');
      fetchItems();
    }, 30000);
    
    return () => {
      unsubscribeItemFound();
      unsubscribeNewItem();
      unsubscribeItemsUpdated();
      clearInterval(pollInterval);
    };
  }, [fetchItems]);

  return {
    items,
    isLoading,
    error,
    pagination,
    params,
    fetchItems,
    reportLostItem,
    cancelReport,
    goToPage,
    changePageSize,
    search,
    sort,
    isRateLimited,
    countdown,
  };
};