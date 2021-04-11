/* eslint-disable react/prop-types */
import React, { useEffect , useState} from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { timeToHMS } from '../../utils/timeUtils';

const Container = styled('div')({
  width: 'fit-content',
  padding: '10px 16px',
  height: 20,
  marginBottom: 36,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgb(239, 243, 246)'
});

const CurrTimeText = styled('span')({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: 'rgb(53, 64, 83)'
});

const DurationText = styled(CurrTimeText)({
  color: 'rgb(126, 143, 165)'
});

const Timestamp = ({ audio, currTime }) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    audio.addEventListener('loadedmetadata', (e) => {
      setDuration(e.target.duration);
    });
  }, []);

  return (
    <Container>
      <CurrTimeText>{`${timeToHMS(Math.floor(currTime))} `}</CurrTimeText>
      <DurationText>{`/ ${timeToHMS(Math.floor(duration))}`}</DurationText>
    </Container>
  );
};

export default connect(
  state => ({
    audio: state.controlBar.audio,
    currTime: state.controlBar.currTime
  }),
  {
  }
)(Timestamp);
