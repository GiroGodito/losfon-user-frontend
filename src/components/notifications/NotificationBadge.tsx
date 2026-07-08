// src/components/notifications/NotificationBadge.tsx
import React from 'react';

interface NotificationBadgeProps {
  count: number;
  className?: string;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({ 
  count, 
  className = '' 
}) => {
  if (count === 0) return null;

  return (
    <span className={`
      inline-flex items-center justify-center
      min-w-[20px] h-5 px-1.5
      bg-red-500 text-white text-xs font-bold rounded-full
      ${className}
    `}>
      {count > 99 ? '99+' : count}
    </span>
  );
};

export default NotificationBadge;