import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import CreateProject from './pages/CreateProject';
import Profile from './pages/Profile';

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