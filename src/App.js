import { Component } from 'react';
import logo from './assets/nourish_logo.png';
import './App.css';
import './css/global.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
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
              <Button className="nourish_button" variant='outline-secondary'>
                <p className="button_text">Let's get started!</p>
              </Button>{' '}
            </Link>
          </header>
        </div>
      </div>
    );
  }
  
}

export default Home;
