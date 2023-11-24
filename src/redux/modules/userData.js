const USER_DATA = 'user/Data';
const USER_EDIT = 'user/Edit';


export const userList = (payload) => {
    return {
        type: USER_DATA,
        payload
    };
};

export const editUser = (payload) => {
    return {
        type: USER_EDIT,
        payload
    };
};


const initalState = {
    email: '',
    uid: '',
    displayName: '',
    photoURL: '',
};

// TODO : 사진 편집 기능 추가
const userData = (state = initalState, action) => {
    switch (action.type) {
        case USER_DATA:
            console.log('payload =====> ', action.payload)
            let { email, uid, photoURL, displayName } = action.payload;
            console.log('inputtest ===> ', email, displayName)
            if (!photoURL) return { uid, photoURL: 'https://www.lab2050.org/common/img/default_profile.png', displayName };
            return action.payload;
        case USER_EDIT:
            // TODO : uid값으로 비교 후 map 함수를 이용해 데이터 편집하기
            return action.payload;
        default:
            return state;
    }
};

export default userData;
