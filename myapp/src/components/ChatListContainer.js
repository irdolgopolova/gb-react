import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { addChat, addChatWithFirebase, deleteChat, initChatTracking } from "../store/chats/actions";
import { getChatList } from "../store/chats/selectors";
import { ChatList } from "./ChatList";

export default function ChatListContainer({ authed }) {
    const { chatId } = useParams();

    const [visible, setVisible] = useState(false);
    const [newChatName, setNewChatName] = useState("");

    let chats = useSelector((state) => state.chats);

    console.log(chats);
    // chats = [];
    const dispatch = useDispatch();

    const handleClose = () => setVisible(false);
    const handleOpen = () => setVisible(true);
    const handleChange = (e) => setNewChatName(e.target.value);

    const onAddChat = () => {
        dispatch(addChatWithFirebase({
            id: chats.length + 1,
            name: newChatName
        }));

        setNewChatName("");
        handleClose();
    };

    useEffect(() => {
        dispatch(initChatTracking());
    }, []);

    const onDeleteChat = (e) => {
        dispatch(deleteChat(e.target.dataset.chat_id));
    };

    const existsActiveChat = () => {
        return !!chatId
            && chats.findIndex(i => i.id === Number(chatId)) === -1;
    }

    if (!authed) {
        return (<Navigate to="/"/>);
    }

    return (
        <ChatList
            chatId={chatId}
            chatList={chats}
            visible={visible}
            handleOpen={handleOpen}
            handleClose={handleClose}
            handleChange={handleChange}
            newChatName={newChatName}
            onAddChat={onAddChat}
            onDeleteChat={onDeleteChat}
            existsActiveChat={existsActiveChat()}
        />

    );
}