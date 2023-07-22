import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAll =  async () => {
  const req = axios.get(`${baseUrl}/all`);
  return req.then(resp => resp.data.map(d => ({
    name: d.name.common,
    capital: d.capital,
    area: d.area,
    languages: d.languages ? Object.values(d.languages) : [],
    linkFlag: d.flags.png,
    capitalLat: d.capitalInfo.latlng ? d.capitalInfo.latlng[0] : null,
    capitalLng: d.capitalInfo.latlng ? d.capitalInfo.latlng[1] : null 
  })))
}

const exported = {
  getAll,
}

export default exported;