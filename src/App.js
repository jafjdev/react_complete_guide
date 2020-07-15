import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
    state = {
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
        ]
    }

    switchNameHandler = () => {
        console.log('Was clicked!')
    }

    render() {
        return (
            <div className="App">
                <button onClick={this.switchNameHandler}>Switch Name</button>
                <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
                <Person name={this.state.persons[1].name} age={this.state.persons[1].age}/>
                <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
            </div>

        );
    }
}

export default App;
