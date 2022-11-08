import './App.css';
import Message from './components/Message'
import React, { useState, useEffect } from 'react';

function App() {
  const myText = 'Привет, напиши нашему боту!';
  const currentUsername = 'Пользователь';
  const botUsername = 'Бот';

  let newMessage;
  const [messageList, setMessageList] = useState([]);

  const isCurrentUser = (username) => {
    return username === currentUsername;
  }

  const renderMessageList = () => {
    return messageList.map((message, index) => (
      <p key={index} className={`App-message-list__row ${isCurrentUser(message.author) ? 'right' : ''}`} >
        <span className={`App-message-list ${isCurrentUser(message.author) ? 'user' : ''}`}>
          {message.text}
        </span>
      </p>
    ));
  }

  const updateMessageList = (event) => {
    event.preventDefault();

    if (newMessage) {
      setMessageList([
        ...messageList,
        {
          text: newMessage,
          author: currentUsername
        }
      ]);

      document.myForm.reset();
    }
  }

  const handleChange = (event) => {
    newMessage = event.target.value;
  }

  useEffect(() => {
    if (messageList.length && isCurrentUser(messageList.slice(-1)[0].author)) {
      setTimeout(() => {
        setMessageList([
          ...messageList,
          {
            text: "На данный момент бот не доступен, попробуйте позже",
            author: botUsername
          }
        ]);
      }, 1500);
    }
  }, [messageList]);

  return (
    <div className="App">
      <div className="App-main">
        <div className="App-main__card">
          <Message text={myText} />

          <div className="App-message-list__history">{renderMessageList()}</div>

          <form className='App-form' name="myForm" onSubmit={updateMessageList}>
            <input
              className="App-form__input"
              type="text"
              value={newMessage}
              onChange={handleChange}
              placeholder="Сообщение..."
            />

            <button className="App-form__btn" type="submit">Отправить</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
