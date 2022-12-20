import { Navigate } from 'react-router-dom';
import Message from './Message';

export default function Home({ authed }) {
    const myText = "Добро пожаловать в Чатикс";

    if (!authed) {
        return (<Navigate to="/" />);
    }

    return (
        <Message text={myText} />
    );
};