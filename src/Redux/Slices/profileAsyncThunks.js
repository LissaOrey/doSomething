import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProfileAPI } from "../../API-AXIOS/api";
import {setStatus, setProfile, setError, savePhotoSucces  } from './profileSlice';


export const updateStatus = createAsyncThunk(
    'profile/updateStatus',
    async function (status, { rejectWithValue, dispatch }) {
        try {
            let response = await ProfileAPI.updateStatus(status);
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
            if (response.data.resultCode === 1) {
                dispatch(setError(response.data.messages[0]));
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const getProfile = async (dispatch, userId) => {
    dispatch(setProfile(null))
    ProfileAPI.getProfile(userId).then(response => {
        dispatch(setProfile(response.data))
    }).catch(function (error) {
        dispatch(setError(error.message));
    })
    let response = await ProfileAPI.getStatus(userId);
    dispatch(setStatus(response.data))
}

export const savePhoto = async (dispatch, file) => {
    let response = await ProfileAPI.updatePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSucces(response.data.data.photos))
    }
}