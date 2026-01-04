import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Image from 'next/image';
import MediaPreloader from './MediaPreloader';

import placeholderImg from "@/../public/Images/menu.png";
import { MenuItem } from './Home_menu_section';

export interface ScrollableMenuRef {
  scrollNext: () => void;
}

interface ScrollableMenuCardsProps {
  menuItems: MenuItem[];
  onScrollEndChange?: (isAtEnd: boolean) => void;
}

const ScrollableMenuCards = forwardRef<ScrollableMenuRef, ScrollableMenuCardsProps>(
  ({ menuItems, onScrollEndChange }, ref) => {

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isAtEnd, setIsAtEnd] = useState(false);
    // Store the timeout ID to clear it if component unmounts during scroll debounce
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    // --- Function to scroll to the next card or loop back ---
    const scrollNext = useCallback(() => {
      const container = scrollContainerRef.current;
      if (!container || menuItems.length === 0) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;

      const firstCard = container.children[0] as HTMLElement | undefined;
      const cardWidth = firstCard?.offsetWidth ?? clientWidth; 
      const gap = 16; 
      const scrollAmount = cardWidth + gap; 
      const threshold = 10;
      const isNearEnd = scrollLeft + clientWidth >= scrollWidth - threshold;

      if (isNearEnd) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, [menuItems.length]); 

    useImperativeHandle(ref, () => ({
      scrollNext,
    }));

    const checkScrollPosition = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } = container;
        const threshold = 10;
        const currentIsAtEnd = scrollLeft + clientWidth >= scrollWidth - threshold;

        setIsAtEnd(prevIsAtEnd => {
            if (prevIsAtEnd !== currentIsAtEnd) {
                if (onScrollEndChange) {
                    onScrollEndChange(currentIsAtEnd);
                }
                return currentIsAtEnd;
            }
            return prevIsAtEnd;
        });

    }, [onScrollEndChange]); 


     const handleScroll = useCallback(() => {
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
            checkScrollPosition();
        }, 150);
     }, [checkScrollPosition]);



    useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      container.addEventListener('scroll', handleScroll);

      // Only check scroll position after mount, not during render
      setTimeout(() => {
        checkScrollPosition();
      }, 0);

      return () => {
        container.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, [menuItems, handleScroll, checkScrollPosition]); // Rerun if items or handlers change



  return (
    <div className="w-full bg-primary-dark px-2 pt-3 pb-0 text-white sm:px-6">
      {/* Header Section
      <div className="mb-6">
        <h2 className="text-heading-4 font-bold">{title}</h2>
        {subtitle && <p className="text-normal-2 mt-1 opacity-80">{subtitle}</p>}
        <div className="flex items-center mt-4">
          <p className="text-normal-3">Scroll through to explore our dishes.</p>
          <svg className="ml-2 w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div> */}

      {/* Scrollable Cards Section */}
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide flex cursor-grab gap-4 overflow-x-auto active:cursor-grabbing"
        onMouseDown={e => {
          // Only start drag if not on selectable text
          if ((e.target as HTMLElement).closest('.selectable-text')) return;
          isDragging.current = true;
          startX.current = e.pageX - (scrollContainerRef.current?.getBoundingClientRect().left || 0);
          scrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
          document.body.style.userSelect = "none";
        }}
        onMouseLeave={() => {
          isDragging.current = false;
          document.body.style.userSelect = "";
        }}
        onMouseUp={() => {
          isDragging.current = false;
          document.body.style.userSelect = "";
        }}
        onMouseMove={e => {
          if (!isDragging.current) return;
          e.preventDefault();
          const x = e.pageX - (scrollContainerRef.current?.getBoundingClientRect().left || 0);
          const walk = (x - startX.current) * 1;
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
          }
        }}
      >
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            className="w-[300px] flex-shrink-0 overflow-hidden rounded-[12px] text-black sm:w-[386px]"
          >
            {/* Card Image */}
            <div className="relative h-[240px] w-full cursor-grab active:cursor-grabbing">
              {/* Preloader overlays the image until loaded, matching shape and fill */}
              <MediaPreloader
                src={item.image}
                alt={item.name}
                className="absolute top-0 left-0 h-full w-full rounded-[12px] object-cover"
                style={{ borderRadius: '12px' }}
              />
              <Image 
                src={item.image}
                alt={item.name}
                fill
                className="rounded-[12px] object-cover"
                style={{ borderRadius: '12px' }}
                draggable={false}
              />
            </div>

            {/* Card Content */}
            <div className="relative z-10 mt-[-12px] rounded-[12px] bg-white px-[16px] pb-[12px]">
              <div className="selectable-text py-3 text-h5 font-bold" style={{ cursor: "text", userSelect: "text" }}>{item.name}</div>
              <div className="selectable-text text-normal4 text-black/60" style={{ cursor: "text", userSelect: "text" }}>{item.description}</div>
              {/* Price and Points */}
              <div className="mt-1 flex items-center pb-3">
                <span className="selectable-text text-normal4 font-bold text-primary-dark" style={{ cursor: "text", userSelect: "text" }}>$ {item.price}</span>
              </div>
              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className={`selectable-text rounded-full bg-black/[0.03] px-[12px] py-[3px] text-normal4 text-black/50`}
                    style={{ cursor: "text", userSelect: "text" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>
        {`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;     /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;             /* Chrome, Safari and Opera */
        }
      `}
      </style>

    </div>
  );
}
);

export default ScrollableMenuCards;