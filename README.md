# SpecLock - Blockchain Project Management Platform

A decentralized project management platform built on Avalanche, designed to facilitate secure and transparent collaboration between clients and developers. The platform uses smart contracts to manage project milestones, payments, and deliverables.

## 🚀 Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Avalanche (Fuji Testnet)
- **Smart Contract Interaction**: ethers.js
- **Icons**: Lucide React
- **Development Environment**: StackBlitz WebContainer Technology

## 🏗️ Project Structure

```
src/
├── components/
│   └── Layout.tsx           # Main application layout with navigation
├── contexts/
│   ├── ThemeContext.tsx     # Dark/light mode management
│   └── WalletContext.tsx    # Avalanche wallet integration
├── pages/
│   ├── CreateProject.tsx    # Project creation form
│   ├── Dashboard.tsx        # Main project overview
│   ├── Profile.tsx          # User profile management
│   └── ProjectDetails.tsx   # Individual project view
└── main.tsx                 # Application entry point
```

## 🌟 Key Features

### Wallet Integration
- Seamless connection to MetaMask
- Automatic network switching to Avalanche Fuji Testnet
- Real-time balance and network status updates

### Project Management
- Create and manage blockchain-based projects
- Define project milestones with specific deliverables
- Set milestone budgets in AVAX
- Track project progress and completion status

### Role-Based Access
- Client role for project creation and funding
- Developer role for milestone completion and proof submission
- Dynamic role switching capability

### Dark Mode Support
- Full dark mode implementation
- System preference detection
- Persistent theme selection

## 🔧 Development Environment

This project is developed using StackBlitz's WebContainer technology, providing:
- In-browser development environment
- Real-time collaboration capabilities
- Instant preview updates
- Built-in terminal and file system

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Avalanche Integration

The platform operates on the Avalanche Fuji Testnet with the following configurations:

- **Network Name**: Avalanche Fuji Testnet
- **Chain ID**: 0xA869
- **RPC URL**: https://api.avax-test.network/ext/bc/C/rpc
- **Block Explorer**: https://testnet.snowtrace.io/

### Smart Contract Interaction
- Milestone funding and release
- Project state management
- Automated payment distribution
- Transaction verification

## 🔐 Security Features

- Secure wallet connection handling
- Role-based access control
- Transaction signing confirmation
- Network validation checks

## 💻 User Interface

### Components
- Responsive navigation with mobile support
- Interactive project cards
- Milestone progress tracking
- Transaction history viewer
- Profile management interface

### Theme System
- Custom Tailwind configuration
- Dark mode optimization
- Consistent color palette
- Responsive design patterns

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Connect your MetaMask wallet
5. Switch to Avalanche Fuji Testnet

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Tablet optimization
- Desktop layouts
- Dynamic navigation patterns

## 🔄 State Management

- React Context API for global state
- Wallet context for blockchain interaction
- Theme context for appearance management
- Component-level state for UI interactions

## 🛠️ Development with StackBlitz

This project leverages StackBlitz's WebContainer technology for development:

1. Open the project in StackBlitz
2. Connect to your GitHub repository
3. Make changes in the browser-based IDE
4. Preview changes in real-time
5. Commit and push directly from StackBlitz

### Benefits of StackBlitz Development
- No local setup required
- Instant dependency installation
- Real-time preview
- Collaborative features
- Built-in version control

## 📦 Project Dependencies

Key dependencies include:
- `react`: ^18.3.1
- `react-router-dom`: ^6.22.3
- `ethers`: ^6.11.1
- `@avalabs/avalanchejs`: ^3.17.0
- `lucide-react`: ^0.344.0
- `tailwindcss`: ^3.4.1

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
