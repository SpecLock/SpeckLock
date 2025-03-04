import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';

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

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        const balance = await provider.getBalance(accounts[0]);
        
        setAccount(accounts[0]);
        setChainId(Number(network.chainId));
        setBalance(ethers.formatEther(balance));
        setIsConnected(true);
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
          setAccount(newAccounts[0]);
          updateBalance(newAccounts[0], provider);
        });
        
        // Listen for chain changes
        window.ethereum.on('chainChanged', (newChainId: string) => {
          setChainId(Number(newChainId));
        });
      } else {
        alert('Please install MetaMask to use this application');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const updateBalance = async (address: string, provider: ethers.BrowserProvider) => {
    const balance = await provider.getBalance(address);
    setBalance(ethers.formatEther(balance));
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance('0');
    setChainId(null);
    setIsConnected(false);
  };

  const switchRole = () => {
    setIsClient(!isClient);
    setIsDeveloper(!isDeveloper);
  };

  // For demo purposes, simulate wallet connection
  useEffect(() => {
    const simulateWallet = async () => {
      // This is just for demo - in a real app, we'd use the actual wallet connection
      setAccount('0x1234...5678');
      setBalance('1.5');
      setChainId(1);
      setIsConnected(true);
    };
    
    // Uncomment to auto-connect for demo purposes
    // simulateWallet();
  }, []);

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
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};