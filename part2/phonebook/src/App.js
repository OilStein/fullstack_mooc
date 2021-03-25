import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "873-492847" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

 

  console.log('Find' , );

  const addNumber = (event) => {
    event.preventDefault();
    console.log("Add button clicked", event.target);
    console.log(persons);

    const phoneObject = {
      name: newName,
      number: newNumber,
    };
   
    
    
    setPersons(persons.concat(phoneObject));
    setNewName("");
    setNewNumber("");
  };

  
  

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const Number = ({ person }) => {
    console.log("Name:", person);
    return (
      <li key={person.name}>
        {person.name} {person.number}
      </li>
    );
  };


  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Number key={person.name} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
