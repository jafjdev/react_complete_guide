import React from "react";
import Person from "./Person/Person";

const Persons = (props) => {
    return (props.persons.map((person, index) =>
        <Person
            key={index}
            click={() => props.clicked(index)}
            name={person.name}
            age={person.age}
            changed={(event) => props.changed(event, index)}
        />));
};

export default Persons;
