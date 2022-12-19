import React, { useState, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { addMessageWithThunk } from "../store/messages/actions";
import { getMessageList } from "../store/messages/selectors";
import { getProfileName } from "../store/profile/selectors";
import { Chat } from './Chat';

export function ChatContainer() {
    const { chatId } = useParams();

    const [newMessage, setNewMessage] = useState('');

    const messageList = useSelector(getMessageList, shallowEqual);
    const profileName = useSelector(getProfileName, shallowEqual);

    const dispatch = useDispatch();

    const onAddMessage = useCallback((event) => {
        event.preventDefault();
        dispatch(addMessageWithThunk(chatId, profileName, newMessage));
        setNewMessage("");
        document.myForm.reset();
    }, [dispatch, newMessage]);

    const handleChange = useCallback((e) => {
        setNewMessage(e.target.value);
    }, [dispatch]);

    const isEmptyMessagesList = (messageList) => {
        return Object.keys(messageList).length === 0
            || !messageList.hasOwnProperty(chatId);
    }

    return (
        <Chat
            newMessage={newMessage}
            profileName={profileName}
            messages={messageList[chatId]}
            isEmptyMessagesList={isEmptyMessagesList(messageList)}
            onAddMessage={onAddMessage}
            handleChange={handleChange}
        />
    );
}