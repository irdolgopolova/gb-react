import { db } from "../../services/firebase";

export const ADD_CHAT = "CHATS::ADD_CHAT";
export const CHANGE_CHAT = "CHATS::CHANGE_CHAT";
export const DELETE_CHAT = "CHATS::DELETE_CHAT";

export const addChat = (name) => ({
    type: ADD_CHAT,
    name,
});

export const deleteChat = (chatId) => ({
    type: DELETE_CHAT,
    chatId,
})

const getPayloadFromSnapshot = (snapshot) => {
    const chats = [snapshot.val()];


    return { chats};
}

export const addChatWithFirebase = (chat) => async() => {
    db.ref("chats")
        .child(chat.id)
        .set(chat);
}

export const initChatTracking = () => (dispatch) => {
    db.ref("chats")
        .on("child_changed", (snapshot) => {
            const payload = snapshot.val();

            dispatch({
                type: CHANGE_CHAT,
                payload,
            });
        });

    db.ref("chats")
        .on("child_added", (snapshot) => {
            const payload = snapshot.val();

            dispatch({
                type: CHANGE_CHAT,
                payload,
            });
        });
};
