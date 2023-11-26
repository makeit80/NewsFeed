const SHOW_MYPAGE_MODAL = 'myPageModal/show';
const CLOSE_MYPAGE_MODAL = 'myPageModal/close';
const MYPAGE_INPUT_VLAUE = 'myPageModal/Image';

export const showMyPageModal = (payload) => {
    return {
        type: SHOW_MYPAGE_MODAL,
        payload,
    };
}
export const closeMyPageModal = () => {
    return {
        type: CLOSE_MYPAGE_MODAL,
    };
}
export const mypageInputValue = (payload) => {
    return {
        type: MYPAGE_INPUT_VLAUE,
        payload,
    };
}

const initalState = {
    isUpdateOpen: false,
    updateType: '',
    inputValue: '',
};

const myPageModal = (state = initalState, action) => {
    switch (action.type) {
        case SHOW_MYPAGE_MODAL:
            return { ...state, isUpdateOpen: true, updateType: action.payload };
        case CLOSE_MYPAGE_MODAL:
            return { ...state, isUpdateOpen: false };
        case MYPAGE_INPUT_VLAUE:
            return { ...state, inputValue: action.payload };
        default:
            return state;
    }
}

export default myPageModal;

