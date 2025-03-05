import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './pages/products.jsx';
import ProductInfo from './pages/productinfo.jsx';
import Categories from './pages/categories.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Products />} /> 
          <Route path="product-info/:id" element={<ProductInfo />} />
        </Route>
        <Route path='/categories' element={<Categories/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
