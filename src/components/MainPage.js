// MainPage.js
'use client'

import { Box, Center, Button, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Link from 'next/link';
import GameService from "../services/game.service.js";

export default function MainPage() {
  const [games, setGames] = useState([]);

  const getGames = () => {
    GameService.getGames()
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setGames(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    getGames();
  }, [])

  return (
    <Box height="80vh">
      {
        games && (
          <Center>
            <Box mt={12}>
              <Text fontSize="3xl" fontWeight="bold" color="red.500">Previous Game Data</Text>
              {games.map(game => (
                <Box key={game._id} mt={4} p={8} boxShadow="lg" borderRadius="lg">
                  <Text fontWeight="bold">{game.player1Name} vs {game.player2Name}</Text>
                  <Text>Scores: {game.player1Score} - {game.player2Score}</Text>
                  <Text>Rounds: {game.round}</Text>
                </Box>
              ))}
            </Box>
          </Center>
        )
      }
      <Center height="100%">
        <Link href="/game" passHref>
          <Button
            _hover={{ bg: 'red.300', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
            _active={{ bg: 'red.300' }}
            _focus={{ borderColor: 'red.400' }} 
            bg="red.500"
            color="white" 
            size="lg" 
            borderRadius="lg"
            width="300px"
            height="80px"
            fontSize="3xl"
          >
            Start New Game
          </Button>
        </Link>
      </Center>
    </Box>
  );
}