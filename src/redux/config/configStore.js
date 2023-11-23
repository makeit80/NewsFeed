import { createStore } from 'redux';
import { combineReducers } from 'redux';
import keywordData from 'redux/modules/keywordData';
import userData from 'redux/modules/userData';
import comments from 'redux/modules/comments';

const rootReducer = combineReducers({
  keywordData,
  userData,
  comments
});
//const logger = createLogger();
const store = createStore(rootReducer);

export default store;
