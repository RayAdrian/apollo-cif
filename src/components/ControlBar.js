/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import playBack from '../assets/icons/rotate-left.svg';
import playForward from '../assets/icons/rotate-right.svg';
import share from '../assets/icons/share.svg';
import pauseIcon from '../assets/icons/pause-circle-fill.png';
import playIcon from '../assets/icons/play-circle-fill.png';

import { actionSetCurrTime, actionSetIsAudioPlaying } from '../reduxModules/controlBar/controlBarActions';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  backgroundColor: '#EFF3F6',
  height: 59,
  padding: '13px 17px 12px 25px',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const ControlsContainer = styled('div')({
  width: 170,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
});

const PlaySpeed = styled('div')({
  borderRadius: 30,
  border: '1px solid rgb(208, 217, 226)',
  backgroundColor: 'rgb(250, 251, 252)',
  marginLeft: 20,
  padding: '2px 10px',
  height: 20,
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: 'rgb(85, 108, 134)',
  display: 'flex',
  alignItems: 'center'
});

const ShareButton = styled('div')({
  width: 93,
  height: 34,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 6,
  border: '1px solid rgb(208, 217, 226)',
  backgroundColor: 'rgb(250, 251, 252)'
});

let checkTimeInterval;

const ControlBar = ({
  isAudioPlaying,
  audio,
  actionSetIsAudioPlaying,
  actionSetCurrTime
}) => {

  const toggle = () => actionSetIsAudioPlaying(!isAudioPlaying);

  useEffect(() => {
    if (isAudioPlaying) {
      audio.play();
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

  return (
    <Container>
      <ControlsContainer>
        <img src={playBack} />
        <div onClick={toggle} style={{ margin: '0 14px', cursor: 'pointer' }}>
          {
            isAudioPlaying ? <img src={pauseIcon} /> : <img src={playIcon} />
          }
        </div>
        <img src={playForward}/>
        <PlaySpeed>1.0x</PlaySpeed>
      </ControlsContainer>
      <ShareButton>
        <img src={share} />
        <div style={{ marginLeft: 6, fontSize: '1.2rem', fontWeight: 'bold', color: 'rgb(85, 108, 134)' }}>Share</div>
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