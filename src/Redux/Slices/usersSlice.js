import { createSlice } from "@reduxjs/toolkit";
// import userPhoto from './../../Components/Users/small.jpg'

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        usersCount: 0,
        pageSize: 100,
        pageNumb: 1,
        userPhoto: 'https://kartinkin.net/uploads/posts/2022-02/1644934121_68-kartinkin-net-p-kartinki-dlya-stima-70.jpg',
        // userPhoto: userPhoto,
    },
    reducers: {
        addUser: (state, action)=>{
            state.users.push(action.payload)
        },
        setUsers: (state, action)=>{
            state.users= action.payload
        },
        setUsersCount: (state, action)=>{
            state.usersCount= action.payload
        },
        changePageNumb: (state, action)=>{
            state.pageNumb = action.payload
        },
    }

})

const { actions, reducer } = usersSlice;
export const {addUser,setUsers, setUsersCount, changePageNumb} = actions;
export default reducer;
