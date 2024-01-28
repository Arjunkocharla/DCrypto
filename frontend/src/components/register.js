import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust path as needed
import {
  Box, Button, Center, FormControl, FormLabel, Input, VStack, ChakraProvider, Heading
} from "@chakra-ui/react";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // Navigate to home page
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <ChakraProvider>
      <Center bg="gray.800" minHeight="100vh" minWidth="100vw">
        <VStack spacing={6}>
          <Heading color="white">DCrypt0 - Register</Heading>
          <Box w="300px" bg="gray.100" p={8} borderRadius="lg">
            <form onSubmit={handleRegister}>
              <VStack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    isRequired
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    isRequired
                  />
                </FormControl>
                <FormControl id="confirmPassword">
                  <FormLabel>Confirm Password</FormLabel>
                  <Input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    isRequired
                  />
                </FormControl>
                <Button colorScheme="blue" type="submit">Register</Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      </Center>
    </ChakraProvider>
  );
};

export default Register;

