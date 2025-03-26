import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Wallet,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { ethers } from 'ethers';

const FACTORY_ADDRESS = '0x433e3B673B4Edf8D02A3b7A38600eBa1cD6C22C7';
const FACTORY_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_projectName", "type": "string"},
      {"internalType": "string", "name": "_projectDescription", "type": "string"},
      {"internalType": "address payable", "name": "_developerAddress", "type": "address"}
    ],
    "name": "createProject",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const CreateProject: React.FC = () => {
  const { isConnected, isClient, connectWallet } = useWallet();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [developerAddress, setDeveloperAddress] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string>('');
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }
    
    if (!projectDescription.trim()) {
      newErrors.projectDescription = 'Project description is required';
    }
    
    if (!developerAddress.trim()) {
      newErrors.developerAddress = 'Developer address is required';
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(developerAddress)) {
      newErrors.developerAddress = 'Invalid Avalanche address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        if (!window.ethereum) {
          throw new Error("MetaMask is not installed");
        }

        const provider = new ethers.JsonRpcProvider('https://testnet.snowtrace.io/');
        const signer = await provider.getSigner();
        const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);

        const tx = await factory.createProject(
          projectName,
          projectDescription,
          developerAddress
        );

        setTransactionHash(tx.hash);
        await tx.wait();
        setIsSuccess(true);
        
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error: any) {
        console.error('Contract error:', error);
        setErrors(prev => ({
          ...prev,
          submit: error.message || 'Failed to create project'
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <Wallet size={64} className={`${darkMode ? 'text-indigo-400' : 'text-yellow-500'} mb-4`} />
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Wallet Not Connected</h1>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-md mb-6`}>
          Please connect your wallet to create a new project.
        </p>
        <button 
          onClick={connectWallet}
          className={`flex items-center space-x-2 ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-6 py-3 rounded-lg transition`}
        >
          <Wallet size={20} />
          <span className="font-medium">Connect Wallet</span>
        </button>
      </div>
    );
  }
  
  if (!isClient) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <AlertCircle size={64} className={`${darkMode ? 'text-yellow-400' : 'text-yellow-500'} mb-4`} />
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Client Role Required</h1>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-md mb-6`}>
          You need to switch to client role to create a new project.
        </p>
      </div>
    );
  }
  
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <CheckCircle size={64} className={`${darkMode ? 'text-green-400' : 'text-green-500'} mb-4`} />
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Project Created Successfully!</h1>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-md mb-6`}>
          Your project has been created and is now available on the blockchain.
        </p>
        {transactionHash && (
          <a
            href={`https://testnet.snowtrace.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'}`}
          >
            View transaction on Snowtrace
          </a>
        )}
      </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-3xl">
      <div className={`${darkMode ? 'bg-dark-800 border border-dark-700' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
        <div className={`px-6 py-4 ${darkMode ? 'border-b border-dark-700' : 'border-b'}`}>
          <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Create New Project</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <div className="mb-4">
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className={`w-full px-3 py-2 ${darkMode ? 'bg-dark-700 text-white border-dark-600' : 'bg-white text-gray-900 border-gray-300'} border ${errors.projectName ? 'border-red-500' : ''} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Enter project name"
              />
              {errors.projectName && (
                <p className="mt-1 text-sm text-red-500">{errors.projectName}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Project Description
              </label>
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 ${darkMode ? 'bg-dark-700 text-white border-dark-600' : 'bg-white text-gray-900 border-gray-300'} border ${errors.projectDescription ? 'border-red-500' : ''} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Describe your project in detail"
              ></textarea>
              {errors.projectDescription && (
                <p className="mt-1 text-sm text-red-500">{errors.projectDescription}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Developer Avalanche Address
              </label>
              <input
                type="text"
                value={developerAddress}
                onChange={(e) => setDeveloperAddress(e.target.value)}
                className={`w-full px-3 py-2 ${darkMode ? 'bg-dark-700 text-white border-dark-600' : 'bg-white text-gray-900 border-gray-300'} border ${errors.developerAddress ? 'border-red-500' : ''} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="0x..."
              />
              {errors.developerAddress && (
                <p className="mt-1 text-sm text-red-500">{errors.developerAddress}</p>
              )}
              <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Enter the Avalanche address of the developer who will work on this project
              </p>
            </div>
          </div>
          
          <div className={`${darkMode ? 'border-t border-dark-700' : 'border-t'} pt-6 flex justify-end`}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Creating Project...' : 'Create Project'}
            </button>
          </div>
          
          {errors.submit && (
            <p className="mt-4 text-sm text-red-500 text-center">{errors.submit}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateProject;