import React from 'react'
import ReactDOM from 'react-dom/client'
import { createClient, Provider } from 'urql';
import App from './App'
import './index.css'

const client = createClient({
  url: import.meta.env.VITE_HYGRAPH_URL,
  fetchOptions: () => {
    const token = import.meta.env.VITE_HYGRAPH_AUTH_TOKEN;
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>
)
