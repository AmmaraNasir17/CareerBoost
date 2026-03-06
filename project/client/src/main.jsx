import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import App from './App'
import i18n from './utils/i18n.js'
import { LanguageProvider } from './context/LanguageContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </LanguageProvider>
  </React.StrictMode>,
)
