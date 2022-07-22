import React from 'react';
import Button from '../../utils/Button/Button';
import s from './Interface.module.css';

const Interface=(props)=>{
    
    let rulls = 'Двигайте цифры вверх вниз влево или право соединяя одинаковые цифры. Для того, чтобы передвигать цифры  нажимайте по клавишам ← ↑ ↓ → или A,W,S,D. Чтобы выиграть в головоломке 2048 необходимо выбрать тактику, придумать свою стратегию или алгоритм прохождения. А как иначе!? Это же головоломка!';

    return(
        <div className={s.gameInterface}>    
            <span className={s.rulls} data-title={rulls}>?</span>
            <div className={s.interfaceButton}>
                <Button 
                        className={s.btn} 
                        value='Restart' 
                        disabled={props.openPopup} 
                        onClick={props.restartGame} />
            </div>                
            <span>best score: {props.bestScore} </span>
            <span className={s.score}>score: {props.score}</span>
        </div>
    )
}

export default Interface;