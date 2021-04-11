/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import transcript from '../../assets/transcript.json';

import SearchBar from './SearchBar';
import TranscriptParagraphContainer from './TranscriptParagraphContainer';

const Container = styled('div')({
  padding: '24px 0'
});

const TranscriptContainer = styled('div')({
  whiteSpace: 'pre-wrap',
  height: 'auto'
});

const Transcript = ({ currTime }) => {

  return (
    <Container>
      <SearchBar />
      <TranscriptContainer>
        {
          transcript.word_timings.map((wordArr, index) => {
            const startTime = parseFloat(wordArr[0].startTime.replace('s', ''));
            const endTime = parseFloat(wordArr[wordArr.length - 1].endTime.replace('s', ''));
            return (
              <TranscriptParagraphContainer 
                key={index} 
                index={index}
                wordArr={wordArr}
                isHighlighted={currTime <= endTime && currTime >= startTime} 
              />
            );
          })
        }
      </TranscriptContainer>
    </Container>
  );
};

export default connect(
  state => ({
    currTime: state.controlBar.currTime
  }),
  {
  }
)(Transcript);