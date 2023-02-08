import React, { useState, useEffect } from 'react';
import {signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, sendEmailVerification   } from "firebase/auth";
import {auth} from '../Config/Firebase'

const initialState = {
  email:'',
  password:''
}

function Login() {

  const [state, setState] = useState(initialState)
  const [user, setUser] = useState({})

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        console.log(user)
        setUser(user)
        // ...
      } else {
        // User is signed out
        // ...
        console.log("user log out")
      }
    });
    
  }, [])

  const handleChange = e => {
    setState({...state,[e.target.name]:e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(state)
    const {email, password} = state

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log('user Login Successfully')
    console.log(userCredential)
    console.log(user)
    // ...
  })
  .catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    console.log(error)
    // ..
  });
  }

  const handleLogout = () => {
    console.log('clicked')
    signOut(auth)
    .then(()=>{
      console.log('User logged out')
      setUser({})
    })
    .catch((err)=>{
      console.error(err)
      
    })

  }


  const showAuthUser = () => {

     console.log(user.currentUser)
    // sendEmailVerification(auth.currentUser)
    // .then(() => {
    //   console.log("send Email")
    //   // ...
    // }).catch((error) => {
    //   // An error occurred
    //   console.error(error)
    //   // ...
    // });
  }

  const updateUserProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: "Muhammad Ahmed", photoURL: 'http://myhotel.surge.sh/assect/images/logo.webp'
    }).then(() => {
      console.log("// Profile updated!")
      // ...
    }).catch((error) => {
      // An error occurred
      console.error(error)
      // ...
    });
  }
   
  return (
    <main>

    <div className='py-5 w-100'>
      <div className="container  text-center">
        {user.email? 
        <div className="row text-center text-success">
          <div className='col text-center'>
          <img src={user.photoURL} alt={`${user.email} profile image`} className='img-fluid  w-25 ' />

          <h2>User Email: {user.email}</h2>
          <h2>User UID: {user.uid}</h2>
          <h2>User Display Name: {user.displayName}</h2>
          </div>
        
        <div className='text-center'>
          <button className='btn btn-danger w-25' onClick={handleLogout}> Logout</button><br/>
           <button className='btn btn-info w-25 my-3' onClick={showAuthUser}>varify email</button><br/>
          <button className='btn btn-success w-25' onClick={updateUserProfile}> updated user profile</button>
        </div>
        </div>
      :
      <div className="row">
          <div className="col-sm-12 col-lg-6 offset-md-2 offset-lg-3 col-md-6">
            <div className="card p-4">
              <h2 className='mb-3'>Login Form</h2>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col">
                    <input type="email" name='email' className="form-control" placeholder="Email" onChange = {handleChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <input type="password" name='password' className="form-control" placeholder="Password" onChange={handleChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col mt-3">
                    <button className='btn btn-success w-50'>Login</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
        
      </div>
    </div>
    </main>

  );
}

export default Login;
