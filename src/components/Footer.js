import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: #f1f1f1;
  padding: 1rem 2rem;
  text-align: center;
  font-size: 0.875rem;
  
`;

function Footer() {
  return (
    <FooterWrapper>
      &copy; {new Date().getFullYear()} StockApp. All rights reserved.
    </FooterWrapper>
  );
}

export default Footer;
