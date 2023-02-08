import React, { useState } from 'react';
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../Config/Firebase'

const initialState = {
  email:'',
  password:''
}

function Register() {

  const [state, setState] = useState(initialState)

  const handleChange = e => {
    setState({...state,[e.target.name]:e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(state)
    const {email, password} = state

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log('user Registered Successfully')
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

  return (
    <main>

    <div className='py-5 w-100'>
      <div className="container  text-center">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-md-2 offset-lg-3 col-md-6">
            <div className="card p-4">
              <h2 className='mb-3'>Register Form</h2>
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
                    <button className='btn btn-success w-50'>Register</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </main>

  );
}

export default Register;
