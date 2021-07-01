/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function index({ children }) {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <CssBaseline />
      <Header />
        <>
          {children}
        </>
      <Footer/>
    </>
  )
}

export default index;
