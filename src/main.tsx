import React from 'react'
import ReactDOM from 'react-dom/client'
import './base.css'
import Desktop from './pages/Desktop.tsx'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Desktop />
  </React.StrictMode>
)
