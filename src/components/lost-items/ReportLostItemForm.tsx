// src/components/lost-items/ReportLostItemForm.tsx
import React, { useState } from 'react';
import { Button } from '../common/Button';
import { ImageUpload } from '../common/ImageUpload';
import { useToast } from '../../hooks/useToast';
import { uploadApi } from '../../api/upload';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface ReportLostItemFormProps {
  onSubmit: (data: { itemDescription: string; filePath?: string | null }) => Promise<void>;
  isLoading?: boolean;
  isRateLimited?: boolean;
  rateLimitCountdown?: number;
}

export const ReportLostItemForm: React.FC<ReportLostItemFormProps> = ({
  onSubmit,
  isLoading = false,
  isRateLimited = false,
  rateLimitCountdown = 0,
}) => {
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { showToast } = useToast();

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const response = await uploadApi.uploadImage(file);
      if (response.success) {
        setImageUrl(response.imageUrl);
        showToast('Image uploaded successfully', 'success');
      }
    } catch (error: any) {
      showToast(error.message || 'Upload failed', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRateLimited) {
      showToast(`Please wait ${rateLimitCountdown} seconds before reporting again.`, 'error');
      return;
    }
    if (!description.trim()) {
      showToast('Please describe the item', 'error');
      return;
    }
    await onSubmit({ itemDescription: description, filePath: imageUrl });
    setDescription('');
    setImageUrl(null);
    setImageFile(null);
  };

  const getButtonText = () => {
    if (isRateLimited) return `Wait ${rateLimitCountdown}s`;
    if (isUploading) return 'Uploading Image...';
    return 'Report Lost Item';
  };

  const isDisabled = !description.trim() || isRateLimited || isUploading || isLoading;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Item Description <span className="text-red-400">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          rows={4}
          placeholder="Describe the item you lost... (e.g., color, brand, size, distinguishing features)"
          required
          disabled={isRateLimited}
        />
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <InformationCircleIcon className="w-3 h-3" />
          Be as detailed as possible to help identify your item
        </p>
      </div>

      <ImageUpload
        onFileSelect={handleImageUpload}
        isUploading={isUploading}
        previewUrl={imageUrl}
      />

      <Button
        type="submit"
        variant="glass-green"
        fullWidth
        isLoading={isLoading || isUploading}
        disabled={isDisabled}
        className="py-3"
      >
        {getButtonText()}
      </Button>
    </form>
  );
};

export default ReportLostItemForm;