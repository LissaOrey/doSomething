import React from 'react';
import Button from '../../utils/Button';
import s from './Interface.module.css';

const Interface=(props)=>{
    return(
        <div className={s.gameInterface}>    
            <div className={s.interfaceButton}>
                <Button className={s.btn} value='Restart' disabled={props.openPopup} onClick={props.restartGame} />
                
            </div>                
            <span>best score: {props.bestScore} </span>
            <span className={s.score}>score: {props.score}</span>
        </div>
    )
}

export default Interface;