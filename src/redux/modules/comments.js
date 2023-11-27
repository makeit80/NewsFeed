const ADD_COMMENT = 'comments/ADD_COMMENT';
const GET_COMMENT = 'comments/GET_COMMENT';
const SWITCH_COMMENT = 'comments/SWITCH_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';

// action creator
export const addComment = (payload) => {
  return { type: ADD_COMMENT, payload };
};
export const getComment = (payload) => {
  return { type: GET_COMMENT, payload };
};
export const switchComment = (payload) => {
  return { type: SWITCH_COMMENT, payload };
};
export const deleteComment = (payload) => {
  return { type: DELETE_COMMENT, payload };
};


const initialState = [];

// reducer
const comments = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return [...state, action.payload];
    case GET_COMMENT:
      return [...action.payload];
    case SWITCH_COMMENT:
      return [...action.payload];
    case DELETE_COMMENT:
      return [...action.payload];
    default:
      return state;
  }
};






export default comments;
