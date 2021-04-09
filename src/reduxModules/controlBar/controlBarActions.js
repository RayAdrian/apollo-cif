export const actionSetIsAudioPlaying = (isPlaying = false) => dispatch => {
  dispatch({
    type: 'SET_AUDIO_PLAYING',
    payload: isPlaying
  });
};