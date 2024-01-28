import React from 'react';
import { VStack, Table, Thead, Tbody, Tr, Th, TableCaption } from '@chakra-ui/react';
import TransactionItem from './TransactionItem';

// Function to make an API request to update a transaction
const updateTransaction = async (transactionData) => {
  try {
    const response = await fetch('https://crypto-backend-service-4svxr73vvq-uc.a.run.app/update_transaction', { // Please make sure this is your actual API endpoint for updating a transaction
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transactionData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

// TransactionsTable component
export default function TransactionsTable({ transactions }) {
  const handleSaveTransaction = async (editedTransaction) => {
    try {
      const result = await updateTransaction(editedTransaction);
      console.log('Transaction updated successfully', result);
      // Optionally, refresh your transactions list here
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  return (
    <VStack>
      <Table size="sm" variant="striped" colorScheme="blackAlpha">
        <TableCaption>All crypto buy and sell records</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Symbol</Th>
            <Th>Type</Th>
            <Th>Number of Coins</Th>
            <Th>Price Purchased At</Th>
            <Th>Total Value USD</Th>
            
            <Th>Status</Th>
            
            <Th>Transaction Date</Th>
            
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction, index) => (
            <TransactionItem
              key={index}
              transaction={transaction}
              onSave={handleSaveTransaction}
            />
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
}