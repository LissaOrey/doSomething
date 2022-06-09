import { createSlice } from "@reduxjs/toolkit";
import { AuthAPI } from "../../API-AXIOS/api";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        id: null,
        email: null,
        login: null,
        isAuth: false,
        toggle: false
    },
    reducers:{
        auth: (state,action)=>{
                state.isAuth = action.payload
        },
        setLogin: (state,action)=>{
            state.login = action.payload
        },
        setEmail: (state,action)=>{
            state.email = action.payload
        },
        setId: (state,action)=>{
            state.id = action.payload
        },
        setToggle: (state,action)=>{
            state.toggle = action.payload
        },
    }
})

export const authMe=(dispatch)=>{
    AuthAPI.authMe().then(response=>{
       if(response.data.resultCode===0){
          dispatch(auth(true))
          let {id, email, login} = response.data.data;
          dispatch(setLogin(login))
          dispatch(setId(id))
          dispatch(setEmail(email))
          dispatch(setToggle(true))
       }else if(response.data.resultCode===1){
          dispatch(auth(false))
          dispatch(setLogin(null))
          dispatch(setId(null))
          dispatch(setEmail(null))
          dispatch(setToggle(true))
          
       }
    })
}



const {actions, reducer} = authSlice;
export const {auth,setLogin, setEmail, setId,setToggle} = actions;
export default reducer;