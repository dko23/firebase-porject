import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './firebase-config';
import { onAuthStateChanged } from "firebase/auth";


const Protect = ({ component: Component, ...rest }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  
    return () => checkUser();
  }, []);
  
  const isAuthenticated = user !== null;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to= "/login" />
        )
      }
    />
  );
};

export default Protect;



// function PrivateRoute({ element: Element, ...rest }) {
//   const [user, setUser] = useState(null);
  
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <Route
//       {...rest}
//       element={user ? <Element /> : <Navigate to="/login" />}
//     />
//   );
// }


// import * as React from 'react';
// import Stack from '@mui/material/Stack';


// export default function ColorButtons() {
//   return (
//     <Stack direction="row" spacing={2}>
//       <Button color="secondary">Secondary</Button>
//       <Button variant="contained" color="success">
//         Success
//       </Button>
//       <Button variant="outlined" color="error">
//         Error
//       </Button>
//     </Stack>
//   );
// }