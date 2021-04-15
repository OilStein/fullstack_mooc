import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  // Remember to start json-server
  // Mocharoo generated json data

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setNewSearch] = useState("");

  useEffect(
    () =>
      personService.getAll().then((initialPersons) => {
        setPersons(initialPersons);
      }),
    []
  );

  const addNumber = (event) => {
    event.preventDefault();
    console.log("Add button clicked", event.target);
    console.log("Add name", persons);

    const phoneObject = {
      name: newName,
      number: newNumber,
    };

    const inList = !persons.includes(
      persons.find(({ name }) => name === phoneObject.name)
    )
      ? personService.create(phoneObject).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        })
      : window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ? changeNum(
          persons.find(({ name }) => name === phoneObject.name).id,
          newNumber
        )
      : (setNewNumber(""), setNewName(""));

    console.log("This adding", inList);
  };

  const changeNum = (id, num) => {
    const person = persons.find((n) => n.id === id);
    const changedNumber = { ...person, number: num };

    personService.update(id, changedNumber).then((returnedNum) => {
      setPersons(
        persons.map((person) => (person.id !== id ? person : returnedNum))
      );
    });
  };

  const deletePerson = (e) => {
    //console.log(persons);
    // const newList = persons.filter(person => e.target.value !== person.id)
    console.log(e);
    const person = e.target.name;

    window.confirm(`Delete ${person}?`)
      ? personService
          .deletePerson(e.target.id)
          .then(
            () =>
              personService.getAll().then((initialPersons) => {
                setPersons(initialPersons);
              }),
            []
          )
          .catch((error) => {
            alert(`That person '${person}' was already deleted from server`);
            setPersons(persons.filter((n) => n.id !== e.target.id));
          })
      : console.log("Cancel");
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
      <Persons persons={persons} search={search} del={deletePerson} />
    </div>
  );
};

export default App;
