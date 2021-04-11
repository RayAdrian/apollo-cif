import React from 'react';
import styled from '@emotion/styled';

import Timestamp from './Timestamp';
import Wave from './Wave';

const Container = styled('div')({
  width: '100%',
  height: 176,
  padding: 24,
  backgroundColor: '#FAFBFC',
  borderBottom: '1px solid #979797'
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