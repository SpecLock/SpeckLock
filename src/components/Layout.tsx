import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Home, 
  PlusCircle, 
  User, 
  Wallet, 
  LogOut, 
  Menu, 
  X,
  ToggleLeft,
  ToggleRight,
  Moon,
  Sun
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { account, balance, isConnected, isClient, isDeveloper, connectWallet, disconnectWallet, switchRole } = useWallet();
  const { darkMode, toggleDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/create-project', label: 'New Project', icon: <PlusCircle size={20} /> },
    { path: '/profile', label: 'Profile', icon: <User size={20} /> },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-dark-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-dark-800 border-dark-700' : 'bg-indigo-600'} text-white shadow-md`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Wallet size={24} />
            <span className="text-xl font-bold">BlockTrack</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-dark-700 hover:bg-dark-600' : 'bg-indigo-700 hover:bg-indigo-800'} transition-colors`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {isConnected ? (
              <>
                <div className={`flex items-center space-x-2 ${darkMode ? 'bg-dark-700' : 'bg-indigo-700'} rounded-full px-4 py-1`}>
                  <span className="font-medium">{balance} USDC</span>
                </div>
                <div className={`flex items-center space-x-2 ${darkMode ? 'bg-dark-700' : 'bg-indigo-700'} rounded-full px-4 py-1`}>
                  <span className="font-medium truncate w-28">{account}</span>
                </div>
                <button 
                  onClick={switchRole}
                  className={`flex items-center space-x-2 ${darkMode ? 'bg-dark-700 hover:bg-dark-600' : 'bg-indigo-700 hover:bg-indigo-800'} rounded-full px-4 py-1 transition`}
                >
                  {isClient ? (
                    <>
                      <span>Client</span>
                      <ToggleLeft size={20} />
                    </>
                  ) : (
                    <>
                      <span>Developer</span>
                      <ToggleRight size={20} />
                    </>
                  )}
                </button>
                <button 
                  onClick={disconnectWallet}
                  className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 rounded-full px-3 py-1 transition"
                >
                  <LogOut size={16} />
                  <span>Disconnect</span>
                </button>
              </>
            ) : (
              <button 
                onClick={connectWallet}
                className={`flex items-center space-x-2 ${darkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-500 hover:bg-indigo-700'} rounded-full px-4 py-2 transition`}
              >
                <Wallet size={16} />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-dark-700' : 'bg-indigo-700'}`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              className="text-white"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden ${darkMode ? 'bg-dark-700' : 'bg-indigo-700'} px-4 py-2`}>
            {isConnected ? (
              <div className="flex flex-col space-y-2 pb-2">
                <div className="flex items-center justify-between">
                  <span>{balance} USDC</span>
                  <span className="truncate w-32">{account}</span>
                </div>
                <div className="flex justify-between items-center">
                  <button 
                    onClick={switchRole}
                    className={`flex items-center space-x-2 ${darkMode ? 'bg-dark-600' : 'bg-indigo-600'} rounded-full px-3 py-1`}
                  >
                    {isClient ? "Client" : "Developer"}
                    {isClient ? <ToggleLeft size={16} /> : <ToggleRight size={16} />}
                  </button>
                  <button 
                    onClick={disconnectWallet}
                    className="flex items-center space-x-1 bg-red-500 rounded-full px-3 py-1"
                  >
                    <LogOut size={16} />
                    <span>Disconnect</span>
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={connectWallet}
                className={`w-full flex items-center justify-center space-x-2 ${darkMode ? 'bg-indigo-600' : 'bg-indigo-500'} rounded-full px-4 py-2 mb-2`}
              >
                <Wallet size={16} />
                <span>Connect Wallet</span>
              </button>
            )}
            
            <div className="flex flex-col space-y-2 pb-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                    location.pathname === link.path
                      ? darkMode ? 'bg-dark-800 text-white' : 'bg-indigo-800 text-white'
                      : darkMode ? 'text-gray-100 hover:bg-dark-800' : 'text-indigo-100 hover:bg-indigo-800'
                  }`}
                  onClick={toggleMobileMenu}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
      
      {/* Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - hidden on mobile */}
        <aside className={`hidden md:block w-64 ${darkMode ? 'bg-dark-800 border-r border-dark-700' : 'bg-white'} shadow-md`}>
          <nav className="p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md transition ${
                  location.pathname === link.path
                    ? darkMode ? 'bg-dark-700 text-indigo-400' : 'bg-indigo-100 text-indigo-800'
                    : darkMode ? 'text-gray-300 hover:bg-dark-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;