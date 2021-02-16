import { Component } from 'react';
import logo from './assets/nourish_logo.png';
import './App.css';
import './css/global.css';
import { Link } from 'react-router-dom';

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
            <Link to="/questionnaire">
              <button className="button">
                Let's get started!
              </button>
            </Link>
          </header>
        </div>
      </div>
    );
  }
  
}

export default Home;
