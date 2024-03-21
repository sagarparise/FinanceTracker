import React, {  useEffect, useState } from 'react'
import Header from '../Header/Header'
import Cards from '../Cards/Cards'
import { auth,db } from '../../Firebase'
import {getDocs, collection, doc, addDoc, deleteDoc} from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify'
import MyTransactions from '../MyTransactions/MyTransactions'
import Stat from '../Statistics/Stat'
import ChartComponent from '../Charts/Chart'
function Dashboard() {
  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([])

//get all current userDocuments

useEffect(()=>{
  fetchAllTransactions();
},[user])



const fetchAllTransactions = async()=>{

  if(user){
  
    const allDocuments = await getDocs(collection(db, `users/${user.uid}/transactions`))
    let transactionArray = [];
      
    allDocuments.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      transactionArray.push(doc.data());

    });
    console.log(transactionArray)
    setTransactions(transactionArray);
    toast.success('Transactions fetched',{
      position: "top-right",
    })
  }
  
}

// add transaction into the firestore of firebase

const addTransaction = async(newTransaction)=>{

  try{
    const transRef = collection(db, `users/${user.uid}/transactions`)
    const transDoc = await addDoc(transRef, newTransaction)
    console.log('Document written with Id', transDoc.id)
    toast.success('Transaction added successfully',{
      position: "top-right",
    })

  fetchAllTransactions()

  }
  catch(err){
    console.log(err.message)
    toast.error("Couldn't add transaction")
  }

}

const collectionDelete = async()=>{

  try{
 
   const allDocuments = await getDocs(collection(db, `users/${user.uid}/transactions`))
 
   allDocuments.forEach(async(doc) => {
     await deleteDoc(doc.ref);
 
   });
   fetchAllTransactions();
 
  }
  catch(error){
    console.log(error);
  }
   toast.success('Reset Balance',{
     position: "top-right",
   })
 }


  return (
    <div>
      <Header login={'logout'} />
    <Cards addTransaction={addTransaction} transactions={transactions} collectionDelete={collectionDelete}/>
    <Stat  transactions={transactions} />
    <MyTransactions transactions={transactions} addTransaction={addTransaction}  />
   
    </div>
  )
}

export default Dashboard