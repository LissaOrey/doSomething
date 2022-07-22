import React from 'react';
import s from './Button.module.css';

const Button=({className,onClick,disabled,value})=>{
    //you  can use this classNames <Button className={'danger'} />  
    // or use new className in your component <Button className={s.btn}  />
    //this classNAmes only for example
    //! do styles is great
    return(
        <>
            <button className={className==='danger' ? s.danger : 
                                className==='blue' ? s.blue : className} 
                                onClick={onClick} disabled={disabled} >{value}</button>
        </>
    )
}
export default Button;