import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText
} from "@mui/material";
import React, { useState } from 'react';
import {Link, Navigate, useParams } from "react-router-dom";
import Chat from "./Chat";

export default function ChatList() {
    const { chatId } = useParams();

    const [chatList] = useState([
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
    ]);

    if (!!chatId && chatList.findIndex(i => i.id === Number(chatId)) === -1) {
        return <Navigate to="/nochat" />;
    }

    const renderChatList = (chatId) => {
        const listItems = chatList.map(chat => (
            <Link
                className="App-message-list__chat_list__link"
                to={`/chats/${chat.id}`}
                key={chat.id}
            >
                <ListItem>
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
                </div>

                {
                    !!chatId
                        ? (
                            <div className="App-message-list__current_chat" key={chatId}>
                                <Chat />
                            </div>)
                        : null
                }

            </div>
        </div>
    );
}