import React, { useEffect, useRef, useState } from "react";
import { Card, Row, Button, Modal, Form, Input, DatePicker,Select } from "antd";
import "./cards.scss";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth ,db} from "../../Firebase";
import { toast } from "react-toastify";
function Cards({addTransaction, transactions,collectionDelete}) {

  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [expenseModalopen, setExpenseModalOpen] = useState(false);


  const[balance, setBalance] = useState({
    currentBal: 0,
    totalIncome: 0,
    totalExpense: 0,
  })
  useEffect(()=>{
    
    CalculateBal();
}, [transactions])

const CalculateBal = ()=>{
  let inc = 0;
    let exp = 0;
    transactions.forEach(element => {
      if(element.type === 'income')
      {
        inc += Number(element.amount);
      }
      else{
        exp += Number(element.amount);
      }
    })
    setBalance((prev)=>(
      {
        currentBal:  inc - exp,
        totalIncome:  inc,
        totalExpense:  exp,
      }
    ))
}

const openIncome = ()=>{
setIncomeModalOpen(true)
}

const openExpense = ()=>{
setExpenseModalOpen(true)
}
const modalClose = ()=>{
  setIncomeModalOpen(false)
  setExpenseModalOpen(false)
}


 

  return (
    <Row className="card-row">
      <Card className="card">
        <p className="card-head">Current balance</p>
        <p className="rupees">₹ {balance.currentBal}</p>
        <Button block onClick={collectionDelete}>Reset Balance</Button>
      </Card>

      <Card className="card">
        <p className="card-head">Total Income</p>
        <p className="rupees">₹ {balance.totalIncome}</p>
        <Button block onClick={()=>{
         openIncome()
        }}>
          Add Income
        </Button>
      </Card>

      <Card className="card">
        <p className="card-head">Total Expenses</p>
        <p className="rupees">₹ {balance.totalExpense}</p>
        <Button block onClick={()=>{
         openExpense()
        }}>
          Add Expense
        </Button>
      </Card>
      <Modal
        open={incomeModalOpen}
        title= 'Add Income'      
        footer={null}
       
        onCancel={modalClose}
      >
        <ModalForm type='income'  addTransaction={addTransaction}  />
      </Modal>
      <Modal
        open={expenseModalopen}
        title= 'Add Expense'
       
        footer={null}
        onCancel={modalClose}
      >
        <ModalForm type='expense'   addTransaction={addTransaction} />
      </Modal>
    </Row>
  );
}

export default Cards;

function ModalForm({type, addTransaction}) {


  const [user] = useAuthState(auth);
  const fmRef = useRef();

// console.log(user);

  const handleIncome = (value)=>{

    const newTransaction = {
      name: value.name,
      amount: value.amount,
      date: value.date.format('DD-MM-YYYY'),
      tag: value.tag,
      type: type
    }

   

  addTransaction(newTransaction)

  handleReset()

  }

  

  const handleReset = () => {
    fmRef.current.resetFields(); // Reset the form fields
  }

  return (
    <div>
      <Form layout="vertical" onFinish={handleIncome} ref={fmRef}>
        <Form.Item
          label="Name"
          className="form-label"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Amount"
          className="form-label"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Date"  className="form-label" rules={[{
          required: true,
          message: "Please enter the date"
        }]} name="date">
          <DatePicker variant="borderless" placeholder="Select Date" />
        </Form.Item>

        <Form.Item label="Tags"   className="form-label" rules={[{
          required: true,
          message: "Please enter the tags"
        }]} name="tag">
        <Select variant="borderless" options={
          type === 'income' ? [
            { value: 'Salary', label: 'Salary' },
            { value: 'Freelance', label: 'Freelance' },
            { value: 'Investment', label: 'Investment' },
          ] :[
            { value: 'Food', label: 'Food' },
            { value: 'Education', label: 'Education' },
            { value: 'Office', label: 'Office' },
            { value: 'Health', label: 'Health' },
            { value: 'Others', label: 'Others' },
          ] 
        }></Select>
        </Form.Item>

        <Button htmlType="submit" className="btn"  block>Add</Button>

      </Form>
    </div>
  );
}
