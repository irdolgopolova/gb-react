import React, { useState, useCallback, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { addMessageWithFirebase, initMessageTracking } from "../store/messages/actions";
import { getProfileName } from "../store/profile/selectors";
import { Chat } from './Chat';

export function ChatContainer() {
    const { chatId } = useParams();

    const [newMessage, setNewMessage] = useState('');
    const messageList = useSelector((state) => state.messages.messages);
    const messages = messageList[chatId];

    const profileName = useSelector(getProfileName, shallowEqual);

    const dispatch = useDispatch();

    const onAddMessage = useCallback((event) => {
        event.preventDefault();

        let newId = (messages !== undefined)
            ? messages.length + 1
            : 1;

        dispatch(
            addMessageWithFirebase(chatId, {
                id: newId,
                author: profileName,
                message: newMessage
            })
        )

        setNewMessage("");
        document.myForm.reset();
    }, [dispatch, newMessage, chatId, messages, profileName]);

    useEffect(() => {
        dispatch(initMessageTracking());
    }, [dispatch]);

    const handleChange = useCallback((e) => {
        setNewMessage(e.target.value);
    }, []);

    const isEmptyMessagesList = (messages) => {
        return messages === undefined ||
            Object.keys(messages).length === 0;
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