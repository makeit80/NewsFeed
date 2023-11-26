

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

// 새로고침 시 유저 데이터가 남아있으면 가져오고 그렇지 않으면 초기값 설정
let userData = getUserData();


// TODO : 사진 편집 기능 추가
const loginData = (state = userData, action) => {
  switch (action.type) {
    case LOGIN_USER:
      let { uid, photoURL, displayName } = action.payload;
      if (!photoURL) photoURL = 'https://www.lab2050.org/common/img/default_profile.png';
      userData = { uid, photoURL, displayName };
      saveUserData();
      return userData;
    //return action.payload;

    case LOGOUT_USER:
      console.log('action ====> ', action.payload)
      //로그아웃하면 로컬스토리지에서 제거
      localStorage.removeItem('userData');
      userData = { uid: '', displayName: '', photoURL: '', };
      return userData;
    default:
      return state;
  }
};

function getUserData() {
  //유저데이터가 없으면 기본값, 있으면 기존에 있는 유저 데이터 값
  const user = localStorage.getItem('userData');
  return user ? JSON.parse(user) : { uid: '', displayName: '', photoURL: '', };
}

function saveUserData() {
  localStorage.setItem('userData', JSON.stringify(userData));
}

export default loginData;
