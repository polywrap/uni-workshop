import React from 'react';
import { Flex } from '@chakra-ui/react';

import Swap from './Swap';
import Web3ApiManager from "./polywrap/Web3ApiManager";

function App() {
  return (
    <Web3ApiManager>
      <Flex height='100vh' justify='center' align='center' direction='column'>
        <Swap />
      </Flex>
    </Web3ApiManager>
  );
}

export default App;
