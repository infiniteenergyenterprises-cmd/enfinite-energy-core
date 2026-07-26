"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface ProjectGalleryProps {
  limit?: number;
}

export function ProjectGallery({ limit }: ProjectGalleryProps) {
  const isLimited = typeof limit === 'number';
  const [visibleCount, setVisibleCount] = useState(isLimited ? limit : 8);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const galleryImages = [
    { src: '/17.png', category: 'Commercial' },
    { src: '/hero-bg.png', category: 'Industrial' },
    { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', category: 'Commercial' },
    { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', category: 'Industrial' },
    { src: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80', category: 'Residential' },
    { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', category: 'Commercial' },
    { src: '/17.png', category: 'Residential' },
    { src: '/hero-bg.png', category: 'Industrial' },
    { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', category: 'Commercial' },
    { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', category: 'Industrial' },
    { src: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80', category: 'Residential' },
    { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', category: 'Commercial' },
    { src: '/17.png', category: 'Industrial' },
    { src: '/hero-bg.png', category: 'Commercial' },
    { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', category: 'Residential' },
    { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', category: 'Industrial' },
    { src: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80', category: 'Commercial' },
    { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', category: 'Residential' },
    { src: '/17.png', category: 'Industrial' },
    { src: '/hero-bg.png', category: 'Commercial' }
  ];

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const visibleImages = filteredImages.slice(0, visibleCount);

  const categories = ['All', 'Residential', 'Commercial', 'Industrial'];

  const showPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! > 0 ? prev! - 1 : filteredImages.length - 1));
    }
  };

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! < filteredImages.length - 1 ? prev! + 1 : 0));
    }
  };

  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Project <span className="text-primary">Gallery</span></h2>
            <p className="text-gray-500 font-medium">Explore our successful solar installations</p>
          </div>
          {!isLimited && (
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(8);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    activeCategory === cat 
                      ? 'bg-primary text-[#0A192F] shadow-md shadow-primary/20' 
                      : 'bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={`grid gap-3 md:gap-6 mb-8 ${isLimited ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
          {visibleImages.map((img, i) => (
            <div key={i} onClick={() => setSelectedImageIndex(i)} className="aspect-video bg-gray-200 rounded-xl overflow-hidden group cursor-pointer shadow-sm relative">
              <img src={img.src} alt={`Gallery ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                  View Image
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {isLimited ? (
          <div className="text-center mt-6">
            <Link 
              href="/our-work"
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 text-[#F5A623]" /> View Full Gallery
            </Link>
          </div>
        ) : (
          visibleCount < filteredImages.length && (
            <div className="text-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + 8)}
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm text-sm font-bold px-6 py-2.5 rounded-full inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                Load More <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )
        )}
      </section>

      {/* Lightbox / Frame for Image */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-md" onClick={() => setSelectedImageIndex(null)}>
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(null); }}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors border border-white/20 text-white z-50 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          
          <button 
            onClick={showPrevImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors border border-white/20 text-white z-50 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <img 
            src={filteredImages[selectedImageIndex]?.src} 
            alt="Full size project" 
            className="max-w-full max-h-full object-contain shadow-2xl transition-opacity duration-300"
            onClick={(e) => e.stopPropagation()}
          />

          <button 
            onClick={showNextImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors border border-white/20 text-white z-50 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
}
