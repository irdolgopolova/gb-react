import './App.css';
import Message from './components/Message'

const myText = 'Hello, Irina!';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header__card">
          <span>My First React App</span>
          <Message text={myText} />
        </div>

      </header>
    </div>
  );
}

export default App;
