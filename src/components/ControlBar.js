/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { ReactComponent as PlayBack } from '../assets/icons/rotate-left.svg';
import { ReactComponent as PlayForward } from '../assets/icons/rotate-right.svg';
import share from '../assets/icons/share.svg';
import pauseIcon from '../assets/icons/pause-circle-fill.png';
import playIcon from '../assets/icons/play-circle-fill.png';

import { actionSetCurrTime, actionSetIsAudioPlaying } from '../reduxModules/controlBar/controlBarActions';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  backgroundColor: '#EFF3F6',
  maxHeight: 59,
  padding: '13px 17px 12px 25px',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const ControlsContainer = styled('div')({
  width: 'auto',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
});

const PlaySpeed = styled('div')({
  borderRadius: 30,
  border: '1px solid #D0D9E2',
  backgroundColor: '#FAFBFC',
  marginLeft: 20,
  padding: '2px 10px',
  height: 20,
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#556C86',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
});

const ShareButton = styled('div')({
  width: 93,
  height: 34,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 6,
  border: '1px solid #D0D9E2',
  backgroundColor: '#FAFBFC'
});

const Forward = styled(PlayForward)({
  fill: '#556C86',
  cursor: 'pointer',
  '&:hover': {
    fill: '#1A99F6'
  }
});

const Back = styled(PlayBack)({
  fill: '#556C86',
  cursor: 'pointer',
  '&:hover': {
    fill: '#1A99F6'
  }
});

let checkTimeInterval;

const ControlBar = ({
  isAudioPlaying,
  audio,
  actionSetIsAudioPlaying,
  actionSetCurrTime
}) => {
  const speeds = [
    { word: '0.5x', value: 0.5 },
    { word: '0.75x', value: 0.75 },
    { word: '1.0x', value: 1 },
    { word: '1.5x', value: 1.5 },
    { word: '2.0x', value: 2 }
  ];
  const [speed, setSpeed] = useState(2);

  const toggle = () => { 
    if (!isAudioPlaying) audio.play(); 
    actionSetIsAudioPlaying(!isAudioPlaying); 
  };

  useEffect(() => {
    if (isAudioPlaying) {
      checkTimeInterval = setInterval(function() {
        actionSetCurrTime(audio.currentTime);
      }, 100);
    } else { clearInterval(checkTimeInterval); audio.pause(); }
  }, [isAudioPlaying]);

  useEffect(() => {
    audio.addEventListener('ended', () => actionSetIsAudioPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => actionSetIsAudioPlaying(false));
    };
  }, []);

  const handleChangeSpeed = () => {
    audio.playbackRate = speeds[speed === 4 ? 0 : speed + 1].value;
    setSpeed(speed === 4 ? 0 : speed + 1);
  };

  return (
    <Container>
      <ControlsContainer>
        <Back onClick={() => { audio.currentTime -= 10; actionSetCurrTime(audio.currentTime); }} />
        <div onClick={toggle} style={{ margin: '0 14px', cursor: 'pointer' }}>
          {
            isAudioPlaying ? <img src={pauseIcon} /> : <img src={playIcon} />
          }
        </div>
        <Forward onClick={() => { audio.currentTime += 10; actionSetCurrTime(audio.currentTime); }}/>
        <PlaySpeed onClick={handleChangeSpeed}>{speeds[speed].word}</PlaySpeed>
      </ControlsContainer>
      <ShareButton>
        <img src={share} />
        <div style={{ marginLeft: 6, fontSize: '1.2rem', fontWeight: 'bold', color: '#556C86' }}>Share</div>
      </ShareButton>
    </Container>
  );
};

export default connect(
  state => ({
    audio: state.controlBar.audio,
    isAudioPlaying: state.controlBar.isAudioPlaying
  }),
  {
    actionSetIsAudioPlaying,
    actionSetCurrTime
  }
)(ControlBar);