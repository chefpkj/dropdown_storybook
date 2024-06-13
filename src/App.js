import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App bg-red-400">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>iofioifo</h1>
        <h2>jofjoirio</h2>
        <div className='bg-red-500 text-white'>This is my new div</div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
