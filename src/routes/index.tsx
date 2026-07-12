// src/routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { DashboardPage } from '../pages/DashboardPage';
import { MyLostItemsPage } from '../pages/MyLostItemsPage';
import { MyClaimedItemsPage } from '../pages/MyClaimedItemsPage';
import { ReportLostItemPage } from '../pages/ReportLostItemPage';
import { NotificationPage } from '../pages/NotificationPage';
import { NotificationDetailsPage } from '../pages/NotificationDetailsPage'; // ✅ ADD THIS
import { ProfilePage } from '../pages/ProfilePage';
import { LostItemDetailsPage } from '../pages/LostItemDetailsPage';
import { ClaimedItemDetailsPage } from '../pages/ClaimedItemDetailsPage';
import {HomePage} from '../pages/HomePage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
          {
            path: '/my-lost-items',
            element: <MyLostItemsPage />,
          },
          {
            path: '/lost-items/:id',
            element: <LostItemDetailsPage />,
          },
          {
            path: '/my-claimed-items',
            element: <MyClaimedItemsPage />,
          },
          {
            path: '/claimed-items/:id',
            element: <ClaimedItemDetailsPage />,
          },
          {
            path: '/report',
            element: <ReportLostItemPage />,
          },
          {
            path: '/notifications',
            element: <NotificationPage />,
          },
          {
            path: '/notifications/:id', // ✅ ADD THIS ROUTE
            element: <NotificationDetailsPage />,
          },
          {
            path: '/profile',
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <HomePage />,
  },
]);

export default router;