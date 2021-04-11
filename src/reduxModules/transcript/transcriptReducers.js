const initialState = {
  transcript: {},
  searchWord: ''
};

export default (state = {...initialState}, action) => {
  switch (action.type) {
  case 'SET_TRANSCRIPT_DATA':
    return {
      ...state,
      transcript: action.payload
    };
  case 'SET_SEARCH_WORD':
    return {
      ...state,
      searchWord: action.payload
    };
  default:
    return state;
  }
};