// src/components/notifications/NotificationList.tsx
import React from 'react';
import type { Notification } from '../../api/notifications';
import { NotificationItem } from './NotificationItem';
import { EmptyState } from '../common/EmptyState';
import { Spinner } from '../common/Spinner';
import { Pagination } from '../common/Pagination';
import { BellSlashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface NotificationListProps {
  notifications: Notification[];
  isLoading: boolean;
  onMarkAsRead?: (id: number) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications = [],
  isLoading,
  onMarkAsRead,
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

  const safeNotifications = Array.isArray(notifications) ? notifications : [];

  if (safeNotifications.length === 0) {
    return (
      <EmptyState
        title="No Notifications"
        description="You're all caught up! Check back later for updates."
        icon={<BellSlashIcon className="h-12 w-12 text-gray-500" />}
        actionLabel="Go to Dashboard"
        onAction={() => navigate('/dashboard')}
      />
    );
  }

  return (
    <div>
      {/* Header with pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">
            Showing {safeNotifications.length} notification{safeNotifications.length !== 1 ? 's' : ''}
          </span>
          {totalPages > 1 && (
            <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-0.5 rounded-full">
              Page {currentPage} of {totalPages}
            </span>
          )}
        </div>
        
        {totalPages > 1 && onPageChange && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>

      {/* Notification Cards */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden shadow-xl shadow-black/10">
        {safeNotifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationList;