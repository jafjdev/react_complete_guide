import React, {Component} from 'react';
import './App.css';
import Navbar from "../components/navbar/Navbar";
import Persons from "../components/persons/Persons";
import Cockpit from "../components/cockpit/Cockpit";

class App extends Component {
    constructor(props) {
        super(props);
        console.log('[App.js] constructor');
    }

    state = {
        persons: [
            {name: 'Max', age: 28}
        ],
        otherState: 'some other value',
        showPersons: false,
        text: '',
        textLength: 1
    };

    static getDerivedStateFromProps(props, state) {
        console.log('[App.jss] getDerivedStateFromProps', props);
        return state;
    }

    componentDidMount() {
        console.log('[App.js] componentDidMount');
    }

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
        console.log('[App.js] render');
        let persons = null;
        if (this.state.showPersons) {
            persons =
                <Persons persons={this.state.persons}
                         clicked={this.deletePersonHandler}
                         changed={this.nameChangeHandler}/>

        }


        return (
            <div>
                <Navbar/>
                <Cockpit showPersons={this.state.showPersons}
                         persons={this.state.persons}
                         clicked={this.togglePersonsHandler}
                         title={this.props.appTitle}
                />
                {persons}
            </div>
        );
    }
}

export default App;
