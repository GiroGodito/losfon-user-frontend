// src/components/lost-items/LostItemFilters.tsx
import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import type { LostItemsQueryParams } from '../../api/lost-items';

interface LostItemFiltersProps {
  onFilter: (filters: LostItemsQueryParams) => void;
  initialFilters?: LostItemsQueryParams;
  isLoading?: boolean;
}

export const LostItemFilters: React.FC<LostItemFiltersProps> = ({
  onFilter,
  initialFilters = {},
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm || '');
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || 'DateReported');
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>(
    initialFilters.sortDirection || 'DESC'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      searchTerm: searchTerm || undefined,
      sortBy,
      sortDirection,
      page: 1,
    });
  };

  const handleReset = () => {
    setSearchTerm('');
    setSortBy('DateReported');
    setSortDirection('DESC');
    onFilter({
      page: 1,
      pageSize: 10,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-4 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              type="text"
              placeholder="Search by description or reporter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { value: 'DateReported', label: 'Date Reported' },
                { value: 'ItemDescription', label: 'Description' },
                { value: 'ReportedBy', label: 'Reported By' },
              ]}
              className="w-full"
            />
          </div>

          <div>
            <Select
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value as 'ASC' | 'DESC')}
              options={[
                { value: 'DESC', label: 'Newest First' },
                { value: 'ASC', label: 'Oldest First' },
              ]}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleReset}
            disabled={isLoading}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={isLoading}
          >
            Apply Filters
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LostItemFilters;