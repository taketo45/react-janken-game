import './App.css';
import JankenGame from './components/JankenGame';
import normalize from 'normalize.css';

function App() {
  return (
    <div styles={normalize}>
      <div className="App">
        <JankenGame />
      </div>
    </div>
  );
}

export default App;
