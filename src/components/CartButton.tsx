"use client";

import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';

interface CartButtonProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function CartButton({ isOpen: externalIsOpen, onOpenChange }: CartButtonProps = {}) {
  const { totalItems, totalPrice, items } = useCart();
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  // Beginner-friendly logging for debugging
  console.log('CartButton rendering - IsOpen:', isOpen, 'Items:', totalItems);

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 transition-colors"
      >
        <div className="relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Cart Panel */}
          <div className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 z-50">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Cart Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {totalItems === 0 ? (
                  <div className="text-center py-8">
                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600">
                      {totalItems} item{totalItems !== 1 ? 's' : ''} in cart
                    </div>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-2 border border-gray-100 rounded">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{item.title}</h4>
                            <p className="text-xs text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              {totalItems > 0 && (
                <div className="border-t border-gray-200 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="text-xl font-bold text-gray-900">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Checkout (Demo)
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}