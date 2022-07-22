import { createSlice } from "@reduxjs/toolkit";
import {updateStatus, getProfile, savePhoto} from './profileAsyncThunks';


const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: null,
        status: null,
        error: null,
        statusFetching: null,
    },
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload
        },
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        savePhotoSucces: (state, action) => {
            state.profile.photos = action.payload;
        }

    },
    extraReducers: {
        [updateStatus.pending]: (state, action) => {
            state.statusFetching = 'loading';
            // state.error = null;
        },
        [updateStatus.fulfilled]: (state, action) => {
            state.statusFetching = 'resolved';
        },
        [updateStatus.rejected]: (state, action) => {
            state.statusFetching = 'rejected';
        },
    }
})



const { actions, reducer } = profileSlice;
export const { setProfile, setStatus, setStatusLoading, setError, savePhotoSucces } = actions;
export default reducer;