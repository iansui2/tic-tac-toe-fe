// MainPage.js
import { Box, Center, Button } from "@chakra-ui/react";
import Link from 'next/link';

export default function MainPage() {
  return (
    <Box height="80vh">
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
              Start Game
            </Button>
          </Link>
        </Center>
    </Box>
  );
}