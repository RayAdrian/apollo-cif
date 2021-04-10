/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { actionSetIsAudioPlaying } from '../../reduxModules/controlBar/controlBarActions';

import transcript from '../../assets/transcript.json';

import { timeToHMS } from '../../utils/timeUtils';

const Container = styled('div')({
  padding: 24
});

const SearchBarPlaceholder = styled('div')({
  width: 370,
  height: 39,
  borderRadius: 6,
  backgroundColor: 'gray',
  marginBottom: 15
});

const TranscriptContainer = styled('div')({
  whiteSpace: 'pre-wrap',
  height: 'auto'
});

const TranscriptItemContainer = styled('div')(({ index }) => ({
  display: 'flex',
  flexDirection: 'row',
  margin: `20px ${index % 2 ? '30px' : '0px'}`,
  width: '60%',
  minHeight: 22
}));

const TimeContainer = styled('div')(({ index }) => ({
  paddingTop: 4,
  fontWeight: 500,
  fontSize: '0.9rem',
  color: index % 2 ? 'rgb(26, 153, 246)' : 'rgb(136, 104, 233)',
}));

const Divider = styled('div')(({ index }) => ({
  margin: '0px 8px',
  minHeight: '100%',
  borderLeft: `2px solid ${index % 2 ? 'rgba(26, 153, 246, 0.3)' : 'rgba(136, 104, 233, 0.3)'}`
}));

const TranscriptWord = styled('span')(({ isHighlighted }) => ({
  transition: 'all 0.1s ease 0s',
  backgroundColor: isHighlighted ? 'rgba(26, 153, 246, 0.5)' : 'initial',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(26, 153, 246, 0.5)'
  }
}));

const Transcript = ({ audio, currTime, actionSetIsAudioPlaying }) => {

  const handleClick = time => {
    actionSetIsAudioPlaying(true);
    audio.play();
    audio.currentTime = parseFloat(time.replace('s', ''));
  };

  return (
    <Container>
      <SearchBarPlaceholder />
      <TranscriptContainer>
        {
          transcript.word_timings.map((wordArr, index) => {
            const time = parseInt(wordArr[0].startTime.replace('s', ''), 10);
            return (
              <TranscriptItemContainer key={index} index={index}>
                <TimeContainer index={index}>{timeToHMS(time)}</TimeContainer>
                <Divider index={index} />
                <div key={index}>
                  {
                    wordArr.map((word, index) => {
                      const startTime = parseFloat(word.startTime.replace('s', ''));
                      const endTime = parseFloat(word.endTime.replace('s', ''));

                      return (
                        <TranscriptWord
                          onClick={() => handleClick(word.startTime)} 
                          key={index} 
                          isHighlighted={currTime <= endTime && currTime >= startTime}
                        >
                          {`${word.word} `}
                        </TranscriptWord>);
                    })
                  }
                </div>
              </TranscriptItemContainer>
            );
          })
        }
      </TranscriptContainer>
    </Container>
  );
};

export default connect(
  state => ({
    audio: state.controlBar.audio,
    currTime: state.controlBar.currTime
  }),
  {
    actionSetIsAudioPlaying
  }
)(Transcript);