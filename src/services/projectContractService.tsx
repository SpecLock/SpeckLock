import { ethers } from 'ethers';

const PROJECT_ABI = [
  {
    inputs: [],
    name: "getProjectDetails",
    outputs: [
      { name: "name", type: "string" },
      { name: "description", type: "string" },
      { name: "owner", type: "address" },
      { name: "developer", type: "address" },
      { name: "status", type: "uint8" },
      { name: "totalValue", type: "uint256" },
      { name: "lastActivity", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "string", name: "_title", type: "string" },
      { internalType: "uint256", name: "_tentativeDate", type: "uint256" },
      { internalType: "string", name: "_description", type: "string" },
      { internalType: "uint256", name: "_amount", type: "uint256" }
    ],
    name: "addMilestone",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_milestoneId", type: "uint256" }],
    name: "approveMilestone",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_milestoneId", type: "uint256" },
      { internalType: "string", name: "_proof", type: "string" }
    ],
    name: "completeMilestone",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "milestones",
    outputs: [
      { name: "title", type: "string" },
      { name: "tentativeDate", type: "uint256" },
      { name: "description", type: "string" },
      { name: "amount", type: "uint256" },
      { name: "completed", type: "bool" }
    ],
    stateMutability: "view",
    type: "function"
  }
];

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

  async getProjectDetails(projectAddress: string): Promise<ProjectDetails> {
    const contract = new ethers.Contract(projectAddress, PROJECT_ABI, this.provider);
    const details = await contract.getProjectDetails();
    
    return {
      name: details[0],
      description: details[1],
      owner: details[2],
      developer: details[3],
      status: Number(details[4]),
      totalValue: ethers.formatEther(details[5]),
      lastActivity: Number(details[6]),
      address: projectAddress
    };
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
