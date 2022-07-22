import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus } from '../../Redux/Slices/profileAsyncThunks';
import s from './Profile.module.css';


const Status =(props)=>{

    const [boo, setBoo ] = useState(true);  //show span or input
    const status = useSelector(state => state.profile.status);
    const dispatch = useDispatch();
    const statusFetching = useSelector(state=>state.profile.statusFetching);
    let title = 'Нажмите,чтобы написать статус';
    
   return(
    <div>
        {/* //flux круговорот здесь не реализовывается так,как функция updateStatus делает запрос на сервер и это тормозит набор текста. это можно решить если dispatch(setStatus(status)) из этой функции перенести в onChange этого инпута */}
        
        { boo && statusFetching!=='loading' && <span className={s.status} data-title={title} onClick={()=>{setBoo(false)}} >status: {status || 'Нажмите,чтобы написать статус'} </span>}
        { statusFetching==='loading'   && <span >Loading...</span>}
        { !boo  && <input autoFocus type={'text'} 
                           maxLength={'300'} 
                           defaultValue={status} 
                           onBlur={(e)=>{
                                if(status!==e.currentTarget.value){
                                    dispatch(updateStatus(e.currentTarget.value))
                                }
                                setBoo(true);
                            }} 
                    />
        }
    </div>

   )
}
export default Status;