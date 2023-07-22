import {useEffect, useState} from 'react';
import CountrySearch from './component/CountrySearch';
import CountryList from './component/CountryList';
import CountryDetail from './component/CountryDetail';
import countryService from './service/country';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [totalCountries, setTotalCountries] = useState([]);

  useEffect(() => {
    countryService.getAll().then(data => setTotalCountries(data));
  }, []);

  const showCountriesInfo = (countries) => {
    if(countries.length > 10){
      return <div>Too many matches, specify another filter</div>
    }

    if(countries.length === 1){
      return <CountryDetail country={countries[0]} />
    }

    return <CountryList countries={countries} setCountries={setCountries}/>
  }

  return (
    <div>
      <CountrySearch totalCountries={totalCountries} setCountries={setCountries} />
      {showCountriesInfo(countries)}
    </div>
  );

}

export default App;
