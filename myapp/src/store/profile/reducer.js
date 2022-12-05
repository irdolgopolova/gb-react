import {SHOW_NAME} from "./actions"

const initialState = {
    showName: false,
    name: 'Default'
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_NAME:
            return {
                ...state,
                showName: !state.showName
            }
        default:
            return state
    }
}
