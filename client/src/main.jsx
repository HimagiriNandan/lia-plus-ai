import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from "@/components/ui/sonner"
import { Provider } from 'react-redux';
import { store } from './store';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <Toaster closeButton/>
  </Provider>,
)
