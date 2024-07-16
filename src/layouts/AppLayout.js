// applayout.js
'use client'
import { 
  Box, Container, HStack, Heading, IconButton, Link,
  useColorMode, useColorModeValue as mode, Spacer
} from "@chakra-ui/react";
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';

const AppLayout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={mode('white', 'gray.900')}>
      <Box pos="fixed" w="full" boxShadow="xl" zIndex="1000" py={2}>
        <Container maxW="container.xl">
          <HStack w="full" align="center" justify="center" spacing={24}>
            <Link href="/">
              <Heading size="lg" fontWeight="extrabold" color="red.500">Tic Tac Toe</Heading>
            </Link>
            <IconButton
              size="md"
              rounded="full"
              _hover={{ bg: 'red.300', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
              _active={{ bg: 'red.300' }}
              _focus={{ borderColor: 'red.400' }} 
              bg="red.500"
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <IoMoonOutline color="white" /> : <IoSunnyOutline color="white" />}
            />
          </HStack>
        </Container> 
      </Box>
      <Box minH="100vh" pt={16} pb={16}>
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout; // Ensure it's a default export