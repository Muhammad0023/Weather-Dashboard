import React from 'react';

const SearchTags = ({ suggestedCities, location, handleTagClick }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestedCities.map((city) => (
        <button
          key={city}
          onClick={() => handleTagClick(city)}
          className={`
            px-4 py-1.5 text-sm rounded-full cursor-pointer
            transition duration-300 ease-in-out
            ${location === city 
              ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/50' 
              : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98]'
            }
          `}
        >
          {city}
        </button>
      ))}
    </div>
  );
};

export default SearchTags;