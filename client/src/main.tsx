import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { router } from './routes/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router}></RouterProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
