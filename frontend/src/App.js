import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./components/Home"; // Adjust the path according to your structure
import Login from "./components/Login"; // Adjust the path according to your structure
import { auth } from './firebaseConfig'; // Confirm this path
import Analysis from './components/Analysis';

function App() {
   const [user, setUser] = useState(null);

   useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged(userAuth => {
       setUser(userAuth);
     });
     return unsubscribe;
    }, []);

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Analysis" element={<Analysis />} />
          {/* Other routes as per your requirements */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;