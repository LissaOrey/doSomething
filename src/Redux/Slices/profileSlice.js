import { createSlice } from "@reduxjs/toolkit";


const profileSlice = createSlice({
    name: 'profile',
    initialState:{
        profile: null,
        status: null
    },
    reducers: {
        setProfile: (state, action)=>{
            state.profile = action.payload
        },
        setStatus: (state,action)=>{
            state.status = action.payload
        }
    }
})

const {actions, reducer} = profileSlice;
export const {setProfile,setStatus } = actions;
export default reducer;