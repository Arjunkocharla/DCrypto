import React, { useState, useEffect } from "react";
import {
  Center,
  VStack,
  Button,
  ButtonGroup,
  Heading,
  ChakraProvider,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Import these
import MyAppBar from './appbar'; // Make sure this path is correct
import TransactionsTable from "./TransactionsTable"; // Adjust the import path if necessary
import AddModal from "./AddModal"; // Adjust the import path if necessary

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import useCurrentUserDetails from './useCurrentUserId'; // Adjust the path as needed


function Home() {
  const { userId, userName } = useCurrentUserDetails();
  const [transactions, setTransactions] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (userId) {
      fetch(`http://127.0.0.1:8090/get_transactions?userId=${userId}`)
        .then(response => response.json())
        .then(data => setTransactions(data))
        .catch(error => console.error('Error fetching transactions:', error));
    }
  }, [isOpen, userId]); // Include userId as a dependency

  return (
    <ChakraProvider>
        <MyAppBar />
        <AddModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        <Center bg="#004b49" color="white" padding={8} minHeight="100vh" width="100vw" flexDirection="column" justifyContent="center">
          <VStack spacing={7}>
            <Heading>dCrypt</Heading>
            <ButtonGroup variant="outline" spacing="6">
              <Button size="lg" colorScheme="teal" onClick={onOpen} variant="solid">
                Enter Transaction
              </Button>
              <Link to="/Analysis">
                <Button size="lg" colorScheme="teal" variant="solid">
                  Portfolio Analysis
                </Button>
              </Link>
            </ButtonGroup>
            <TransactionsTable transactions={transactions} flex="1" />
          </VStack>
        </Center>
    </ChakraProvider>
  );
}

export default Home;