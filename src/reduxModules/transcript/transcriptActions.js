export const actionSetTranscriptData = (data, duration) => dispatch => {
  const formattedData = data.word_timings.map((wordArr, index) => {
    if (index === 0) {
      if (data.word_timings[1] !== undefined) 
        return { 
          time: parseFloat(data.word_timings[1][0].startTime.replace('s','')),
          startTime: 0,
          endTime: parseFloat(data.word_timings[1][0].startTime.replace('s','')) 
        };
      else 
        return { 
          time: parseFloat(wordArr[wordArr.length - 1].endTime.replace('s','')),
          startTime: 0,
          endTime: parseFloat(wordArr[wordArr.length - 1].endTime.replace('s','')) 
        };
    }
    else {
      if (data.word_timings[index + 1] !== undefined) 
        return { 
          time: parseFloat(data.word_timings[index + 1][0].startTime.replace('s', '')) - parseFloat(wordArr[0].startTime.replace('s', '')),
          startTime: parseFloat(wordArr[0].startTime.replace('s', '')),
          endTime: data.word_timings[index + 1][0].startTime.replace('s', '')
        };
      else
      {
        return { 
          time: (duration - parseFloat(wordArr[0].startTime.replace('s', ''))),
          startTime: parseFloat(wordArr[0].startTime.replace('s', '')),
          endTime: duration - 0.1
        };
      }
    }
  });
  dispatch({
    type: 'SET_TRANSCRIPT_DATA',
    payload: { ...data, time: formattedData }
  });
};

export const actionSetSearch = word => dispatch => {
  dispatch({
    type: 'SET_SEARCH_WORD',
    payload: word
  });
};