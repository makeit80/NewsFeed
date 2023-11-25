

const LOGIN_USER = 'user/login';
const LOGOUT_USER = 'user/logout';

// 액션객체 
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

// 초기값
const initalState = {
  uid: '',
  displayName: '',
  photoURL: '',
};


// TODO : 사진 편집 기능 추가
const loginData = (state = initalState, action) => {
  switch (action.type) {

    case LOGIN_USER:
      console.log(action.payload);
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
