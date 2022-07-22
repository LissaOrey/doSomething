import React from 'react';

const Post =({text,date,time})=>{
   return(
    <div>
        <p>{text}</p>
         <span>{date} {time}</span>
         <hr />
    </div>
   )
}
export default Post;