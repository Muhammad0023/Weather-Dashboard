import React from 'react';
import DayCard from './DayCard'; 

const aggregateDailyData = (forecastList) => {
  const dailyMap = new Map();

  forecastList.forEach(item => {
    // Get the date string eg. Mon to use as the key
    const dateKey = new Date(item.dt * 1000).toDateString(); 
    const temp = item.main.temp;

    if (!dailyMap.has(dateKey)) {
      // First entry for this day
      dailyMap.set(dateKey, {
        day: dateKey,
        min: temp,
        max: temp,
        weather: item.weather[0], 
      });
    } else {
      // Subsequent entry- update min and max temperatures
      const existingData = dailyMap.get(dateKey);
      dailyMap.set(dateKey, {
        ...existingData,
        min: Math.min(existingData.min, temp),
        max: Math.max(existingData.max, temp),
      });
    }
  });

  return Array.from(dailyMap.values()).slice(1, 6); 
};

const WeeklyForecast = ({ forecastList }) => {
  if (!forecastList || forecastList.length === 0) return null;
  
  // Aggregate the data to get the daily high/lows
  const dailySummary = aggregateDailyData(forecastList);

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
        5-Day Forecast
      </h3>

      <div className="space-y-2">
        {dailySummary.map((dayData, index) => (
          <DayCard key={index} dayData={dayData} />
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;