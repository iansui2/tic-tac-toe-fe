// pages/game.js
'use client'

import { Box, Center, Text, Input, Button, Grid, HStack, Stack, VStack, Spacer, Container, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import GameService from "../../services/game.service.js"

export default function Game() {
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [playGame, setPlayGame] = useState(false);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [round, setRound] = useState(1);
  const [rounds, setRounds] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player1Board, setPlayer1Board] = useState([]);
  const [player2Board, setPlayer2Board] = useState([]);
  const [winner, setWinner] = useState(null);

  const router = useRouter();

  const toast = useToast();

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleBoxClick = (index) => {
    // Early return if the game has already been won or the box is filled
    if (board[index] !== '' || winner === "X" || winner === 'O') return;

    // Update the board with the current player's move
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Update player boards and scores
    let newPlayer1Board = [...player1Board];
    let newPlayer2Board = [...player2Board];
    let newPlayer1Score = player1Score;
    let newPlayer2Score = player2Score;
    let winDetected = false;

    if (currentPlayer === 'X') {
        newPlayer1Board.push(index);
        setPlayer1Board(newPlayer1Board);

        if (checkWin(newPlayer1Board)) {
            setWinner('X');
            newPlayer1Score += 1; // Corrected increment
            setPlayer1Score(newPlayer1Score);
            winDetected = true;
        }
    } else {
        newPlayer2Board.push(index);
        setPlayer2Board(newPlayer2Board);

        if (checkWin(newPlayer2Board)) {
            setWinner('O');
            newPlayer2Score += 1; // Corrected increment
            setPlayer2Score(newPlayer2Score); // Corrected assignment
            winDetected = true;
        }
    }

    if (winDetected) {
        updateRounds(newBoard, newPlayer1Board, newPlayer2Board, newPlayer1Score, newPlayer2Score);
        return;
    }

    // Check for a tie if there's no winner
    if (checkTie(newBoard)) {
        setWinner('-'); // No winner
        updateRounds(newBoard, newPlayer1Board, newPlayer2Board, newPlayer1Score, newPlayer2Score);
        return;
    }

    // Switch to the next player
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
};

  const checkWin = (playerBoard) => {
    return winningCombinations.some((combination) =>
      combination.every((index) => playerBoard.includes(index))
    );
  };

  const checkTie = (playerBoard) => {
    return playerBoard.every((box) => box !== '') && !winner;
  };

  const updateRounds = (currentBoard, player1Positions, player2Positions, p1Score, p2Score) => {
    const roundPlay = [...rounds, {
        board: currentBoard,
        player1Hits: player1Positions,
        player2Hits: player2Positions,
        player1Score: p1Score,
        player2Score: p2Score,
        round: round
    }];
    setRounds(roundPlay);
 };

  const continueGame = () => {
    setRound(round+1);
    setBoard(['', '', '', '', '', '', '', '', '']);
    setPlayer1Board([]);
    setPlayer2Board([]);
    setCurrentPlayer(winner === "X" ? "X" : "O");
    setWinner(null);
  }

  const stopGame = () => {
    const gameData = {
      player1Name: player1,
      player2Name: player2,
      player1Score: player1Score,
      player2Score: player2Score,
      rounds: rounds,
      round: round
    };

    GameService.createGame(gameData)
      .then((response) => {
        if (response.data?.message === "Game Added Successfully!") {
          toast({
            title: 'Game Succesfully Saved',
            description: "Game is successfully saved!",
            status: 'success',
            duration: 9000,
            isClosable: true,
          });

          router.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (playGame === false) {
    return (
      <Center height="80vh">
        <Box width={{ base: "90%", sm: "500px" }}>
          <Text fontSize="2xl" fontWeight="bold" color="red.500" mt={12} mb={4}>Player 1</Text>
          <Input 
            placeholder="Player 1" 
            mb={16} 
            focusBorderColor="red.500" 
            size="lg" 
            onChange={(e) => setPlayer1(e.target.value)} 
          />
          <Text fontSize="2xl" fontWeight="bold" color="red.500" mb={4}>Player 2</Text>
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
                  setPlayGame(true);
                }
              }}
            >
              Start
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
                <Text fontSize={{ base: "xl", sm: "2xl" }} fontWeight="bold" color="red.500">Player 1</Text>
                <Text fontSize="xl" fontWeight="bold">{player1}</Text>
                <Text fontSize="xl" fontWeight="bold">{player1Score}</Text>
              </VStack>
              <Spacer />
              <VStack align="center">
                <Text fontSize="2xl" fontWeight="bold" color="red.500">Round</Text>
                <Text fontSize="xl" fontWeight="bold">{round}</Text>
              </VStack>
              <Spacer />
              <VStack align="center">
                <Text fontSize={{ base: "xl", sm: "2xl" }} fontWeight="bold" color="red.500">Player 2</Text>
                <Text fontSize="xl" fontWeight="bold">{player2}</Text>
                <Text fontSize="xl" fontWeight="bold">{player2Score}</Text>
              </VStack>
            </HStack>
            {
              winner &&
                <Stack spacing={8} width="100%" mb={8} direction={{ base: "column", sm: "row" }}>
                  <Button
                    _hover={{ bg: 'red.300', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                    _active={{ bg: 'red.300' }}
                    _focus={{ borderColor: 'red.400' }} 
                    bg="red.500"
                    color="white" 
                    size="lg" 
                    borderRadius="lg"
                    width={{ base: "100%", sm: "120px" }}
                    height="80px"
                    fontSize="xl"
                    onClick={() => continueGame()}
                  >
                    Continue
                  </Button>
                  <Spacer />
                  <VStack align="center">
                    <Text fontSize="2xl" fontWeight="bold" color="green.500">{winner === "-" ? "No One Wins. It's a Tie!" : winner === "X" ? `The Winner is Player 1: ${player1}` : `The Winner is Player 2: ${player2}`}</Text>
                  </VStack>
                  <Spacer />
                  <Button
                    _hover={{ bg: 'red.300', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                    _active={{ bg: 'red.300' }}
                    _focus={{ borderColor: 'red.400' }} 
                    bg="red.500"
                    color="white" 
                    size="lg" 
                    borderRadius="lg"
                    width={{ base: "100%", sm: "120px" }}
                    height="80px"
                    fontSize="xl"
                    onClick={() => stopGame()}
                  >
                    Stop
                  </Button>
                </Stack>
            }
            <Box p={4} display="flex" justifyContent="center" alignItems="center">
              <Grid
                templateColumns={{ base: "repeat(3, 100px)", sm: "repeat(3, 150px)" }}
                templateRows={{ base: "repeat(3, 100px)", sm: "repeat(3, 150px)" }}
                gap={0}
              >
                {board.map((item, index) => (
                  <Box
                    key={index}
                    width={{ base: "100px", sm: "150px" }}
                    height={{ base: "100px", sm: "150px" }}
                    border="2px"
                    borderColor="gray.300"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    fontSize={{ base: "2xl", sm: "3xl" }}
                    fontWeight="bold"
                    _hover={{ bg: "gray.100", cursor: "pointer" }}
                    onClick={() => handleBoxClick(index)}
                  >
                    <Text color={item === "X" ? "black" : "red.500"} fontSize={{ base: "4xl", sm: "6xl" }}>
                      {item}
                    </Text>
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