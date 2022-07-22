import React from 'react';
import Post from './Post';
import Button from './../utils/Button/Button'

const Home =({name, ...props})=>{

   function addPost(){
      props.addPost(props.newPostText);
      props.changeNewPostText('')
   }
   
   return(
    <div>
      
      <h1>Hello, my friends!</h1>
      <p>My name is {name} I learn JS & React.js</p>
      <hr />
      <textarea placeholder={'Напишите здесь свой пост'} value={props.newPostText} style={{width: '75%', height: '150px', fontSize: '25px'}} onChange={(e)=>props.changeNewPostText(e.currentTarget.value)}></textarea>
      <br />
      <Button disabled={props.newPostText===''} onClick={addPost} value={'add post'} />
      <hr />
      {props.posts.map(p=><Post key={p.id} text={p.text} date={p.date} time={p.time} />)}
      

    </div>
   )
}
export default Home;