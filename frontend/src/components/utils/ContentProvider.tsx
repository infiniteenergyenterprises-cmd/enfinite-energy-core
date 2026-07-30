'use client';
import React from 'react';
import { ContentContext } from '@/hooks/usePageContent';

export function PageContentProvider({ initialData, children }: { initialData: any, children: React.ReactNode }) {
  return <ContentContext.Provider value={initialData}>{children}</ContentContext.Provider>;
}
