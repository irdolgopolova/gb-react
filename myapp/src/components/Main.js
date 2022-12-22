import { Link, Navigate } from 'react-router-dom';

export default function Main({ authed }) {
    if (authed) {
        return (<Navigate to="/home"/>);
    }

    return (
        <>
        <h3>Главная страница</h3>
        <div>
            <Link to="/login">Вход</Link>
            <span> | </span>
            <Link to="/signup">Регистрация</Link>
        </div>
        </>
    );
};