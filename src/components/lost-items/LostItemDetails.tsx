// src/components/lost-items/LostItemDetails.tsx
import React from 'react';
import type { LostItem } from '../../api/lost-items';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { formatDateWithTime, formatRelativeTime } from '../../lib/date';
import {
  CalendarIcon,
  UserIcon,
  PhoneIcon,
  ClockIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

interface LostItemDetailsProps {
  item: LostItem;
  onCancel?: (id: number) => void;
  showActions?: boolean;
}

export const LostItemDetails: React.FC<LostItemDetailsProps> = ({
  item,
  onCancel,
  showActions = true,
}) => {
  const navigate = useNavigate();

  /**
   * Determines the appropriate status badge based on item state
   * Returns glass-green or solid green variant based on image presence
   */
  const getStatusBadge = (hasImage: boolean): React.ReactNode => {
    const baseClasses = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border';

    const getBadgeClasses = (status: string): string => {
      if (hasImage) {
        switch (status) {
          case 'Active':
            return `${baseClasses} text-green-300 bg-green-700/80 border-green-500/60 shadow-lg shadow-green-500/30`;
          case 'Found ✓':
            return `${baseClasses} text-emerald-300 bg-emerald-700/80 border-emerald-500/60 shadow-lg shadow-emerald-500/30`;
          case 'Cold Case':
            return `${baseClasses} text-yellow-300 bg-yellow-700/80 border-yellow-500/60 shadow-lg shadow-yellow-500/30`;
          default:
            return `${baseClasses} text-gray-300 bg-gray-700/80 border-gray-500/60 shadow-lg shadow-gray-500/30`;
        }
      } else {
        switch (status) {
          case 'Active':
            return `${baseClasses} text-green-400 bg-green-500/10 border-green-500/20`;
          case 'Found ✓':
            return `${baseClasses} text-emerald-400 bg-emerald-500/10 border-emerald-500/20`;
          case 'Cold Case':
            return `${baseClasses} text-yellow-400 bg-yellow-500/10 border-yellow-500/20`;
          default:
            return `${baseClasses} text-gray-400 bg-gray-500/10 border-gray-500/20`;
        }
      }
    };

    let status = 'Active';
    if (item.isDone) status = 'Found ✓';
    else if (item.isExpired) status = 'Cold Case';

    return <span className={getBadgeClasses(status)}>{status}</span>;
  };

  /**
   * Renders the user badge with proper styling
   */
  const getUserBadge = (hasImage: boolean): React.ReactNode => {
    if (!item.userId) return null;

    const baseClasses = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border';

    const classes = hasImage
      ? `${baseClasses} text-white bg-blue-600/80 border-blue-400/60 shadow-lg shadow-blue-500/30`
      : `${baseClasses} text-blue-400 bg-blue-500/10 border-blue-500/20`;

    return (
      <span className={classes}>
        <UserCircleIcon className="w-3 h-3 mr-1" />
        User Reported
      </span>
    );
  };

  const renderActions = (): React.ReactNode => {
    if (!showActions || item.isDone || item.isExpired) return null;

    return (
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="flex flex-wrap gap-3">
          {onCancel && (
            <Button variant="glass-red" onClick={() => onCancel(item.id)}>
              Cancel Report
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderResolvedIndicator = (): React.ReactNode => {
    if (!item.isDone) return null;

    return (
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="relative overflow-hidden bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🎉</span>
            </div>
            <div>
              <p className="font-medium text-green-400">Item Has Been Found!</p>
              <p className="text-sm text-gray-400">
                Great news! Your lost item has been found. Please visit the SSO office to claim it.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderExpiredIndicator = (): React.ReactNode => {
    if (!item.isExpired || item.isDone) return null;

    return (
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="relative overflow-hidden bg-gradient-to-r from-yellow-500/10 to-orange-500/5 border border-yellow-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">⏰</span>
            </div>
            <div>
              <p className="font-medium text-yellow-400">Item Moved to Cold Case</p>
              <p className="text-sm text-gray-400">
                This item has been moved to cold case after 180 days. It is no longer actively tracked.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const hasImage = !!item.filePath;
  const statusLabel = item.isDone ? 'Found ✓' : item.isExpired ? 'Cold Case' : 'Active';

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
      <div className="p-6">
        {/* Header with back button */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="glass-grey"
            size="sm"
            onClick={() => navigate('/my-lost-items')}
            aria-label="Return to lost items list"
            className="!px-3"
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <h2 className="text-lg font-semibold text-white">Lost Item Details</h2>
        </div>

        {/* Image - Full width at top */}
        <div className="mb-5">
          {hasImage ? (
            <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-800/50 border border-gray-700">
              <img
                src={item.filePath ?? ''}
                alt={`Item: ${item.itemDescription}`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                {getStatusBadge(true)}
                {getUserBadge(true)}
              </div>
            </div>
          ) : (
            <div className="relative w-full h-64 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700 flex flex-col items-center justify-center">
              <div className="text-6xl mb-3 opacity-50">📷</div>
              <p className="text-sm text-gray-500">No Image Available</p>
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                {getStatusBadge(false)}
                {getUserBadge(false)}
              </div>
            </div>
          )}
        </div>

        {/* Item Title - CENTERED */}
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          {item.itemDescription}
        </h3>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          {/* TOP LEFT */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/50">
            <div className="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-400 flex-shrink-0">
              <UserIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Reported By</p>
              <p className="text-sm text-white font-medium truncate">{item.reportedBy}</p>
            </div>
          </div>

          {/* TOP RIGHT */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/50">
            <div className="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-400 flex-shrink-0">
              <PhoneIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Contact Number</p>
              <p className="text-sm text-white font-medium truncate">{item.contactNumber}</p>
            </div>
          </div>

          {/* BOTTOM LEFT */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/50">
            <div className="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-400 flex-shrink-0">
              <ClockIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Last Updated</p>
              <p className="text-sm text-white font-medium truncate">{formatRelativeTime(item.updatedAt)}</p>
            </div>
          </div>

          {/* BOTTOM RIGHT */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/50">
            <div className="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-400 flex-shrink-0">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Date Reported</p>
              <p className="text-sm text-white font-medium truncate">{formatDateWithTime(item.dateReported)}</p>
            </div>
          </div>
        </div>

        {/* System Metadata */}
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500 bg-gray-800/20 rounded-lg border border-gray-700/50 px-4 py-2.5">
          <span>
            Created <span className="text-gray-400">{formatRelativeTime(item.createdAt)}</span>
          </span>
          <span className="text-gray-700">•</span>
          <span>
            Status <span className="text-gray-400">{statusLabel}</span>
          </span>
          {item.userId && (
            <>
              <span className="text-gray-700">•</span>
              <span>
                User <span className="text-gray-400">#{item.userId}</span>
              </span>
            </>
          )}
        </div>

        {/* Actions */}
        {renderActions()}

        {/* Resolved Indicator */}
        {renderResolvedIndicator()}

        {/* Expired Indicator */}
        {renderExpiredIndicator()}
      </div>
    </div>
  );
};

export default LostItemDetails;