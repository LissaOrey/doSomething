import React, {useState} from 'react';
import Button from '../utils/Button/Button';
import s from './Popup.module.css'


const Popup=(props)=>{
    const [isClose, setIsClose] = useState(false);
    // props: 
    // closeSpan это значение которое вы помещаете в спан, 
    // нажимая на которое вы закроете этот попап
    // closePopup это функция которая выполняется при закрытии попапа
    // по умолчанию стоит ф-ция close, вы можете сделать свою
    // text сообщение, которое вы хотите передать пользователю
    // btnValue btnOnClick btnClassName пропсы компонента <Button /> 
    // без btnValue кнопка не появится
    const close=()=>{
        setIsClose(true)
    }
    return(
        <div className={s.block}>
            <div className={isClose ? s.close : s.popup}>
                {props.closeSpan && <span className={s.closeSpanBtn} 
                                          onClick={props.closePopup ? props.closePopup : close } 
                                          >{props.closeSpan}</span>}
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