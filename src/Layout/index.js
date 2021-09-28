/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

import CssBaseline from '@material-ui/core/CssBaseline';

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function index({ children }) {
  const location = useLocation();
  const { pathname } = location;

  return (
    <BodyContainer>
      <CssBaseline />
      <Header />
        <>
          {children}
        </>
      <Footer/>
    </BodyContainer>
  )
}

export default index;
