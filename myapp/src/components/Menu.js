import { Link } from "react-router-dom";

export default function Menu({ authed }) {
    if (!authed) {
        return (
            <nav className="App-routes_nav">
                <ul className="App-routes_nav__list">
                    <li>
                        <Link to="/home">Главная</Link>
                    </li>
                    <li>
                        <Link to="/gists">Gists</Link>
                    </li>
                </ul>
            </nav>
        );
    }

    return (
        <nav className="App-routes_nav">
            <ul className="App-routes_nav__list">
                <li>
                    <Link to="/home">Главная</Link>
                </li>
                <li>
                    <Link to="/chats">Чаты</Link>
                </li>
                <li>
                    <Link to="/profile">Профиль</Link>
                </li>
                <li>
                    <Link to="/gists">Gists</Link>
                </li>
                <li>
                    <Link to="/logout">Выйти</Link>
                </li>
            </ul>
        </nav>
    )
}