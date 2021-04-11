/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import styled from '@emotion/styled';

import ControlBar from './components/ControlBar';
import WaveForm from './components/WaveForm';
import Transcript from './components/Transcript';

import './App.css';

const Container = styled('div')({ maxWidth: 'calc(100% - 42px)' });

function App() {
  
  return (
    <Container>
      <ControlBar />
      <WaveForm />
      <Transcript />
    </Container>
  );
}

export default App;
