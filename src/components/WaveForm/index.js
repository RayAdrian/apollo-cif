import React from 'react';
import styled from '@emotion/styled';

import Timestamp from './Timestamp';
import Wave from './Wave';

const Container = styled('div')({
  width: '100%',
  height: 176,
  padding: 24,
  backgroundColor: 'rgb(250, 251, 252)',
  borderBottom: '1px solid rgb(151, 151, 151)'
});

const WaveForm = () => {

  return (
    <Container>
      <Timestamp />
      <Wave />
    </Container>
  );
};

export default WaveForm;