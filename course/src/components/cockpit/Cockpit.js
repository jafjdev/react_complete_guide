import React, {useEffect} from 'react';
import classes from './Cockpit.css';

const Cockpit = (props) => {
    useEffect(() => {//funciona como componentDidmount (solo funciona al inicio) si el array se deja empty
        //will run in every componentlifecycle - every render
        console.log(('[Cockpit.js] useeffect'));
        //HTTP request...
        return () => { //funcinara antes del primer useEffect pero luego del primer render cycle
            console.log('[Cockpit.js] Cleanup work in useEffect')
        };
    }, [props.personsLength]);
    const assignedClasses = [];// "red bold"
    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;
    }
    if (props.personsLength.length <= 2) {
        assignedClasses.push('red'); //classes = ['red']
    }
    if (props.personsLength <= 1) {
        assignedClasses.push('bold'); //classes = ['red','bold']
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button className={btnClass} onClick={props.clicked}>Toggle Persons</button>
        </div>
    );
};

export default React.memo(Cockpit);
