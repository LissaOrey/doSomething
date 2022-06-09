import { createSlice } from "@reduxjs/toolkit";
import { ProfileAPI } from "../../API-AXIOS/api";


const profileSlice = createSlice({
    name: 'profile',
    initialState:{
        profile: null,
        status: null,
        statusLoaded: false,
        aboutMe: 'I learn JS',
        lookingForAJob: true, 
        lookingForAJobDescription: 'frontend',
        fullName: 'Lisa-Orey',
        contacts: {
            facebook: `www.facebook.com`,
            github: null,
            instagram: null,
            mainLink: null,
            twitter: null,
            vk: 'www.vk.ru',
            website: null,
            youtube: null,
        },
    },
    reducers: {
        setProfile: (state, action)=>{
            state.profile = action.payload
        },
        setStatus: (state,action)=>{
            state.status = action.payload
        },
        setStatusLoading: (state,action)=>{
            state.statusLoaded = action.payload
        },
    }
})
export const getProfile=(dispatch, userId, toggle, setError)=>{
    // if (toggle) {
        dispatch(setProfile(null))
        ProfileAPI.getProfile(userId).then(response => {
           dispatch(setProfile(response.data))
        }).catch(function (error) {
           setError(error);
        })
        ProfileAPI.getStatus(userId).then(response=>{
           dispatch(setStatus(response.data))
        })
    //  }
}
export const updateStatus=(dispatch, status)=>{
    ProfileAPI.updateStatus(status).then(response=>{
        if(response.data.resultCode===0){
            dispatch(setStatus(status))
            dispatch(setStatusLoading(false));
        }
    })
}
const {actions, reducer} = profileSlice;
export const {setProfile,setStatus,setStatusLoading } = actions;
export default reducer;