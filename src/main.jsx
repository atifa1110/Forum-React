import { React, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './states/index.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchProvider } from './context/search-context.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SearchProvider>
          <App />
          <ToastContainer position="top-right" autoClose={3000} />
        </SearchProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
