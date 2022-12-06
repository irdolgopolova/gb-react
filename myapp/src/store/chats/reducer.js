import { ADD_CHAT, DELETE_CHAT } from "./actions"

const initialState = {
    chatList: [
        {
            id: 1,
            name: 'Бот',
        },
        {
            id: 2,
            name: 'Иванов Иван',
            avatar: '/static/image/avatar/2.jpg'
        },
        {
            id: 3,
            name: 'Петров Петр',
            avatar: '/static/image/avatar/3.jpg'
        },
        {
            id: 4,
            name: 'Попова Елена',
            avatar: '/static/image/avatar/4.jpg'
        }
    ],
}

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHAT:
            return {
                ...state,
                chatList: [
                    ...state.chatList,
                    {
                        id: state.chatList.length,
                        name: action.name,
                    },
                ]
            }
        case DELETE_CHAT:
            let index = state.chatList.findIndex(el =>
                Number(el.id) === Number(action.chatId)
            );

            if (index != -1) {
                state.chatList.splice(index, 1);
            }

            return {
                ...state,
                chatList: [
                    ...state.chatList
                ]
            }
        default: return state;
    }
}
