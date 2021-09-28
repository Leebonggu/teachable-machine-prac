/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(5),
  },
}));

function index() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" className={classes.content}>
        <Typography component="div" >
          <Typography>소개페이지</Typography>
          <Typography>2019년 어느날...난 9명의 선녀를 만났다.</Typography>
          <Typography variant="h2" gutterBottom component="div">바로 트와이스</Typography>
        </Typography>
      </Container>
    </>
  );
}

export default index;
