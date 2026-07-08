// src/components/claimed-items/ClaimedItemList.tsx
import React from 'react';
import type { ClaimedItem } from '../../api/claimed-items';
import { ClaimedItemCard } from './ClaimedItemCard';
import { EmptyState } from '../common/EmptyState';
import { Spinner } from '../common/Spinner';
import { Pagination } from '../common/Pagination';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface ClaimedItemListProps {
  items: ClaimedItem[];
  isLoading: boolean;
  // ✅ NEW: Pagination props
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const ClaimedItemList: React.FC<ClaimedItemListProps> = ({
  items = [],
  isLoading,
  // ✅ NEW: Pagination props
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  const safeItems = Array.isArray(items) ? items : [];

  if (safeItems.length === 0) {
    return (
      <EmptyState
        title="No Claimed Items"
        description="You haven't claimed any items yet."
        icon={<CheckCircleIcon className="h-12 w-12 text-gray-500" />}
        actionLabel="View Lost Items"
        onAction={() => navigate('/my-lost-items')}
      />
    );
  }

  return (
    <div>
      {/* ✅ HEADER WITH PAGINATION AT TOP RIGHT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">
            Showing {safeItems.length} item{safeItems.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        {/* ✅ PAGINATION AT TOP RIGHT */}
        {totalPages > 1 && onPageChange && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>

      {/* Grid of items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {safeItems.map((item) => (
          <ClaimedItemCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default ClaimedItemList;