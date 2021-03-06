import { Component } from 'react';
import logo from './assets/nourish_logo.png';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import Button from 'react-bootstrap/Button';

class Twitter extends Component{
  constructor() {
    super();

    this.state = {
      // tweet_ids: ['1361173965717131264', '1361124802891640833', '1361116828525678593', '1359665077188612096']
      tweet_ids: null//['1365697918938841089', '1365683891906830347', '1365682716868509702', '1365476128123666433', '1365449830617780225', '1365440507439104002', '1365421474518093829', '1365421141851013127']
    }
  }

  loadTweetIDs(search_terms)
  {
    let xhr = new XMLHttpRequest();
		let data = {
			action: "twitter_search",
			foods: search_terms,
		}
		xhr.addEventListener('load', () => {
			console.log(xhr.responseText)
			let results = JSON.parse(xhr.responseText);
			console.log(results);
			this.setState({tweet_ids: results});

		});
		let searchURL = "http://localhost:5000";
		xhr.open('POST', searchURL);
		console.log("hitting flask api with: " + data)
		xhr.setRequestHeader("Content-Type", "application/json");    
		xhr.send(JSON.stringify(data));
  }
  renderButton(data) {
    if (this.state.tweet_ids == null) {
      return (
        <div className="center_button">
						<Button className="button" variant='outline-secondary' onClick={() => {this.loadTweetIDs(data)}}>
							<p className="button_text">Search Twitter for recipes!</p>
						</Button>{' '}
						</div>
        // <div className="center_button">
        //   <button className="button" onClick={() => {this.loadTweetIDs(data)}}>
        //     Search Twitter!
        //   </button>
        // </div>
      )
    }
    else {
      let search_items = data.map((item) => {
				return <li key={item}>{item}</li>
			})
      return (
        <>
          <p>
            Below are recipes related to: 
          </p>
          <ul>
            {search_items}
          </ul>
          </>
      )
    }
  }
  renderTweets() {
    if (this.state.tweet_ids == null) {
			return(
				<p>Please click the button to perform a search!</p>
			)
		}
    // console.log(this.state.tweet_ids)
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
    const {data} = this.props.location;
    console.log(data);
    return (
      <div className="body">
        {/* <header> */}
        <div>
          <header className="header">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
              Recipes Trending On Twitter
          </header>
          {this.renderButton(data)}
          {/* <div className="center_button">
						<button className="button" onClick={() => {this.loadTweetIDs(data)}}>
							Search Twitter!
						</button>
					</div> */}
        </div>
        <div className="section">
          {this.renderTweets()}
        </div>
      </div>
    );
  }
    
  }
  
  export default Twitter;