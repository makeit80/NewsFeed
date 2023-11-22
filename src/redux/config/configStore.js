import {createStore} from "redux";
import { combineReducers } from "redux";
import keywordData from "redux/modules/keywordData";


const rootReducer = combineReducers({
    keywordData,
});
const store = createStore(rootReducer);

export default store;


