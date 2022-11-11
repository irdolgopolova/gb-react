import './App.css';
import Message from './components/Message';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles"
import React, { useState, useEffect } from 'react';

function App() {
  const myText = 'Привет, напиши нашему боту!';
  const currentUsername = 'Пользователь';
  const botUsername = 'Бот';

  const theme = createTheme({
    palette: {
      main: "#96B9FF",
      light: "#FFF",
    },
    typography: {
      messageText: {
        fontSize: 16,
        lineHeight: "18px"
      }
    },
    components: {
      MuiListItem: {
        styleOverrides: {
          root: {
            "&:hover": {
              color: "#96B9FF"
            }
          }
        }
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: "#96B9FF"
          }
        }
      },
      MuiInput: {
        styleOverrides: {
          root: {
            color: "#fff"
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            width: "100%",
            color: "#96B9FF",
            borderBottom: "1px groove rgba(176, 202, 255, 0.7)"
          },
          label: {
            color: "#96B9FF"
          },
          input: {
            color: "#fff"
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          text: {
            color: '#96B9FF',
          },
          root: {
            marginLeft: 20,
            "&:hover": {
              outline: "1px groove rgba(176, 202, 255, 0.7)"
            },
          }
        }
      }
    }
  });

  let newMessage;
  const [messageList, setMessageList] = useState([]);
  const [chatList, setChatList] = useState([
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
    {
      id: 4,
      name: 'Попова Елена',
      avatar: '/static/image/avatar/4.jpg'
    }
  ]);

  const isCurrentUser = (username) => {
    return username === currentUsername;
  }

  const renderMessageList = () => {
    return messageList.map(message => (
      <p key={message.id} className={`App-message-list__row ${isCurrentUser(message.author) ? 'right' : ''}`} >
        <span
          className={`App-message-list ${isCurrentUser(message.author) ? 'user' : ''}`}
          style={{
            fontSize: theme.typography.messageText.fontSize,
            lineHeight: theme.typography.messageText.lineHeight
          }}
        >
          {message.text}
        </span>
      </p>
    ));
  }

  const renderChatList = () => {
    const listItems = chatList.map(chat => (
      <ListItem key={chat.id} >
        <ListItemAvatar>
          <Avatar alt={chat.name} src={chat.avatar} />
        </ListItemAvatar>
        <ListItemText>
          {chat.name}
        </ListItemText>
      </ListItem>
    ));

    return (
      <List>
        {listItems}
      </List>
    );
  }

  const updateMessageList = (event) => {
    event.preventDefault();

    if (newMessage) {
      setMessageList([
        ...messageList,
        {
          id: messageList.length,
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
            id: messageList.length,
            text: "На данный момент бот не доступен, попробуйте позже",
            author: botUsername
          }
        ]);
      }, 1500);
    }
  }, [messageList]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="App-main">
          <div className="App-main__card">
            <Message text={myText} />

            <div className="App-message-list__chat">
              <div className="App-message-list__chat_list">
                {renderChatList()}
              </div>

              <div className="App-message-list__current_chat">
                <div className="App-message-list__history">{renderMessageList()}</div>

                <form className="App-form" name="myForm" onSubmit={updateMessageList}>
                  <TextField
                    id="standard-basic"
                    label="Ваше сообщение"
                    variant="standard"
                    value={newMessage}
                    onChange={handleChange}
                  />
                  <Button onClick={updateMessageList}>Отправить</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
