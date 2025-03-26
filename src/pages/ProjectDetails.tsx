import React, { useState } from 'react';
import { pinata } from "../utils/config"
import { useParams } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
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
  X
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
  const { isClient, isDeveloper } = useWallet();
  const [activeTab, setActiveTab] = useState('overview');
  const [fundModalOpen, setFundModalOpen] = useState(false);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null);
  const [fundAmount, setFundAmount] = useState('');
  const [proofLink, setProofLink] = useState('');
  const [proofDescription, setProofDescription] = useState('');

  // Pinata integration
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
  
  // In a real app, we would fetch the project data based on the ID
  const project = mockProject;
  
  const handleFundMilestone = (milestone: any) => {
    setSelectedMilestone(milestone);
    setFundAmount(milestone.amount);
    setFundModalOpen(true);
  };
  
  const handleCompleteMilestone = (milestone: any) => {
    setSelectedMilestone(milestone);
    setCompleteModalOpen(true);
  };
  
  const submitFunding = () => {
    // In a real app, this would interact with the smart contract
    alert(`Funding milestone: ${selectedMilestone.title} with ${fundAmount} ETH`);
    setFundModalOpen(false);
  };
  
  const submitCompletion = () => {
    // In a real app, this would interact with the smart contract
    alert(`Marking milestone as complete: ${selectedMilestone.title} with proof: ${proofLink}`);
    setCompleteModalOpen(false);
  };
  
  return (
    <div className="container mx-auto">
      {/* Project Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
            <div className="flex items-center mt-1">
              <span className={`text-xs px-2 py-1 rounded-full mr-2 ${
                project.status === 'active' ? 'bg-green-100 text-green-800' :
                project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Calendar size={14} className="mr-1" />
                Created on {project.createdAt}
              </span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <a 
              href={`https://etherscan.io/address/${project.contract}`} 
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
                onClick={() => handleFundMilestone(project.milestones.find(m => m.status === 'in-progress' || m.status === 'pending'))}
              >
                <DollarSign size={16} className="mr-1" />
                Fund Next Milestone
              </button>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{project.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500 mb-1">Budget</p>
            <p className="font-semibold">{project.budget}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500 mb-1">Funded</p>
            <p className="font-semibold">{project.funded}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500 mb-1">Progress</p>
            <p className="font-semibold">{project.progress}%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500 mb-1">Last Activity</p>
            <p className="font-semibold">{project.lastActivity}</p>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full" 
            style={{ width: `${project.progress}%` }}
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
            <span className="text-gray-600">{project.client.name}</span>
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">{project.client.address}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Reputation:</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(project.client.reputation) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-sm text-gray-500">{project.client.reputation}/5</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Code size={20} className="text-indigo-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Developer</h2>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">{project.developer.name}</span>
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">{project.developer.address}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Reputation:</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(project.developer.reputation) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-sm text-gray-500">{project.developer.reputation}/5</span>
            </div>
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
                  <button className="text-sm flex items-center text-indigo-600 hover:text-indigo-800">
                    <PlusCircle size={16} className="mr-1" />
                    Add Milestone
                  </button>
                )}
              </div>
              
              <div className="space-y-6">
                {project.milestones.map((milestone, index) => (
                  <div key={milestone.id} className="border rounded-lg overflow-hidden">
                    <div className={`px-6 py-4 flex justify-between items-center ${
                      milestone.status === 'completed' ? 'bg-green-50' :
                      milestone.status === 'in-progress' ? 'bg-blue-50' :
                      'bg-gray-50'
                    }`}>
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-indigo-600 font-semibold mr-3 border border-indigo-200">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{milestone.title}</h3>
                          <div className="flex items-center text-sm">
                            <span className={`flex items-center ${
                              milestone.status === 'completed' ? 'text-green-600' :
                              milestone.status === 'in-progress' ? 'text-blue-600' :
                              'text-gray-500'
                            }`}>
                              {milestone.status === 'completed' ? (
                                <CheckCircle2 size={14} className="mr-1" />
                              ) : milestone.status === 'in-progress' ? (
                                <Clock size={14} className="mr-1" />
                              ) : (
                                <AlertCircle size={14} className="mr-1" />
                              )}
                              {milestone.status === 'completed' ? 'Completed' :
                               milestone.status === 'in-progress' ? 'In Progress' :
                               'Pending'}
                            </span>
                            <span className="mx-2">•</span>
                            <span className="text-gray-500">{milestone.amount}</span>
                            <span className="mx-2">•</span>
                            <span className="text-gray-500">Due: {milestone.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        {isClient && milestone.status === 'pending' && (
                          <button 
                            onClick={() => handleFundMilestone(milestone)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Fund
                          </button>
                        )}
                        {isDeveloper && milestone.status === 'in-progress' && (
                          <button 
                            onClick={() => handleCompleteMilestone(milestone)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Complete
                          </button>
                        )}
                        {milestone.status === 'completed' && (
                          <span className="flex items-center text-green-600 text-sm">
                            <CheckCheck size={16} className="mr-1" />
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="px-6 py-4">
                      <p className="text-gray-600 text-sm mb-4">{milestone.description}</p>
                      
                      {milestone.status === 'completed' && (
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Completion Proof</h4>
                          <p className="text-sm text-gray-600 mb-2">{milestone.proofDescription}</p>
                          <a 
                            href={milestone.proofLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                          >
                            <LinkIcon size={14} className="mr-1" />
                            View Proof
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'transactions' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Transaction History</h2>
              <div className="overflow-x-auto">
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
                            href={`https://etherscan.io/tx/${tx.hash}`}
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
                Amount (ETH)
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
              <button onClick={handleSubmission}>Submit</button>
              <p className="mt-1 text-xs text-gray-500">
                Link to GitHub, IPFS, or other proof of completion
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
    </div>
  );
};

export default ProjectDetails;