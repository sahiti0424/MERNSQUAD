import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
<BrowserRouter>
<Provider store={store}>
        <Header />
    
      <App />
   
      <Footer />
      </Provider>
 
      </BrowserRouter>
  </StrictMode>,
);
