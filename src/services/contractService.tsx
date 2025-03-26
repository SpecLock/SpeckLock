import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0x433e3B673B4Edf8D02A3b7A38600eBa1cD6C22C7';

const CONTRACT_ABI = [
  // Project Factory Functions
  {
    inputs: [
      { name: "_projectName", type: "string" },
      { name: "_projectDescription", type: "string" },
      { name: "_developerAddress", type: "address" }
    ],
    name: "createProject",
    outputs: [{ type: "address" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "_owner", type: "address" }],
    name: "getProjectsByOwner",
    outputs: [{ type: "address[]" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "_developer", type: "address" }],
    name: "getProjectsByDeveloper", 
    outputs: [{ type: "address[]" }],
    stateMutability: "view",
    type: "function"
  },
  // Project Functions
  {
    inputs: [
      { name: "_title", type: "string" },
      { name: "_tentativeDate", type: "uint256" },
      { name: "_description", type: "string" },
      { name: "_amount", type: "uint256" }
    ],
    name: "addMilestone",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { name: "_milestoneId", type: "uint256" },
      { name: "_proof", type: "string" }
    ],
    name: "completeMilestone",
    outputs: [],
    stateMutability: "nonpayable", 
    type: "function"
  },
  {
    inputs: [{ name: "_milestoneId", type: "uint256" }],
    name: "approveMilestone",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

export class ContractService {
  private contract: ethers.Contract;
  private signer: ethers.Signer | null = null;

  constructor() {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  }

  private async ensureSigner() {
    if (!this.signer) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await provider.getSigner();
      this.contract = this.contract.connect(this.signer);
    }
    return this.signer;
  }

  async createProject(name: string, description: string, developerAddress: string): Promise<string> {
    try {
      await this.ensureSigner();
      const tx = await this.contract.createProject(name, description, developerAddress);
      const receipt = await tx.wait();
      return receipt.logs[0].address; // Returns the address of the new project
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  async getProjectsByOwner(ownerAddress: string): Promise<string[]> {
    try {
      return await this.contract.getProjectsByOwner(ownerAddress);
    } catch (error) {
      console.error('Error getting projects by owner:', error);
      throw error;
    }
  }

  async getProjectsByDeveloper(developerAddress: string): Promise<string[]> {
    try {
      return await this.contract.getProjectsByDeveloper(developerAddress);
    } catch (error) {
      console.error('Error getting projects by developer:', error);
      throw error;
    }
  }

  async addMilestone(projectAddress: string, title: string, date: number, description: string, amount: string): Promise<void> {
    try {
      await this.ensureSigner();
      const projectContract = new ethers.Contract(projectAddress, CONTRACT_ABI, await this.ensureSigner());
      const tx = await projectContract.addMilestone(title, date, description, ethers.parseEther(amount));
      await tx.wait();
    } catch (error) {
      console.error('Error adding milestone:', error);
      throw error;
    }
  }

  async completeMilestone(projectAddress: string, milestoneId: number, proof: string): Promise<void> {
    try {
      await this.ensureSigner();
      const projectContract = new ethers.Contract(projectAddress, CONTRACT_ABI, await this.ensureSigner());
      const tx = await projectContract.completeMilestone(milestoneId, proof);
      await tx.wait();
    } catch (error) {
      console.error('Error completing milestone:', error);
      throw error;
    }
  }

  async approveMilestone(projectAddress: string, milestoneId: number): Promise<void> {
    try {
      await this.ensureSigner();
      const projectContract = new ethers.Contract(projectAddress, CONTRACT_ABI, await this.ensureSigner());
      const tx = await projectContract.approveMilestone(milestoneId);
      await tx.wait();
    } catch (error) {
      console.error('Error approving milestone:', error);
      throw error;
    }
  }
}