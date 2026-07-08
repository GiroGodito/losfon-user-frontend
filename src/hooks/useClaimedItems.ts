// src/hooks/useClaimedItems.ts
import { useState, useEffect, useCallback } from 'react';
import { claimedItemsApi } from '../api/claimed-items';
import type { ClaimedItem } from '../api/claimed-items';
import { useToast } from './useToast';
import { eventStore } from '../store/eventStore'; // ✅ ADD THIS

export const useClaimedItems = (initialPage = 1, initialPageSize = 3) => {
  const [items, setItems] = useState<ClaimedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: initialPage,
    pageSize: initialPageSize,
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const { showToast } = useToast();

  const fetchItems = useCallback(async (page: number = pagination.page) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await claimedItemsApi.getMyClaimedItems(page, pagination.pageSize);
      if (response.success) {
        setItems(response.data);
        setPagination(response.pagination);
      } else {
        setError('Failed to load claimed items');
      }
    } catch (error: any) {
      const message = error.message || 'Failed to load claimed items';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.pageSize]);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchItems(page);
    }
  }, [fetchItems, pagination.totalPages]);

  const changePageSize = useCallback((pageSize: number) => {
    setPagination(prev => ({ ...prev, pageSize, page: 1 }));
    fetchItems(1);
  }, [fetchItems]);

  // ✅ Subscribe to events
  useEffect(() => {
    fetchItems();
    
    // Refresh claimed items when something is claimed
    const unsubscribeClaimed = eventStore.subscribe('itemClaimed', (data) => {
      console.log('🔄 Refreshing claimed items');
      setTimeout(() => fetchItems(), 500);
    });
    
    return () => {
      unsubscribeClaimed();
    };
  }, [fetchItems]);

  return {
    items,
    isLoading,
    error,
    pagination,
    fetchItems,
    goToPage,
    changePageSize,
  };
};