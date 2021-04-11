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
  backgroundColor: '#EFF3F6'
});

const CurrTimeText = styled('span')({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#354053'
});

const DurationText = styled(CurrTimeText)({
  color: '#7E8FA5',
  marginLeft: 5
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
      <CurrTimeText>{`${timeToHMS(Math.floor(currTime))}`}</CurrTimeText>
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
