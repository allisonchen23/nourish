import { Component } from 'react';
import logo from './assets/nourish_logo.png';
import { TwitterTweetEmbed } from 'react-twitter-embed';

class Twitter extends Component{
  constructor() {
    super();

    this.state = {
      tweet_ids: ['1361173965717131264', '1361124802891640833', '1361116828525678593', '1359665077188612096']
    }
  }

  renderTweets() {
    let tweets = this.state.tweet_ids.map((tweet_id) => {
      return (
        <div class="grid_item">
          <TwitterTweetEmbed tweetId={tweet_id} />
        </div>
      )
    })
    return(
      <div className="grid'">
          {tweets}
        </div>
        
    )
  }
  render () {
    return (
      <div className="body">
        {/* <header> */}
        <div>
          <header className="header">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
              Recipes Trending On Twitter
          </header>
        </div>
        <div className="section">
          <h2>
            Grape Tomatoes
          </h2>
          {this.renderTweets()}
        </div>
      </div>
    );
  }
    
  }
  
  export default Twitter;