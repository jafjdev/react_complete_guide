import React ,{useEffect}from 'react';
import classes from './Cockpit.css';

const Cockpit = (props) => {
    useEffect(()=>{
        //will run in every componentlifecycle - every render
       console.log(('[Cockpit.js] useeffect'))
        //HTTP request...
    });
    const assignedClasses = [];// "red bold"
    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;
    }
    if (props.persons.length <= 2) {
        assignedClasses.push('red'); //classes = ['red']
    }
    if (props.persons <= 1) {
        assignedClasses.push('bold'); //classes = ['red','bold']
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button className={btnClass} onClick={props.clicked}>Toggle Persons</button>
        </div>
    );
}

export default Cockpit;
