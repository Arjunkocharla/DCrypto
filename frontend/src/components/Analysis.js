import React, { useState, useEffect } from 'react';
import { ChakraProvider, VStack, Box, Button, Center } from '@chakra-ui/react';
import Summary from '../components/Summary';
import Visualization from '../components/Visualization';
import { useNavigate } from 'react-router-dom';
import useCurrentUserDetails from './useCurrentUserId'; // Ensure path matches where the hook is actually located

function App() {
  const { userId } = useCurrentUserDetails(); // Assuming this hook correctly provides userId
  const navigate = useNavigate();
  const [portfolioCost, setPortfolioCost] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [absoluteGain, setAbsoluteGain] = useState(0);
  const [totalGainPercent, setTotalGainPercent] = useState(0);
  const [rollups, setRollups] = useState([]);

  useEffect(() => {
    // Ensure userID is not null or undefined before fetching.
    if (userId) {
      fetch(`https://crypto-backend-service-4svxr73vvq-uc.a.run.app/get_details_coinwise?userId=${userId}`) // Use template literal for dynamic userId
        .then((response) => response.json())
        .then((data) => {
          // Ensure data is in expected format (array).
          if (Array.isArray(data)) {
            setRollups(data);
            let costAccumulator = 0;
            let valueAccumulator = 0;
            data.forEach((item) => {
              costAccumulator += parseFloat(item['total_value']);
              valueAccumulator += parseFloat(item['total_equity']);
            });
            const absoluteGain = valueAccumulator - costAccumulator;
            setPortfolioCost(costAccumulator);
            setPortfolioValue(valueAccumulator);
            setAbsoluteGain(absoluteGain);
            setTotalGainPercent((absoluteGain / costAccumulator) * 100);
          }
        })
        .catch((error) => console.error('Error fetching transactions:', error));
    }
  }, [userId]);

  const home = () => navigate('/');

  return (
    <ChakraProvider>
      <Box bg="gray.800" color="white" minHeight="100vh" maxWidth="100vw" padding={8} width="full">
        <VStack>
          <Summary
            portfolioCost={portfolioCost}
            portfolioValue={portfolioValue}
            absoluteGain={absoluteGain}
            totalGainPercent={totalGainPercent}
          />
          <Visualization rollups={rollups} />
          <Center width="500px" justifyContent="space-between">
            <Button size="lg" colorScheme="blue" onClick={home} variant="solid">Back</Button>
            {/* Presumably, the "Forecast" button is a placeholder for future functionality. */}
            <Button size="lg" colorScheme="blue" onClick={() => console.log('Forecast functionality to be implemented')} variant="solid">Forecast</Button>
          </Center>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;