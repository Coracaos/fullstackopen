import CountryWeather from "./CountryWeather";


const CountryDetail = ({country})  => {

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital  {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(lg => <li key={lg}>{lg}</li>)}
      </ul>
      <img src={country.linkFlag} alt="flag" width="280" height="170"/>
      <CountryWeather city={country.capital} lat={country.capitalLat} lng={country.capitalLng}/>
    </div>
  )
}

export default CountryDetail;