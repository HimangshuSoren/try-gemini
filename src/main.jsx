import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// import Kick from './Kick.jsx'
import GeminiApi from './GeminiApi.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Kick/> */}
    <GeminiApi/>
  </StrictMode>,
)
