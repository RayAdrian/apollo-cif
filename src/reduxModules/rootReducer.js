import { combineReducers } from 'redux';
import controlBar from './controlBar/controlBarReducers';
import transcript from './transcript/transcriptReducers';

export default combineReducers({
  controlBar,
  transcript
});