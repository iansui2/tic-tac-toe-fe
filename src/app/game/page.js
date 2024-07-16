// pages/game.js
'use client'

import { Box, Center, Text, Input, Button, Grid, HStack, VStack, Spacer, Container, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function Game() {
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [playGame, setPlayGame] = useState(false);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player1Board, setPlayer1Board] = useState([]);
  const [player2Board, setPlayer2Board] = useState([]);

  const toast = useToast();

  if (playGame === false) {
    return (
      <Center height="80vh">
        <Box width="500px">
          <Text fontSize="2xl" fontWeight="bold" color="red" mt={12} mb={4}>Player 1</Text>
          <Input 
            placeholder="Player 1" 
            mb={16} 
            focusBorderColor="red.500" 
            size="lg" 
            onChange={(e) => setPlayer1(e.target.value)} 
          />
          <Text fontSize="2xl" fontWeight="bold" color="red" mb={4}>Player 2</Text>
          <Input 
            placeholder="Player 2" 
            mb={32} 
            focusBorderColor="red.500" 
            size="lg" 
            onChange={(e) => setPlayer2(e.target.value)} 
          />
          <Center>
            <Button
              _hover={{ bg: 'red.300', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
              _active={{ bg: 'red.300' }}
              _focus={{ borderColor: 'red.400' }} 
              bg="red.500"
              color="white" 
              size="lg" 
              borderRadius="lg"
              width="200px"
              height="80px"
              fontSize="3xl"
              onClick={() => {
                if (player1 === '' || player2 === '') {
                  toast({
                    title: 'Missing Player Names',
                    description: "Please fill the players names",
                    status: 'warning',
                    duration: 9000,
                    isClosable: true,
                  });
                } else {
                  setCurrentPlayer(player1);
                  setPlayGame(true);
                }
              }}
            >
              Next
            </Button>
          </Center>
        </Box>
      </Center>
    )
  }

  return (
    <Container maxW="container.md" mt={8}>
      {
        playGame === true && (
          <Box>
            <HStack spacing={8} width="100%" mb={8}>
              <VStack align="center">
                <Text fontSize="2xl" fontWeight="bold" color="red.500">Player 1</Text>
                <Text fontSize="xl" fontWeight="bold">{player1}</Text>
                <Text fontSize="xl" fontWeight="bold">{player1Score}</Text>
              </VStack>
              <Spacer />
              <VStack align="center">
                <Text fontSize="2xl" fontWeight="bold" color="red.500">Player 2</Text>
                <Text fontSize="xl" fontWeight="bold">{player2}</Text>
                <Text fontSize="xl" fontWeight="bold">{player2Score}</Text>
              </VStack>
            </HStack>

            <Box p={4} display="flex" justifyContent="center" alignItems="center">
              <Grid templateColumns="repeat(3, 150px)" templateRows="repeat(3, 150px)" gap={0}>
                {board.map((_, index) => (
                  <Box
                    key={index}
                    width="150px"
                    height="150px"
                    border="2px"
                    borderColor="gray.300"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    fontSize="3xl"
                    fontWeight="bold"
                    _hover={{ bg: "gray.100", cursor: "pointer" }}
                  >
                    <Text>{/* X or O will go here */}</Text>
                  </Box>
                ))}
              </Grid>
            </Box>
          </Box>
        )
      }
    </Container>
  );
}