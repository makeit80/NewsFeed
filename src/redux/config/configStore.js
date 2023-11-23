import { createStore } from 'redux';
import { combineReducers } from 'redux';
import keywordData from 'redux/modules/keywordData';
import comments from 'redux/modules/comments';

const rootReducer = combineReducers({
  keywordData,
  comments
});
const store = createStore(rootReducer);

export default store;
