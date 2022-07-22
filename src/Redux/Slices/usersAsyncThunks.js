import { UsersAPI } from "../../API-AXIOS/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUsers, setUsersCount, clearFollowingId, addFollowingId, updateUser } from './usersSlice'


export const fetchUsers= createAsyncThunk(
    'users/fetchUsers',
    async function({pageSize,pageNumb,isFriend},{rejectWithValue, dispatch}){
        try {
            const response = await UsersAPI.getUsers(pageSize,pageNumb,isFriend);
            dispatch(setUsers(response.data.items));
            dispatch(setUsersCount(response.data.totalCount));
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const fetchingIsOk=(response, dispatch, clearFollowingId, updateUser,id)=>{
    if(response.data.resultCode===0){
        dispatch(clearFollowingId(id));
        dispatch(updateUser(id))
     }
}
const fetchingIsNotOk=( dispatch, clearFollowingId, rejectWithValue, id, error  )=>{
    dispatch(clearFollowingId(id));
    return rejectWithValue(error.message)
}

export const follow= createAsyncThunk( 
    'users/follow',
    async function(id,{rejectWithValue, dispatch}){
        dispatch(addFollowingId(id));
        try {
            const response = await UsersAPI.follow(id)
            fetchingIsOk(response, dispatch, clearFollowingId, updateUser, id);
        } catch (error) {
            fetchingIsNotOk( dispatch, clearFollowingId, rejectWithValue, id, error);
        }
    }
)

export const unfollow= createAsyncThunk( 
    'users/unfollow',
    async function(id,{rejectWithValue, dispatch}){
        dispatch(addFollowingId(id));
        try {
            const response = await UsersAPI.unfollow(id)
            fetchingIsOk(response, dispatch, clearFollowingId, updateUser, id);
        } catch (error) {
            fetchingIsNotOk( dispatch, clearFollowingId, rejectWithValue, id, error);
        }
    }
)