import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import './index.css'
import App from './App'
import { I18nProvider } from '@/i18n/I18nProvider'
import { ThemeProvider } from '@/theme/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        {/*
          The reduced-motion rules in index.css only reach CSS animations.
          Motion animates in JavaScript, so it needs telling separately —
          `user` drops transform and layout animation for anyone who asked the
          OS for less motion, while leaving opacity fades intact.
        */}
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
)
