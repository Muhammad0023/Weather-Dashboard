import React from 'react';

const HourlyForecast = ({ forecastData }) => {
  // Safety Check: Don't render if no data is available
  if (!forecastData || forecastData.length === 0) return null;

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
        24-Hour Forecast (3hr intervals)
      </h3>

      {/* Container for the small forecast cards - enables horizontal scroll */}
      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        
        {forecastData.map((item, index) => {
          // Format the time from the 'dt_txt' field
          const time = new Date(item.dt_txt).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          });
          const temp = Math.round(item.main.temp);
          const iconCode = item.weather[0].icon; 
          
          // Function to get the URL for the weather icon
          const getIconUrl = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;

          return (
            <div 
              key={index} 
              className="flex-shrink-0 w-24 p-3 text-center bg-gray-50 rounded-lg 
                         hover:bg-blue-100 transition duration-200 shadow-sm border border-gray-100"
            >
              {/* Time (e.g., 03:00 PM) */}
              <p className="text-sm font-medium text-gray-600 mb-1">
                {time.split(' ')[0]} 
                <span className="block text-xs text-blue-500 font-bold">{time.split(' ')[1]}</span>
              </p>
              
              {/* Icon */}
              <img 
                src={getIconUrl(iconCode)} 
                alt={item.weather[0].description} 
                className="w-10 h-10 mx-auto"
              />
              
              {/* Temperature */}
              <p className="text-xl font-bold text-gray-800 mt-1">
                {temp}°
              </p>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default HourlyForecast;