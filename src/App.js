import { Component } from 'react';
import logo from './assets/nourish_logo.png';
import './App.css';
import './css/global.css';
import hitDB from './access_db';
import Questionnaire from './questionnaire';

class Home extends Component{
  render () {
    return (
      <div className="body">
        {/* <header> */}
        <div>
          <header className="header section">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              nourish
            </p>
            <button onClick={hitDB}>
              Click Me
            </button>
            <p>
              Scroll to begin!
            </p>
          </header>
        </div>
        <Questionnaire />
      </div>
    );
  }
  
}

export default Home;
