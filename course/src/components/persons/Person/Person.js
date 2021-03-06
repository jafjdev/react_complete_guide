import React from 'react';
import './Person.css'
import styled from "styled-components";

const StyledDiv = styled.div`
                width: 60%;
                margin: 16px auto auto auto;
                border: 1px solid #eee;
                box-shadow: 0 2px 3px #ccc;
                padding: 16px;
                text-align: center
                
                '@media(min-width:500px)': {width: '450px'}
                `;
const person = (props) => {
    console.log('[Person.js] rendering... ');
    return (
        <StyledDiv>
            <p onClick={props.click}> Hello! I'm {props.name} and i am {props.age} years old.</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </StyledDiv>

    );
};

export default person;
