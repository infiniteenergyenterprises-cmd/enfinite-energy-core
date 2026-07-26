'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: "Rajesh Verma",
      role: "Homeowner, Lucknow",
      quote: "Enfinite Energy provided excellent service from start to finish. Our electricity bill is reduced by more than 80%. Highly recommended!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Amit Sharma",
      role: "Factory Owner, Kanpur",
      quote: "Professional team, quality installation and good after-sales support. Our factory is now running on clean solar energy.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Pooja Singh",
      role: "Business Owner, Noida",
      quote: "The best solar company we worked with. Timely installation and great savings on our monthly electricity bills.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Vikram Malhotra",
      role: "CEO, TechPark Delhi",
      quote: "Switching to Enfinite Energy was the best decision for our commercial space. The ROI is fantastic and the support is unmatched.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Sneha Desai",
      role: "Architect, Mumbai",
      quote: "I recommend Enfinite to all my clients. Their panels look sleek, and the installation quality is truly premium.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const firstChild = scrollRef.current.children[0] as HTMLElement;
      if (!firstChild) return;
      const cardWidth = firstChild.offsetWidth + 32; // 32px is gap-8
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const firstChild = scrollRef.current.children[0] as HTMLElement;
      scrollRef.current.scrollTo({ left: index * (firstChild.offsetWidth + 32), behavior: 'smooth' });
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        // If we've reached the end, scroll back to start
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const firstChild = scrollRef.current.children[0] as HTMLElement;
          const scrollAmount = firstChild.offsetWidth + 32;
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-12 bg-gray-50/30 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0A192F] mb-2">What Our Customers Say</h2>
          <p className="text-gray-500">Real stories from real customers</p>
        </div>

        <div className="relative group">
          {/* Scroll Container */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4 px-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="snap-center shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-auto"
              >
                <div className="flex gap-1 mb-4 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic flex-1 text-sm md:text-base leading-relaxed">"{testimonial.quote}"</p>
                
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-50">
                  <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-sm" />
                  <div>
                    <h4 className="font-bold text-[#0A192F] text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500 font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-primary w-8' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Hide scrollbar for Chrome/Safari */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
