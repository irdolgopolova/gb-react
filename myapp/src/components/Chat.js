import {
    TextField,
    Button,
} from "@mui/material";
import React, { useState, useEffect } from 'react';

export default function Chat() {
    const currentUsername = 'Пользователь';
    const botUsername = 'Бот';

    let newMessage;
    const [messageList, setMessageList] = useState([]);

    const renderMessageList = () => {
        return messageList.map(message => (
            <p key={message.id} className={`App-message-list__row ${isCurrentUser(message.author) ? 'right' : ''}`} >
                <span
                    className={`App-message-list ${isCurrentUser(message.author) ? 'user' : ''}`}
                >
                    {message.text}
                </span>
            </p>
        ));
    }


    const updateMessageList = (event) => {
        event.preventDefault();

        if (newMessage) {
            setMessageList([
                ...messageList,
                {
                    id: messageList.length,
                    text: newMessage,
                    author: currentUsername
                }
            ]);

            document.myForm.reset();
        }
    }

    const handleChange = (event) => {
        newMessage = event.target.value;
    }

    useEffect(() => {
        if (messageList.length && isCurrentUser(messageList.slice(-1)[0].author)) {
        setTimeout(() => {
            setMessageList([
            ...messageList,
            {
                id: messageList.length,
                text: "На данный момент бот не доступен, попробуйте позже",
                author: botUsername
            }
            ]);
        }, 1500);
        }
    }, [messageList]);

    const isCurrentUser = (username) => {
        return username === currentUsername;
    }

    return (
        <>
        <div className="App-message-list__history">{renderMessageList()}</div>

        <form className="App-form" name="myForm" onSubmit={updateMessageList}>
            <TextField
                id="standard-basic"
                label="Ваше сообщение"
                variant="standard"
                value={newMessage}
                onChange={handleChange}
            />
            <Button onClick={updateMessageList}>Отправить</Button>
        </form>
        </>
    );
}