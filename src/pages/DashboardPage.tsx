// src/pages/DashboardPage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../hooks/useNotifications';
import { lostItemsApi } from '../api/lost-items';
import { claimedItemsApi } from '../api/claimed-items';
import { 
  ClipboardDocumentListIcon, 
  PlusCircleIcon, 
  CheckCircleIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../components/common/Button';
import { Spinner } from '../components/common/Spinner';

interface QuickActionProps {
  to: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ 
  to, 
  icon: Icon, 
  title, 
  description, 
  color, 
  bgColor 
}) => (
  <Link
    to={to}
    className={`
      group relative overflow-hidden rounded-xl border border-gray-800 
      bg-gray-900/50 backdrop-blur-sm p-6 
      hover:border-${color}-500/50 hover:bg-gray-800/50 
      transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
    `}
  >
    <div className="flex items-start gap-4">
      <div className={`
        p-3 rounded-xl ${bgColor} 
        group-hover:scale-110 transition-transform duration-300
      `}>
        <Icon className={`w-6 h-6 text-${color}-400`} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold text-lg group-hover:text-${color}-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mt-1">{description}</p>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-gray-600">→</span>
      </div>
    </div>
  </Link>
);

export const DashboardPage = () => {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const [lostCount, setLostCount] = useState<number | null>(null);
  const [claimedCount, setClaimedCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch counts on mount
  useEffect(() => {
    const fetchCounts = async () => {
      setIsLoading(true);
      try {
        // Fetch all counts in parallel
        const [lost, claimed] = await Promise.all([
          lostItemsApi.getMyLostItems({ page: 1, pageSize: 1 })
            .then(res => res.data.totalCount || 0)
            .catch(() => 0),
          claimedItemsApi.getMyClaimedItems(1, 1)
            .then(res => res.pagination?.totalCount || 0)
            .catch(() => 0),
        ]);
        
        setLostCount(lost);
        setClaimedCount(claimed);
      } catch (error) {
        console.error('❌ Failed to fetch counts:', error);
        setLostCount(0);
        setClaimedCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const stats = [
    { 
      label: 'Lost Items', 
      value: isLoading ? '...' : (lostCount ?? 0), 
      icon: ClipboardDocumentListIcon, 
      color: 'blue' 
    },
    { 
      label: 'Claimed Items', 
      value: isLoading ? '...' : (claimedCount ?? 0), 
      icon: CheckCircleIcon, 
      color: 'green' 
    },
    // { 
    //   label: 'Notifications', 
    //   value: isLoading ? '...' : unreadCount, 
    //   icon: BellIcon, 
    //   color: 'purple' 
    // },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">👋</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Welcome back, {user?.fullName || 'User'}!
            </h2>
          </div>
          <p className="text-gray-400 max-w-2xl">
            Report lost items, track your reports, and get notified when your items are found.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link to="/report">
              <Button variant="glass-green" className="inline-flex items-center gap-2">
                <PlusCircleIcon className="w-4 h-4" />
                Report Lost Item
              </Button>
            </Link>
            <Link to="/my-lost-items">
              <Button variant="glass-blue" className="inline-flex items-center gap-2">
                <ClipboardDocumentListIcon className="w-4 h-4" />
                View My Reports
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats - Now with real data */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div 
            key={stat.label}
            className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4 flex items-center gap-4"
          >
            <div className={`p-2 rounded-lg bg-${stat.color}-500/10`}>
              <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-white text-2xl font-bold">
                {typeof stat.value === 'number' ? stat.value : stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>Quick Actions</span>
          <span className="text-xs text-gray-500 font-normal">Get started</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuickAction
            to="/my-lost-items"
            icon={ClipboardDocumentListIcon}
            title="My Lost Items"
            description="View and manage all your lost item reports"
            color="blue"
            bgColor="bg-blue-500/10"
          />
          <QuickAction
            to="/report"
            icon={PlusCircleIcon}
            title="Report Lost Item"
            description="Report a new lost item to the SSO office"
            color="green"
            bgColor="bg-green-500/10"
          />
          <QuickAction
            to="/my-claimed-items"
            icon={CheckCircleIcon}
            title="My Claimed Items"
            description="Items you've successfully claimed"
            color="purple"
            bgColor="bg-purple-500/10"
          />
          <QuickAction
            to="/notifications"
            icon={BellIcon}
            title="Notifications"
            description="Check your latest notifications and updates"
            color="yellow"
            bgColor="bg-yellow-500/10"
          />
        </div>
      </div>

      {/* Tip Section */}
      <div className="bg-gray-900/30 rounded-xl border border-gray-800 p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-yellow-500/10">
            <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-white font-medium">Need help?</h4>
            <p className="text-gray-400 text-sm mt-1">
              Visit the SSO office or check your notifications for updates on your lost items.
              Make sure your contact information is up to date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;