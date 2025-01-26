import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";

import Router from './router/Router';
import { HelmetProvider } from 'react-helmet-async';
import Provider from './Provider/Provider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Import ToastContainer and styles
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <div className='max-w-screen-xl mx-auto'>
            <RouterProvider router={Router} />
          </div>
          <ToastContainer />
        </HelmetProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
