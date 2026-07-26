"use client";

import React, { useState, useEffect } from 'react';
import { Bookmark, Share2, Clock, Eye, MoreHorizontal, MessageSquare } from 'lucide-react';
import Image from 'next/image';

interface NewsCardProps {
  category: string;
  source: string;
  time: string;
  title: string;
  summary: string;
  image: string;
  views: string;
  isLarge?: boolean;
  link?: string;
}

export function NewsCard({ category, source, time, title, summary, image, views, isLarge = false, link }: NewsCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imgSrc, setImgSrc] = useState(image);
  const [commentsCount, setCommentsCount] = useState(0);

  // If the prop changes (e.g. during a refresh), update the state
  useEffect(() => {
    setImgSrc(image);
    setCommentsCount(Math.floor(Math.random() * 50) + 2); // Prevent hydration errors
  }, [image]);

  // Function to return dynamic badge colors based on category
  const getBadgeStyles = (cat: string) => {
    const c = cat ? cat.toLowerCase() : '';
    if (c.includes('policy') || c.includes('government') || c.includes('schemes')) {
      return 'bg-blue-600 text-white border border-blue-500/20';
    }
    if (c.includes('industry') || c.includes('market')) {
      return 'bg-amber-600 text-white border border-amber-500/20';
    }
    if (c.includes('tech')) {
      return 'bg-cyan-600 text-white border border-cyan-500/20';
    }
    if (c.includes('award') || c.includes('success')) {
      return 'bg-emerald-600 text-white border border-emerald-500/20';
    }
    if (c.includes('partner') || c.includes('csr') || c.includes('project')) {
      return 'bg-purple-600 text-white border border-purple-500/20';
    }
    return 'bg-primary text-[#0A192F]';
  };

  return (
    <div className={`bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group flex flex-col h-full ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}>
      {/* Image Container */}
      <div className={`relative overflow-hidden ${isLarge ? 'h-56 md:h-72' : 'h-40'}`}>
        <img 
          src={imgSrc || '/17.png'} 
          alt={title} 
          onError={() => setImgSrc('/17.png')}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg ${getBadgeStyles(category)}`}>
            {category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">
          <div className="flex items-center gap-2">
            <span className="text-primary">{source}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>{time}</span>
          </div>
        </div>

        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className={`font-black text-gray-900 mb-1.5 leading-tight group-hover:text-primary transition-colors cursor-pointer ${isLarge ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}>
            {title}
          </a>
        ) : (
          <h3 className={`font-black text-gray-900 mb-1.5 leading-tight group-hover:text-primary transition-colors cursor-pointer ${isLarge ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}>
            {title}
          </h3>
        )}
        
        <p className={`text-gray-500 flex-grow ${isLarge ? 'text-sm mb-4' : 'text-xs mb-3'} line-clamp-3`}>
          {summary}
        </p>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-4 text-gray-400 text-sm font-medium">
            <div className="flex items-center gap-1.5 hover:text-primary cursor-pointer transition-colors">
              <Eye className="w-4 h-4" /> {views}
            </div>
            <div className="flex items-center gap-1.5 hover:text-primary cursor-pointer transition-colors">
              <MessageSquare className="w-4 h-4" /> {commentsCount}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)} 
              className={`p-2 rounded-full transition-colors ${isBookmarked ? 'bg-primary/10 text-primary' : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
