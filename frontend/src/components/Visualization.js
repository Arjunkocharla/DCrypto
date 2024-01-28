import React from "react";
import { Center, Text, VStack, HStack } from "@chakra-ui/react";
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, Tooltip, Legend } from "recharts";

const COLORS = [
  "#FFA500",
  "#FFC0CB",
  "#FFBB28",
  "#F28042",
  "#9fd3c7",
  "#142d4c",
  "#feff9a",
  "#ffb6b9",
  "#fae3d9",
  "#bbded6",
  "#61c0bf",
];

export default function Visualization({ rollups }) {
  // Ensure rollups is always treated as an array
  const safeRollups = Array.isArray(rollups) ? rollups : [];

  return (
    <Center>
      <VStack>
        <Text fontSize="xl" fontWeight="bold">Cost vs Current Equity</Text>
        <BarChart
          width={600}
          height={300}
          data={safeRollups}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="symbol" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_equity" fill="#FFA500" />
          <Bar dataKey="total_value" fill="#FFC0CB" />
        </BarChart>

        <HStack spacing={10}>
          <VStack>
            <Text fontSize="xl" fontWeight="bold">Cost Distribution</Text>
            <PieChart width={250} height={250}>
              <Pie
                data={safeRollups}
                dataKey="total_value"
                nameKey="symbol"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
              >
                {safeRollups.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </VStack>

          <VStack>
            <Text fontSize="xl" fontWeight="bold">Equity Distribution</Text>
            <PieChart width={250} height={250}>
              <Pie
                data={safeRollups}
                dataKey="total_equity"
                nameKey="symbol"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={false} 
              >
                {safeRollups.map((entry, index) => (
                  <Cell key={`equity-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </VStack>
        </HStack>
      </VStack>
    </Center>
  );
}