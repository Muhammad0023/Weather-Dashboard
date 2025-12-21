import React from 'react';
const CurrentWeather = ({ weatherData }) => {
  // 1. Safety Check- If data hasn't loaded yet return null or a loading skeleton.
  if (!weatherData) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 text-center text-gray-500">
        Search for a city above to see the current weather!
      </div>
    );
  }

  // 2. Destructure data for cleaner access 
  const { name, main, wind, weather } = weatherData;
  const temp = Math.round(main.temp);
  const condition = weather[0].description;
  const iconCode = weather[0].icon; 

  // Function to get the URL for the weather icon
  const getIconUrl = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;
  return (
    // Main weather card container
    <div className="p-6 bg-blue-600 rounded-xl shadow-2xl border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        {/* Left Side: City and Temp */}
        <div>
          <h3 className="text-3xl font-bold text-white">{name}</h3>
          <p className="text-sm text-white">{new Date().toDateString()}</p>
        </div>
        
        {/* Right Side: Icon and Condition */}
        <div className="text-right">
          <img 
            src={getIconUrl(iconCode)} 
            alt={condition} 
            className="w-16 h-16 mx-auto -mt-4" // Use margin to align better
          />
          <p className="text-md font-medium capitalize text-white">
            {condition}
          </p>
        </div>
      </div>

      {/* Large Temperature Display */}
<div className="text-center my-6">
  <span className="text-7xl sm:text-8xl md:text-9xl font-extrabold text-white relative">
    {temp}
    <span className="absolute top-0 text-3xl sm:text-4xl">°C</span> 
  </span>
</div>

      {/* Details Grid- Humidity, Wind Speed, etc. */}
      <div className="grid grid-cols-3 gap-4 border-t pt-4 text-center">
        {/* Detail 1: Humidity */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Humidity</p>
          <p className="text-xl font-semibold text-gray-700">{main.humidity}%</p>
        </div>

        {/* Detail 2: Wind Speed */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Wind Speed</p>
          <p className="text-xl font-semibold text-gray-700">{Math.round(wind.speed)} km/h</p>
        </div>
        
        {/* Detail 3: Min/Max Temp (Example of another useful metric) */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Low/High</p>
          <p className="text-xl font-semibold text-gray-700">
            {Math.round(main.temp_min)}° / {Math.round(main.temp_max)}°
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;