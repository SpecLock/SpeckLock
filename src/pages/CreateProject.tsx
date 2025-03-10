import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Plus, 
  Trash2, 
  Calendar, 
  DollarSign,
  AlertCircle,
  CheckCircle,
  Wallet
} from 'lucide-react';

const CreateProject: React.FC = () => {
  const { isConnected, isClient, account } = useWallet();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [developerAddress, setDeveloperAddress] = useState('');
  const [milestones, setMilestones] = useState([
    { title: '', description: '', amount: '', dueDate: '' }
  ]);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const addMilestone = () => {
    setMilestones([...milestones, { title: '', description: '', amount: '', dueDate: '' }]);
  };
  
  const removeMilestone = (index: number) => {
    if (milestones.length > 1) {
      const updatedMilestones = [...milestones];
      updatedMilestones.splice(index, 1);
      setMilestones(updatedMilestones);
    }
  };
  
  const updateMilestone = (index: number, field: string, value: string) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = { ...updatedMilestones[index], [field]: value };
    setMilestones(updatedMilestones);
  };
  
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
      newErrors.developerAddress = 'Invalid Avax address';
    }
    
    milestones.forEach((milestone, index) => {
      if (!milestone.title.trim()) {
        newErrors[`milestone_${index}_title`] = 'Title is required';
      }
      
      if (!milestone.description.trim()) {
        newErrors[`milestone_${index}_description`] = 'Description is required';
      }
      
      if (!milestone.amount.trim()) {
        newErrors[`milestone_${index}_amount`] = 'Amount is required';
      } else if (isNaN(parseFloat(milestone.amount)) || parseFloat(milestone.amount) <= 0) {
        newErrors[`milestone_${index}_amount`] = 'Amount must be a positive number';
      }
      
      if (!milestone.dueDate.trim()) {
        newErrors[`milestone_${index}_dueDate`] = 'Due date is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // In a real app, this would interact with the smart contract
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Redirect to dashboard after success
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }, 1500);
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
            <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Project Details</h2>
            
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
                Enter the Avlanche address of the developer who will work on this project
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Project Milestones</h2>
              <button
                type="button"
                onClick={addMilestone}
                className={`flex items-center text-sm ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'}`}
              >
                <Plus size={16} className="mr-1" />
                Add Milestone
              </button>
            </div>
            
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className={`${darkMode ? 'border-dark-600 bg-dark-700' : 'border-gray-300'} border rounded-lg p-4`}>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Milestone {index + 1}</h3>
                    {milestones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMilestone(index)}
                        className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                        Title
                      </label>
                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                        className={`w-full px-3 py-2 ${darkMode ? 'bg-dark-600 text-white border-dark-500' : 'bg-white text-gray-900 border-gray-300'} border ${errors[`milestone_${index}_title`] ? 'border-red-500' : ''} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="Milestone title"
                      />
                      {errors[`milestone_${index}_title`] && (
                        <p className="mt-1 text-sm text-red-500">{errors[`milestone_${index}_title`]}</p>
                      )}
                    </div>
                    
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                          <DollarSign size={14} className="inline mr-1" />
                          Amount (USDC)
                        </label>
                        <input
                          type="text"
                          value={milestone.amount}
                          onChange={(e) => updateMilestone(index, 'amount', e.target.value)}
                          className={`w-full px-3 py-2 ${darkMode ? 'bg-dark-600 text-white border-dark-500' : 'bg-white text-gray-900 border-gray-300'} border ${errors[`milestone_${index}_amount`] ? 'border-red-500' : ''} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                          placeholder="0.0"
                        />
                        {errors[`milestone_${index}_amount`] && (
                          <p className="mt-1 text-sm text-red-500">{errors[`milestone_${index}_amount`]}</p>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                          <Calendar size={14} className="inline mr-1" />
                          Due Date
                        </label>
                        <input
                          type="date"
                          value={milestone.dueDate}
                          onChange={(e) => updateMilestone(index, 'dueDate', e.target.value)}
                          className={`w-full px-3 py-2 ${darkMode ? 'bg-dark-600 text-white border-dark-500' : 'bg-white text-gray-900 border-gray-300'} border ${errors[`milestone_${index}_dueDate`] ? 'border-red-500' : ''} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        />
                        {errors[`milestone_${index}_dueDate`] && (
                          <p className="mt-1 text-sm text-red-500">{errors[`milestone_${index}_dueDate`]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Description
                    </label>
                    <textarea
                      value={milestone.description}
                      onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                      rows={2}
                      className={`w-full px-3 py-2 ${darkMode ? 'bg-dark-600 text-white border-dark-500' : 'bg-white text-gray-900 border-gray-300'} border ${errors[`milestone_${index}_description`] ? 'border-red-500' : ''} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="Describe what should be delivered in this milestone"
                    ></textarea>
                    {errors[`milestone_${index}_description`] && (
                      <p className="mt-1 text-sm text-red-500">{errors[`milestone_${index}_description`]}</p>
                    )}
                  </div>
                </div>
              ))}
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
        </form>
      </div>
    </div>
  );
};

export default CreateProject;