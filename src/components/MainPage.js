// MainPage.js
'use client'

import { 
  Box, Center, Button, Text, HStack, VStack, IconButton, Spacer, useToast,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure 
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Link from 'next/link';
import GameService from "../services/game.service.js";
import { MdDeleteForever } from "react-icons/md";

export default function MainPage() {
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const getGames = () => {
    GameService.getGames()
      .then((response) => {
        if (response.status === 200) {
          setGames(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const deleteGame = (id) => {
    GameService.deleteGame(id)
      .then((response) => {
        if (response.status === 200) {
          toast({
            title: 'Game Succesfully Deleted',
            description: "Game is successfully deleted!",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });

          onClose();
          getGames();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteClick = (id) => {
    setSelectedGameId(id);
    onOpen();
  };

  useEffect(() => {
    getGames();
  }, [])

  return (
    <Box height="80vh">
      {
        games.length > 0 && (
          <Center>
            <Box mt={12}>
              <Text fontSize="3xl" fontWeight="bold" color="red.500">Previous Game Data</Text>
              {games.map(game => (
                <Box key={game._id} mt={4} p={8} boxShadow="lg" borderRadius="lg">
                  <HStack>
                    <VStack align="left">
                      <Text fontWeight="bold">{game.player1Name} vs {game.player2Name}</Text>
                      <Text>Scores: {game.player1Score} - {game.player2Score}</Text>
                      <Text>Rounds: {game.round}</Text>
                    </VStack>
                    <Spacer />
                    <IconButton
                      size="md"
                      _hover={{ bg: 'red.300', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                      _active={{ bg: 'red.300' }}
                      _focus={{ borderColor: 'red.400' }} 
                      bg="red.500"
                      onClick={() => handleDeleteClick(game._id)}
                      icon={<MdDeleteForever color="white" />}
                    />
                  </HStack>  
                </Box>
              ))}
            </Box>
          </Center>
        )
      }
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete the Game?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            If you want to delete the game, please select yes.
          </ModalBody>

          <ModalFooter>
            <Button 
              _hover={{ bg: 'red.300', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
              _active={{ bg: 'red.300' }}
              _focus={{ borderColor: 'red.400' }}
              bg="red.500" 
              color="white" 
              mr={3} 
              onClick={() => deleteGame(selectedGameId)}>
              Yes
            </Button>
            <Button variant="ghost" onClick={onClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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