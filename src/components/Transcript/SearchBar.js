/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { actionSetSearch } from '../../reduxModules/transcript/transcriptActions';

import searchIcon from '../../assets/icons/icon-search.png';

const Container = styled('div')({
  display: 'flex',
  maxWidth: 370,
  margin: '24px 24px 15px',
  borderRadius: 6,
  border: '1px solid #D0D9E2'
});

const SearchIcon = styled('i')({
  padding: 10,
  minWidth: 24,
  textAlign: 'center'
});

const SearchInput = styled('input')({
  width: '100%',
  outlineWidth: 0,
  padding: '10px 10px 10px 0',
  color: '#979797',
  borderColor: 'transparent'
});

const SearchBar = ({ searchWord, actionSetSearch }) => {

  const handleChange = e => {
    actionSetSearch(e.target.value);
  };

  return (
    <form value={searchWord} onChange={handleChange}>
      <Container>
        <SearchIcon>
          <img src={searchIcon} />
        </SearchIcon>
        <SearchInput />
      </Container>
    </form>
  );
};

export default connect(
  state => ({
    searchWord: state.transcript.searchWord
  }),
  {
    actionSetSearch
  }
)(SearchBar);