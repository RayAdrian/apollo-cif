/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import { actionSetIsAudioPlaying } from '../../reduxModules/controlBar/controlBarActions';

const Container = styled('div')({
  width: '100%',
  display: 'flex'});

const OuterContainer = styled('div')({
  display: 'flex',
  width: '100%',
  flexDirection: 'column'
});

const Head = styled('div')(({ width, isRemaining = false }) => ({
  width,
  borderTop: `1px solid ${isRemaining ? '#DFE2E5' : '#727578'}`
}));

const WaveContainer = styled('div')({
  display: 'flex',
  minHeight: 55
});

const WaveChunkTop = styled('div')(({ item, duration, currTime }) => ({
  height: 55,
  background: `repeating-linear-gradient(90deg, transparent, transparent 1px, ${currTime < item.endTime ? '#8858E9' : '#d5dde3'} 1px, ${currTime < item.endTime ? '#8858E9' : '#d5dde3'} 5px)`,
  width: `${(item.time / duration) * 100}%`,
  marginTop: -2,
  cursor: 'pointer'
}));

const WaveChunkBottom = styled('div')(({ item, duration, currTime }) => ({
  height: 55,
  background: `repeating-linear-gradient(90deg, transparent, transparent 1px, ${currTime < item.endTime ? '#1A99F6' : '#d5dde3'} 1px, ${currTime < item.endTime ? '#1A99F6' : '#d5dde3'} 5px)`,
  width: `${(item.time / duration) * 100}%`,
  marginTop: 2,
  cursor: 'pointer'
}));

const Playhead = ({ audio, currTime, transcript, actionSetIsAudioPlaying }) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    audio.addEventListener('loadedmetadata', (e) => {
      setDuration(e.target.duration);
    });
  }, []);
  
  if (transcript.time === undefined) return null;

  return (
    <OuterContainer>
      <WaveContainer>
        {
          transcript.time.map((item, index) => {
            if (!(index % 2)) {
              return <WaveChunkTop 
                onClick={() => { audio.currentTime = item.startTime; audio.play(); actionSetIsAudioPlaying(true); }} 
                key={index} 
                item={item} 
                duration={duration} 
                currTime={currTime} 
              />;
            }
            return <div key={index} style={{ minHeight: 55, backgroundColor: 'transparent', width: `${(item.time / duration) * 100}%` }} />;
          })
        }
      </WaveContainer>
      <Container>
        <Head width={`${(currTime / duration) * 100}%`} />
        <Head isRemaining width={`${(1 - currTime / duration) * 100}%`} />
      </Container>
      <WaveContainer>
        {
          transcript.time.map((item, index) => {
            if (index % 2) {
              return <WaveChunkBottom 
                onClick={() => { audio.currentTime = item.startTime; audio.play(); actionSetIsAudioPlaying(true); }} 
                key={index} 
                item={item} 
                duration={duration} 
                currTime={currTime} 
              />;
            }
            return <div key={index} style={{ minHeight: 55, backgroundColor: 'transparent', width: `${(item.time / duration) * 100}%` }} />;
          })
        }
      </WaveContainer>
    </OuterContainer>
  );
};

export default connect(
  state => ({
    audio: state.controlBar.audio,
    currTime: state.controlBar.currTime,
    transcript: state.transcript.transcript
  }),
  {
    actionSetIsAudioPlaying
  }
)(Playhead);