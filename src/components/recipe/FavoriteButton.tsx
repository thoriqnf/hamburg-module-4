'use client';

import { useState, useEffect } from "react";
import { FavoriteButtonProps } from "@/types/recipe";

export default function FavoriteButton({
  recipeId,
  isFavorited: initialFavorited = false,
  onToggle
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);

  useEffect(() => {
    // Load favorite state from localStorage
    if (typeof window !== 'undefined') {
      const favorites = JSON.parse(localStorage.getItem('recipeFavorites') || '[]');
      setIsFavorited(favorites.includes(recipeId));
    }
  }, [recipeId]);

  const handleToggle = () => {
    const newState = !isFavorited;
    setIsFavorited(newState);

    // Update localStorage
    if (typeof window !== 'undefined') {
      const favorites = JSON.parse(localStorage.getItem('recipeFavorites') || '[]');
      if (newState) {
        favorites.push(recipeId);
      } else {
        const index = favorites.indexOf(recipeId);
        if (index > -1) {
          favorites.splice(index, 1);
        }
      }
      localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
    }

    onToggle?.(recipeId, newState);
  };

  return (
    <button
      onClick={handleToggle}
      className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full transition-all transform hover:scale-110"
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        className={`w-5 h-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-600'}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
}