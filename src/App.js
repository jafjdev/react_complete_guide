import React, {Component} from 'react';
import './App.css';
import Person from "./Person/Person";
import ValidationComponent from "./ValidationComponent/ValidationComponent";
import CharComponent from "./CharComponent/CharComponent";

class App extends Component {
    state = {
        persons: [
            {name: 'Max', age: 28},
            {name: 'Manu', age: 29},
            {name: 'Stephanie', age: 26}
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

    textLength = (event) => {
        const state = {...this.state};
        state.textLength = event.target.value.length;
        state.text = event.target.value;
        this.setState(state);
    };

    render() {
        let persons = null;
        let text = null;
        let charComponent = null;
        if (this.state.showPersons) {
            persons =
                <div>
                    {this.state.persons.map((person, index) =>
                        <Person
                            key={index}
                            click={() => this.deletePersonHandler(index)}
                            name={person.name}
                            age={person.age}
                            changed={(event) => this.nameChangeHandler(event, index)}
                        />
                    )}
                </div>
        }
        if (this.state.textLength > 5) {
            text = <ValidationComponent text="Text too large"/>
        } else {
            text = <ValidationComponent text="Text too short"/>
        }
        if (this.state.textLength > 0) {
            let array = this.state.text.split('');
            charComponent = array.map(letter => <CharComponent key={letter.index}
                                                               onClick={() => this.handleClick(letter.index)}
                                                               letter={letter}/>);
        }
        return (
            <div className="App">
                <h1>Hi, I'm a React App</h1>
                <p>This is really working!</p>
                <input type='text' onChange={this.textLength}/>
                {text}
                <button onClick={this.togglePersonsHandler}>Toggle Persons</button>
                {persons}
                {charComponent}
            </div>
        );
    }
}

export default App;
