"use client";

import { useCart } from '@/context/CartContext';
import { useEffect, useRef } from 'react';

interface CartIconProps {
  onClick?: () => void;
  className?: string;
  showLabel?: boolean;
}

export default function CartIcon({ onClick, className = "", showLabel = false }: CartIconProps) {
  const { totalItems } = useCart();
  const prevItemsRef = useRef(totalItems);
  const badgeRef = useRef<HTMLSpanElement>(null);

  // Animate badge when count changes
  useEffect(() => {
    if (totalItems !== prevItemsRef.current && badgeRef.current) {
      // Add pulse animation when cart count changes
      badgeRef.current.classList.remove('animate-pulse-once');
      void badgeRef.current.offsetWidth; // Force reflow
      badgeRef.current.classList.add('animate-pulse-once');

      console.log('Cart count changed: ' + prevItemsRef.current + ' → ' + totalItems);
    }
    prevItemsRef.current = totalItems;
  }, [totalItems]);

  // Beginner-friendly logging for debugging
  console.log('CartIcon rendering - Total items:', totalItems);

  const handleClick = () => {
    console.log('Cart icon clicked - Opening cart');
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={"relative p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cart-button-hover cart-focus cart-touch-target " + className}
      aria-label={'Shopping cart with ' + totalItems + ' items'}
    >
      {/* Cart Icon SVG */}
      <div className="relative">
        <svg
          className="w-6 h-6 text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-105"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>

        {/* Item Count Badge */}
        {totalItems > 0 &&
          <span
            ref={badgeRef}
            className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transition-all duration-200 hover:scale-110 cart-count-transition animate-pulse-once"
            aria-label={totalItems + ' items in cart'}
          >
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        }
      </div>

      {/* Optional Label */}
      {showLabel &&
        <span className="ml-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
          Cart {totalItems > 0 && '(' + (totalItems > 99 ? '99+' : totalItems) + ')'}
        </span>
      }
    </button>
  );
}