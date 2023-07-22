const Country = ({country, setCountries}) => {

  const handleClick = () => {
    setCountries([{...country}]);
  }

  return (
    <div>{country.name} <button onClick={handleClick}>show</button></div>
  );

}

export default Country;