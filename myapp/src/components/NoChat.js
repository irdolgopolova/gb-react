import ChatList from "./ChatList";

export default function NoChat() {
    return (
        <>
            <p>Выберите один из существующих чатов или создайте новый</p>
            <ChatList />
        </>
    );
}