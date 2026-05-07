import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Citas from './Citas.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Citas/> */}
  </StrictMode>
)