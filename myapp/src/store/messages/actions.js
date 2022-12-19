export const ADD_MESSAGE = "MESAGES::ADD_MESSAGE";

export const addMessage = (chatId, author, message) => ({
    type: ADD_MESSAGE,
    chatId,
    author,
    message,
})

export const addMessageWithThunk = (chatId, author, message) => (dispatch, getState) => {
    dispatch(addMessage(chatId, author, message));
    if (author !== "currentUser") {
        const botMessage = "На данный момент сервис не доступен, попробуйте позже";
        setTimeout(() => dispatch(addMessage(chatId, "currentUser", botMessage)), 2000);
    }
}