import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Filter,
  Search,
  Wallet,
  Code,
  PlusCircle
} from 'lucide-react';

// Mock data for projects
const mockProjects = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Blockchain-based e-commerce platform with decentralized payments',
    budget: '5.5 USDC',
    funded: '3.2 USDC',
    progress: 58,
    milestones: 5,
    completedMilestones: 3,
    status: 'active',
    lastActivity: '2 hours ago',
    client: '0x1234...5678',
    developer: '0x8765...4321'
  },
  {
    id: '2',
    name: 'Supply Chain Tracker',
    description: 'Transparent supply chain tracking system on blockchain',
    budget: '3.8 USDC',
    funded: '3.8 USDC',
    progress: 75,
    milestones: 8,
    completedMilestones: 6,
    status: 'active',
    lastActivity: '5 hours ago',
    client: '0x2345...6789',
    developer: '0x9876...5432'
  },
  {
    id: '3',
    name: 'Decentralized Voting System',
    description: 'Secure and transparent voting system using smart contracts',
    budget: '2.5 USDC',
    funded: '2.5 USDC',
    progress: 100,
    milestones: 4,
    completedMilestones: 4,
    status: 'completed',
    lastActivity: '2 days ago',
    client: '0x3456...7890',
    developer: '0x0987...6543'
  },
  {
    id: '4',
    name: 'NFT Marketplace',
    description: 'Platform for creating and trading NFTs with royalty tracking',
    budget: '7.2 USDC',
    funded: '2.0 USDC',
    progress: 28,
    milestones: 6,
    completedMilestones: 2,
    status: 'active',
    lastActivity: '1 day ago',
    client: '0x4567...8901',
    developer: '0x1098...7654'
  },
  {
    id: '5',
    name: 'DeFi Lending Protocol',
    description: 'Decentralized lending and borrowing platform',
    budget: '10.0 USDC',
    funded: '0 USDC',
    progress: 0,
    milestones: 10,
    completedMilestones: 0,
    status: 'pending',
    lastActivity: 'Just created',
    client: '0x5678...9012',
    developer: 'Not assigned'
  }
];

// Recent transactions mock data
const mockTransactions = [
  {
    id: 'tx1',
    type: 'Milestone Funded',
    project: 'E-commerce Platform',
    amount: '0.8 USDC',
    from: '0x1234...5678',
    to: 'Contract',
    time: '2 hours ago',
    status: 'confirmed'
  },
  {
    id: 'tx2',
    type: 'Milestone Completed',
    project: 'Supply Chain Tracker',
    amount: '0.5 USDC',
    from: 'Contract',
    to: '0x9876...5432',
    time: '5 hours ago',
    status: 'confirmed'
  },
  {
    id: 'tx3',
    type: 'Project Created',
    project: 'DeFi Lending Protocol',
    amount: '-',
    from: '0x5678...9012',
    to: 'Contract',
    time: '1 day ago',
    status: 'confirmed'
  },
  {
    id: 'tx4',
    type: 'Milestone Verification',
    project: 'NFT Marketplace',
    amount: '-',
    from: '0x1098...7654',
    to: 'Contract',
    time: '1 day ago',
    status: 'pending'
  }
];

