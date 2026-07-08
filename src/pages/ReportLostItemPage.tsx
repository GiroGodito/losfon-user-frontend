// src/pages/ReportLostItemPage.tsx
import { useNavigate } from 'react-router-dom';
import { ReportLostItemForm } from '../components/lost-items/ReportLostItemForm';
import { useLostItems } from '../hooks/useLostItems';
import { useToast } from '../hooks/useToast';
import { RateLimitBanner } from '../components/common/RateLimitBanner';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

export const ReportLostItemPage = () => {
  const { reportLostItem, isRateLimited, countdown } = useLostItems();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (data: { itemDescription: string; filePath?: string | null }) => {
    try {
      await reportLostItem(data);
      showToast('Item reported successfully! 🎉', 'success');
      navigate('/my-lost-items');
    } catch (error: any) {
      // Error handled in hook
    }
  };

  return (
    <div className="space-y-6 mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          Report Lost Item
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Fill in the details below to report a lost item
        </p>
      </div>

      <RateLimitBanner
        isRateLimited={isRateLimited}
        countdown={countdown}
        resourceType="reporting items"
        className="mb-4"
      />

      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
        <ReportLostItemForm 
          onSubmit={handleSubmit} 
          isRateLimited={isRateLimited}
          rateLimitCountdown={countdown}
        />
      </div>
    </div>
  );
};

export default ReportLostItemPage;