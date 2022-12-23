import createMockStore from "redux-mock-store";
import ChatListContainer from "../../../components/ChatListContainer";
import { ADD_CHAT, DELETE_CHAT } from "../actions";
import { chatsReducer, initialState } from "../reducer";
import { Chat } from "./../../../components/Chat";
const { render } = require("@testing-library/react");
const { Provider } = require("react-redux");

describe('Проверка компонента Chats', () => {
    it("Тестирование компонента-контейнера", () => {
        const mockStore = createMockStore();
        const component = render(
            <Provider store={mockStore({ chats: { chatList: []} })}>
                <ChatListContainer authed={true} />
            </Provider>
        );

        expect(component).toMatchSnapshot();
    });

    it("Тестирование презентационного компонента", () => {
        const mockStore = createMockStore();
        const component = render(
            <Provider store={mockStore({ messages: [] })}>
                <Chat
                    newMessage={"new message"}
                    profileName={'Default'}
                    messages={[]}
                    isEmptyMessagesList={true}
                />
            </Provider>
        );

        expect(component).toMatchSnapshot();
    });

    it('Тестирование chatsReducer ADD_CHAT', async() => {
        const action = {
            type: ADD_CHAT,
            name: "Пользователь 5"
        };

        expect(chatsReducer(initialState, action)).toEqual({
            ...initialState,
            chatList: [
                ...initialState.chatList,
                {
                    id: 5,
                    name: 'Пользователь 5'
                }
            ]
        });
    });

    it('Тестирование chatsReducer DELETE_CHAT', async() => {
        const action = {
            type: DELETE_CHAT,
            chatId: 4
        };

        expect(chatsReducer(initialState, action)).toEqual({
            ...initialState,
            chatList: [
                {
                    id: 1,
                    name: 'Бот',
                },
                {
                    id: 2,
                    name: 'Иванов Иван',
                    avatar: '/static/image/avatar/2.jpg'
                },
                {
                    id: 3,
                    name: 'Петров Петр',
                    avatar: '/static/image/avatar/3.jpg'
                },
            ]
        });
    });
});