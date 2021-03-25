import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "873-492847" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setNewSearch] = useState("");

  const addNumber = (event) => {
    event.preventDefault();
    console.log("Add button clicked", event.target);
    console.log(persons);

    const phoneObject = {
      name: newName,
      number: newNumber,
    };

    const inList = persons.includes(
      persons.find(({ name }) => name === phoneObject.name)
    )
      ? (window.alert(`${newName} is already in use!`),
        setNewName(""),
        setNewNumber(""))
      : setPersons(persons.concat(phoneObject));

    console.log(inList);

    // I guess it is bad to use console.log to use function => warning otherwise


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

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setNewSearch(event.target.value);
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
      <div>
        filter shown with <input value={search} onChange={handleSearchChange}></input>
      </div>
      <h2>add a new</h2>
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
