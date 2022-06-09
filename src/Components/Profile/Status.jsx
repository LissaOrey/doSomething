import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStatusLoading, updateStatus } from '../../Redux/Slices/profileSlice';

const Status =(props)=>{

    const [boo, setBoo ] = useState(true);  
    const status = useSelector(state => state.profile.status);
    const dispatch = useDispatch();
    const statusLoaded = useSelector(state=>state.profile.statusLoaded);
    
   return(
    <div>
        {/* //flux круговорот здесь не реализовывается так,как функция updateStatus делает запрос на сервер и это тормозит набор текста. это можно решить если dispatch(setStatus(status)) из этой функции перенести в onChange этого инпута */}
        
        { boo && !statusLoaded && <span onClick={()=>{setBoo(false)}} >{status || 'Нажмите,чтобы написать статус'} </span>}
        { boo && statusLoaded && <span >Loading...</span>}
        { !boo  && <input autoFocus type={'text'} maxLength={'300'} defaultValue={status} onBlur={(e)=>{
                if(status!==e.currentTarget.value){
                    dispatch(setStatusLoading(true));
                    updateStatus(dispatch, e.currentTarget.value)
                }
                setBoo(true);
            }} ></input>
        }
    </div>

   )
}
export default Status;