export function getChatList(state) {
    return state.chats.chatList;
}

export function getChatById(chatId) {
    return (state) => state.chats.chatList[chatId]
}