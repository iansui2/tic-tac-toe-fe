// app/providers.tsx
'use client'

import { ChakraProvider, useColorMode } from '@chakra-ui/react';

const DefaultColorMode = () => {
  const { colorMode, setColorMode } = useColorMode();

  // Set default color mode to light
  if (colorMode === 'light') {
    setColorMode('light');
  }

  return null; // This component doesn't render anything
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <DefaultColorMode />
      {children}
    </ChakraProvider>
  );
}