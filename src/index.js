/**
* This is the entry point of the React application.
* It renders the root component of the application into the DOM.
* @module index
*/
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

/** The root container element to render the React application into. */
const container = document.getElementById('root');

/** The root of the React application. */
const root = createRoot(container);

/**
* Renders the root component of the application into the DOM.
* @function
* @returns {void}
*/
root.render(<App />);
