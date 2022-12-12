import {
    TextField,
    Button,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import { useParams } from "react-router-dom";
import { addMessage } from "../store/messages/actions";
import { getMessageList } from "../store/messages/selectors";
import { getProfileName } from "../store/profile/selectors";

export default function Chat() {
    const { chatId } = useParams();

    const [newMessage, setNewMessage] = useState('');

    const messageList = useSelector(getMessageList, shallowEqual);
    const profileName = useSelector(getProfileName, shallowEqual);

    const dispatch = useDispatch();

    const onAddMessage = useCallback((event) => {
        event.preventDefault();
        dispatch(addMessage(chatId, profileName, newMessage));
        setNewMessage("");
        document.myForm.reset();
    }, [dispatch, newMessage]);

    useEffect(() => {
        if (
            messageList[chatId]
            && messageList[chatId].length
            && isCurrentUser(messageList[chatId].slice(-1)[0].author)
        ) {
            setTimeout(() => {
                dispatch(addMessage(
                        chatId,
                        "currentUser",
                        "На данный момент сервис не доступен, попробуйте позже"
                    )
                );
            }, 1500);
        }
    }, [dispatch,messageList]);

    const renderMessageList = () => {
        if (
            Object.keys(messageList).length === 0
            || !messageList.hasOwnProperty(chatId)
        ) {
            return [];
        }

        return messageList[chatId].map(message => (
            <div
                key={message.id}
                className={`App-message-list__row ${isCurrentUser(message.author) ? 'right' : ''}`}
            >
                <p className={`App-message-list ${isCurrentUser(message.author) ? 'user' : ''}`}>
                    {message.text}
                </p>
            </div>
        ));
    }

    const handleChange = useCallback((e) => {
        setNewMessage(e.target.value);
    }, [dispatch]);

    const isCurrentUser = (username) => {
        return username === profileName;
    }

    return (
        <>
        <div className="App-message-list__history">{renderMessageList()}</div>

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