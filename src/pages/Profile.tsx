import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useTheme } from '../contexts/ThemeContext';
import { ContractService } from '../services/contractService';
import { ProjectContractService, ProjectDetails } from '../services/projectContractService';
import { 
  User, 
  Wallet, 
  Shield, 
  Award, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  ExternalLink,
  PlusCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const mockProjectData = {
  projectsCompleted: 12,
  projectsInProgress: 3,
  reputation: 4.8,
  totalValue: '32.5 USDC',
  transactions: 47,
  badges: [
    { name: 'Early Adopter', description: 'Joined during platform beta' },
    { name: 'Top Client', description: 'Completed 10+ projects' },
    { name: 'Verified', description: 'Identity verified' }
  ],
  recentProjects: [
    { 
      id: '1', 
      name: 'E-commerce Platform', 
      role: 'Client', 
      status: 'In Progress', 
      lastActivity: '2 hours ago',
      value: '5.5 USDC'
    },
    { 
      id: '2', 
      name: 'Supply Chain Tracker', 
      role: 'Client', 
      status: 'In Progress', 
      lastActivity: '5 hours ago',
      value: '3.8 USDC'
    },
    { 
      id: '3', 
      name: 'Decentralized Voting System', 
      role: 'Client', 
      status: 'Completed', 
      lastActivity: '2 days ago',
      value: '2.5 USDC'
    }
  ]
};

const Profile: React.FC = () => {
  const { 
    isConnected, 
    isClient, 
    isDeveloper, 
    connectWallet, 
    account,
    balance,
    networkName
  } = useWallet();
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [rawProjects, setRawProjects] = useState<{
    ownerProjects: string[];
    devProjects: string[];
  }>({ ownerProjects: [], devProjects: [] });
  const [testResults, setTestResults] = useState<{
    ownerProjects: string[] | null;
    devProjects: string[] | null;
    error: string | null;
  }>({ ownerProjects: null, devProjects: null, error: null });
  
  const contractService = new ContractService();
  const projectService = new ProjectContractService();

  useEffect(() => {
    const fetchProjects = async () => {
      if (account && isConnected) {
        try {
          console.log('%c Fetching Projects', 'background: #222; color: #bada55; font-size: 16px;');
          console.log('%c Account:', 'color: #00f', account);
          
          // Get owner projects
          console.log('%c Calling getProjectsByOwner...', 'color: #0a0');
          const ownerProjects = await contractService.getProjectsByOwner(account);
          console.log('%c Owner Projects:', 'color: #0a0', ownerProjects);
          
          // Get developer projects
          console.log('%c Calling getProjectsByDeveloper...', 'color: #0a0');
          const devProjects = await contractService.getProjectsByDeveloper(account);
          console.log('%c Developer Projects:', 'color: #0a0', devProjects);
          
          // Store raw project addresses
          setRawProjects({
            ownerProjects,
            devProjects
          });
        } catch (error) {
          console.error('%c Error fetching projects:', 'color: #f00', error);
        }
      }
    };

    fetchProjects();
  }, [account, isConnected]);

  useEffect(() => {
    const loadProjects = async () => {
      if (isConnected && account) {
        setLoading(true);
        try {
          // Combine owner and developer projects without duplicates
          let projectAddresses: string[] = [];
          
          // If client, focus on owner projects but include any developer projects too
          if (isClient) {
            projectAddresses = [...rawProjects.ownerProjects];
            // Also include any developer projects not already in the list
            rawProjects.devProjects.forEach(addr => {
              if (!projectAddresses.includes(addr)) {
                projectAddresses.push(addr);
              }
            });
          } else {
            // If developer, focus on dev projects but include any owner projects too
            projectAddresses = [...rawProjects.devProjects];
            // Also include any owner projects not already in the list
            rawProjects.ownerProjects.forEach(addr => {
              if (!projectAddresses.includes(addr)) {
                projectAddresses.push(addr);
              }
            });
          }
          
          if (projectAddresses.length > 0) {
            const projectDetails = await Promise.all(
              projectAddresses.map(address => projectService.getProjectDetails(address))
            );
            
            setProjects(projectDetails);
          } else {
            setProjects([]);
          }
        } catch (error) {
          console.error('Error loading project details:', error);
          setProjects([]);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProjects();
  }, [isConnected, account, isClient, isDeveloper, rawProjects]);

  useEffect(() => {
    const testContractService = async () => {
      if (account && isConnected) {
        try {
          console.log('%c Testing Contract Service Functions', 'background: #222; color: #bada55; font-size: 16px;');
          console.log('%c Account:', 'color: #00f', account);
          
          // Test owner projects
          console.log('%c Calling getProjectsByOwner...', 'color: #0a0');
          const ownerProjects = await contractService.getProjectsByOwner(account);
          console.log('%c Owner Projects:', 'color: #0a0', ownerProjects);
          
          // Test developer projects
          console.log('%c Calling getProjectsByDeveloper...', 'color: #0a0');
          const devProjects = await contractService.getProjectsByDeveloper(account);
          console.log('%c Developer Projects:', 'color: #0a0', devProjects);
          
          // Store results in state to display in UI
          setTestResults({ 
            ownerProjects, 
            devProjects, 
            error: null 
          });
        } catch (error) {
          console.error('%c Error testing contract functions:', 'color: #f00', error);
          setTestResults({ 
            ownerProjects: null, 
            devProjects: null, 
            error: error instanceof Error ? error.message : String(error) 
          });
        }
      }
    };

    testContractService();
  }, [account, isConnected]);

  const userData = {
    address: account ? `${account.slice(0, 6)}...${account.slice(-4)}` : '',
    fullAddress: account || '',
    joinedDate: 'March 2025',
    role: isClient ? 'Client' : 'Developer',
    balance: `${balance} AVAX`,
    network: networkName,
    projectsCompleted: mockProjectData.projectsCompleted,
    projectsInProgress: mockProjectData.projectsInProgress,
    reputation: mockProjectData.reputation,
    totalValue: mockProjectData.totalValue,
    transactions: mockProjectData.transactions,
    badges: mockProjectData.badges,
    recentProjects: mockProjectData.recentProjects
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Address copied to clipboard!');
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <Wallet size={64} className={`${darkMode ? 'text-indigo-400' : 'text-yellow-500'} mb-4`} />
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Wallet Not Connected</h1>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-md mb-6`}>
          Please connect your wallet to view your profile.
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
  
  return (
    <div className="container mx-auto">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className={`${darkMode ? 'bg-dark-800 border border-dark-700' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
            <div className={`${darkMode ? 'bg-indigo-800' : 'bg-indigo-600'} px-6 py-8 text-center`}>
              <div className={`inline-flex items-center justify-center w-20 h-20 ${darkMode ? 'bg-dark-800 text-indigo-400' : 'bg-white text-indigo-600'} rounded-full mb-4`}>
                <User size={40} />
              </div>
              <h1 className="text-xl font-bold text-white">{userData.role}</h1>
              <div className="flex items-center justify-center mt-2">
                <span className={`${darkMode ? 'text-indigo-200' : 'text-indigo-100'} truncate`}>{userData.address}</span>
                <button 
                  onClick={() => copyToClipboard(userData.fullAddress)}
                  className={`ml-2 ${darkMode ? 'text-indigo-300 hover:text-white' : 'text-indigo-200 hover:text-white'}`}
                >
                  <Copy size={14} />
                </button>
              </div>
              <div className="mt-2 text-sm text-indigo-200">
                Network: {userData.network}
              </div>
              <div className="mt-1 text-sm text-indigo-200">
                Balance: {userData.balance}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Clock size={16} className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mr-2`} />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Joined {userData.joinedDate}</span>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(userData.reputation) ? 'text-yellow-400' : darkMode ? 'text-gray-600' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className={`ml-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{userData.reputation}/5</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`${darkMode ? 'bg-dark-700' : 'bg-gray-50'} p-3 rounded-md text-center`}>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Completed</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userData.projectsCompleted}</p>
                </div>
                <div className={`${darkMode ? 'bg-dark-700' : 'bg-gray-50'} p-3 rounded-md text-center`}>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>In Progress</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userData.projectsInProgress}</p>
                </div>
                <div className={`${darkMode ? 'bg-dark-700' : 'bg-gray-50'} p-3 rounded-md text-center`}>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Total Value</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userData.totalValue}</p>
                </div>
                <div className={`${darkMode ? 'bg-dark-700' : 'bg-gray-50'} p-3 rounded-md text-center`}>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Transactions</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userData.transactions}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3 flex items-center`}>
                  <Award size={16} className="mr-2" />
                  Badges & Achievements
                </h3>
                <div className="space-y-2">
                  {userData.badges.map((badge, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`${darkMode ? 'bg-indigo-900 text-indigo-400' : 'bg-indigo-100 text-indigo-600'} p-1 rounded-full mr-3`}>
                        <Shield size={14} />
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{badge.name}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <a 
                  href={`https://snowtrace.io/address/${userData.fullAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center text-sm ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'}`}
                >
                  <ExternalLink size={14} className="mr-1" />
                  View on snowtrace
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className={`${darkMode ? 'bg-dark-800 border border-dark-700' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
            <div className={`${darkMode ? 'border-b border-dark-700' : 'border-b'}`}>
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'projects'
                      ? darkMode 
                        ? 'border-b-2 border-indigo-500 text-indigo-400' 
                        : 'border-b-2 border-indigo-500 text-indigo-600'
                      : darkMode 
                        ? 'text-gray-400 hover:text-gray-300' 
                        : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'transactions'
                      ? darkMode 
                        ? 'border-b-2 border-indigo-500 text-indigo-400' 
                        : 'border-b-2 border-indigo-500 text-indigo-600'
                      : darkMode 
                        ? 'text-gray-400 hover:text-gray-300' 
                        : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Transactions
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'settings'
                      ? darkMode 
                        ? 'border-b-2 border-indigo-500 text-indigo-400' 
                        : 'border-b-2 border-indigo-500 text-indigo-600'
                      : darkMode 
                        ? 'text-gray-400 hover:text-gray-300' 
                        : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Settings
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {activeTab === 'projects' && (
                <div>
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                    {isClient ? 'Your Projects' : 'Assigned Projects'}
                  </h2>
                  
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                    </div>
                  ) : (isClient && testResults.ownerProjects && testResults.ownerProjects.length > 0) || 
                       (!isClient && testResults.devProjects && testResults.devProjects.length > 0) ? (
                    <>
                      {/* Show Owner Projects only if Client */}
                      {isClient && testResults.ownerProjects && testResults.ownerProjects.length > 0 && (
                        <div className="mb-3">

                          <div className={`p-3 rounded ${darkMode ? 'bg-dark-700' : 'bg-gray-50'}`}>
                            {testResults.ownerProjects.map((address, index) => (
                              <div key={index} className="mb-4 p-4 rounded-lg border border-gray-300 dark:border-dark-600 shadow-sm hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium">Project:&nbsp;</span>
                                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                      {address.slice(0, 5)}...{address.slice(-5)}
                                    </span>
                                    <button
                                      onClick={() => copyToClipboard(address)}
                                      className="flex items-center text-gray-500 hover:text-gray-700"
                                    >
                                      <Copy size={14} />
                                    </button>
                                  </div>
                                  <div className="space-x-2">
                                    <a
                                      href={`https://testnet.snowtrace.io/address/${address}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`inline-flex items-center text-sm ${
                                        darkMode
                                          ? 'text-indigo-400 hover:text-indigo-300'
                                          : 'text-indigo-600 hover:text-indigo-700'
                                      }`}
                                    >
                                      <ExternalLink size={12} className="mr-1" />
                                      View on Snowtrace
                                    </a>
                                    <Link
                                      to={`/project/${address}`}
                                      className={`inline-flex items-center text-sm ${
                                        darkMode
                                          ? 'text-indigo-400 hover:text-indigo-300'
                                          : 'text-indigo-600 hover:text-indigo-700'
                                      }`}
                                    >
                                      View Details →
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Show Developer Projects only if Developer */}
                      {!isClient && testResults.devProjects && testResults.devProjects.length > 0 && (
                        <div>

                          <div className={`p-3 rounded ${darkMode ? 'bg-dark-700' : 'bg-gray-50'}`}>
                            {testResults.devProjects.map((address, index) => (
                              <div key={index} className="mb-4 p-4 rounded-lg border border-gray-300 dark:border-dark-600 shadow-sm hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium">Project:&nbsp;</span>
                                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                      {address.slice(0, 5)}...{address.slice(-5)}
                                    </span>
                                    <button
                                      onClick={() => copyToClipboard(address)}
                                      className="flex items-center text-gray-500 hover:text-gray-700"
                                    >
                                      <Copy size={14} />
                                    </button>
                                  </div>
                                  <div className="space-x-2">
                                    <a
                                      href={`https://testnet.snowtrace.io/address/${address}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`inline-flex items-center text-sm ${
                                        darkMode
                                          ? 'text-indigo-400 hover:text-indigo-300'
                                          : 'text-indigo-600 hover:text-indigo-700'
                                      }`}
                                    >
                                      <ExternalLink size={12} className="mr-1" />
                                      View on Snowtrace
                                    </a>
                                    <Link
                                      to={`/project/${address}`}
                                      className={`inline-flex items-center text-sm ${
                                        darkMode
                                          ? 'text-indigo-400 hover:text-indigo-300'
                                          : 'text-indigo-600 hover:text-indigo-700'
                                      }`}
                                    >
                                      View Details →
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className={`text-center py-8 ${darkMode ? 'bg-dark-700' : 'bg-gray-50'} rounded-lg`}>
                      <PlusCircle size={48} className={`mx-auto ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-4`} />
                      <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-700'} mb-2`}>No Projects Yet</h3>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                        {isClient 
                          ? "You haven't created any projects yet" 
                          : "You haven't been assigned to any projects yet"}
                      </p>
                      {isClient && (
                        <Link
                          to="/create-project"
                          className={`inline-flex items-center px-4 py-2 ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white rounded-md`}
                        >
                          <PlusCircle size={16} className="mr-2" />
                          Create New Project
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'transactions' && (
                <div>
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Transaction History</h2>
                  
                  <div className={`${darkMode ? 'bg-dark-700' : 'bg-gray-50'} rounded-lg p-8 text-center`}>
                    <Wallet size={48} className={`mx-auto ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-4`} />
                    <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-700'} mb-2`}>Transaction History</h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                      View your complete transaction history on the blockchain
                    </p>
                    <a 
                      href={`https://snowtrace.io/address/${userData.fullAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-4 py-2 ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white rounded-md`}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      View on snowtrace
                    </a>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div>
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className={`text-md font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Profile Information</h3>
                      <div className={`${darkMode ? 'bg-dark-700' : 'bg-gray-50'} p-4 rounded-md`}>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                          Your profile information is derived from your blockchain identity. 
                          No additional personal information is stored.
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className={`text-md font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Notification Settings</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Notifications</label>
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input 
                              type="checkbox" 
                              name="email" 
                              id="email" 
                              className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer ${darkMode ? 'border-dark-600' : ''}`}
                            />
                            <label 
                              htmlFor="email" 
                              className={`toggle-label block overflow-hidden h-6 rounded-full ${darkMode ? 'bg-dark-600' : 'bg-gray-300'} cursor-pointer`}
                            ></label>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Browser Notifications</label>
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input 
                              type="checkbox" 
                              name="browser" 
                              id="browser" 
                              className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer ${darkMode ? 'border-dark-600' : ''}`}
                              defaultChecked
                            />
                            <label 
                              htmlFor="browser" 
                              className={`toggle-label block overflow-hidden h-6 rounded-full ${darkMode ? 'bg-dark-600' : 'bg-gray-300'} cursor-pointer`}
                            ></label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className={`text-md font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Connected Accounts</h3>
                      <div className={`${darkMode ? 'bg-dark-700' : 'bg-gray-50'} p-4 rounded-md flex justify-between items-center`}>
                        <div className="flex items-center">
                          <Wallet size={20} className={`${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-3`} />
                          <div>
                            <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>avalanche Wallet</p>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{userData.address}</p>
                          </div>
                        </div>
                        <span className={`text-xs ${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'} px-2 py-1 rounded-full`}>Connected</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;