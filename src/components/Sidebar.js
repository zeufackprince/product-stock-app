import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './components-css/Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  let section = '';
  if (path.startsWith('/product')) section = 'product';
  else if (path.startsWith('/vente')) section = 'vente';
  else if (path.startsWith('/achat')) section = 'achat';

  const links = {
    product: [
      { to: '/product', label: 'All Products' },
      { to: '/product/add', label: 'Add Product' },
      { to: '/product/detail/1', label: 'Product Detail' },
    ],
    vente: [
      { to: '/vente', label: 'All Ventes' },
      { to: '/vente/add', label: 'Add Vente' },
      { to: '/vente/detail/1', label: 'Vente Detail' },
    ],
    achat: [
      { to: '/achat', label: 'All Achats' },
      { to: '/achat/add', label: 'Add Achat' },
      { to: '/achat/detail/1', label: 'Achat Detail' },
    ],
  };

  return section ? (
    <aside className="sidebar">
      <h3 className="sidebar-title">{section.charAt(0).toUpperCase() + section.slice(1)} Menu</h3>
      {links[section].map(link => (
        <Link
          key={link.to}
          to={link.to}
          className={`sidebar-link ${location.pathname === link.to ? 'active' : ''}`}
        >
          {link.label}
        </Link>
      ))}
    </aside>
  ) : null;
}

export default Sidebar;
