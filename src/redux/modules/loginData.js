const LOGIN_USER = 'user/login';
const LOGOUT_USER = 'user/logout';

export const loginUser = (payload) => {
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
  displayName: '',
  photoURL: '',
};

// TODO : 사진 편집 기능 추가
const loginData = (state = initalState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      // TypeError: Cannot destructure property 'uid' of 'action.payload' as it is undefined.
      let { uid, photoURL, displayName } = action.payload;
      if (!photoURL) return { uid, photoURL: 'https://www.lab2050.org/common/img/default_profile.png', displayName };
      return action.payload;
    case LOGOUT_USER:
      console.log('action ====> ', action.payload)
      return { ...initalState };
    default:
      return state;
  }
};

export default loginData;
