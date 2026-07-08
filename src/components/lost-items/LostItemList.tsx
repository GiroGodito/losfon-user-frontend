// src/components/lost-items/LostItemList.tsx
import React, { useState } from 'react';
import type { LostItem } from '../../api/lost-items';
import { LostItemCard } from './LostItemCard';
import { LostItemFilters } from './LostItemFilters';
import { EmptyState } from '../common/EmptyState';
import { Spinner } from '../common/Spinner';
import { Pagination } from '../common/Pagination';
import type { LostItemsQueryParams } from '../../api/lost-items';
import { useNavigate } from 'react-router-dom';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

interface LostItemListProps {
  items: LostItem[];
  isLoading: boolean;
  onCancel?: (id: number) => void;
  onFilter?: (filters: LostItemsQueryParams) => void;
  showFilters?: boolean;
  // ✅ NEW: Pagination props
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const LostItemList: React.FC<LostItemListProps> = ({
  items = [],
  isLoading,
  onCancel,
  onFilter,
  showFilters = false,
  // ✅ NEW: Pagination props
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  const navigate = useNavigate();
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  const handleFilter = async (filters: LostItemsQueryParams) => {
    if (onFilter) {
      setIsFilterLoading(true);
      await onFilter(filters);
      setIsFilterLoading(false);
    }
  };

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
        title="No Lost Items"
        description="You haven't reported any lost items yet."
        icon={<ClipboardDocumentListIcon className="h-12 w-12 text-gray-500" />}
        actionLabel="Report an Item"
        onAction={() => navigate('/report')}
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
          {/* {totalPages > 1 && (
            <span className="text-xs text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
          )} */}
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

      {/* Filters (optional) */}
      {showFilters && onFilter && (
        <LostItemFilters
          onFilter={handleFilter}
          isLoading={isFilterLoading}
        />
      )}

      {/* Grid of items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {safeItems.map((item) => (
          <LostItemCard
            key={item.id}
            item={item}
            onCancel={onCancel}
          />
        ))}
      </div>
    </div>
  );
};

export default LostItemList;