import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersAPI } from "../../API-AXIOS/api";
// import userPhoto from './../../Components/Users/small.jpg'

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

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        usersCount: 0,
        pageSize: 100,
        pageNumb: 1,
        userPhoto: 'https://kartinkin.net/uploads/posts/2022-02/1644934121_68-kartinkin-net-p-kartinki-dlya-stima-70.jpg',
        // userPhoto: userPhoto,
        // followingInProgress: [],
        status: '',
        error: null,
    },
    reducers: {
        setUsers: (state, action)=>{
            state.users= action.payload
        },
        updateUser: (state, action)=>{
            state.users.forEach((item)=>{
                if(item.id===action.payload){
                    item.followed = !item.followed;
                }
            })
        },
        setUsersCount: (state, action)=>{
            state.usersCount= action.payload
        },
        changePageNumb: (state, action)=>{
            state.pageNumb = action.payload
        },
    },
    extraReducers: {
        [fetchUsers.pending]: (state, action)=>{
            state.status = 'loading';
            state.error = null;
        },
        [fetchUsers.fulfilled]: (state, action)=>{
            state.status = 'resolved';
            // state.users = action.payload;
        },
        [fetchUsers.rejected]: (state, action)=>{
            state.status = 'rejected';
            state.error = action.payload;
        },
    }


})



const { actions, reducer } = usersSlice;
export const {setUsers, setUsersCount, changePageNumb,updateUser } = actions;
export default reducer;
