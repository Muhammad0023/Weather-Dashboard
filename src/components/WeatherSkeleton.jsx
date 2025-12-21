import React from 'react';
const WeatherSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Skeleton for CurrentWeather Card */}
      <div className="p-6 bg-white rounded-xl shadow-2xl border border-gray-100 animate-pulse">
        {/* Header/City */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div> {/* City Name */}
            <div className="h-4 bg-gray-200 rounded w-32"></div> {/* Date */}
          </div>
          <div className="h-16 w-16 bg-gray-300 rounded-full"></div> {/* Icon */}
        </div>
        
        {/* Large Temperature Display */}
        <div className="text-center my-6">
          <div className="h-16 bg-gray-300 rounded w-1/3 mx-auto"></div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-3 gap-4 border-t pt-4">
          <div className="h-12 bg-gray-200 rounded-lg"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Skeleton for Forecast Row */}
      <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div> {/* Title */}
        <div className="flex space-x-4">
          {[...Array(6)].map((_, i) => ( // Render 6 forecast day placeholders
            <div key={i} className="shrink-0 w-24 h-28 p-3 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherSkeleton;