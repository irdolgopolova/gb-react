import { ADD_MESSAGE, CHANGE_MESSAGES } from "./actions";

const initialState = {
    messages: {},
};

export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            const currentList =  state.messages[action.chatId] === undefined
                ? []
                : state.messages[action.chatId];

            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.chatId]: [
                        ...currentList,
                        {
                            id: `${action.chatId}${currentList.length}`,
                            author: action.author,
                            text: action.message
                        }
                    ]
                }
            }
        }
        case CHANGE_MESSAGES: {
            return ({
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.chatId]: action.payload.messages,
                },
            });
        }
        default:
            return state;
    }
}
