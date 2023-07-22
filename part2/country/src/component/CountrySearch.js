import {useState} from 'react';

const CountrySearch = ({totalCountries, setCountries}) => {

  const [searchValue, setSearchValue] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => {
        const searchCountries = totalCountries.filter(d => d.name.toLowerCase().includes(inputValue.toLowerCase()));
        setCountries(searchCountries);
    }, 500);
    setTimeoutId(newTimeoutId);
  }

  return (
    <div>
      find countries <input value={searchValue} onChange={handleChange}></input>
    </div>
  );
}

export default CountrySearch;