const Dashboard: React.FC = () => {
  const { isConnected, isClient, isDeveloper, connectWallet } = useWallet();
  const { darkMode } = useTheme();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter projects based on role and filter selection
  const filteredProjects = mockProjects.filter(project => {
    if (filter === 'active') return project.status === 'active';
    if (filter === 'completed') return project.status === 'completed';
    if (filter === 'pending') return project.status === 'pending';
    return true;
  }).filter(project => {
    return project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           project.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <Wallet size={64} className={`${darkMode ? 'text-indigo-400' : 'text-indigo-500'} mb-4`} />
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Connect Your Wallet</h1>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-md mb-6`}>
          Connect your wallet to access the dashboard and manage your blockchain projects.
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {isClient ? 'Client Dashboard' : 'Developer Dashboard'}
          </h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {isClient 
              ? 'Manage your projects and fund milestones' 
              : 'Track your development tasks and submit milestone proofs'}
          </p>
        </div>
        
        <Link 
          to="/create-project" 
          className={`mt-4 md:mt-0 ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-4 py-2 rounded-md flex items-center transition`}
        >
          <PlusCircle size={18} className="mr-2" />
          {isClient ? 'Create New Project' : 'Submit Project Proposal'}
        </Link>
      </div>
      
      {/* Filters and Search */}
      <div className={`${darkMode ? 'bg-dark-800 border border-dark-700' : 'bg-white'} rounded-lg shadow-md p-4 mb-6`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Filter size={20} className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <div className="flex space-x-2">
              <button 
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-md ${
                  filter === 'all' 
                    ? darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'
                    : darkMode ? 'bg-dark-700 text-gray-300 hover:bg-dark-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('active')}
                className={`px-3 py-1 rounded-md ${
                  filter === 'active' 
                    ? darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'
                    : darkMode ? 'bg-dark-700 text-gray-300 hover:bg-dark-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active
              </button>
              <button 
                onClick={() => setFilter('completed')}
                className={`px-3 py-1 rounded-md ${
                  filter === 'completed' 
                    ? darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'
                    : darkMode ? 'bg-dark-700 text-gray-300 hover:bg-dark-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Completed
              </button>
              <button 
                onClick={() => setFilter('pending')}
                className={`px-3 py-1 rounded-md ${
                  filter === 'pending' 
                    ? darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'
                    : darkMode ? 'bg-dark-700 text-gray-300 hover:bg-dark-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
            </div>
          </div>
          
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 ${darkMode ? 'bg-dark-700 border-dark-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'} border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
            />
            <Search size={18} className={`absolute left-3 top-2.5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
          </div>
        </div>
      </div>
      
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredProjects.map((project) => (
          <Link 
            key={project.id} 
            to={`/project/${project.id}`}
            className={`${darkMode ? 'bg-dark-800 border border-dark-700 hover:border-dark-600' : 'bg-white hover:shadow-lg'} rounded-lg shadow-md overflow-hidden transition`}
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} truncate`}>{project.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  project.status === 'active' 
                    ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                    : project.status === 'completed' 
                      ? darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                      : darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>
              
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4 line-clamp-2`}>{project.description}</p>
              
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Budget</p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.budget}</p>
                </div>
                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Funded</p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.funded}</p>
                </div>
                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Progress</p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.progress}%</p>
                </div>
              </div>
              
              <div className={`w-full ${darkMode ? 'bg-dark-600' : 'bg-gray-200'} rounded-full h-2 mb-4`}>
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Clock size={14} className="mr-1" />
                  <span>{project.lastActivity}</span>
                </div>
                <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <CheckCircle2 size={14} className="mr-1" />
                  <span>{project.completedMilestones}/{project.milestones} milestones</span>
                </div>
              </div>
            </div>
            
            <div className={`${darkMode ? 'bg-dark-700 border-t border-dark-600' : 'bg-gray-50 border-t'} px-5 py-3 flex justify-between items-center`}>
              <div className="flex items-center">
                {isClient ? (
                  <Code size={16} className={`${darkMode ? 'text-indigo-400' : 'text-indigo-500'} mr-2`} />
                ) : (
                  <Wallet size={16} className={`${darkMode ? 'text-indigo-400' : 'text-indigo-500'} mr-2`} />
                )}
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} truncate w-32`}>
                  {isClient ? project.developer : project.client}
                </span>
              </div>
              <ArrowRight size={16} className={`${darkMode ? 'text-indigo-400' : 'text-indigo-500'}`} />
            </div>
          </Link>
        ))}
      </div>
      
      {/* Recent Transactions */}
      <div className={`${darkMode ? 'bg-dark-800 border border-dark-700' : 'bg-white'} rounded-lg shadow-md overflow-hidden mb-6`}>
        <div className={`px-6 py-4 ${darkMode ? 'border-b border-dark-700' : 'border-b'}`}>
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${darkMode ? 'bg-dark-700' : 'bg-gray-50'}`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Type</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Project</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Amount</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>From</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>To</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Time</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Status</th>
              </tr>
            </thead>
            <tbody className={`${darkMode ? 'divide-y divide-dark-700' : 'divide-y divide-gray-200'}`}>
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className={`${darkMode ? 'hover:bg-dark-700' : 'hover:bg-gray-50'}`}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tx.type}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{tx.project}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{tx.amount}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{tx.from}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{tx.to}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{tx.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      tx.status === 'confirmed' 
                        ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                        : darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;