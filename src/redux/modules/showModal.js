const LOGINMODAL_SHOW = 'loginmodal/show';
const LOGINMODAL_CLOSE = 'loginmodal/close';
const LOGINFORM_SHOW = 'loginform/show';
const LOGINFORM_CLOSE = 'loginform/close';

export const showLoginModal = () => {
    return {
        type: LOGINMODAL_SHOW
    };
}

export const closeLoginModal = () => {
    return {
        type: LOGINMODAL_CLOSE,
    };
}

export const showLoginForm = () => {
    return {
        type: LOGINFORM_SHOW,
    };
}

export const closeLoginForm = () => {
    return {
        type: LOGINFORM_CLOSE,
    };
}

const initalState = {
    isLoginModal: false,
    isLoginForm: false
};

const showModal = (state = initalState, action) => {
    switch (action.type) {
        case LOGINMODAL_SHOW:
            return { ...state, isLoginModal: true };
        case LOGINMODAL_CLOSE:
            return { ...state, isLoginModal: false };
        case LOGINFORM_SHOW:
            return { ...state, isLoginForm: true };
        case LOGINFORM_CLOSE:
            return { ...state, isLoginForm: false };
        default:
            return state;
    }
}

export default showModal;

