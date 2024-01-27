import React, { useState } from 'react';
import { Tr, Td, Input, Button } from '@chakra-ui/react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default function TransactionItem({ transaction, onSave }) {
  // Define a helper function to convert Firestore timestamp to yyyy-mm-dd date string
  const formatDate = timestamp => {
    const date = timestamp.toDate();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);  // Convert month to 2 digits
    const day = ('0' + date.getDate()).slice(-2);            // Convert day to 2 digits
    return `${year}-${month}-${day}`;
  };
  console.log(transaction.date); 
  
  const [editMode, setEditMode] = useState(false);
  
  // Prepare the date in the required format: yyyy-mm-dd
  const [date] = transaction.date.split(" at"); // splits the date and time
  const formattedDate = new Date(date).toISOString().split('T')[0];

  // Pre-populate the transaction with the already existing values
  const initialTransaction = {...transaction, date: formattedDate};
  const [editedTransaction, setEditedTransaction] = useState(initialTransaction);

  const handleChange = (e, field) => {
    if(field === 'date') {
      const date = new Date(e.target.value);
      const timestamp = firebase.firestore.Timestamp.fromDate(date);
      setEditedTransaction({ ...editedTransaction, [field]: timestamp });
    } else {
      setEditedTransaction({ ...editedTransaction, [field]: e.target.value });
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    onSave({
      ...editedTransaction,
      coins: parseInt(editedTransaction.coins),
      purchased_price: parseFloat(editedTransaction.purchased_price),
      value_usd: parseFloat(editedTransaction.value_usd),
    });
    toggleEditMode();
  };

  return (
    <Tr>
      {editMode ? (
        <>
          <Td><Input value={editedTransaction.name} onChange={(e) => handleChange(e, 'name')} /></Td>
          <Td><Input value={editedTransaction.symbol} onChange={(e) => handleChange(e, 'symbol')} /></Td>
          <Td><Input value={editedTransaction.type} onChange={(e) => handleChange(e, 'type')} /></Td>
          <Td isNumeric><Input value={editedTransaction.coins.toString()} onChange={(e) => handleChange(e, 'coins')} type="number" /></Td>
          <Td isNumeric><Input value={editedTransaction.purchased_price.toString()} onChange={(e) => handleChange(e, 'purchased_price')} type="number" /></Td>
          <Td isNumeric><Input value={editedTransaction.value_usd.toString()} onChange={(e) => handleChange(e, 'value_usd')} type="number" /></Td>
          <Td><Input value={editedTransaction.createdBy} onChange={(e) => handleChange(e, 'createdBy')} /></Td>
          <Td><Input value={editedTransaction.status} onChange={(e) => handleChange(e, 'status')} /></Td>
          
          <Td isNumeric><Input value={formatDate(editedTransaction.date)} onChange={(e) => handleChange(e, 'date')} type="date" /></Td>
          <Td><Input value={editedTransaction.userId} onChange={(e) => handleChange(e, 'actions')} /></Td>
          <Td><Button onClick={handleSave} colorScheme="blue">Save</Button></Td>
        </>
      ) : (
        <>
          <Td>{transaction.name}</Td>
          <Td>{transaction.symbol}</Td>
          <Td>{transaction.type}</Td>
          <Td isNumeric>{transaction.coins}</Td>
          <Td isNumeric>${transaction.purchased_price}</Td>
          <Td isNumeric>${transaction.value_usd}</Td>
          <Td>{transaction.createdBy}</Td>
          <Td>{transaction.status}</Td>
         
          <Td isNumeric>{initialTransaction.date}</Td>
          <Td><Button onClick={toggleEditMode} colorScheme="blue">Edit</Button></Td>
        </>
      )}
    </Tr>
  );
}