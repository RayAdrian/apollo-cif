/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { timeToHMS } from '../../utils/timeUtils';

import { actionSetIsAudioPlaying } from '../../reduxModules/controlBar/controlBarActions';

const Container = styled('div')(({ isHighlighted, hover }) => ({
  padding: '22px 24px',
  width: '100%',
  minHeight: 22,
  backgroundColor: isHighlighted || hover? 'rgba(26, 153, 246, 0.05)' : 'initial'
}));

const TranscriptItemContainer = styled('div')(({ index, isHighlighted }) => ({
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

const Paragraph = styled('div')({
  display: 'flex',
  flexDirection: 'column'
});

const ShareAction = styled('div')({
  color: 'rgb(26, 153, 246)',
  marginTop: 10,
  cursor: 'pointer'
});

const TranscriptParagraphContainer = ({ 
  isHighlighted, 
  wordArr,
  currTime,
  audio, 
  index, 
  actionSetIsAudioPlaying}) => {
  const [hover, setHover] = useState(false);

  const handleClick = time => {
    actionSetIsAudioPlaying(true);
    audio.play();
    audio.currentTime = parseFloat(time.replace('s', ''));
  };

  const time = parseInt(wordArr[0].startTime.replace('s', ''), 10);
  return (
    <Container onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} isHighlighted={isHighlighted} hover={hover}>
      <TranscriptItemContainer key={index} index={index}>
        <TimeContainer index={index}>{timeToHMS(time)}</TimeContainer>
        <Divider index={index} />
        <Paragraph>
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
          <ShareAction>
            {
              hover ? 'Share' : null
            }
          </ShareAction>
        </Paragraph>
      </TranscriptItemContainer>
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
)(TranscriptParagraphContainer);