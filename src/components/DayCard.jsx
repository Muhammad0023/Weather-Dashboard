import React from 'react';

const DayCard = ({ dayData }) => {
  // Format the date to show just the day name (eg. Monday, Tuesday)
  const dayName = new Date(dayData.day).toLocaleDateString('en-US', { weekday: 'long' });
  
  const tempMin = Math.round(dayData.min);
  const tempMax = Math.round(dayData.max);
  const iconCode = dayData.weather.icon;
  const description = dayData.weather.description;
  
  const getIconUrl = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-100 hover:bg-gray-100 transition duration-200">
      
      {/* Day Name */}
      <div className="w-1/4 text-gray-700 font-medium">
        {dayName}
      </div>

      {/* Weather Icon and Condition */}
      <div className="flex items-center space-x-2 w-1/3">
        <img 
          src={getIconUrl(iconCode)} 
          alt={description} 
          className="w-10 h-10"
        />
        <span className="text-sm capitalize text-gray-600 hidden sm:inline">
          {description}
        </span>
      </div>

      {/* High/Low Temperature */}
      <div className="w-1/4 text-right">
        <span className="text-lg font-bold text-gray-800 mr-2">{tempMax}°</span>
        <span className="text-lg text-gray-400">{tempMin}°</span>
      </div>
    </div>
  );
};

export default DayCard;