import React from 'react'

import './Button.css';

export default function Button({name, clickFunc}){
    return (
        <button onClick={clickFunc}>{name}</button>
    )
}
