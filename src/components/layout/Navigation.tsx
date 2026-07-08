// src/components/layout/Navigation.tsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  CheckCircleIcon,
  BellIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
  PlusCircleIcon as PlusCircleIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
  BellIcon as BellIconSolid,
  UserCircleIcon as UserCircleIconSolid,
} from '@heroicons/react/24/solid';

interface NavItem {
  path: string;
  label: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  iconSolid: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

const navItems: NavItem[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: HomeIcon,
    iconSolid: HomeIconSolid,
  },
  {
    path: '/my-lost-items',
    label: 'My Lost Items',
    icon: ClipboardDocumentListIcon,
    iconSolid: ClipboardDocumentListIconSolid,
  },
  {
    path: '/report',
    label: 'Report Lost',
    icon: PlusCircleIcon,
    iconSolid: PlusCircleIconSolid,
  },
  {
    path: '/my-claimed-items',
    label: 'Claimed Items',
    icon: CheckCircleIcon,
    iconSolid: CheckCircleIconSolid,
  },
  {
    path: '/notifications',
    label: 'Notifications',
    icon: BellIcon,
    iconSolid: BellIconSolid,
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: UserCircleIcon,
    iconSolid: UserCircleIconSolid,
  },
];

interface NavigationProps {
  className?: string;
  onItemClick?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  className = '', 
  onItemClick 
}) => {
  const location = useLocation();

  return (
    <nav className={`space-y-1 ${className}`}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || 
                         (item.path !== '/' && location.pathname.startsWith(item.path));
        const Icon = isActive ? item.iconSolid : item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={({ isActive: navLinkActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${navLinkActive || isActive
                ? 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-lg shadow-green-500/5'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }
            `}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{item.label}</span>
            {isActive && (
              <span className="ml-auto w-1 h-6 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></span>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Navigation;