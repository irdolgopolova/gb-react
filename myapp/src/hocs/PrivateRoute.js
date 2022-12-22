import React from "react";
import { Route, Navigate } from "react-router-dom";

export default function PrivateRoute({ authenticated, ...rest }) {
    return authenticated
        ? ( <Route {...rest} /> )
        : ( <Navigate to={{ pathname: "/login" }} /> );
}