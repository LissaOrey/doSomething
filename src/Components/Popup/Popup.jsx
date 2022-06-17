import React from 'react';
import Button from '../utils/Button';
import s from './Popup.module.css'


const Popup=(props)=>{
    return(
        <div className={s.block}>
            <div className={s.popup}>
                {props.closeSpan && <span className={s.closeSpan} onClick={props.closePopup} >{props.closeSpan}</span>}
                {props.text && <p>{props.text}</p>}
                {props.btnValue && <Button onClick={props.btnOnClick} 
                value={props.btnValue} className={props.btnClassName}
                />}

            </div>
            {/* {props.content} */}
        </div>
    )
}

export default Popup;