import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { ethers } from 'ethers';

// Avalanche Fuji Testnet configuration
const AVALANCHE_TESTNET_PARAMS = {
  chainId: '0xA869',
  chainName: 'Avalanche Fuji Testnet',
  nativeCurrency: {
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://testnet.snowtrace.io/'],
};

interface WalletContextType {
  account: string | null;
  balance: string;
  chainId: number | null;
  isConnected: boolean;
  isClient: boolean;
  isDeveloper: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchRole: () => void;
  networkName: string;
}

const WalletContext = createContext<WalletContextType>({
  account: null,
  balance: '0',
  chainId: null,
  isConnected: false,
  isClient: true,
  isDeveloper: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  switchRole: () => {},
  networkName: '',
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(true);
  const [isDeveloper, setIsDeveloper] = useState<boolean>(false);
  const [networkName, setNetworkName] = useState<string>('');

  const setupAvalancheTestnet = async () => {
    if (!window.ethereum) return;

    try {
      // Try to switch to Avalanche Fuji Testnet
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: AVALANCHE_TESTNET_PARAMS.chainId }],
      });
    } catch (switchError: any) {
      // If the network doesn't exist, add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [AVALANCHE_TESTNET_PARAMS],
          });
        } catch (addError) {
          console.error('Error adding Avalanche Fuji Testnet:', addError);
        }
      }
    }
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await setupAvalancheTestnet();

        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        const balance = await provider.getBalance(accounts[0]);

        setAccount(accounts[0]);
        setChainId(Number(network.chainId));
        setBalance(ethers.formatEther(balance));
        setIsConnected(true);
        setNetworkName('Avalanche Fuji Testnet');

        // Listen for account changes
        window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
          setAccount(newAccounts[0]);
          updateBalance(newAccounts[0], provider);
        });

        // Listen for chain changes
        window.ethereum.on('chainChanged', (newChainId: string) => {
          setChainId(Number(newChainId));
          checkNetwork(Number(newChainId));
        });
      } else {
        alert('Please install MetaMask to use this application');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const checkNetwork = (chainId: number) => {
    const avalancheTestnetId = parseInt(AVALANCHE_TESTNET_PARAMS.chainId, 16);

    if (chainId === avalancheTestnetId) {
      setNetworkName('Avalanche Fuji Testnet');
    } else {
      setNetworkName('Unsupported Network');
    }
  };

  const updateBalance = async (
    address: string,
    provider: ethers.BrowserProvider
  ) => {
    const balance = await provider.getBalance(address);
    setBalance(ethers.formatEther(balance));
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance('0');
    setChainId(null);
    setIsConnected(false);
    setNetworkName('');
  };

  const switchRole = () => {
    setIsClient(!isClient);
    setIsDeveloper(!isDeveloper);
  };

  return (
    <WalletContext.Provider
      value={{
        account,
        balance,
        chainId,
        isConnected,
        isClient,
        isDeveloper,
        connectWallet,
        disconnectWallet,
        switchRole,
        networkName,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};