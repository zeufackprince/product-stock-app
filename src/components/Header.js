import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background: #333;
  color: white;
  padding: 1.5rem 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  top: 0;
  left: 0;
  width: 95%;
  z-index: 1000; /* pour qu’il soit au-dessus du reste */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const NavLinks = styled.nav`
  a {
    color: white;
    margin-left: 2rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <Logo>🧾 StockApp</Logo>
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/product">Product</Link>
        <Link to="/vente">Vente</Link>
        <Link to="/achat">Achat</Link>
      </NavLinks>
    </HeaderWrapper>
  );
}

export default Header;
