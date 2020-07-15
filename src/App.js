import React, {useState} from 'react';
import './App.css';
import Person from './Person/Person';

const app = props => {
    const [personsState, setPersonsState] = useState({
            persons: [
                {
                    name: 'Jose',
                    age: 23
                }, {
                    name: 'Ramiro',
                    age: 23
                }, {
                    name: 'Manuel',
                    age: 23
                }
            ],
            otherState: 'some other value'
        })
    ;

    const switchNameHandler = () => {
        setPersonsState({
            persons: [
                {
                    name: 'Jose Cedeño',
                    age: 23
                }, {
                    name: 'Ramiro Vargas',
                    age: 23
                }, {
                    name: 'Manuel Espinoza',
                    age: 23
                }
            ],
            otherState: this.otherState
        })
    };
    return (
        <div className="App">
            <button onClick={switchNameHandler}>Switch Name</button>
            <Person name={personsState.persons[0].name} age={personsState.persons[0].age}/>
            <Person name={personsState.persons[1].name} age={personsState.persons[1].age}/>
            <Person name={personsState.persons[2].name} age={personsState.persons[2].age}/>
        </div>
    );
}


export default app;
