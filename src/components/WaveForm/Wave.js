/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { actionSetTranscriptData } from '../../reduxModules/transcript/transcriptActions';

import Playhead from './Playhead';

import transcriptData from '../../assets/transcript.json';

const Container = styled('div')({
  width: '100%',
  height: 110,
  display: 'flex'
});

const PercentageContainer = styled('div')({
  position: 'relative',
  width: '30%',
  height: '100%'
});

const Divider = styled('div')({
  position: 'absolute',
  right: 10,
  top: 45,
  width: 1,
  height: 20,
  backgroundColor: '#DFE2E5'
});

const Percentage = styled('div')(({ hasBorderBottom = false }) => ({
  width: '100%',
  height: 55, 
  display: 'flex',
  alignItems: 'center',
  borderBottom: hasBorderBottom ? '1px solid #DFE2E5' : null,
  fontSize: '1.2rem',
  color: hasBorderBottom ? '#8858E9' : '#1A99F6'
}));

const Wave = ({ audio, transcript, actionSetTranscriptData }) => {
  const [duration, setDuration] = useState(0);

  const getPercentage = (timeArr, duration, isFirstPerson) => {
    if (timeArr) {
      let total = 0;
      for (let i = isFirstPerson ? 0 : 1; i < timeArr.length; i += 2) {
        total += timeArr[i].time;
      }
      return `${Math.round((total / duration) * 100)}%`;
    }
    return '';
  };

  useEffect(() => {
    audio.addEventListener('loadedmetadata', (e) => {
      actionSetTranscriptData(transcriptData, e.target.duration);
      setDuration(e.target.duration);
    });
  }, []);

  return (
    <Container>
      <PercentageContainer>
        <Divider />
        <Percentage hasBorderBottom>{`${getPercentage(transcript.time, duration, true)} YOU`}</Percentage>
        <Percentage>{`${getPercentage(transcript.time, duration, false)} MICHAEL B.`}</Percentage>
      </PercentageContainer>
      <Playhead />
    </Container>
  );
};

export default connect(
  state => ({
    audio: state.controlBar.audio,
    transcript: state.transcript.transcript
  }),
  {
    actionSetTranscriptData
  }
)(Wave);