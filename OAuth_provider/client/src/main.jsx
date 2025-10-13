import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Root } from './modules/root/Root'

//Styles
import "./styles/base.scss"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
