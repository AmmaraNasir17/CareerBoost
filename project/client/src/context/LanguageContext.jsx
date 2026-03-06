/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, createContext } from 'react'
import { translations } from '../translations/i18n'

export const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('careerboostLanguage')
    return saved || 'en'
  })

  // Apply language globally on mount and when it changes
  useEffect(() => {
    localStorage.setItem('careerboostLanguage', language)
    
    // Set document direction for RTL languages
    const rtlLanguages = ['ar', 'ur']
    const isRTL = rtlLanguages.includes(language)
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = language
    
    // Dispatch custom event so all components know language changed
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language } }))
  }, [language])

  const setLanguage = (newLanguage) => {
    setLanguageState(newLanguage)
  }

  const t = translations[language] || translations.en

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = React.useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

