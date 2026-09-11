// // src/components/layout/DashboardLayout.tsx
// import React, { useState, useEffect } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import { Header } from './Header';
// import { Footer } from './Footer';
// import { Navigation } from './Navigation';
// import {Button} from './../common/Button';
// import { 
//   XMarkIcon,
//   ArrowRightOnRectangleIcon
// } from '@heroicons/react/24/outline';
// import { useAuth } from '../../context/AuthContext';

// export const DashboardLayout: React.FC = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   // Close sidebar on escape key
//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === 'Escape' && sidebarOpen) {
//         setSidebarOpen(false);
//       }
//     };
//     window.addEventListener('keydown', handleEscape);
//     return () => window.removeEventListener('keydown', handleEscape);
//   }, [sidebarOpen]);

//   // Prevent body scroll when sidebar is open on mobile
//   useEffect(() => {
//     if (sidebarOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [sidebarOpen]);

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
//   const closeSidebar = () => setSidebarOpen(false);

//   const handleLogout = async () => {
//     await logout();
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black">
//       <Header onMenuToggle={toggleSidebar} />

//       <div className="flex flex-1 overflow-hidden">
//         {/* Mobile Sidebar Overlay */}
//         {sidebarOpen && (
//           <div 
//             className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden animate-fade-in"
//             onClick={closeSidebar}
//           />
//         )}

//         {/* Sidebar */}
//         <aside className={`
//           fixed md:sticky top-0 z-40 h-screen w-72 bg-gray-900/95 backdrop-blur-sm border-r border-gray-800
//           transition-transform duration-300 ease-in-out
//           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
//           flex flex-col shadow-2xl
//         `}>
//           {/* ✅ NO HEADER AT ALL - Just the close button floating */}
//           {/* Mobile Close Button - Floating in top-right corner */}
//           <Button
//             onClick={closeSidebar}
//             className="md:hidden absolute top-4 right-4 z-50 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
//             aria-label="Close menu"
//             variant="glass-grey"
//           >
//             <XMarkIcon className="w-6 h-6" />
//           </Button>

//           {/* Navigation - Full height with padding for close button */}
//           <div className="flex-1 overflow-y-auto pt-4 px-3 pb-3">
//             <Navigation onItemClick={closeSidebar} />
//           </div>

//           {/* Sidebar Footer - User info with logout */}
//           <div className="p-4 border-t border-gray-800">
//             <div className="flex items-center gap-3 text-sm">
//               <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-green-500/30 flex-shrink-0">
//                 <span className="text-green-400 font-semibold text-sm">
//                   {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
//                 </span>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-white text-sm font-medium truncate">
//                   {user?.fullName || 'User'}
//                 </p>
//                 <p className="text-gray-500 text-xs truncate">
//                   {user?.email || 'user@email.com'}
//                 </p>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
//                 title="Logout"
//               >
//                 <ArrowRightOnRectangleIcon className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto p-4 md:p-6">
//           <div className="max-w-6xl mx-auto">
//             <Outlet />
//           </div>
//         </main>
//       </div>

//       <Footer />
//     </div>
//   );
// };









// export default DashboardLayout;
// src/components/layout/DashboardLayout.tsx
// import React, { useState, useEffect } from 'react'; 
// import { Outlet, useNavigate } from 'react-router-dom';
// import { Header } from './Header';
// import { Footer } from './Footer';
// import { Navigation } from './Navigation';
// import {Button} from './../common/Button';
// import { 
//   XMarkIcon,
//   ArrowRightOnRectangleIcon
// } from '@heroicons/react/24/outline';
// import { useAuth } from '../../context/AuthContext';

// export const DashboardLayout: React.FC = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   // Close sidebar on escape key
//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === 'Escape' && sidebarOpen) {
//         setSidebarOpen(false);
//       }
//     };
//     window.addEventListener('keydown', handleEscape);
//     return () => window.removeEventListener('keydown', handleEscape);
//   }, [sidebarOpen]);

//   // Prevent body scroll when sidebar is open on mobile
//   useEffect(() => {
//     if (sidebarOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [sidebarOpen]);

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
//   const closeSidebar = () => setSidebarOpen(false);

//   const handleLogout = async () => {
//     await logout();
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black">
//       <Header onMenuToggle={toggleSidebar} />

//       <div className="flex flex-1 overflow-hidden">
//         {/* Mobile Sidebar Overlay */}
//         {sidebarOpen && (
//           <div 
//             className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden animate-fade-in"
//             onClick={closeSidebar}
//           />
//         )}

//         {/* Sidebar */}
//         <aside className={`
//           fixed md:sticky top-0 z-40 h-screen w-72 bg-gray-900/95 backdrop-blur-sm border-r border-gray-800
//           transition-transform duration-300 ease-in-out
//           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
//           flex flex-col shadow-2xl
//           md:h-[calc(100vh-4rem)]
//         `}>
//           {/* Mobile Close Button - Floating in top-right corner */}
//           <Button
//             onClick={closeSidebar}
//             className="md:hidden absolute top-4 right-4 z-50 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
//             aria-label="Close menu"
//             variant="glass-grey"
//           >
//             <XMarkIcon className="w-6 h-6" />
//           </Button>

//           {/* Navigation - Scrollable area */}
//           <div className="flex-1 min-h-0 overflow-y-auto pt-4 px-3 pb-3">
//             <Navigation onItemClick={closeSidebar} />
//           </div>

