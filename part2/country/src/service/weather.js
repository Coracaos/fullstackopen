import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = process.env.REACT_APP_API_KEY;

const getWeatherCountry =  async (lat, lon) => {

  const mapping = (data) => {
    return {
      city: data.name,
      temperature: data.main.temp,
      windSpeed: data.wind.speed,
      linkIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    }
  }

  const req = axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
  return req.then(resp => mapping(resp.data));

}

const exported = {
  getWeatherCountry,
}

export default exported;