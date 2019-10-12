import React from 'react';
import player from '../images/player.jpg';
import white from '../images/white.png';

const Cell = (props) => {
   const cls = props.value === 0
        ? 'square zero'
        : 'square';
    return (
         props.value === 0 ? <img className={cls}   onClick = {() => props.clickHandler()} alt='person' style={{width:60}} src={player} />  : <img className={cls}   onClick = {() => props.clickHandler()} style={{width:60}} alt={props.value} src={white} /> 
    
    );
};

export default Cell;