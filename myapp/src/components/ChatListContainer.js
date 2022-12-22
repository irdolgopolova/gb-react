import React, { useState } from 'react';
 import { useDispatch, useSelector } from "react-redux";
 import { Navigate, useParams } from "react-router-dom";
 import { addChat, deleteChat } from "../store/chats/actions";
 import { getChatList } from "../store/chats/selectors";
 import { ChatList } from "./ChatList";

 export default function ChatListContainer({ authed }) {
     const { chatId } = useParams();

     const [visible, setVisible] = useState(false);
     const [newChatName, setNewChatName] = useState("");

     const chatList = useSelector(getChatList);

     const dispatch = useDispatch();

     const handleClose = () => setVisible(false);
     const handleOpen = () => setVisible(true);
     const handleChange = (e) => setNewChatName(e.target.value);

     const onAddChat = () => {
         dispatch(addChat(newChatName));
         setNewChatName("");
         handleClose();
     };

     const onDeleteChat = (e) => {
         dispatch(deleteChat(e.target.dataset.chat_id));
     };

     const existsActiveChat = () => {
         return !!chatId
             && chatList.findIndex(i => i.id === Number(chatId)) === -1;
     }

     if (!authed) {
        return (<Navigate to="/"/>);
    }

     return (
         <ChatList
             chatId={chatId}
             chatList={chatList}
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