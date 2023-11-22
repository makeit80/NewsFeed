const INPUT_DATA = 'keywordData/INPUT_DATA'
const EDIT_DATA = 'keywordData/EDIT_DATA'

const initialState = {
    value: [],
};

export const insertData = (payload) => {
    return {
        type: INPUT_DATA,
        payload: payload,
    }
}
export const editData = (payload) => {
    return {
        type: EDIT_DATA,
        payload: payload,
    }
}



const keywordData = (state = initialState, action) => {
    switch (action.type) {
        case INPUT_DATA:
            return {value: action.payload}
        case EDIT_DATA:
            return {value: [...state.value, action.payload]}
        default:
            return state;
    }
}

export default keywordData;