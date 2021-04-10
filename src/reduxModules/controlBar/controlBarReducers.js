import audioFile from '../../assets/audio/call.wav';

const initialState = {
  isAudioPlaying: false,
  audio: new Audio(audioFile),
  currTime: 0.00
};

export default (state = {...initialState}, action) => {
  switch (action.type) {
  case 'SET_AUDIO_PLAYING':
    return {
      ...state,
      isAudioPlaying: action.payload
    };
  case 'SET_CURR_TIME':
    return {
      ...state,
      currTime: action.payload
    };
  default:
    return state;
  }
};