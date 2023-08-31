import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { auth } from '../firebase-config'; 
import { signOut } from "firebase/auth";
import TextField from '@mui/material/TextField';
import { addDoc, collection } from 'firebase/firestore'// import addDoc from firebase to allow the user to add documents to the firebase
import { db } from '../firebase-config';
import Swal from 'sweetalert2'




function Home() {
  const logout = async () => {
    try {
      const result=await signOut(auth);
      console.log('User is signed out');
      window.location.pathname='/'
    } catch (error) {
      console.log(error.message);
    }
  }; //// By passing the authentication instance as the argument to signOut(auth), you are providing the necessary information for the function to communicate with the Firebase Authentication backend and sign out the currently authenticated user.
  
  // *VERY IMPORTANT* with firebase most functions will return a promise why?Firebase operations often involve asynchronous operations such as network requests and database transactions. Promises are a way to handle asynchronous operations and provide a structured approach to deal with the resulting data or errors.

  const [title, setTitle] = useState(""); 
  const [postText, setPostText] = useState("");

const postRef=collection(db, 'post')//reference to the post collection created and the 'string name of the collection we are referencing from the table.'
  
  const newPost = async () => {
    try {
      const posted=await addDoc(postRef, {title: title, post: postText});// this function takes two arguments, reference to collection because you can mutilple collections specifically for each document and the data that the user wants to put in the document. likely the states.
      console.log();
      Swal.fire({
        icon: 'success',
        title: 'Posted to DataBase'
      })
    
    } catch (error) {
      console.log(error.message);
    }
}


useEffect(() => {
  const storedTitle = localStorage.getItem('title');
  const storedPostText = localStorage.getItem('postText');
  if (storedTitle) {
    setTitle(storedTitle);
  }  if (storedPostText) {
    setPostText(storedPostText);
  }
}, []);///In the example, we start with localStorage.getItem() in the useEffect hook because we want to retrieve the stored value from localStorage and initialize the state variable with that value when the component mounts. 

  
  
  return (
    <div>
      <>
        <h2>This is the homepage</h2>
      <Button variant="contained" color="success" onClick={logout} >
      sign out
        </Button> 

        <h3>Create Post</h3>      
        <TextField
          value={title}
  label="Title"
  type="text"
  placeholder="title"
  onChange={(e) => {
    setTitle(e.target.value);
    localStorage.setItem('title', e.target.value);
  }}
/>

<br></br> <br></br>
        <div>
          
<TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          defaultValue="enter post here"
          label="post"
            type="text"
            value={postText}
            placeholder='Post' onChange={(e) => { setPostText(e.target.value); localStorage.setItem('postText', e.target.value); }}
        />
</div>

        <div>
        <Button variant="contained" color="success" onClick={newPost} >
       Submit Post
          </Button>
      
        </div>
      
      </>
    </div>
  );
}

export default Home;




