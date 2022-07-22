import React from 'react';
import Game from './Game';

const GameContainer = (props) => {

    const field = [
        { id: 1, x: 0, y: 0, value: 0 },
        { id: 2, x: 0, y: 1, value: 0 },
        { id: 3, x: 0, y: 2, value: 0 },
        { id: 4, x: 0, y: 3, value: 0 },
        { id: 5, x: 1, y: 0, value: 0 },
        { id: 6, x: 1, y: 1, value: 0 },
        { id: 7, x: 1, y: 2, value: 0 },
        { id: 8, x: 1, y: 3, value: 0 },
        { id: 9, x: 2, y: 0, value: 0 },
        { id: 10, x: 2, y: 1, value: 0 },
        { id: 11, x: 2, y: 2, value: 0 },
        { id: 12, x: 2, y: 3, value: 0 },
        { id: 13, x: 3, y: 0, value: 0 },
        { id: 14, x: 3, y: 1, value: 0 },
        { id: 15, x: 3, y: 2, value: 0 },
        { id: 16, x: 3, y: 3, value: 0 }
    ]

    // let arr= [];
    // let id = 1;
    // for(let i=0;i<4;i++){
    //     let f= -1;
    //     for (let k = 1; k < 5; k++) {
    //         arr.push({id: id, x: i, y:f+1, value: 0});
    //         f= f+1;
    //         id=id+1;
    //     }
    // }
    // console.log(arr)
    



    return (<div>
        <Game field={field} />

    </div>)
}

export default GameContainer;