import React from 'react';
import './components-css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      &copy; {new Date().getFullYear()} StockApp. All rights reserved.
    </footer>
  );
}

export default Footer;
