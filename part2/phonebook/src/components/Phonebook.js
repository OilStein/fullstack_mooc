import React from 'react'

const Phonebook = ({ person, del }) => {
    // console.log("Name:", person);
  
    return (
      <li key={person.id}>
        {person.name} {person.number} 
        <button type='button' onClick={del} id={person.id} name={person.name}>delete</button>
      </li>
    );
  };

  export default Phonebook