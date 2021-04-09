const initialState = {
  isAudioPlaying: false
};

export default (state = {...initialState}, action) => {
  switch (action.type) {
  case 'SET_AUDIO_PLAYING':
    return {
      ...state,
      isAudioPlaying: action.payload
    };
  default:
    return state;
  }
};