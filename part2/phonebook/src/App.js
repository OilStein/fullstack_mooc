import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from './services/persons'

import axios from 'axios';


const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: "Arto Hellas", number: "873-492847" },
  //   { name: "Ada Lovelace", number: "39-44-5323523" },
  //   { name: "Dan Abramov", number: "12-43-234345" },
  //   { name: "Mary Poppendieck", number: "39-23-6423122" },
  // ]);

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setNewSearch] = useState("");

  const hook = () => {
    console.log('effect persons hook');
    axios.get('http://localhost:3001/persons').then(resposnse => {
      console.log("promise fulfilled");
      setPersons(resposnse.data)
    })
  }
  
  useEffect(hook, [])

  useEffect(() => personService.getAll().then(initialPersons => {
    setPersons(initialPersons)
  }))

  const addNumber = (event) => {
    event.preventDefault();
    console.log("Add button clicked", event.target);
    console.log(persons);

    const phoneObject = {
      name: newName,
      number: newNumber,
    };

    const inList = !persons.includes(
      persons.find(({ name }) => name === phoneObject.name)
    )
      ? setPersons(persons.concat(phoneObject))
      : (setNewNumber(""),
        window.alert(`${newName} is already in use!`),
        setNewName(""));

    console.log(inList);

    personService.create(phoneObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })

  };

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    // console.log(event.target.value);
    setNewSearch(event.target.value);
  };

 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handler={handleSearchChange}></Filter>
      <h2>Add a new</h2>
      <PersonForm
        addNumber={addNumber}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      ></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} search={search}></Persons>
    </div>
  );
};

export default App;
