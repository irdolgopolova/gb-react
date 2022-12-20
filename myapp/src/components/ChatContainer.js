import React, { useState, useCallback, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { addMessageWithFirebase, addMessageWithThunk, initMessageTracking } from "../store/messages/actions";
import { getProfileName } from "../store/profile/selectors";
import { Chat } from './Chat';

export function ChatContainer() {
    const { chatId } = useParams();

    const [newMessage, setNewMessage] = useState('');
    const messageList = useSelector((state) => state.messages.messages);
    const messages =  messageList[chatId];

    const profileName = useSelector(getProfileName, shallowEqual);

    const dispatch = useDispatch();

    const onAddMessage = useCallback((event) => {
        event.preventDefault();

        dispatch(
            addMessageWithFirebase(chatId, {
                id: messages.length + 1,
                author: profileName,
                message: newMessage
            })
        )

        setNewMessage("");
        document.myForm.reset();
    }, [newMessage]);

    useEffect(() => {
        dispatch(initMessageTracking());
    }, []);

    const handleChange = useCallback((e) => {
        setNewMessage(e.target.value);
    }, [dispatch]);

    const isEmptyMessagesList = (messages) => {
        return Object.keys(messages).length === 0;
    }

    return (
        <Chat
            newMessage={newMessage}
            profileName={profileName}
            messages={messages}
            isEmptyMessagesList={isEmptyMessagesList(messages)}
            onAddMessage={onAddMessage}
            handleChange={handleChange}
        />
    );
}