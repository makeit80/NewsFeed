import { createStore } from 'redux';
import { combineReducers } from 'redux';
import keywordData from 'redux/modules/keywordData';
import userData from 'redux/modules/userData';
import comments from 'redux/modules/comments';
import showModal from 'redux/modules/showModal';

const rootReducer = combineReducers({
    keywordData,
    userData,
    comments,
    showModal
});

const store = createStore(rootReducer);

export default store;
