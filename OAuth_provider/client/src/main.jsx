import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Root } from './modules/root/Root'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
