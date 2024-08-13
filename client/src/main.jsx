//import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import{BrowserRouter} from 'react-router-dom'
import { SearchProvider } from './context/search.jsx'
import { AuthProvider } from './context/auth.jsx'
import './index.css'
import 'antd/dist/reset.css';


ReactDOM.createRoot(document.getElementById('root')).render(
 
  <AuthProvider>
    <SearchProvider>
    <BrowserRouter> 
    <App />
  </BrowserRouter>

    </SearchProvider>
 
  
  </AuthProvider>
        
  
)