import Country from './Country'

const CountryList = ({countries, setCountries}) => {

  const showCountries = () => {
    return (
      <div>
        {countries.map(c => <Country key={c.name} country={c} setCountries={setCountries}/>)}
      </div>
    );
  }

  return (
    <>
      {showCountries()}
    </>
  );
}

export default CountryList;