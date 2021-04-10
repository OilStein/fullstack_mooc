import React from 'react'

const Phonebook = ({ person }) => {
    // console.log("Name:", person);
    return (
      <li key={person.name}>
        {person.name} {person.number}
      </li>
    );
  };

  export default Phonebook