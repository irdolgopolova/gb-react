import {
    Button,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Dialog,
    DialogTitle,
    TextField
} from "@mui/material";
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { addChat, deleteChat } from "../store/chats/actions";
import { getChatList } from "../store/chats/selectors";
import Chat from "./Chat";

export default function ChatList() {
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

    if (!!chatId && chatList.findIndex(i => i.id === Number(chatId)) === -1) {
        return <Navigate to="/nochat" />;
    }

    const renderChatList = (chatId) => {
        const listItems = chatList.map(chat => (
            <div
                className="App-message-list__chat_list__block"
                key={`block__${chat.id}`}
            >
                <Link
                    className="App-message-list__chat_list__link"
                    to={`/chats/${chat.id}`}
                    key={chat.id}
                >
                    <ListItem
                        button={true}
                    >
                        <ListItemAvatar>
                            <Avatar alt={chat.name} src={chat.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            style={{ color: chat.id === Number(chatId) ? "#96B9FF" : "white" }}
                        >
                            {chat.name}
                        </ListItemText>
                    </ListItem>
                </Link>
                <Button
                    key={`btn__${chat.id}`}
                    onClick={onDeleteChat}
                    data-chat_id={chat.id}
                >
                    X
                </Button>
            </div>
        ));

        return (
            <List>
                {listItems}
            </List>
        );
    }

    return (
        <div className="App-main__card">
            <div className="App-message-list__chat">
                <div className="App-message-list__chat_list">
                    {renderChatList(chatId)}

                    <Button className="add-chat" onClick={handleOpen}>
                        Добавить чат
                    </Button>
                    <Dialog open={visible} onClose={handleClose}>
                        <DialogTitle>
                            Пожалуйста, введите название нового чата
                        </DialogTitle>
                        <TextField
                            value={newChatName}
                            onChange={handleChange}
                        />
                        <Button
                            onClick={onAddChat}
                            disabled={!newChatName}
                        >
                            Добавить
                        </Button>
                    </Dialog>
                </div>

                {
                    !!chatId
                        ? (
                            <div
                                className="App-message-list__current_chat"
                                key={chatId}
                            >
                                <Chat />
                            </div>)
                        : null
                }
            </div>
        </div>
    );
}