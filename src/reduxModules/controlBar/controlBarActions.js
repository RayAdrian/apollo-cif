export const actionSetIsAudioPlaying = (isPlaying = false) => dispatch => {
  dispatch({
    type: 'SET_AUDIO_PLAYING',
    payload: isPlaying
  });
};

export const actionSetCurrTime = (time = 0) => dispatch => {
  dispatch({
    type: 'SET_CURR_TIME',
    payload: time
  });
};
