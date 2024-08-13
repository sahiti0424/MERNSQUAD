import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
<BrowserRouter>
      <Header />
      <App />
      <Footer />
      </BrowserRouter>
  </StrictMode>,
);
