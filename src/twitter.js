import { Component } from 'react';
import logo from './assets/nourish_logo.png';
import { TwitterTweetEmbed } from 'react-twitter-embed';

class Twitter extends Component{
  constructor() {
    super();

    this.state = {
      // tweet_ids: ['1361173965717131264', '1361124802891640833', '1361116828525678593', '1359665077188612096']
      tweet_ids: ['1365697918938841089', '1365683891906830347', '1365682716868509702', '1365476128123666433', '1365449830617780225', '1365440507439104002', '1365421474518093829', '1365421141851013127']
    }
  }
  loadTweetIDs()
  {

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
          <div className="center_button">
						<button className="button" onClick={() => {this.loadTweetIDs()}}>
							Search Twitter!
						</button>
					</div>
        </div>
        <div className="section">
          {this.renderTweets()}
        </div>
      </div>
    );
  }
    
  }
  
  export default Twitter;