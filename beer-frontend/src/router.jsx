import { createBrowserRouter, Navigate } from 'react-router-dom';
import PLP from './pages/PLP';
import PDP from './pages/PDP';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Navigate
        to="/products"
        replace
      />
    ),
  },
  { path: '/products', element: <PLP /> },
  { path: '/product/:slug', element: <PDP /> },
]);
