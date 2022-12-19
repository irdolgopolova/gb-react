import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link
} from "react-router-dom";
import ProfileContainer from "./ProfileContainer";
import Main from "./Main";
import ChatListContainer from "./ChatListContainer";
import NoChat from "./NoChat";

export default function Routes() {
    return (
        <Router>
            <nav className="App-routes_nav">
                <ul className="App-routes_nav__list">
                    <li>
                        <Link to="/">Главная</Link>
                    </li>
                    <li>
                        <Link to="/chats">Чаты</Link>
                    </li>
                    <li>
                        <Link to="/profile">Профиль</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route exact path="/" element={<Main />}></Route>
                <Route exact path="/chats/" element={<ChatListContainer />}></Route>
                <Route exact path="/chats/:chatId" element={<ChatListContainer />}></Route>
                <Route path="/profile/" element={<ProfileContainer />}></Route>
                <Route path="/nochat/" element={<NoChat />}></Route>
            </Switch>
        </Router>
    );
}