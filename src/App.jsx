import React, { useState, useEffect } from 'react'; 
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import WeeklyForecast from "./components/WeeklyForecast";
import WeatherSkeleton from "./components/WeatherSkeleton"; 

const OPENWEATHER_API_KEY = "966e43678d4cff040cdcd4eca92975d2"; 

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastList, setForecastList] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initial Data Fetch on Component Mount
  useEffect(() => {
    handleSearch('Addis Ababa'); 
  }, []);

  const fetchCurrentWeather = async (query) => { 
    
    const isCoords = query.startsWith('lat=');
    
    let url;
    if (isCoords) {
        // Use the coordinate-based endpoint
        url = `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    } else {
        // Use the city name endpoint
        url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    }
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Location not found or server error');
        }

        const data = await response.json();
        setWeatherData(data); 
        return data.coord; // Return the coordinates for the next fetch
        
    } catch (err) {
        setError(err.message || 'Failed to fetch current weather.');
        console.error("API Fetch Error:", err);
        return null;
    }
  };

  /**
   * Function 2- Fetches the FULL 5-day forecast using coordinates.
   */
  const fetchForecastData = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch forecast data.');
      }
      const data = await response.json();
      setForecastList(data.list); // Save the entire 40-item list

    } catch (err) {
      setError(err.message || 'Failed to fetch forecast.');
      console.error("Forecast Fetch Error:", err);
    }
  };


  /**
   * COMBINED HANDLER- Orchestrates both API calls.
   */
  const handleSearch = async (city) => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastList(null); // Reset all data

    const coords = await fetchCurrentWeather(city);

    if (coords) {
      await fetchForecastData(coords.lat, coords.lon);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6">
        
        <SearchBar onSearch={handleSearch} /> 
        
        {/* Messages-Error State Displays on its own */}
        {error && <p className="text-red-600 font-semibold p-4 bg-red-100 rounded-lg">Error: {error}</p>}

        {/* LOADING STATE- Show the Skeleton if loading is true AND there's no error */}
        {loading && !error && (
            <WeatherSkeleton />
        )}

        {/* DATA DISPLAY- Only render the actual components if we have data AND we're NOT loading */}
        {(!loading && weatherData) && (
            <>
                <CurrentWeather weatherData={weatherData} />
                
                {/* Check for forecast data before rendering the lists */}
                {forecastList && (
                  <>
                    <HourlyForecast forecastData={forecastList.slice(0, 8)} />
                    <WeeklyForecast forecastList={forecastList} />
                  </>
                )}
            </>
        )}

      </div>
    </div>
  );
};

export default App;