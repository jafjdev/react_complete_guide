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
        textLength: 1,
        showCockpit: true
    };

    static getDerivedStateFromProps(props, state) {
        console.log('[App.jss] getDerivedStateFromProps', props);
        return state;
    }

    componentDidMount() {
        console.log('[App.js] componentDidMount');
    }

    componentDidUpdate() {
        console.log('[App.JS] componentDidUpdate');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[App.JS] shouldComponentComponent ');
        // si se mdifico la lista de personas o una persona retornara true
        if (nextProps.persons !== this.props.persons) {
            return true;
        } else
            return false;
    }

    deletePersonHandler = (index) => {
        const persons = [...this.state.persons];
        persons.splice(index, 1);
        this.setState({persons: persons})
    }

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    };

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
    };


    render() {
        console.log('[App.js] render');
        let persons = null;
        if (this.state.showPersons) {
            persons =
                <Persons persons={this.state.persons}
                         clicked={this.deletePersonHandler}
                         changed={this.nameChangeHandler}/>;
        }


        return (
            <div>
                <Navbar/>
                <button onClick={() => this.setState({showCockpit: false})}>Remove Cockpit</button>
                {
                    this.state.showCockpit ?
                        <Cockpit showPersons={this.state.showPersons}
                                 personsLength={this.state.persons.length}
                                 clicked={this.togglePersonsHandler}
                                 title={this.props.appTitle}
                        /> : null
                }
                {persons}
            </div>
        );
    }
}

export default App;
