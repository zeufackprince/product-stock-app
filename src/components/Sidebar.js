import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SidebarWrapper = styled.aside`
  width: 220px;
  background: #f4f4f4;
  padding: 1.5rem;
  height: 100vh;
  position: fixed;
  top: 80px;
  left: 0;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  overflow-y: auto;
  z-index: 1000;
`;

const SectionTitle = styled.h3`
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  color: #2c3e50;
  border-bottom: 2px solid #ccc;
  padding-bottom: 0.5rem;
`;

const StyledLink = styled(Link)`
  display: block;
  margin-bottom: 0.75rem;
  padding: 0.5rem 0.75rem;
  color: #2c3e50;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ddd;
  }

  &:active,
  &.active {
    background-color: #3498db;
    color: white;
  }
`;

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
      // { to: '/product/edit/1', label: 'Edit Product' },
      { to: '/product/detail/1', label: 'Product Detail' },
    ],
    vente: [
      { to: '/vente', label: 'All Ventes' },
      { to: '/vente/add', label: 'Add Vente' },
      // { to: '/vente/edit/1', label: 'Edit Vente' },
      { to: '/vente/detail/1', label: 'Vente Detail' },
    ],
    achat: [
      { to: '/achat', label: 'All Achats' },
      { to: '/achat/add', label: 'Add Achat' },
      // { to: '/achat/edit/1', label: 'Edit Achat' },
      { to: '/achat/detail/1', label: 'Achat Detail' },
    ],
  };

  return section ? (
    <SidebarWrapper>
      <SectionTitle>{section.charAt(0).toUpperCase() + section.slice(1)} Menu</SectionTitle>
      {links[section].map(link => (
        <StyledLink
          key={link.to}
          to={link.to}
          className={location.pathname === link.to ? 'active' : ''}
        >
          {link.label}
        </StyledLink>
      ))}
    </SidebarWrapper>
  ) : null;
}

export default Sidebar;
