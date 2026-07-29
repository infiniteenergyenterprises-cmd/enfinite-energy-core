import { ImageUploader } from '@/components/ui/ImageUploader';

export const metadata = {
  title: 'Upload Test | Enfinite Energy',
};

export default function UploadTestPage() {
  return (
    <div className="min-h-[80vh] bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Image Upload Testing
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Test your newly integrated Cloudinary + Node.js backend upload route. 
          Select an image below and upload it directly to your cloud.
        </p>
      </div>

      <ImageUploader />
    </div>
  );
}
