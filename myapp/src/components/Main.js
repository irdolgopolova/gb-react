import { Link } from 'react-router-dom';

export default function Main() {
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