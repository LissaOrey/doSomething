import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        count: 17,
        test: 5
    },
    reducers: {
        addUser: (state, action)=>{
            state.users.push(action.payload)
        },
        increment: (state)=>{
            state.test++
        }
    }

})
const { actions, reducer } = usersSlice;
export const {addUser, increment} = actions;
export default reducer;
