// src/pages/LostItemDetailsPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lostItemsApi} from '../api/lost-items';
import type {LostItem} from '../api/lost-items';
import { LostItemDetails } from '../components/lost-items/LostItemDetails';
import { Spinner } from '../components/common/Spinner';
import { Button } from '../components/common/Button';
import { useToast } from '../hooks/useToast';

export const LostItemDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [item, setItem] = useState<LostItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      try {
        const response = await lostItemsApi.getLostItemDetails(parseInt(id));
        if (response.success) {
          setItem(response.data);
        } else {
          setError('Failed to load item details');
        }
      } catch (error: any) {
        setError(error.message || 'Failed to load item details');
        showToast(error.message || 'Failed to load item details', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemDetails();
  }, [id, showToast]);

  const handleCancelReport = async (itemId: number) => {
    if (!confirm('Are you sure you want to cancel this report?')) return;

    try {
      const response = await lostItemsApi.cancelReport(itemId);
      if (response.success) {
        showToast(response.message || 'Report cancelled successfully', 'success');
        navigate('/my-lost-items');
      } else {
        showToast(response.message || 'Failed to cancel report', 'error');
      }
    } catch (error: any) {
      showToast(error.message || 'Failed to cancel report', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-600">{error || 'Item not found'}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate('/my-lost-items')}
          >
            Back to My Items
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <LostItemDetails
        item={item}
        onCancel={handleCancelReport}
        showActions={true}
      />
    </div>
  );
};

export default LostItemDetailsPage;