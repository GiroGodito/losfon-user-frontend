// src/components/notifications/NotificationItem.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Notification } from '../../api/notifications';
import { formatDistanceToNow } from 'date-fns';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead?: (id: number) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Mark as read when clicked
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
    // Navigate to notification detail
    navigate(`/notifications/${notification.id}`);
  };

  const getTypeIcon = () => {
    switch (notification.type) {
      case 'ITEM_FOUND':
        return '🎉';
      case 'ITEM_CLAIMED':
        return '✅';
      case 'SYSTEM':
        return '📢';
      default:
        return '📬';
    }
  };

  const hasImage = !!notification.itemImage;

  return (
    <div
      className={`
        group p-4 border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer transition-all duration-200
        ${!notification.isRead ? 'bg-green-500/5 border-l-4 border-l-green-500' : ''}
      `}
      onClick={handleClick}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="text-2xl flex-shrink-0 mt-1">{getTypeIcon()}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-medium text-white text-sm">
              {notification.title}
            </h4>
            {!notification.isRead && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                New
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm mt-1 break-words leading-relaxed line-clamp-2">
            {notification.message}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-gray-500 text-xs">
              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
            </span>
            {notification.itemName && (
              <span className="text-gray-500 text-xs flex items-center gap-1">
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                {notification.itemName}
              </span>
            )}
          </div>
        </div>

        {/* Image - Professional with click indicator */}
        {hasImage ? (
          <div className="flex-shrink-0 relative group/image">
            <img
              src={notification.itemImage}
              alt={notification.itemName || 'Found item'}
              className="w-20 h-20 object-cover rounded-xl border border-gray-700 shadow-lg shadow-black/20 group-hover/image:shadow-xl group-hover/image:scale-105 transition-all duration-300"
              loading="lazy"
            />
            {/* Click overlay indicator */}
            <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        ) : (
          // Placeholder when no image
          <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-gray-800/50 border border-gray-700 flex items-center justify-center group-hover:bg-gray-700/50 transition-colors">
            <span className="text-3xl opacity-30">📷</span>
          </div>
        )}

        {/* Right arrow indicator - like Gmail */}
        <div className="flex-shrink-0 text-gray-600 group-hover:text-gray-400 transition-colors self-center">
          <ChevronRightIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;