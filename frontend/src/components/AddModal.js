import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Button,
  Input,
  Select,
} from '@chakra-ui/react';

import useCurrentUserDetails from './useCurrentUserId'; // Ensure this path is correct

export default function AddModal({ isOpen, onClose, onAdd }) {
  const { userId, userName } = useCurrentUserDetails(); // Fetching current user details
  const [type, setType] = useState('');
  const [symbol, setSymbol] = useState('');
  const [purchasedPrice, setPurchasedPrice] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [coins, setCoins] = useState('');

  console.log(useCurrentUserDetails);

  const symbolCoinMapping = {
    "BTC": "bitcoin",
    "ETH": "ethereum",
    "XRP": "ripple",
    "LTC": "litecoin",
    "BCH": "bitcoin-cash",
    "EOS": "eos",
    "XLM": "stellar",
    "ADA": "cardano",
    "SOL": "solana",
  };

  const addTransaction = () => {
    const payload = {
      name: symbolCoinMapping[symbol],
      symbol: symbol,
      type: type,
      purchased_price: parseFloat(purchasedPrice),
      date_time: dateTime,
      coins: parseFloat(coins),
      value_usd: parseFloat(purchasedPrice) * parseFloat(coins) || 0,
      createdBy: userName, // Adding userName from the hook
      userId: userId, // Adding userId from the hook
    };

    fetch("https://crypto-backend-service-4svxr73vvq-uc.a.run.app/add_transaction", {  
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(() => {
      onClose(); // Close the modal and invoke any refresh callback
      onAdd(); // Assume onAdd is a callback for refreshing the list of transactions
    })
    .catch((error) => {
      console.error('Error adding transaction:', error);
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={8}>
            <Select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="Select Symbol"
              focusBorderColor="green"
              variant="flushed">
              {Object.keys(symbolCoinMapping).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </Select>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Select Type"
              focusBorderColor="green"
              variant="flushed">
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </Select>
            <Input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              placeholder="Transaction Date and Time"
              focusBorderColor="green"
              variant="flushed"
            />
            <Input
              value={purchasedPrice}
              onChange={(e) => setPurchasedPrice(e.target.value)}
              placeholder="Price Purchased At"
              focusBorderColor="green"
              variant="flushed"
            />
            <Input
              value={coins}
              onChange={(e) => setCoins(e.target.value)}
              placeholder="Number of Coins"
              focusBorderColor="green"
              variant="flushed"
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="green"
            color="white"
            mr={3}
            size="lg"
            onClick={addTransaction}>
            Add Transaction
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}