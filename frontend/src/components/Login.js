import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust path as needed
import {
  Box, Button, Center, FormControl, FormLabel, Input, VStack, ChakraProvider, Heading, Text
} from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleNavigateToRegister = () => {
    navigate('/register'); // Replace '/register' with your registration route
  };

  return (
    <ChakraProvider>
      <Center bg="gray.800" minHeight="100vh" minWidth="100vw">
        <VStack spacing={6}>
          <Heading color="white">DCrypt0</Heading>
          <Box w="300px" bg="gray.100" p={8} borderRadius="lg">
            <form onSubmit={handleLogin}>
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
                <Button colorScheme="blue" type="submit">Login</Button>
              </VStack>
            </form>
          </Box>
          <Text color="white">Not registered yet?</Text>
          <Button onClick={handleNavigateToRegister} variant="link" colorScheme="blue">
            Register here
          </Button>
        </VStack>
      </Center>
    </ChakraProvider>
  );
};

export default Login;
