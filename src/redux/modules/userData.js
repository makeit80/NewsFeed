const LOGIN_USER = 'user/login';
const LOGOUT_USER = 'user/logout';

export const loginUser = (payload) => {
  //유저의 사진,uid가 담긴 정보
  return {
    type: LOGIN_USER,
    payload
  };
};

export const logoutUSer = (payload) => {
  return {
    type: LOGOUT_USER,
    payload
  };
};

const initalState = {
  uid: '',
  photoURL: '',
  displayName: ''
};

const userData = (state = initalState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      let { uid, photoURL, displayName } = action.payload;
      if (!photoURL) return { uid, photoURL: 'https://www.lab2050.org/common/img/default_profile.png', displayName };
      return action.payload;
    case LOGOUT_USER:
      console.log({ ...initalState });
      return { ...initalState };
    default:
      return state;
  }
};

export default userData;
