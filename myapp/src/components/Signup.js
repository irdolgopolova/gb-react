import { useState } from "react"
import { Link, Navigate } from "react-router-dom";
import { app } from "./../services/firebase"

export default function Signup({ authed }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePassChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await app.auth()
                .createUserWithEmailAndPassword(email, password);;
        } catch (error) {
            setError(error.message);
        }
    };

    if (authed) {
        return (<Navigate to="/home/"/>);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>Регистрация</p>
                <div>
                    <input
                        placeholder="email"
                        name="email"
                        type="email"
                        onChange={handleEmailChange}
                        value={email}
                    />
                </div>
                <div>
                    <input
                        placeholder="Пароль"
                        name="password"
                        type="password"
                        onChange={handlePassChange}
                        value={password}
                    />
                </div>
                <div>
                    {error && <p>{error}</p>}
                    <button type="submit">Зарегистрироваться</button>
                </div>
                <hr />
                <p>
                    Если вы уже зарегистрированы,
                    то можете <Link to="/login">войти в систему</Link>
                </p>
            </form>
        </div>
    );
}