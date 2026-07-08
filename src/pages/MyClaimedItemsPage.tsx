// src/pages/MyClaimedItemsPage.tsx
import { useClaimedItems } from '../hooks/useClaimedItems';
import { ClaimedItemList } from '../components/claimed-items/ClaimedItemList';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export const MyClaimedItemsPage = () => {
  const { 
    items, 
    isLoading,
    pagination,
    goToPage,
  } = useClaimedItems();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          My Claimed Items
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Items you have successfully claimed
        </p>
      </div>
      
      {/* ✅ Pass pagination props to ClaimedItemList */}
      <ClaimedItemList 
        items={items} 
        isLoading={isLoading}
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={goToPage}
      />
    </div>
  );
};

export default MyClaimedItemsPage;