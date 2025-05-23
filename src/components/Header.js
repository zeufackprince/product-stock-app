import React from 'react';
import { Link } from 'react-router-dom';
import './components-css/Header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="logo">🧾 StockApp</h1>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/product">Product</Link>
        <Link to="/vente">Vente</Link>
        <Link to="/achat">Achat</Link>
      </nav>
    </header>
  );
}

export default Header;