//           {/* Sidebar Footer - Fixed at bottom, never scrolls */}
//           <div className="flex-shrink-0 p-4 border-t border-gray-800">
//             <div className="flex items-center gap-3 text-sm">
//               <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-green-500/30 flex-shrink-0">
//                 <span className="text-green-400 font-semibold text-sm">
//                   {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
//                 </span>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-white text-sm font-medium truncate">
//                   {user?.fullName || 'User'}
//                 </p>
//                 <p className="text-gray-500 text-xs truncate">
//                   {user?.email || 'user@email.com'}
//                 </p>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
//                 title="Logout"
//               >
//                 <ArrowRightOnRectangleIcon className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto p-4 md:p-6">
//           <div className="max-w-6xl mx-auto">
//             <Outlet />
//           </div>
//         </main>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default DashboardLayout;

// src/components/layout/DashboardLayout.tsx
// src/components/layout/DashboardLayout.tsx
// src/components/layout/DashboardLayout.tsx
// src/components/layout/DashboardLayout.tsx
// import React, { useState, useEffect } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import { Header } from './Header';
// import { Footer } from './Footer';
// import { Navigation } from './Navigation';
// import { Button } from './../common/Button';
// import { XMarkIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
// import { useAuth } from '../../context/AuthContext';

// export const DashboardLayout: React.FC = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === 'Escape' && sidebarOpen) setSidebarOpen(false);
//     };
//     window.addEventListener('keydown', handleEscape);
//     return () => window.removeEventListener('keydown', handleEscape);
//   }, [sidebarOpen]);

//   useEffect(() => {
//     document.body.style.overflow = sidebarOpen ? 'hidden' : 'unset';
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [sidebarOpen]);

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
//   const closeSidebar = () => setSidebarOpen(false);

//   const handleLogout = async () => {
//     await logout();
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">

//       {/* ============ HEADER (fixed, z-50) ============ */}
//       <Header onMenuToggle={toggleSidebar} />

//       {/* ============ SIDEBAR — position: fixed on desktop ============ */}
//       {/* Nothing can scroll this. Ever. */}
//       <aside
//         className={`
//           fixed top-16 bottom-0 left-0 z-30 w-72
//           bg-gray-900/95 backdrop-blur-sm border-r border-gray-800
//           transition-transform duration-300 ease-in-out
//           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
//           flex flex-col shadow-2xl
//         `}
//       >
//         {/* Mobile close button */}
//         <Button
//           onClick={closeSidebar}
//           className="md:hidden absolute top-4 right-4 z-50 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
//           aria-label="Close menu"
//           variant="glass-grey"
//         >
//           <XMarkIcon className="w-6 h-6" />
//         </Button>

//         {/* Nav list — only this scrolls if it's too tall */}
//         <div className="flex-1 min-h-0 overflow-y-auto pt-4 px-3 pb-3">
//           <Navigation onItemClick={closeSidebar} />
//         </div>

//         {/* Sidebar footer — pinned to bottom of fixed sidebar */}
//         <div className="flex-shrink-0 p-4 border-t border-gray-800">
//           <div className="flex items-center gap-3 text-sm">
//             <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-green-500/30 flex-shrink-0">
//               <span className="text-green-400 font-semibold text-sm">
//                 {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
//               </span>
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-white text-sm font-medium truncate">
//                 {user?.fullName || 'User'}
//               </p>
//               <p className="text-gray-500 text-xs truncate">
//                 {user?.email || 'user@email.com'}
//               </p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
//               title="Logout"
//             >
//               <ArrowRightOnRectangleIcon className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Mobile overlay (only shows on mobile when drawer is open) */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden"
//           onClick={closeSidebar}
//         />
//       )}

//       {/* ============ MAIN CONTENT ============ */}
//       {/* ml-72 on desktop so it doesn't sit under the fixed sidebar. */}
//       {/* mt-16 so it doesn't sit under the fixed header. */}
//       <main className="md:ml-72 pt-16">
//         <div className="p-4 md:p-6">
//           <div className="max-w-6xl mx-auto">
//             <Outlet />
//           </div>
//         </div>
//         <Footer />
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;
// src/components/layout/DashboardLayout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Navigation } from './Navigation';
import { Button } from './../common/Button';
import { XMarkIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) setSidebarOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [sidebarOpen]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    /* ✅ Outer wrapper: flex column + min-h-screen → footer pins to bottom on short pages */
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black">

      {/* Header — sticky at top of scroll */}
      <Header onMenuToggle={toggleSidebar} />

      {/* Sidebar — fixed, out of flow */}
      <aside
        className={`
          fixed top-16 bottom-0 left-0 z-30 w-72
          bg-gray-900/95 backdrop-blur-sm border-r border-gray-800
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex flex-col shadow-2xl
        `}
      >
        <Button
          onClick={closeSidebar}
          className="md:hidden absolute top-4 right-4 z-50 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
          aria-label="Close menu"
          variant="glass-grey"
        >
          <XMarkIcon className="w-6 h-6" />
        </Button>

        <div className="flex-1 min-h-0 overflow-y-auto pt-4 px-3 pb-3">
          <Navigation onItemClick={closeSidebar} />
        </div>

        <div className="flex-shrink-0 p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-green-500/30 flex-shrink-0">
              <span className="text-green-400 font-semibold text-sm">
                {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {user?.fullName || 'User'}
              </p>
              <p className="text-gray-500 text-xs truncate">
                {user?.email || 'user@email.com'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
              title="Logout"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* ✅ MAIN: flex-1 so it stretches, md:ml-72 for the fixed sidebar, pt-16 for the fixed header */}
      <main className="flex-1 md:ml-72 pt-16">
        <div className="p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>

      {/* ✅ FOOTER: sibling of <main>, offset by sidebar on desktop.
          As a flex child of the min-h-screen column, it sits at the very bottom
          on short pages, and below the content on long pages. */}
      <div className="md:ml-72">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;