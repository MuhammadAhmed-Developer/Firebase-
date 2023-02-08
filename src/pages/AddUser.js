import React, { useState} from 'react';
import { collection, addDoc, doc ,setDoc } from "firebase/firestore/lite";
import { fireStore } from '../Config/Firebase';

const initialState = {
  fullName:'',
  age:'',
  country:'',
}

export default function AddUser() {

  const [state, setState] = useState(initialState)

 

  const handleChange = e => {
    setState({...state,[e.target.name]:e.target.value})
  }

//   const handleSubmit = async e => {
//     e.preventDefault()
//     console.log(state)
  
//  const {fullName, age , country} = state

//     try {
//       const docRef = await addDoc(collection(fireStore, "users"), {fullName,age, country});
//       console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }

//   }


const handleSubmit = async e => {
  e.preventDefault()
  console.log(state)

const {fullName, age , country} = state

let randomId = Math.random().toString(36).slice(2)
console.log(randomId)

  try {
    const docRef = await setDoc(doc(fireStore, "users", randomId), {fullName,age, country, id: randomId});
    // console.log("Document written with ID: ", docRef.id);
    console.log("Document written with ID: ", randomId);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}
   
  return (
    <main>

    <div className='py-5 w-100'>
      <div className="container  text-center">
      <div className="row">
          <div className="col-sm-12 col-lg-6 offset-md-2 offset-lg-3 col-md-6">
            <div className="card p-4">
              <h2 className='mb-3'>Add User Form</h2>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col">
                    <input type="text" name='fullName' className="form-control" placeholder="Full Name" onChange = {handleChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <input type="number" name='age' className="form-control mb-3" placeholder="Age" onChange={handleChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <input type="text" name='country' className="form-control" placeholder="Country" onChange={handleChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col mt-3">
                    <button className='btn btn-success w-50'>Add Users</button><br/>

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
