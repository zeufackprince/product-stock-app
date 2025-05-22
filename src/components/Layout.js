import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';

// La wrapper principale doit avoir un padding à gauche pour ne pas cacher le contenu
const MainWrapper = styled.div`
  display: flex;
`;

// Ajoute un padding-left équivalent à la largeur de la sidebar (220px)
const ContentWrapper = styled.main`
  flex: 1;
  padding: 4rem;
  margin-left: ${({ withSidebar }) => (withSidebar ? '220px' : '0')};
   margin-top: 80px;
`;

function Layout() {
  const location = useLocation();
  const showSidebar =
    location.pathname.startsWith('/product') ||
    location.pathname.startsWith('/vente') ||
    location.pathname.startsWith('/achat');

  return (
    <>
      <Header />
      {showSidebar && <Sidebar />} {/* Sidebar placée avant MainWrapper pour être "fixed" */}
      <MainWrapper>
        <ContentWrapper withSidebar={showSidebar}>
          <Outlet />
        </ContentWrapper>
      </MainWrapper>
      <Footer />
    </>
  );
}

export default Layout;
