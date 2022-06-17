import React from 'react';
import Game from './Game';

const GameContainer =(props)=>{

    const field=
        [
            { id: 1, x: 0, y: 0, value: '' },//
            { id: 2, x: 0, y: 1, value: '' },
            { id: 3, x: 0, y: 2, value: '' },
            { id: 4, x: 0, y: 3, value: '' },
            { id: 5, x: 1, y: 0, value: '' },//
            { id: 6, x: 1, y: 1, value: '' },
            { id: 7, x: 1, y: 2, value: '' },
            { id: 8, x: 1, y: 3, value: '' },
            { id: 9, x: 2, y: 0, value: '' },//
            { id: 10, x: 2, y: 1, value: '' },
            { id: 11, x: 2, y: 2, value: '' },
            { id: 12, x: 2, y: 3, value: '' },
            { id: 13, x: 3, y: 0, value: '' },//
            { id: 14, x: 3, y: 1, value: '' },
            { id: 15, x: 3, y: 2, value: '' },
            { id: 16, x: 3, y: 3, value: '' }
        ]
    
    const score = 0;
    const bestScore = 0;
    const isWin = false;



    return (<div>
        <Game 
            field={field} 
            score={score} 
            bestScore={bestScore} 
            isWin={isWin} 
        />
        
    </div>)
}

export default GameContainer;