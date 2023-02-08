import React,{useState, useEffect} from 'react'
import { collection, doc, getDoc } from 'firebase/firestore/lite'
import { fireStore } from '../Config/Firebase'

export default function ReadProduct() {

    const [products, setProducts] = useState([])

    const fetchDocuments = async () =>{
        let array = []

     const querySnapshot = await getDoc(collection(fireStore, 'Products'));
     querySnapshot.forEach((doc) => {
      let data = doc.data()
      console.log(data)
      array.push(data)

      console.log(`${doc.id}=> ${doc.data()}`)
     });

     setProducts(array)
}
 useEffect(()=>{
    fetchDocuments()
 })

 



  return (
    <main>
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className='text-center'>Products</h1>
                    <hr />
                        {products.length > 0 ?
                        <>
                        {products.map((product, i)=>{
                            return <p className='text-center text-white' key={i}>Ahmed| price</p>
                        })}
                        </>
                        : <div className='text-center'></div>
                        }
                </div>
            </div>
        </div>
    </main>
  )
}
