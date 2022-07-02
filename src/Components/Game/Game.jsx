import React, { useState, useEffect } from 'react';
import s from './Game.module.css';
import Popup from '../Popup/Popup';
import {  startRandom } from './gameLogic/gameStart';
// import { addNum } from './gameLogic/addNumber';
import { changeArrData, goDown, goLeft, goRight, goTo, goUp } from './gameLogic/playGame';
import Interface from './Interface/Interface';


// const Game = React.memo(props => {
const Game = (props) => {
    const [openPopup, setOpenPopup] = useState(false);

    const [field, setField] = useState(props.field);
    const [score, setScore] = useState(props.score);
    const [bestScore, setBestscore] = useState(props.bestScore);
    const [isWin, setIsWin] = useState(props.isWin)

    const cellStyle = (num) => {
        switch (num) {
            // case '':{
            //     return style.num
            // }
            case  2 : {
                return s.num2
            }
            case  4 : {
                return s.num4
            }
            case  8 : {
                return s.num8
            }
            case  16 : {
                return s.num16
            }
            case  32 : {
                return s.num32
            }
            case  64 : {
                return s.num64
            }
            case  128 : {
                return s.num128
            }
            case  256 : {
                return s.num256
            }
            case  512 : {
                return s.num512
            }
            case  1024 : {
                return s.num1024
            }
            case  2048 : {
                return s.num2048
            }
            default:
                break;
        }
    }
    
    

    const restart = () => {
            let copy = field.map(f => ({ ...f }));
            copy.forEach(el => {
                el.value =  0;
            })
            // datas saves in startRandom function
            startRandom(copy,setField)
            setScore(0)
    }
    //события клавиатуры
    useEffect(() => {
        const onKeyDown = e =>
            (e.keyCode === 39) ? goTo(goRight,field,setField,score, setScore) :
                (e.keyCode === 37) ? goTo(goLeft,field,setField,score, setScore) :
                    (e.keyCode === 40) ? goTo(goDown,field,setField,score, setScore) :
                        (e.keyCode === 38) ? goTo(goUp,field,setField,score, setScore) :
                            false;
        ;
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    });
    //!старт игры
    useEffect(() => {
        let copy = field.map(f => ({ ...f }));
        startRandom(copy, setField)
    },[])
    // win game 
    useEffect(() => {
        // gameOver(field);
        let a = field.some((el) => {
            return el.value === 2048
        })
        if (a) {
            setIsWin(true)
            // setOpenPopup(true);
        }
    }, [field])

       
    //game over 
    useEffect(()=>{
        const gameOver = (copy) => {
            //best score
            const bestScoreValue =()=>{
                if (score > bestScore) {
                setBestscore(score)
                } 
            }
            // let copy = field.map(f => ({ ...f }));
            let f = [
                [], [], [], []
            ];
            changeArrData(copy, f);
            if (f[0][0] !==  0 && f[0][1] !==  0 && f[0][2] !==  0 && f[0][3] !==  0 && f[1][0] !==  0 && f[1][1] !==  0 && f[1][2] !==  0 && f[1][3] !==  0 && f[2][0] !==  0 && f[2][1] !==  0 && f[2][2] !==  0 && f[2][3] !==  0 && f[3][0] !==  0 && f[3][1] !==  0 && f[3][2] !==  0 && f[3][3] !==  0 && f[0][0] !== f[0][1] && f[0][0] !== f[1][0] && f[0][1] !== f[1][1] && f[0][1] !== f[0][2] && f[0][2] !== f[0][3] && f[0][2] !== f[1][2] && f[0][3] !== f[1][3] && f[1][0] !== f[1][1] && f[1][0] !== f[2][0] && f[1][1] !== f[1][2] && f[1][2] !== f[1][3] && f[1][1] !== f[2][1] && f[1][2] !== f[2][2] && f[1][3] !== f[2][3] && f[2][3] !== f[3][3] && f[3][2] !== f[3][3] && f[2][2] !== f[3][2] && f[2][1] !== f[2][2] && f[2][1] !== f[3][1] && f[3][1] !== f[3][2] && f[2][0] !== f[2][1] && f[2][0] !== f[3][0] && f[3][0] !== f[3][1] && f[2][2] !== f[2][3]) {
                setOpenPopup(true);
                bestScoreValue()
            }
        }
        gameOver(field);
    },[field, bestScore,score ])
 
const onClickPlayAgain=()=>{
    setOpenPopup(false); 
    restart();
}
const closePopup=()=>{
    setIsWin(false);
    restart()
}
    return (<div >
        {openPopup && <Popup text='GAME OVER'
                                btnOnClick={onClickPlayAgain}
                                btnValue='Play again'
                                btnClassName={s.popupbtn}
             />
        }
        {isWin &&  <Popup text='YOU WIN' closePopup={closePopup} closeSpan='x'  /> }
            <div>
                <Interface bestScore={bestScore} 
                        restartGame={restart}
                        score={score}
                        openPopup={openPopup} />
                
                <div className={s.field}>
                    {field.map(c => <div key={c.id} className={s.cell + ' ' + cellStyle(c.value)}>
                        {c.value>0 ? c.value :  ''}
                    </div>)}
                </div>
            </div>
    </div>)
}
// })

export default Game;