// src/pages/MyLostItemsPage.tsx
import { useLostItems } from '../hooks/useLostItems';
import { LostItemList } from '../components/lost-items/LostItemList';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

export const MyLostItemsPage = () => {
  const { 
    items, 
    isLoading, 
    cancelReport, 
    error,
    pagination,
    goToPage,
  } = useLostItems();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          My Lost Items
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Track all your reported lost items
        </p>
      </div>

      {/* ✅ Pass pagination props to LostItemList */}
      <LostItemList
        items={items}
        isLoading={isLoading}
        onCancel={cancelReport}
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={goToPage}
      />
    </div>
  );
};

export default MyLostItemsPage;