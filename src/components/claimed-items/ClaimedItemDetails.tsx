// src/components/claimed-items/ClaimedItemDetails.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ClaimedItem } from '../../api/claimed-items';
import { Button } from '../common/Button';
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

interface ClaimedItemDetailsProps {
  item: ClaimedItem;
  showActions?: boolean;
}

export const ClaimedItemDetails: React.FC<ClaimedItemDetailsProps> = ({
  item,
  showActions = true,
}) => {
  const navigate = useNavigate();

  /**
   * Determines the appropriate status badge based on item state
   * Returns glass-purple or solid purple variant based on image presence
   */
  const getStatusBadge = (hasImage: boolean): React.ReactNode => {
    const baseClasses = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border';

    const classes = hasImage
      ? `${baseClasses} text-white bg-purple-600/80 border-purple-400/60 shadow-lg shadow-purple-500/30`
      : `${baseClasses} text-purple-400 bg-purple-500/10 border-purple-500/20`;

    return <span className={classes}>Claimed</span>;
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
        User Claimed
      </span>
    );
  };

  const hasImage = !!item.filePath;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
      <div className="p-6">
        {/* Header with back button */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="glass-grey"
            size="sm"
            onClick={() => navigate('/my-claimed-items')}
            aria-label="Return to claimed items list"
            className="!px-3"
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <h2 className="text-lg font-semibold text-white">Claimed Item Details</h2>
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
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Claimed By</p>
              <p className="text-sm text-white font-medium truncate">{item.claimedBy}</p>
            </div>
          </div>

          {/* TOP RIGHT */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/50">
            <div className="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-400 flex-shrink-0">
              <UserIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Released By</p>
              <p className="text-sm text-white font-medium truncate">{item.releasedBy}</p>
            </div>
          </div>

          {/* BOTTOM LEFT */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/50">
            <div className="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-400 flex-shrink-0">
              <PhoneIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Contact Information</p>
              <p className="text-sm text-white font-medium truncate">{item.claimedContactInformation}</p>
            </div>
          </div>

          {/* BOTTOM RIGHT */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/50">
            <div className="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-400 flex-shrink-0">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Released Date</p>
              <p className="text-sm text-white font-medium truncate">{formatDateWithTime(item.releasedDate)}</p>
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
            Updated <span className="text-gray-400">{formatRelativeTime(item.updatedAt)}</span>
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
      </div>
    </div>
  );
};

export default ClaimedItemDetails;