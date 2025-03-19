import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import CreateProject from './pages/CreateProject';
import Profile from './pages/Profile';

/**
 * The main application component that sets up the overall structure and routing for the app.
 * 
 * This component uses several providers and components to set up the application:
 * - `ThemeProvider`: Provides theming capabilities to the entire app.
 * - `WalletProvider`: Manages wallet-related state and functionality.
 * - `Router`: Handles routing within the app.
 * - `Layout`: Defines the common layout structure for the app.
 * - `Routes`: Defines the different routes and their corresponding components.
 * 
 * Routes:
 * - `/`: Renders the `Dashboard` component.
 * - `/project/:id`: Renders the `ProjectDetails` component for a specific project.
 * - `/create-project`: Renders the `CreateProject` component.
 * - `/profile`: Renders the `Profile` component.
 * 
 * @returns {JSX.Element} The main application component.
 */
function App() {
  return (
    <ThemeProvider>
      <WalletProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/create-project" element={<CreateProject />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Layout>
        </Router>
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;