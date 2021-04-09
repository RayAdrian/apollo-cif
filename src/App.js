/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import styled from '@emotion/styled';

import ControlBar from './components/ControlBar';
import './App.css';

const Container = styled('div')({ width: '100%' });

function App() {
  
  return (
    <Container>
      <ControlBar />
    </Container>
  );
}

export default App;
