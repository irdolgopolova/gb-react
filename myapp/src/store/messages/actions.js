export const ADD_MESSAGE = "MESAGES::ADD_MESSAGE";

export const addMessage = (chatId, author, message) => ({
    type: ADD_MESSAGE,
    chatId,
    author,
    message,
})
