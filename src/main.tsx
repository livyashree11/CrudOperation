import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from 'react-redux'
import store from './core/store.ts';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client ={new QueryClient()}>
            <App />
      </QueryClientProvider>
    
    </Provider>
  </StrictMode>,
)
