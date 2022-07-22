import React from 'react';
import { connect } from 'react-redux';
import Home from './Home.jsx';
import { addPost,changeNewPostText } from '../../Redux/HomeReducer';

const HomeContainer =(props)=>{
   return(
    <div>
      <Home {...props} />
    </div>
   )
}

const mapStateToProps=(state)=>{
   return{
      name: state.home.name,
      posts: state.home.posts,
      newPostText: state.home.newPostText,
   }
}
export default connect(mapStateToProps, {addPost,changeNewPostText})(HomeContainer);