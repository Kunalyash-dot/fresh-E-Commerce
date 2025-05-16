// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import React from 'react'
import {RouterProvider} from 'react-router-dom'
import { Provider } from 'react-redux'
import router from './routes/index.jsx'
import { store } from './store/store.js'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
 
  //  </StrictMode>,
)
