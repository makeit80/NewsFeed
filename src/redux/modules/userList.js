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
    value: []
};

// TODO : 사진 편집 기능 추가
const userData = (state = initalState, action) => {
    switch (action.type) {
        case USER_DATA:
            return { value: action.payload };
        case USER_EDIT:
            return { value: [...state, action.payload] };
        default:
            return state;
    }
};

export default userData;
