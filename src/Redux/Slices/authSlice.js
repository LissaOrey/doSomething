import { createSlice } from "@reduxjs/toolkit";
import { AuthAPI, SecurityAPI } from "../../API-AXIOS/api";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        id: null,
        email: null,
        login: null,
        isAuth: false,
        authToggle: false,
        errorMessage: null,
        captchaUrl: null,
    },
    reducers: {
        auth: (state, action) => {
            state.isAuth = action.payload
        },
        setLogin: (state, action) => {
            state.login = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setId: (state, action) => {
            state.id = action.payload
        },
        setToggle: (state, action) => {
            state.authToggle = action.payload
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload
        },
        getCaptchaUrlSuccess: (state, action) => {
            state.captchaUrl = action.payload
        },
    }
})

export const authMe = async (dispatch) => {
    let response = await AuthAPI.authMe();
    if (response.resultCode === 0) {
        dispatch(auth(true))
        let { id, email, login } = response.data;
        dispatch(setLogin(login))
        dispatch(setId(id))
        dispatch(setEmail(email))
        dispatch(setToggle(true))
    } else if (response.resultCode === 1) {
        dispatch(auth(false))
        dispatch(setLogin(null))
        dispatch(setId(null))
        dispatch(setEmail(null))
        dispatch(setToggle(true))

    }
}

export const logout = async (dispatch) => {
    let response = await AuthAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(auth(false));
    }
    if (response.data.messages.length > 0) {
        dispatch(setErrorMessage(response.data.messages[0]));
    }
}

export const login = (dispatch, email, password, rememberMe, captcha) => {
    AuthAPI.login(email, password, rememberMe, captcha).then(response => {
        if (response.data.resultCode === 0) {
            authMe(dispatch);
        }else {
            if(response.data.resultCode===10){
                getCaptchaUrl(dispatch)
            }
            dispatch(setErrorMessage(response.data.messages[0]));
        }
    }).catch((error)=>{
        dispatch(setErrorMessage(error.message));
    })
}
export const getCaptchaUrl= async (dispatch)=> {
    const response = await SecurityAPI.getCaptcha();
    dispatch(getCaptchaUrlSuccess(response.data.url))
}

const { actions, reducer } = authSlice;
export const { auth, setLogin, setEmail, setId, setToggle,setErrorMessage,getCaptchaUrlSuccess } = actions;
export default reducer;