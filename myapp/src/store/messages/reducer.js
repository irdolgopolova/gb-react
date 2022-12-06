import { ADD_MESSAGE } from "./actions";

const initialState = {
    messageList: {},
};

export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            const currentList =  state.messageList[action.chatId] === undefined
                ? []
                : state.messageList[action.chatId];

            return {
                ...state,
                messageList: {
                    ...state.messageList,
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
        default:
            return state;
    }
}
