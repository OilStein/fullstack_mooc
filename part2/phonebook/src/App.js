import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  // Remember to start json-server
  // Mocharoo generated json data

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setNewSearch] = useState("");
  const [notification, setNotification] = useState(null);
  const [errorBoolean, setErrorBoolean] = useState(false);

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
          setNotification(`Added ${phoneObject.name}`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        }).catch(e => {
          console.log(e.response.data);
          setErrorBoolean(true)
          setNotification(e.response.data.error)
          setTimeout(() => {
            setNotification(null)
            setErrorBoolean(false)
          }, 5000)
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
      setNotification(`'${person.name}' number changed to '${num}'`);
      setTimeout(() => setNotification(null), 5000);
    }).catch(e => console.log(e.response.data));
  };

  const deletePerson = (e) => {
    //console.log(persons);
    // const newList = persons.filter(person => e.target.value !== person.id)
    console.log("delete e props ", e);
    const personName = e.target.name;

    window.confirm(`Delete ${personName}?`)
      ? personService
          .deletePerson(e.target.id)
          .then(
            () =>
              personService.getAll().then((initialPersons) => {
                setPersons(initialPersons);
              }),
            setNotification(`'${personName}' deleted succesfully`),
            setTimeout(() => {
              setNotification(null);
            }, 5000),
            []
          )
          .catch((error) => {
            setErrorBoolean(true);
            setNotification(
              `'${personName}' is already deleted from the server`
            );
            setTimeout(() => {
              setNotification(null);
              setErrorBoolean(false);
            }, 5000);
          })
      : console.log("Cancel");

    setPersons(persons.filter((n) => n.id !== e.target.id));
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
      <Notification message={notification} error={errorBoolean} />
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
