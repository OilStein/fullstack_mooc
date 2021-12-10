import React, { useState, useEffect } from "react";
import axios from "axios";

import CountryInput from "./components/CountyInput";
import Countries from "./components/Countries";
import CountryInfo from './components/CountryInfo'

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setNewSearch] = useState("");

  const handleSearchInput = (event) => {
    setNewSearch(event.target.value);
    console.log("Search input", event.target.value);
  };

  const handleClick = (e) => {
    // console.log(e);
    setNewSearch(e.target.value)
    console.log('New search value: ', e.target.value);
  }
  

  const countryHook = () => {
    console.log("effect country hook");
    axios.get("https://restcountries.com/v2/all").then((response) => {
      console.log("fulfilled");
      setCountries(response.data);
    });
  };

  useEffect(countryHook, []);


  const countFiltered = (querry) => {
    return countries.filter(
      (el) => el.name.toLowerCase().indexOf(querry.toLowerCase()) !== -1
    ).length;
  };

  // console.log(countFiltered(search));


const oneCountryLeft = countFiltered(search) === 1
? <OneCountry country={countries} search={search}/>
:<Countries countries={countries} search={search} handler={handleClick} />


const filteredList = countFiltered(search) > 10
? "Too many matches, specify another filter"
:  oneCountryLeft


  return (
    <div>
      <CountryInput search={search} handleSearchInput={handleSearchInput} />
      {filteredList}
    </div>
  );
}

const OneCountry = ({country, search}) => {
  return country
    .filter(
      (el) => el.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    )
    .map((country) => <CountryInfo key={country.alpha2Code} country={country} />);
}





export default App;
