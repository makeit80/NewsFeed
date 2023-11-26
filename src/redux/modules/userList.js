const USER_DATA = 'user/Data';
const USER_EDIT = 'user/Edit';
const USER_DELETE_IMAGE = 'user/nameEdit';


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
export const deleteImg = (payload) => {
    return {
        type: USER_DELETE_IMAGE,
        payload
    };
};


const initalState = {
    value: []
};

// TODO : 사진 편집 기능 추가
// TODO : payload 구조분해할당으로 줄일 수 있나?
const userData = (state = initalState, action) => {
    switch (action.type) {

        case USER_DATA:
            return { value: action.payload };
        case USER_EDIT:
            const updateUserData = state.value.map((item) => {
                return item.id === action.payload.id ? {...item, [action.payload.key]: action.payload.value} : item
            }) 
            return { value: updateUserData};
        case USER_DELETE_IMAGE:
            const updateName = state.value.map((item) => {
                return item.id === action.payload.id ? {...item, photoURL: 'https://www.lab2050.org/common/img/default_profile.png'} : item
            }) 
            return { value: updateName};
        default:
            return state;
    }
};

export default userData;
