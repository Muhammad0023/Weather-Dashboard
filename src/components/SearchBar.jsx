import React, { useState } from 'react';
import SearchTags from './SearchTags';

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('Addis Ababa');
  
  const suggestedCities = [
    'Addis Ababa',
    'Axum',
    'Istanbul',
    'London',
  ];

  const handleTagClick = (city) => {
    setLocation(city); 
    onSearch(city);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location.trim());
    }
  };

  const handleGeolocationClick = () => {
    // This function will implement the Geolocation API call (Stretch Goal!)
    alert("Geolocation feature coming soon! (Implement navigator.geolocation.getCurrentPosition() here)");
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow-lg border border-gray-100">
      
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Search Location</h2>

      {/* Main Search Input Form */}
      <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 mb-4">
        <div className="relative grow">
          <input
            type="text"
            placeholder="Search for a city ..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            // pr-20 creates space for both the location and search icons
            className="w-full py-2 pl-10 pr-20 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
          
           <div
            className="absolute inset-y-0 left-1 flex items-center pl-1 text-gray-400 transition"
            title="Use current location"
          >
               
            {/* Location Pin SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.726A8 8 0 016.343 5.274A8 8 0 0117.657 16.726zm0 0l-5.657 5.657-5.657-5.657a8 8 0 1111.314 0z" />
            </svg>
          </div>
          <button 
    type="submit" 
    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-blue-500 transition"
    title="Search"
>
    {/* Removed the redundant 'text-gray-400' class from the SVG */}
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
</button>       
          
        </div>
      </form>
      
      {/* Component for the City Tags */}
      <SearchTags 
        suggestedCities={suggestedCities}
        location={location}
        handleTagClick={handleTagClick}
      />
    </div>
  );
};

export default SearchBar;
