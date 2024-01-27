import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust path as needed
import { Box, Button, Center, FormControl, FormLabel, Input, VStack, ChakraProvider } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      var success = await signInWithEmailAndPassword(auth, email, password);
      console.log(success)
      navigate('/');
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <ChakraProvider>
      <Center bg="teal" minHeight="100vh" minWidth="100vw"> 
        <Box w="300px" bg="white" p={8} borderRadius="lg"> 
          <form onSubmit={handleLogin}>
            <VStack>
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
      </Center>
    </ChakraProvider>
  );
};

export default Login;