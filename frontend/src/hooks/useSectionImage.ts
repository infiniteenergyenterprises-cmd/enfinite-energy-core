import { useState, useEffect } from 'react';

export function useSectionImage(sectionKey: string, fallbackUrl: string) {
  const [imageUrl, setImageUrl] = useState<string>(fallbackUrl);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/sections');
        const data = await res.json();
        if (data.status === 'success' && data.map[sectionKey]) {
          setImageUrl(data.map[sectionKey]);
        }
      } catch (err) {
        console.error(`Failed to fetch section image for ${sectionKey}`, err);
      }
    };
    
    fetchImage();
  }, [sectionKey]);

  return imageUrl;
}
