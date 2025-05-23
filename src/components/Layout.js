import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import './components-css/Layout.css';

function Layout() {
  const location = useLocation();
  const showSidebar =
    location.pathname.startsWith('/product') ||
    location.pathname.startsWith('/vente') ||
    location.pathname.startsWith('/achat');

  return (
    <>
      <Header />
      {showSidebar && <Sidebar />}
      <div className="main-wrapper">
        <main className={`content-wrapper ${showSidebar ? 'with-sidebar' : ''}`}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
