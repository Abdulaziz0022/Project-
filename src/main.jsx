import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './pages/products.jsx';
import ProductInfo from './pages/productinfo.jsx';
import Categories from './pages/categories.jsx'
import CartProvider from './assets/cart.jsx';
import Basket from './pages/basket.jsx'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer />
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Products />} /> 
          <Route path="product-info/:id" element={<ProductInfo />} />
          <Route path='/basket' element={<Basket />} />
        </Route>
        <Route path='/categories' element={<Categories/>}/>
      </Routes>
    </BrowserRouter>
    </CartProvider>
  </StrictMode>
);
