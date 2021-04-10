import React from "react";
import Phonebook from "./Phonebook";

const Persons = (props) => {
  return props.persons
    .filter((el) => el.name.toLowerCase().indexOf(props.search.toLowerCase()) !== -1)
    .map((person) => <Phonebook key={person.name} person={person} />);
};

export default Persons;
