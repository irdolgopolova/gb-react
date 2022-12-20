import { db } from "../../services/firebase";

export const ADD_MESSAGE = "MESAGES::ADD_MESSAGE";
export const CHANGE_MESSAGES = "MESAGES::CHANGE_MESSAGES";

export const addMessage = (chatId, author, message) => ({
    type: ADD_MESSAGE,
    chatId,
    author,
    message,
})

const getPayloadFromSnapshot = (snapshot) => {
    const messages = [];

    snapshot.forEach(message => {
        messages.push(message.val());
    });

    return { chatId: Number(snapshot.key), messages };
}

export const addMessageWithFirebase = (chatId, message) => async() => {
    db.ref("messages")
        .child(chatId)
        .child(message.id)
        .set(message);
}

export const initMessageTracking = () => (dispatch) => {
    db.ref("messages")
        .on("child_changed", (snapshot) => {
            const payload = getPayloadFromSnapshot(snapshot);

            dispatch({
                type: CHANGE_MESSAGES,
                payload,
            });
        });

    db.ref("messages")
        .on("child_added", (snapshot) => {
            const payload = getPayloadFromSnapshot(snapshot);

            dispatch({
                type: CHANGE_MESSAGES,
                payload,
            });
        });
};

export const addMessageWithThunk = (chatId, author, message) => (dispatch, getState) => {
    dispatch(addMessage(chatId, author, message));
    if (author !== "currentUser") {
        const botMessage = "На данный момент сервис не доступен, попробуйте позже";
        setTimeout(() => dispatch(addMessage(chatId, "currentUser", botMessage)), 2000);
    }
}