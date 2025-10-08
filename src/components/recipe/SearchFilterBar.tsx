'use client';

import { useState, useEffect } from 'react';

export default function SearchFilterBar() {
  const [searchValue, setSearchValue] = useState('');
  const [cuisineValue, setCuisineValue] = useState('');
  const [difficultyValue, setDifficultyValue] = useState('');

  // Load values from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchValue(params.get('search') || '');
    setCuisineValue(params.get('cuisine') || '');
    setDifficultyValue(params.get('difficulty') || '');
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    updateUrl('search', value);
  };

  const handleCuisineChange = (value: string) => {
    setCuisineValue(value);
    updateUrl('cuisine', value);
  };

  const handleDifficultyChange = (value: string) => {
    setDifficultyValue(value);
    updateUrl('difficulty', value);
  };

  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <select
          value={cuisineValue}
          onChange={(e) => handleCuisineChange(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">All Cuisines</option>
          <option value="italian">Italian</option>
          <option value="american">American</option>
          <option value="asian">Asian</option>
          <option value="mexican">Mexican</option>
        </select>
        <select
          value={difficultyValue}
          onChange={(e) => handleDifficultyChange(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
}