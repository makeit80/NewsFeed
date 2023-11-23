import { createStore } from "redux";
import { combineReducers } from "redux";
import keywordData from "redux/modules/keywordData";
import userData from 'redux/modules/userData';


const rootReducer = combineReducers({
    keywordData,
    userData
});
//const logger = createLogger();
const store = createStore(rootReducer);

export default store;


