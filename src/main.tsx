/**
 * @fileoverview Entry point for the React application.
 * 
 * This file sets up the React application by importing necessary modules and rendering the root component.
 * 
 * - Imports `StrictMode` from 'react' to help identify potential problems in the application.
 * - Imports `createRoot` from 'react-dom/client' to create a root for rendering the React component tree.
 * - Imports the main `App` component from './App.tsx'.
 * - Imports global styles from './index.css'.
 * 
 * The `createRoot` function is used to create a root container that is attached to the DOM element with the ID 'root'.
 * The `render` method is then called on this root container to render the `App` component wrapped in `StrictMode`.
 * 
 * @module main
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
