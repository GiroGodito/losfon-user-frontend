// src/pages/ClaimedItemDetailsPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { claimedItemsApi } from '../api/claimed-items';
import type { ClaimedItem } from '../api/claimed-items';
import { ClaimedItemDetails } from '../components/claimed-items/ClaimedItemDetails';
import { Spinner } from '../components/common/Spinner';
import { Button } from '../components/common/Button';
import { useToast } from '../hooks/useToast';

export const ClaimedItemDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [item, setItem] = useState<ClaimedItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      try {
        const response = await claimedItemsApi.getClaimedItemDetails(parseInt(id));
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
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
          <p className="text-red-400">{error || 'Item not found'}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate('/my-claimed-items')}
          >
            Back to My Claimed Items
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <ClaimedItemDetails item={item} />
    </div>
  );
};

export default ClaimedItemDetailsPage;