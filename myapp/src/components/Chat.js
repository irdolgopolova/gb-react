import {
    TextField,
    Button,
} from "@mui/material";
import React from 'react';

export function Chat({
    onAddMessage,
    newMessage,
    handleChange,
    messages,
    isEmptyMessagesList,
    profileName
}) {
    const renderMessageList = () => {
        if (isEmptyMessagesList) {
            return [];
        }

        return messages.map(message => (
            <div
                key={message.id}
                className={`App-message-list__row ${message.author === profileName ? 'right' : ''}`}
            >
                <p className={`App-message-list ${message.author === profileName ? 'user' : ''}`}>
                    {message.text}
                </p>
            </div>
        ));
    }

    return (
        <>
        <div className="App-message-list__history">
            {renderMessageList()}
        </div>

        <form className="App-form" name="myForm" onSubmit={onAddMessage}>
            <TextField
                id="standard-basic"
                label="Ваше сообщение"
                variant="standard"
                value={newMessage}
                onChange={handleChange}
            />
            <Button onClick={onAddMessage}>Отправить</Button>
        </form>
        </>
    );
}
