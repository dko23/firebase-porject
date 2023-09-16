import React from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"; //is a method provided by the Firebase Authentication module for creating a new user account with an email and password combination.
import { auth } from './firebase-config'; 
// import { signOut } from "firebase/auth";
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2'
import fire from './images/Firegif.gif'





function Login() {


    const [registerEmail, setRegisterEmail] = useState(""); 
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState(null);/// to track changes of wheather the user is signed in or not

  
    useEffect(() => {
      const notify= onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          setUser(user);
        } else {
          // User is signed out
          setUser(null);
        }
      });
  
      return () => notify();
    }, []); /// onAuthStateChanged method from the Firebase Authentication module, it is an event listener that detects changes in the authentication state, such as when a user signs in or signs out. 
  
  
  
  
    const register = async () => {
      try {
        const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        // the function will return a promise and will generate a new user which would be added to our FB, as well as automatically logging the user in. We are passing in the Auth variable to reference. Why pass in the auth? It allows the function to properly communicate with the Firebase Authentication backend, validate the user's email and password, and create a new user account.
        console.log(user)
        Swal.fire(
          'Registration complete! Time to start cooking'
        )
      
      } catch (error) {
        console.log(error.message);
        Swal.fire(
          'Registration failed! Flames out!'
        )
      }

      setRegisterEmail('');
      setRegisterPassword('');



  }
  

    
    const login = async () => {
      try {
        const loginuser = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        console.log(loginuser)
   window.location.pathname='/home'
    
      } catch (error) {
        console.log(error.message);
        Swal.fire(
          'login failed. ooouuu, You just got burned!'
        )
      
      }
    
    }
    // const logout = async () => {
    //   try {
    //     const result=await signOut(auth);
    //     console.log('User is signed out');
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // }; //// By passing the authentication instance as the argument to signOut(auth), you are providing the necessary information for the function to communicate with the Firebase Authentication backend and sign out the currently authenticated user.
    
    // *VERY IMPORTANT* with firebase most functions will return a promise why?Firebase operations often involve asynchronous operations such as network requests and database transactions. Promises are a way to handle asynchronous operations and provide a structured approach to deal with the resulting data or errors.

  
    // const Item = styled(Paper)(({ theme }) => ({
    //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //   ...theme.typography.body2,
    //   padding: theme.spacing(1),
    //   textAlign: 'center',
    //   color: theme.palette.text.secondary,
    // }));
  
    // const CenteredContainer = styled(Box)({
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   height: '100vh', // Adjust the height as needed
    // });
  
    // const SmallWidthForm = styled(Paper)({
    //   width: 300, // Adjust the width as needed
    //   padding: 20,
    // });


  return (

    <>
      <div>
      <h2>Welcome to my Firebase Experiment</h2>      
      <img src={fire}class="animate"/>
     </div>
         <div>  
        <h3> Register User</h3>
        
  <TextField
  label="username"
                    type="text"
                    value={registerEmail}
                    placeholder='username'
                    onChange={(e) => { setRegisterEmail(e.target.value) }}
          required
/>

        

<TextField
  label="password"
                    type="password"
                    value={registerPassword}
          placeholder='password' onChange={(e) => { setRegisterPassword(e.target.value) }}
          required
/>
        <div>
        <Button variant="contained" color="success"  onClick={() => register()}>
        Create User
      </Button>
       </div>

      </div>
      
              <h3>login</h3>
      <TextField
        id="outlined-password-input"
        label="username"
                          type="text"
                          value={loginEmail}
       placeholder='username' onChange={(e)=>setLoginEmail(e.target.value)}
      />   


<TextField
  id="outlined-password-input"
  label="password"
                    type="password"
                    value={loginPassword}
 placeholder='password' onChange={(e)=>{setLoginPassword(e.target.value)}}
/>
        <div>
        <Button variant="contained" color="success"onClick={()=>login()} >
   Login
      </Button>
</div>

    
{/*   
    <h4>user logged in: {user ? (
      <h4>User logged in: {user.email}</h4>
    ) : (
      <h4>User logged out</h4>
    )}</h4> */}
      {/* <Button variant="contained" color="success" onClick={logout} >
      sign out
      </Button> */}
       {/* </SmallWidthForm> */}
    </>
  )
}

export default Login
//*KEY NOTE*The useEffect hook in React has a general purpose of handling side effects in functional components. It allows you to perform actions or run code that has side effects, such as fetching data from an API, subscribing to events, updating the document title, setting up timers, or interacting with external libraries.







