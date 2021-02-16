import { Component } from 'react';
import logo from './assets/nourish_logo.png';

class Twitter extends Component{
    render () {
      return (
        <div className="body">
          {/* <header> */}
          <div>
            <header className="header section">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Twitter
              </p>
            </header>
          </div>
          {/* <Questionnaire /> */}
        </div>
      );
    }
    
  }
  
  export default Twitter;