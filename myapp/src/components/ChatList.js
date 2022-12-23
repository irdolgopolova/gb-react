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
import React from 'react';
import { Link, Navigate } from "react-router-dom";
import { ChatContainer } from "./ChatContainer";


export function ChatList({
    chatId,
    chatList,
    visible,
    handleOpen,
    handleClose,
    handleChange,
    newChatName,
    onDeleteChat,
    onAddChat,
    existsActiveChat
}) {
    const renderChatList = () => {
        const listItems = chatList.map((chat, index) => (
            <div
                className="App-message-list__chat_list__block"
                key={`block__${index}`}
            >
                <Link
                    className="App-message-list__chat_list__link"
                    to={`/chats/${chat.id}`}
                    key={index}
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
                    key={`btn__${index}`}
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

    if (existsActiveChat) {
        return <Navigate to="/nochat" />;
    }

    const RenderChatListPure = React.memo(renderChatList);


    return (
        <div className="App-main__card">
            <div className="App-message-list__chat">
                <div className="App-message-list__chat_list">
                    <RenderChatListPure chatList={chatList} chatId={chatId} />

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
                                <ChatContainer />
                            </div>)
                        : null
                }
            </div>
        </div>
    );
}