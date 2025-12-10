import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { IntegrationProvider } from './context/IntegrationContext' // <--- Importe
import App from './App.jsx'
import './assets/styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <IntegrationProvider> {/* <--- Envolva o App aqui */}
        <App />
      </IntegrationProvider>
    </BrowserRouter>
  </React.StrictMode>,
)