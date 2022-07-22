import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, follow, unfollow } from "./usersAsyncThunks";
// import userPhoto from './../../Components/Users/small.jpg'



const  setError = (state,action)=>{
    state.fetchStatus = 'rejected';
    state.error = action.payload;
}
const  setFollowingError = (state,action)=>{
    state.followingStatus = 'rejected';
    state.error = action.payload;
    state.followingInProgress.pop();
}
const  setFollowingStatus = (state,action)=>{
    state.followingStatus = 'loading';
    state.error = null;
}

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        usersCount: 0,
        pageSize:50,
        pageNumb: 1,
        userPhoto: 'https://kartinkin.net/uploads/posts/2022-02/1644934121_68-kartinkin-net-p-kartinki-dlya-stima-70.jpg',
        // userPhoto: userPhoto,
        fetchStatus: '',
        followingStatus: '',
        error: null,
        followingInProgress:[],
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
        addFollowingId: (state, action)=>{
            state.followingInProgress.push(action.payload);
        },
        clearFollowingId: (state, action)=>{
            state.followingInProgress = state.followingInProgress.filter((item)=>item !== action.payload);
        },
       
    },
    extraReducers: {
        [fetchUsers.pending]: (state, action)=>{
            state.fetchStatus = 'loading';
            state.error = null;
        },
        [follow.pending]: setFollowingStatus,
        [unfollow.pending]: setFollowingStatus,
        [fetchUsers.fulfilled]: (state, action)=>{
            state.fetchStatus = 'resolved';
        },
        [follow.fulfilled]: (state, action)=>{
            state.followingStatus = 'resolved';
        },
        [unfollow.fulfilled]: (state, action)=>{
            state.followingStatus = 'resolved';
        },
        [fetchUsers.rejected]: setError,
        [follow.rejected]: setFollowingError,
        [unfollow.rejected]:  setFollowingError,
    }


})



const { actions, reducer } = usersSlice;
export const {setUsers, setUsersCount, changePageNumb,updateUser, addFollowingId, clearFollowingId } = actions;
export default reducer;
