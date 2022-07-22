const HOME_ADD_POST = 'ADD-POST';
const HOME_CHANGE_TEXT = 'CHANGE-TEXT';


let initialState = {
    name: 'Goar',
    posts: [
        {id: 1, text: `This is my SPA. Here you can watch and change  your profile and add new friends, but only if you autorized.
         And you can play the game. `, date: '31.01.2021', time:  '14:38'},
        {id:2 , text: `I use redux-toolkit's slices and createAsyncThunk, react-router-dom, axios, react-hook-form. After I want to use TypeScript, selectors if have a need.`, date: '28.04.2022', time:  '14:45'}
    ],
    newPostText: ''
}
export const homeReducer=(state=initialState, action)=>{
    switch (action.type) {
        case HOME_ADD_POST: {
            let i = state.posts.length-1;
            let ID= state.posts[i].id+1
            let newPost = {
                id: ID,
                text: action.post,
                date: new Date().toLocaleDateString(),
                time:  new Date().toLocaleTimeString().slice(0,-3),
            }
            return {...state, posts: [...state.posts, newPost]}
        }   
        case HOME_CHANGE_TEXT: {
            return {...state, newPostText: action.text}
        }    
        default:
            return state;
    }
}

export const addPost=(post)=>({type: HOME_ADD_POST, post});
export const changeNewPostText=(text)=>({type: HOME_CHANGE_TEXT, text});

