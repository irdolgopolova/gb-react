import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import ProfileContainer from "./ProfileContainer";
import Home from "./Home";
import ChatListContainer from "./ChatListContainer";
import NoChat from "./NoChat";
import GistsList from "./GistsList";
import { app } from "../services/firebase";
import Login from "./Login";
import Signup from "./Signup";
import Main from "./Main";
import Menu from "./Menu";
import Logout from "./Logout";

export default function Routes() {
    const [authed, setAuthed] = useState(false);

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                setAuthed(true);
            } else {
                setAuthed(false);
            }
        })
    }, []);

    return (
        <Router>
            <Menu authed={authed} />
            <Switch>
                <Route exact path="/" element={<Main authed={authed} />}></Route>
                <Route exact path="/home" element={<Home authed={authed} />}></Route>
                <Route exact path="/chats/" element={<ChatListContainer authed={authed} />}></Route>
                <Route exact path="/chats/:chatId" element={<ChatListContainer authed={authed} />}></Route>
                <Route path="/profile/" element={<ProfileContainer authed={authed} />}></Route>
                <Route path="/nochat/" element={<NoChat />}></Route>
                <Route path="/gists/" element={<GistsList />}></Route>
                <Route path="/login/" element={<Login authed={authed} />}></Route>
                <Route path="/signup/" element={<Signup authed={authed} />}></Route>
                <Route path="/logout/" element={<Logout />}></Route>
            </Switch>
        </Router>
    );
}