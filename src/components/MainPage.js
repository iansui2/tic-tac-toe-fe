'use client'

import {
  Box, Center, Button, Text, VStack, IconButton, useToast, Spinner,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
  Flex, SimpleGrid, useColorModeValue
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Link from 'next/link';
import GameService from "../services/game.service.js";
import { MdDeleteForever } from "react-icons/md";

export default function MainPage() {
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const getGames = () => {
    setLoading(true);
    GameService.getGames()
      .then((response) => {
        if (response.status === 200) {
          setGames(response.data);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const deleteGame = (id) => {
    GameService.deleteGame(id)
      .then((response) => {
        if (response.status === 200) {
          toast({
            title: 'Game Successfully Deleted',
            description: "Game has been deleted!",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          onClose();
          getGames();
        }
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteClick = (id) => {
    setSelectedGameId(id);
    onOpen();
  };

  useEffect(() => {
    getGames();
  }, []);

  // Colors that adapt to light/dark mode
  const cardBg = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <Box py={8} px={4}>
      <Center>
        <VStack spacing={6} w="full" maxW="1000px">
          <Text fontSize="3xl" fontWeight="bold" color="red.500">Previous Games</Text>

          {loading && <Spinner size="xl" color="red.500" />}

          {!loading && games.length === 0 && (
            <Text fontSize="lg" color="gray.500">No previous games yet.</Text>
          )}

          {!loading && games.length > 0 && (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} w="full">
              {games.map(game => (
                <Box
                  key={game._id}
                  p={6}
                  boxShadow="md"
                  borderRadius="lg"
                  bg={cardBg}
                  color={textColor}
                >
                  <Flex align="center" justify="space-between">
                    <Box>
                      <Text fontWeight="bold">{game.player1Name} vs {game.player2Name}</Text>
                      <Text>Scores: {game.player1Score} - {game.player2Score}</Text>
                      <Text>Rounds: {game.round}</Text>
                    </Box>
                    <IconButton
                      size="md"
                      _hover={{ bg: 'red.300', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                      _active={{ bg: 'red.300' }}
                      _focus={{ borderColor: 'red.400' }}
                      bg="red.500"
                      onClick={() => handleDeleteClick(game._id)}
                      icon={<MdDeleteForever color="white" />}
                      aria-label="Delete Game"
                    />
                  </Flex>
                </Box>
              ))}
            </SimpleGrid>
          )}

          <Box mt={10}>
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
          </Box>
        </VStack>
      </Center>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete the Game?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this game? This action cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button
              _hover={{ bg: 'red.300', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
              _active={{ bg: 'red.300' }}
              _focus={{ borderColor: 'red.400' }}
              bg="red.500"
              color="white"
              mr={3}
              onClick={() => deleteGame(selectedGameId)}
            >
              Yes
            </Button>
            <Button variant="ghost" onClick={onClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}