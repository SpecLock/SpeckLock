import React, { useState, useEffect } from 'react';
import { pinata } from "../utils/config"
import { useParams } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { ProjectContractService, ProjectDetailsV2, Milestone } from '../services/projectContractService';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Link as LinkIcon, 
  Download, 
  Upload, 
  DollarSign,
  Calendar,
  User,
  Code,
  Wallet,
  PlusCircle,
  ExternalLink,
  CheckCheck,
  X,
  Loader2
} from 'lucide-react';

function FormFile() {
  const [selectedFile, setSelectedFile]: any = useState();
  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    try {
      const upload = await pinata.upload.public.file(selectedFile)
      console.log(upload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label className="form-label"> Choose File</label>
      <input type="file" onChange={changeHandler} />
      <button onClick={handleSubmission}>Submit</button>
    </>
  );
}

// Mock project data
const mockProject = {
  id: '1',
  name: 'E-commerce Platform',
  description: 'Blockchain-based e-commerce platform with decentralized payments and transparent supply chain tracking. The platform will include user authentication, product listings, shopping cart, checkout process, and payment processing using cryptocurrency.',
  budget: '5.5 USDC',
  funded: '3.2 USDC',
  progress: 58,
  status: 'active',
  createdAt: '2025-03-15',
  lastActivity: '2 hours ago',
  client: {
    address: '0x1234...5678',
    name: 'TechInnovate Inc.',
    reputation: 4.8
  },
  developer: {
    address: '0x8765...4321',
    name: 'BlockDev Solutions',
    reputation: 4.9
  },
  contract: '0xabcd...ef12',
  milestones: [
    {
      id: 'm1',
      title: 'Project Setup & Architecture',
      description: 'Initial project setup, architecture design, and technology stack selection.',
      amount: '0.8 USDC',
      status: 'completed',
      dueDate: '2025-03-25',
      completedDate: '2025-03-23',
      proofLink: 'https://github.com/project/repo/pull/1',
      proofDescription: 'GitHub repository with initial project structure and documentation',
      verificationStatus: 'verified'
    },
    {
      id: 'm2',
      title: 'User Authentication & Profiles',
      description: 'Implement user registration, login, and profile management using blockchain identities.',
      amount: '1.2 USDC',
      status: 'completed',
      dueDate: '2025-04-10',
      completedDate: '2025-04-08',
      proofLink: 'https://github.com/project/repo/pull/2',
      proofDescription: 'Authentication system implementation with wallet connection',
      verificationStatus: 'verified'
    },
    {
      id: 'm3',
      title: 'Product Catalog & Search',
      description: 'Implement product listings, categories, and search functionality with metadata stored on IPFS.',
      amount: '1.2 USDC',
      status: 'completed',
      dueDate: '2025-04-25',
      completedDate: '2025-04-27',
      proofLink: 'https://github.com/project/repo/pull/3',
      proofDescription: 'Product catalog implementation with IPFS integration',
      verificationStatus: 'verified'
    },
    {
      id: 'm4',
      title: 'Shopping Cart & Checkout',
      description: 'Implement shopping cart functionality and checkout process with crypto payment options.',
      amount: '1.0 USDC',
      status: 'in-progress',
      dueDate: '2025-05-15',
      completedDate: null,
      proofLink: null,
      proofDescription: null,
      verificationStatus: null
    },
    {
      id: 'm5',
      title: 'Final Deployment & Testing',
      description: 'Complete system testing, security audit, and production deployment.',
      amount: '1.3 USDC',
      status: 'pending',
      dueDate: '2025-06-01',
      completedDate: null,
      proofLink: null,
      proofDescription: null,
      verificationStatus: null
    }
  ],
  transactions: [
    {
      id: 'tx1',
      type: 'Project Created',
      amount: '-',
      from: '0x1234...5678',
      to: '0xabcd...ef12',
      time: '2025-03-15',
      status: 'confirmed',
      hash: '0xabc123...'
    },
    {
      id: 'tx2',
      type: 'Milestone Funded',
      amount: '0.8 USDC',
      from: '0x1234...5678',
      to: '0xabcd...ef12',
      time: '2025-03-16',
      status: 'confirmed',
      hash: '0xdef456...'
    },
    {
      id: 'tx3',
      type: 'Milestone Completed',
      amount: '0.8 USDC',
      from: '0xabcd...ef12',
      to: '0x8765...4321',
      time: '2025-03-23',
      status: 'confirmed',
      hash: '0xghi789...'
    },
    {
      id: 'tx4',
      type: 'Milestone Funded',
      amount: '1.2 USDC',
      from: '0x1234...5678',
      to: '0xabcd...ef12',
      time: '2025-03-26',
      status: 'confirmed',
      hash: '0xjkl012...'
    },
    {
      id: 'tx5',
      type: 'Milestone Completed',
      amount: '1.2 USDC',
      from: '0xabcd...ef12',
      to: '0x8765...4321',
      time: '2025-04-08',
      status: 'confirmed',
      hash: '0xmno345...'
    },
    {
      id: 'tx6',
      type: 'Milestone Funded',
      amount: '1.2 USDC',
      from: '0x1234...5678',
      to: '0xabcd...ef12',
      time: '2025-04-10',
      status: 'confirmed',
      hash: '0xpqr678...'
    },
    {
      id: 'tx7',
      type: 'Milestone Completed',
      amount: '1.2 USDC',
      from: '0xabcd...ef12',
      to: '0x8765...4321',
      time: '2025-04-27',
      status: 'confirmed',
      hash: '0xstu901...'
    }
  ]
};

// Modal components
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    isClient, 
    isDeveloper, 
    account, 
    balance, 
    networkName, 
    isConnected 
  } = useWallet();
  const [activeTab, setActiveTab] = useState('overview');
  const [fundModalOpen, setFundModalOpen] = useState(false);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null);
  const [fundAmount, setFundAmount] = useState('');
  const [proofLink, setProofLink] = useState('');
  const [proofDescription, setProofDescription] = useState('');
  
  // Add Milestone modal states
  const [addMilestoneModalOpen, setAddMilestoneModalOpen] = useState(false);
  const [milestoneTitle, setMilestoneTitle] = useState('');
  const [milestoneDescription, setMilestoneDescription] = useState('');
  const [milestoneDueDate, setMilestoneDueDate] = useState('');
  const [milestoneAmount, setMilestoneAmount] = useState('');
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  
  // New states for blockchain data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectDetails, setProjectDetails] = useState<ProjectDetailsV2 | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [lastActivity, setLastActivity] = useState<string>('');
  const [projectProgress, setProjectProgress] = useState<number>(0);

  // Pinata integration
  const [selectedFile, setSelectedFile]: any = useState();
  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    try {
      const upload = await pinata.upload.public.file(selectedFile)
      console.log(upload);
      setProofLink(upload.ipfs);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to add a milestone
  const submitAddMilestone = async () => {
    if (!id || !milestoneTitle || !milestoneDescription || !milestoneDueDate || !milestoneAmount) {
      alert('Please fill in all milestone details');
      return;
    }
    
    try {
      setIsAddingMilestone(true);
      const service = new ProjectContractService();
      await service.connectWallet();
      
      // Convert the date string to a UNIX timestamp
      const tentativeDate = Math.floor(new Date(milestoneDueDate).getTime() / 1000);
      
      // Call the contract method
      await service.addMilestone(
        id,
        milestoneTitle,
        tentativeDate,
        milestoneDescription,
        milestoneAmount
      );
      
      // Close modal and reset form
      setAddMilestoneModalOpen(false);
      setMilestoneTitle('');
      setMilestoneDescription('');
      setMilestoneDueDate('');
      setMilestoneAmount('');
      
      // Reload project data
      fetchProjectData();
      
      alert('Milestone added successfully!');
    } catch (error) {
      console.error("Error adding milestone:", error);
      alert("Failed to add milestone. See console for details.");
    } finally {
      setIsAddingMilestone(false);
    }
  };
  
  // Refactor the fetchProjectData function to be reusable after adding a milestone
  const fetchProjectData = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const service = new ProjectContractService();
      
      // Fetch project details
      const details = await service.getProjectDetailsV2(id);
      setProjectDetails(details);
      
      // Fetch milestones
      const milestonesData = await service.getAllMilestones(id);
      setMilestones(milestonesData);

      // Calculate progress
      const completedMilestones = milestonesData.filter(m => m.completed).length;
      const progress = milestonesData.length > 0 
        ? Math.round((completedMilestones / milestonesData.length) * 100)
        : 0;
      setProjectProgress(progress);
      
      // Set last activity (mock for now as it's not in the contract)
      setLastActivity('2 hours ago');
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching project data:", err);
      setError("Failed to load project data. Please check if the contract address is valid.");
      setLoading(false);
    }
  };
  
  // Fetch project data
  useEffect(() => {
    fetchProjectData();
  }, [id]);
  
  // Use either real data or fallback to mock
  const project = projectDetails || mockProject;
  
  const handleFundMilestone = (milestone: any) => {
    setSelectedMilestone(milestone);
    setFundAmount(milestone.amount || '0');
    setFundModalOpen(true);
  };
  
  const handleCompleteMilestone = (milestone: any) => {
    setSelectedMilestone(milestone);
    setCompleteModalOpen(true);
  };
  
  const submitFunding = async () => {
    if (!id || !selectedMilestone) return;

    try {
      const service = new ProjectContractService();
      await service.connectWallet();
      await service.approveMilestone(id, selectedMilestone.id);
      alert(`Funding milestone: ${selectedMilestone.title} with ${fundAmount} ETH`);
      setFundModalOpen(false);
    } catch (error) {
      console.error("Error funding milestone:", error);
      alert("Failed to fund milestone. See console for details.");
    }
  };
  
  const submitCompletion = async () => {
    if (!id || !selectedMilestone) return;
    
    try {
      const service = new ProjectContractService();
      await service.connectWallet();
      await service.completeMilestone(id, selectedMilestone.id, proofLink);
      alert(`Marking milestone as complete: ${selectedMilestone.title} with proof: ${proofLink}`);
      setCompleteModalOpen(false);
    } catch (error) {
      console.error("Error completing milestone:", error);
      alert("Failed to complete milestone. See console for details.");
    }
  };

  const projectParticipants = projectDetails ? {
    client: {
      address: isClient ? account : projectDetails.clientAddress,
      name: isClient ? `Client (${account?.slice(0, 6)}...${account?.slice(-4)})` : projectDetails.formattedClientAddress,
      reputation: 4.8 // Mock data as it's not in the contract
    },
    developer: {
      address: isDeveloper ? account : projectDetails.developerAddress,
      name: isDeveloper ? `Developer (${account?.slice(0, 6)}...${account?.slice(-4)})` : projectDetails.formattedDeveloperAddress,
      reputation: 4.9 // Mock data as it's not in the contract
    }
  } : {
    client: {
      address: isClient ? account : project.client.address,
      name: isClient ? `Client (${account?.slice(0, 6)}...${account?.slice(-4)})` : project.client.name,
      reputation: project.client.reputation
    },
    developer: {
      address: isDeveloper ? account : project.developer.address,
      name: isDeveloper ? `Developer (${account?.slice(0, 6)}...${account?.slice(-4)})` : project.developer.name,
      reputation: project.developer.reputation
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mb-4" />
        <p className="text-gray-600">Loading project details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-red-600 mb-2">Error loading project</p>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {/* Project Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{projectDetails?.projectName || project.name}</h1>
            <div className="flex items-center mt-1">
              <span className={`text-xs px-2 py-1 rounded-full mr-2 bg-green-100 text-green-800`}>
                Active
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Calendar size={14} className="mr-1" />
                Created on {new Date().toISOString().split('T')[0]} {/* Placeholder date */}
              </span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <a 
              href={`https://subnets-test.avax.network/c-chain/address/${id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-indigo-600 hover:text-indigo-800 mr-4"
            >
              <ExternalLink size={16} className="mr-1" />
              <span>View Contract</span>
            </a>
            
            {isClient && (
              <button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center transition"
                onClick={() => {
                  const nextMilestone = milestones.find(m => !m.completed);
                  if (nextMilestone) handleFundMilestone(nextMilestone);
                }}
              >
                <DollarSign size={16} className="mr-1" />
                Fund Next Milestone
              </button>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{projectDetails?.projectDescription || project.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500 mb-1">Budget</p>
            <p className="font-semibold">{projectDetails?.totalBudget || project.budget}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500 mb-1">Funded</p>
            <p className="font-semibold">{projectDetails?.totalBudget || project.funded}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500 mb-1">Progress</p>
            <p className="font-semibold">{projectProgress}%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500 mb-1">Last Activity</p>
            <p className="font-semibold">{lastActivity}</p>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full" 
            style={{ width: `${projectProgress}%` }}
          ></div>
        </div>
      </div>
      
      {/* Project Participants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Wallet size={20} className="text-indigo-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Client</h2>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">{projectParticipants.client.name}</span>
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">
              {projectParticipants.client.address || 'Not Connected'}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Network:</span>
            <span className="text-sm text-gray-700">{networkName}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Code size={20} className="text-indigo-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Developer</h2>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">{projectParticipants.developer.name}</span>
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">
              {projectParticipants.developer.address || 'Not Connected'}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Balance:</span>
            <span className="text-sm text-gray-700">{balance} AVAX</span>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Milestones
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'transactions'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Transactions
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Project Milestones</h2>
                {isClient && (
                  <button 
                    className="text-sm flex items-center text-indigo-600 hover:text-indigo-800"
                    onClick={() => setAddMilestoneModalOpen(true)}
                  >
                    <PlusCircle size={16} className="mr-1" />
                    Add Milestone
                  </button>
                )}
              </div>
              
              <div className="space-y-6">
                {milestones.length > 0 ? milestones.map((milestone, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className={`px-6 py-4 flex justify-between items-center ${
                      milestone.completed ? 'bg-green-50' : 'bg-blue-50'
                    }`}>
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-indigo-600 font-semibold mr-3 border border-indigo-200">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{milestone.title}</h3>
                          <div className="flex items-center text-sm">
                            <span className={`flex items-center ${
                              milestone.completed ? 'text-green-600' : 'text-blue-600'
                            }`}>
                              {milestone.completed ? (
                                <CheckCircle2 size={14} className="mr-1" />
                              ) : (
                                <Clock size={14} className="mr-1" />
                              )}
                              {milestone.completed ? 'Completed' : 'In Progress'}
                            </span>
                            <span className="mx-2">•</span>
                            <span className="text-gray-500">{milestone.amount} ETH</span>
                            <span className="mx-2">•</span>
                            <span className="text-gray-500">Due: {new Date(milestone.tentativeDate * 1000).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        {isClient && !milestone.completed && (
                          <button 
                            onClick={() => handleFundMilestone({...milestone, id: index})}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Fund
                          </button>
                        )}
                        {isDeveloper && !milestone.completed && (
                          <button 
                            onClick={() => handleCompleteMilestone({...milestone, id: index})}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Complete
                          </button>
                        )}
                        {milestone.completed && (
                          <span className="flex items-center text-green-600 text-sm">
                            <CheckCheck size={16} className="mr-1" />
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="px-6 py-4">
                      <p className="text-gray-600 text-sm mb-4">{milestone.description}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No milestones found for this project</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'transactions' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Transaction History</h2>
              <div className="overflow-x-auto">
                {/* Keep mock transaction data for now */}
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hash</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {project.transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tx.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.from}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.to}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            tx.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a 
                            href={`https://snowtrace.io/tx/${tx.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            {tx.hash}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Fund Milestone Modal */}
      <Modal
        isOpen={fundModalOpen}
        onClose={() => setFundModalOpen(false)}
        title="Fund Milestone"
      >
        {selectedMilestone && (
          <div>
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-1">{selectedMilestone.title}</h4>
              <p className="text-sm text-gray-600">{selectedMilestone.description}</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (avax)
              </label>
              <input
                type="text"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="0.0"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setFundModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitFunding}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Confirm Funding
              </button>
            </div>
          </div>
        )}
      </Modal>
      
      {/* Complete Milestone Modal */}
      <Modal
        isOpen={completeModalOpen}
        onClose={() => setCompleteModalOpen(false)}
        title="Complete Milestone"
      >
        {selectedMilestone && (
          <div>
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-1">{selectedMilestone.title}</h4>
              <p className="text-sm text-gray-600">{selectedMilestone.description}</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proof Link
              </label>
              <input type="file" onChange={changeHandler} />
              <button 
                onClick={handleSubmission}
                className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Upload to IPFS
              </button>
              {proofLink && (
                <div className="mt-2 text-green-600 text-sm">
                  File uploaded to IPFS: {proofLink}
                </div>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Upload proof of completion to IPFS
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={proofDescription}
                onChange={(e) => setProofDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe what was completed and how it meets the milestone requirements..."
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setCompleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitCompletion}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Submit Proof
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Milestone Modal */}
      <Modal
        isOpen={addMilestoneModalOpen}
        onClose={() => setAddMilestoneModalOpen(false)}
        title="Add New Milestone"
      >
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={milestoneTitle}
              onChange={(e) => setMilestoneTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Milestone title"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={milestoneDescription}
              onChange={(e) => setMilestoneDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Describe what needs to be accomplished for this milestone..."
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={milestoneDueDate}
              onChange={(e) => setMilestoneDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (avax)
            </label>
            <input
              type="text"
              value={milestoneAmount}
              onChange={(e) => setMilestoneAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="0.0"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setAddMilestoneModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isAddingMilestone}
            >
              Cancel
            </button>
            <button
              onClick={submitAddMilestone}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
              disabled={isAddingMilestone}
            >
              {isAddingMilestone ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Milestone'
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectDetails;