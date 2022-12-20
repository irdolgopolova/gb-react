import { Navigate } from "react-router-dom";
import { app } from "../services/firebase";

export default function Logout() {
    app.auth().signOut();

    return (<Navigate to="/"/>);
}