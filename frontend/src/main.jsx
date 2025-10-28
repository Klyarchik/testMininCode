import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './css/index.css'
import App from './App.jsx'

const app = createRoot(document.getElementById('root'))

app.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)