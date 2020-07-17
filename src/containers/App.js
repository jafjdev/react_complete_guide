import React, {Component} from 'react';
import './App.css';
import Person from "../components/persons/Person/Person";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

class App extends Component {
    state = {
        persons: [
            {name: 'Max', age: 28}
        ],
        otherState: 'some other value',
        showPersons: false,
        text: '',
        textLength: 1
    };

    deletePersonHandler = (index) => {
        const persons = [...this.state.persons];
        persons.splice(index, 1);
        this.setState({persons: persons})
    }

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    }

    nameChangeHandler = (event, index) => {
        /*const personIndex - this.state.persons.findIndex(p =>{
            return p.id === id;
        });*/
        const person = {...this.state.persons[index]};
        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[index] = person;

        this.setState({
                persons: persons
            }
        )
    }


    render() {
        const style = {
            backgroundColor: 'green',
            color: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer',
            ':hover': {
                backgroundColor: 'lightgreen',
                color: 'black'
            }
        };
        let persons = null;
        if (this.state.showPersons) {
            persons =
                <div>
                    {this.state.persons.map((person, index) =>
                        <ErrorBoundary>
                            < Person
                                key={index}
                                click={() => this.deletePersonHandler(index)}
                                name={person.name}
                                age={person.age}
                                changed={(event) => this.nameChangeHandler(event, index)}
                            />
                        </ErrorBoundary>
                    )}
                </div>;
            style.backgroundColor = 'red';
            style[":hover"] = {
                backgroundColor: 'lightred',
                color: 'black'
            }
        }

        const classes = [];// "red bold"
        if (this.state.persons.length <= 2) {
            classes.push('red'); //classes = ['red']
        }
        if (this.state.persons <= 1) {
            classes.push('bold'); //classes = ['red','bold']
        }
        return (
            <div>
                <h1>Hi, I'm a React App</h1>
                <p className={classes.join(' ')}>This is really working!</p>
                <button style={style} onClick={this.togglePersonsHandler}>Toggle Persons</button>
                {persons}
            </div>
        );
    }
}

export default App;
