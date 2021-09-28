import React from 'react';
import DemoImageModel from './DemoImageClassification';
import styled from 'styled-components';

import Container from '../../Common/Container';

function index() {
  return (
    <Container>
      나는 어떤 맴버와 닮았을까
      <DemoImageModel />
    </Container>
  )
}

export default index
