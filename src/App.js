import logo from './assets/nourish_logo.png';
import './App.css';
import './css/global.css';
import hitDB from './access_db';

function App() {
  return (
    <div className="body">
      {/* <header> */}
      <header className="header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          nourish
        </p>
        <button onclick={hitDB()}>
          Click Me
        </button>
      </header>
    </div>
  );
}

export default App;
