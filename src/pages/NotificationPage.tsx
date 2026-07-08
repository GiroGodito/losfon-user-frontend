// src/pages/NotificationPage.tsx
import { useNotifications } from '../hooks/useNotifications';
import { NotificationList } from '../components/notifications/NotificationList';
import { Button } from '../components/common/Button';
import { BellIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

export const NotificationPage = () => {
  const {
    notifications,
    unreadCount,
    isLoading,
    pagination,
    markAllAsRead,
    markAsRead,
    goToPage,
  } = useNotifications();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Notifications
            {unreadCount > 0 && (
              <span className="text-sm bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30">
                {unreadCount} unread
              </span>
            )}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Stay updated on your lost items and claims
          </p>
        </div>
        {unreadCount > 0 && (
          <Button 
            variant="glass-yellow" 
            size="sm"
            onClick={markAllAsRead}
            className="flex items-center gap-2"
          >
            <CheckBadgeIcon className="w-4 h-4" />
            Mark All as Read
          </Button>
        )}
      </div>

      {/* ✅ Pass pagination props to NotificationList */}
      <NotificationList
        notifications={notifications}
        isLoading={isLoading}
        onMarkAsRead={markAsRead}
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={goToPage}
      />
    </div>
  );
};

export default NotificationPage;