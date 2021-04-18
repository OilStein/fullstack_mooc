import React from "react";

const Countries = ({ countries, search, handler}) => {

  return countries
    .filter((el) => el.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    .map((country) => (
      <div>
        {country.name}
        <button type="button" onClick={handler} value={country.name}>show</button>
      </div>
    ));
};

export default Countries;
