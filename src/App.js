import logo from './assets/nourish_logo.png';
import './App.css';
import './css/global.css'

function App() {
  return (
    <div className="body">
      {/* <header> */}
      <header className="header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          nourish
        </p>
        <button>
          Click Me
        </button>
      </header>
    </div>
  );
}

export default App;
