import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { PluginRegistration } from '@web3api/client-js'
import { Web3ApiProvider } from '@web3api/react'
import { ethereumPlugin, EthereumConfig } from '@web3api/ethereum-plugin-js'

const networks: Record<string, {
  chainId: number;
  name: string;
  node: string;
  explorer: string
}> = {
  '1': {
    chainId: 1,
    name: 'mainnet',
    node: 'https://mainnet.infura.io/v3/b76cba91dc954ceebff27244923224b1',
    explorer: 'https://etherscan.io'
  },
  '3': {
    chainId: 3,
    name: 'ropsten',
    node: 'https://ropsten.infura.io/v3/b76cba91dc954ceebff27244923224b1',
    explorer: 'https://ropsten.etherscan.io'
  },
  '4': {
    chainId: 4,
    name: 'rinkeby',
    node: 'https://rinkeby.infura.io/v3/b76cba91dc954ceebff27244923224b1',
    explorer: 'https://rinkeby.etherscan.io'
  },
};

export default function Web3ApiManager({ children }: { children: JSX.Element }) {
  const { library, chainId } = useWeb3React()

  const [ethConfig, setEthConfig] = useState<EthereumConfig>({
    networks: {
      mainnet: {
        provider: 'https://mainnet.infura.io/v3/b00b2c2cc09c487685e9fb061256d6a6'
      }
    },
    defaultNetwork: "mainnet"
  });

  const plugins: PluginRegistration[] = [
    {
      uri: 'ens/ethereum.web3api.eth',
      plugin: ethereumPlugin(ethConfig)
    }
  ];

  useEffect(() => {
    if (chainId && library) {
      const id = chainId.toString()
      const currentNetwork = networks[id]
      const networkConfigs = {
        [currentNetwork.name]: {
          provider: library,
          signer: library.getSigner()
        }
      }

      setEthConfig({
        networks: networkConfigs,
        defaultNetwork: currentNetwork.name
      });
    }
  }, [library, chainId]);

  return <Web3ApiProvider plugins={plugins}>{children}</Web3ApiProvider>;
}
