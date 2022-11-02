import "./Message.scss"

function Message(props) {
    return <h3 className="message__header">{props.text}</h3>;
}

export default Message;