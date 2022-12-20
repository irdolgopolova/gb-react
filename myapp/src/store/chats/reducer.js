import { ADD_CHAT, CHANGE_CHAT, DELETE_CHAT } from "./actions"

const initialState = {
    chats: [],
}

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHAT: {
            let lastChat = state.chats[state.chats.length - 1];
            let newId = lastChat ? lastChat.id + 1 : 1;

            return {
                ...state,
                chats: [
                    ...state.chats,
                    {
                        id: newId,
                        name: action.name,
                    },
                ]
            }
        }
        case DELETE_CHAT: {
            let index = state.chats.findIndex(el =>
                Number(el.id) === Number(action.chatId)
            );

            if (index !== -1) {
                state.chats.splice(index, 1);
            }

            return {
                ...state,
                chats: [
                    ...state.chats
                ]
            }
        }
        case CHANGE_CHAT: {
            // const currentList =  state.chats === undefined
            //     ? []
            //     : state.chats;

            return ({
                ...state,
                chats: [
                    ...state.chats,
                    {
                        id: action.payload.id,
                        name: action.payload.name
                    },
                ],
            });
        }
        default:
            return state;
    }
}
