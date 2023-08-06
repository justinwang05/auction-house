import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {AuctionsContextProvider} from './context/AuctionContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuctionsContextProvider>
      <App />
    </AuctionsContextProvider>
  </React.StrictMode>
);


