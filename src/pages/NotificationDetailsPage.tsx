// src/pages/NotificationDetailPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { notificationsApi } from '../api/notifications';
import type { Notification } from '../api/notifications';
import { Button } from '../components/common/Button';
import { Spinner } from '../components/common/Spinner';
import { useToast } from '../hooks/useToast';
import { 
  ArrowLeftIcon, 
  CalendarIcon, 
  UserIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { formatDateWithTime, formatRelativeTime } from '../lib/date';

export const NotificationDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotification = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      try {
        const data = await notificationsApi.getNotificationDetails(parseInt(id));
        setNotification(data);
        
        // Mark as read when viewed
        if (!data.isRead) {
          await notificationsApi.markAsRead(parseInt(id));
        }
      } catch (error: any) {
        setError(error.message || 'Failed to load notification');
        showToast(error.message || 'Failed to load notification', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotification();
  }, [id, showToast]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !notification) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
          <p className="text-red-400">{error || 'Notification not found'}</p>
          <Button
            variant="glass-grey"
            className="mt-4"
            onClick={() => navigate('/notifications')}
          >
            Back to Notifications
          </Button>
        </div>
      </div>
    );
  }

  const getTypeIcon = () => {
    switch (notification.type) {
      case 'ITEM_FOUND': return '🎉';
      case 'ITEM_CLAIMED': return '✅';
      case 'SYSTEM': return '📢';
      default: return '📬';
    }
  };

  const getTypeColor = () => {
    switch (notification.type) {
      case 'ITEM_FOUND': return 'border-green-500/50 bg-green-500/10';
      case 'ITEM_CLAIMED': return 'border-blue-500/50 bg-blue-500/10';
      case 'SYSTEM': return 'border-yellow-500/50 bg-yellow-500/10';
      default: return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  return (
    <div className="py-8 px-4">
      

      {/* Notification Card */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden shadow-2xl shadow-black/20">
        {/* Header with Type Badge */}
        
        <div className={`p-6 border-b border-gray-800 ${getTypeColor()}`}>
            {/* Back Button */}
      <Button
        variant="glass-grey"
        size="sm"
        onClick={() => navigate('/notifications')}
        className="mb-6 !px-3"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-1" />
        Back
      </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{getTypeIcon()}</span>
            <div>
              <h1 className="text-xl font-bold text-white">{notification.title}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-gray-500">
                  {formatDateWithTime(notification.createdAt)}
                </span>
                <span className="text-xs text-gray-600">•</span>
                <span className="text-xs text-gray-500">
                  {formatRelativeTime(notification.createdAt)}
                </span>
                {!notification.isRead && (
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">
                    Unread
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Message */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Message</h3>
            <p className="text-white text-base leading-relaxed">
              {notification.message}
            </p>
          </div>

          {/* Image - Large Display */}
          {notification.itemImage && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-3">Found Item</h3>
              <div className="rounded-xl overflow-hidden border border-gray-700 bg-gray-800/30">
                <img
                  src={notification.itemImage}
                  alt={notification.itemName || 'Found item'}
                  className="w-full max-h-96 object-contain"
                />
              </div>
            </div>
          )}

          {/* Details Grid - REMOVED "Type" row
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-800">
            {notification.itemName && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/50">
                <div className="w-8 h-8 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-400 flex-shrink-0">
                  <CheckCircleIcon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Item</p>
                  <p className="text-sm text-white font-medium truncate">{notification.itemName}</p>
                </div>
              </div>
            )}

            {notification.foundBy && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/50">
                <div className="w-8 h-8 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-400 flex-shrink-0">
                  <UserIcon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Found By</p>
                  <p className="text-sm text-white font-medium truncate">{notification.foundBy}</p>
                </div>
              </div>
            )}

            {notification.foundDate && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/50">
                <div className="w-8 h-8 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-400 flex-shrink-0">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Found Date</p>
                  <p className="text-sm text-white font-medium truncate flex-1">
                    {formatDateWithTime(notification.foundDate)}
                  </p>
                </div>
              </div>
            )}
          </div> */}

          {/* System Metadata */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500 bg-gray-800/20 rounded-lg border border-gray-700/50 px-4 py-2.5">
            <span>
              Sent <span className="text-gray-400">{formatRelativeTime(notification.createdAt)}</span>
            </span>
            <span className="text-gray-700">•</span>
            <span>
              Status <span className="text-gray-400">{notification.isRead ? 'Read' : 'Unread'}</span>
            </span>
            {notification.readAt && (
              <>
                <span className="text-gray-700">•</span>
                <span>
                  Read <span className="text-gray-400">{formatRelativeTime(notification.readAt)}</span>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetailsPage;