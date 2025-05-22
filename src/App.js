import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import AddProduct from './pages/product/AddProduct';
import EditProduct from './pages/product/EditProduct';
import ProductDetail from './pages/product/ProductDetail';
import NewAchat from './pages/achat/NewAchat';
import AchatDetail from './pages/achat/AchatDetail';
import NewVente from './pages/vente/NewVente';
import VenteDetail from './pages/vente/VenteDetail';
import ProductList from './pages/product/ProductList';
import VenteList from './pages/vente/VenteList';
import AchatList from './pages/achat/AchatList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product" element={<ProductList />} />
        <Route path="product/add" element={<AddProduct />} />
        <Route path="product/edit/:id" element={<EditProduct />} />
        <Route path="product/detail/:id" element={<ProductDetail />} />

        <Route path="achat" element={<AchatList />} />
        <Route path="achat/add" element={<NewAchat />} />
        <Route path="achat/detail/:id" element={<AchatDetail />} />

        <Route path="vente" element={<VenteList />} />
        <Route path="vente/add" element={<NewVente />} />
        <Route path="vente/detail/:id" element={<VenteDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
