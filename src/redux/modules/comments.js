const ADD_COMMENT = 'comments/ADD_COMMENT';
const GET_COMMENT = 'comments/GET_COMMENT';

// action creator
export const addComment = (payload) => {
  return { type: ADD_COMMENT, payload };
};
export const getComment = (payload) => {
  return { type: GET_COMMENT, payload };
};

const initialState = [];

// reducer
const comments = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      console.log(action.payload);
      return [...state, action.payload];
    case GET_COMMENT:
      console.log(action.payload);
      return [...action.payload];
    default:
      return state;
  }
};

export default comments;
