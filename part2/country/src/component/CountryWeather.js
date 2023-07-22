import {useState, useEffect} from 'react';
import weatherService from '../service/weather';

const CountryWeather = ({city, lat, lng}) => {

  const [weather, setWeather] = useState();

  useEffect(() => {
    weatherService.getWeatherCountry(lat, lng)
    .then(data => setWeather(data));
  }, [lat, lng])

  return !weather ? null : (
    <div>
      <h2>Weather in {city}</h2>
      <p>temperature {weather.temperature} Celcius</p> 
      <img src={weather.linkIcon} alt="icon" width="100" height="100"/>
      <p>wind {weather.windSpeed} m/s</p>
    </div>
  )
}

export default CountryWeather;