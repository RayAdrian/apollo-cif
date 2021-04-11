const initialState = {
  transcript: {}
};

export default (state = {...initialState}, action) => {
  switch (action.type) {
  case 'SET_TRANSCRIPT_DATA':
    return {
      ...state,
      transcript: action.payload
    };
  default:
    return state;
  }
};