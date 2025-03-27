import { ethers } from 'ethers';

const PROJECT_ABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_title",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_tentativeDate",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "addMilestone",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_milestoneId",
          "type": "uint256"
        }
      ],
      "name": "approveMilestone",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_milestoneId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_proof",
          "type": "string"
        }
      ],
      "name": "completeMilestone",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_projectName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_projectDescription",
          "type": "string"
        },
        {
          "internalType": "address payable",
          "name": "_developerAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "milestoneId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "MilestoneAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "milestoneId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "MilestoneApproved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "milestoneId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "proof",
          "type": "string"
        }
      ],
      "name": "MilestoneCompleted",
      "type": "event"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    },
    {
      "inputs": [],
      "name": "developerAddress",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "milestones",
      "outputs": [
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "tentativeDate",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "completed",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "projectDescription",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "projectName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalCapital",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

// Keep the original interface for backward compatibility
export interface ProjectDetails {
  name: string;
  description: string;
  owner: string;
  developer: string;
  status: number;
  totalValue: string;
  lastActivity: number;
  address: string;
}

// Add new interface with more descriptive field names
export interface ProjectDetailsV2 {
  projectName: string;
  projectDescription: string;
  clientAddress: string;
  developerAddress: string;
  totalBudget: string;
  contractAddress: string;
  formattedClientAddress: string;
  formattedDeveloperAddress: string;
}

export interface Milestone {
  title: string;
  tentativeDate: number;
  description: string;
  amount: string;
  completed: boolean;
}

export class ProjectContractService {
  private provider: ethers.BrowserProvider;
  private signer: ethers.Signer | null = null;

  constructor() {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }
    this.provider = new ethers.BrowserProvider(window.ethereum);
  }

  async connectWallet() {
    this.signer = await this.provider.getSigner();
  }

  private async getContract(projectAddress: string) {
    if (!this.signer) {
      await this.connectWallet();
    }
    return new ethers.Contract(projectAddress, PROJECT_ABI, this.signer || this.provider);
  }

  // Keep the original method for backward compatibility
  async getProjectDetails(projectAddress: string): Promise<ProjectDetails> {
    const contract = new ethers.Contract(projectAddress, PROJECT_ABI, this.provider);
    
    try {
      // Try to use individual getter functions since there's no getProjectDetails function in the ABI
      const [name, description, owner, developerAddress, totalCapital] = await Promise.all([
        contract.projectName(),
        contract.projectDescription(),
        contract.owner(),
        contract.developerAddress(),
        contract.totalCapital()
      ]);
      
      // Use current timestamp as lastActivity since it's not in the contract
      const now = Math.floor(Date.now() / 1000);
      
      return {
        name: name,
        description: description,
        owner: owner,
        developer: developerAddress,
        status: 0, // Default status since it's not in the contract
        totalValue: ethers.formatEther(totalCapital),
        lastActivity: now,
        address: projectAddress
      };
    } catch (error) {
      console.error("Error fetching project details:", error);
      throw error;
    }
  }

  // Add the new method that returns data in the enhanced format
  async getProjectDetailsV2(projectAddress: string): Promise<ProjectDetailsV2> {
    const contract = new ethers.Contract(projectAddress, PROJECT_ABI, this.provider);
    
    try {
      // Use individual getter functions
      const [name, description, owner, developerAddress, totalCapital] = await Promise.all([
        contract.projectName(),
        contract.projectDescription(),
        contract.owner(),
        contract.developerAddress(),
        contract.totalCapital()
      ]);
      
      // Format addresses for display (first 6 and last 4 characters)
      const formatAddress = (address: string) => {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
      };
      
      return {
        projectName: name,
        projectDescription: description,
        clientAddress: owner,
        developerAddress: developerAddress,
        totalBudget: ethers.formatEther(totalCapital) + " ETH",
        contractAddress: projectAddress,
        formattedClientAddress: formatAddress(owner),
        formattedDeveloperAddress: formatAddress(developerAddress)
      };
    } catch (error) {
      console.error("Error fetching enhanced project details:", error);
      throw error;
    }
  }

  async addMilestone(
    projectAddress: string,
    title: string,
    tentativeDate: number,
    description: string,
    amount: string
  ): Promise<void> {
    const contract = await this.getContract(projectAddress);
    const amountInWei = ethers.parseEther(amount);
    await contract.addMilestone(title, tentativeDate, description, amountInWei);
  }

  async approveMilestone(projectAddress: string, milestoneId: number): Promise<void> {
    const contract = await this.getContract(projectAddress);
    await contract.approveMilestone(milestoneId);
  }

  async completeMilestone(
    projectAddress: string,
    milestoneId: number,
    proof: string
  ): Promise<void> {
    const contract = await this.getContract(projectAddress);
    await contract.completeMilestone(milestoneId, proof);
  }

  async getMilestone(projectAddress: string, milestoneId: number): Promise<Milestone> {
    const contract = await this.getContract(projectAddress);
    const milestone = await contract.milestones(milestoneId);
    
    return {
      title: milestone[0],
      tentativeDate: Number(milestone[1]),
      description: milestone[2],
      amount: ethers.formatEther(milestone[3]),
      completed: milestone[4]
    };
  }

  // Get all milestones for a project
  async getAllMilestones(projectAddress: string): Promise<Milestone[]> {
    const contract = await this.getContract(projectAddress);
    const milestoneCount = await this.getMilestoneCount(projectAddress);
    const milestones: Milestone[] = [];

    for(let i = 0; i < milestoneCount; i++) {
      const milestone = await this.getMilestone(projectAddress, i);
      milestones.push(milestone);
    }

    return milestones;
  }

  // Helper method to get milestone count - not directly in ABI but useful
  async getMilestoneCount(projectAddress: string): Promise<number> {
    // This is a workaround since there's no direct method to get milestone count
    // We'll try incrementing indices until we get an error
    const contract = await this.getContract(projectAddress);
    let count = 0;
    
    try {
      while (true) {
        await contract.milestones(count);
        count++;
      }
    } catch (error) {
      // We've reached the end when we get an error
      return count;
    }
  }

  
  // Get project name directly
  async getProjectName(projectAddress: string): Promise<string> {
    const contract = await this.getContract(projectAddress);
    return await contract.projectName();
  }

  // Get project description directly
  async getProjectDescription(projectAddress: string): Promise<string> {
    const contract = await this.getContract(projectAddress);
    return await contract.projectDescription();
  }

  // Formatting helper for addresses
  formatAddress(address: string): string {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  formatLastActivity(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp * 1000;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    return `${minutes} minutes ago`;
  }
}
