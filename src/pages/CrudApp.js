import React, {useState} from 'react'
import { collection, addDoc, deleteDoc, updateDoc,doc  } from "firebase/firestore/lite"; 
import { fireStore } from '../Config/Firebase';
import { async } from '@firebase/util';

 const initialState = {
    product:'',
    price:'',
    description:''
 }

export default function CrudApp() {


//    const [Product, setproduct] = useState()
//    const [Price,  setPrice] = useState()
//    const [Description,  setDescription] = useState()

const [state , setState] = useState(initialState)

    const handleChange =(e) =>{
        setState({...state,[e.target.name]:e.target.value})
        
    }
    const handleSubmit =async (e) =>{
   e.preventDefault()
       console.log(state)
 const {product,price, description} = state
      

       try {
         const docRef = await addDoc(collection(fireStore, "product"), {product,price,description});
         console.log("Document written with ID: ", docRef.id);
       } catch (e) {
         console.error("Error adding document: ", e);
       } 
    }

 const deleteProducts  = async (e) => {

    const {product,price, description} = state

    const cityRef = doc(fireStore, 'product', {product,price,description});
 
    


});
 }  

  return (
    <main>

    <div className='py-5 w-100'>
      <div className="container  text-center">
      <div className="row">
          <div className="col-sm-12 col-lg-6 offset-md-2 offset-lg-3 col-md-6">
            <div className="card p-4">
              <h2 className='mb-3'>Add Product</h2>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col">
                    <input type="text" name='product' className="form-control" placeholder="Products" onChange = {handleChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <input type="number" name='price' className="form-control mb-3" placeholder="price" onChange={handleChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <input type="text" name='description' className="form-control" placeholder="Description" onChange={handleChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col mt-3">
                    <button className='btn btn-success w-50'>Add Product</button><br/>
                      <br/>
                      <button className='btn btn-danger' onClick={deleteProducts}>delete</button>
                      <hr />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        
      </div>
    </div>
 

    </main>
  )
}
