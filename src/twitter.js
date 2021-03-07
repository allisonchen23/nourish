import { Component } from 'react';
import logo from './assets/nourish_logo.png';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import Button from 'react-bootstrap/Button';

class Twitter extends Component{
  constructor() {
    super();

    this.state = {
      is_searching: false,
      tweet_ids: null
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    // let data = this.props.location;
    // if (data != undefined) {
    //   this.loadTweetIDs(data);
    // }
  }

  loadTweetIDs(search_terms)
  {
    this.setState({is_searching: true});
    let xhr = new XMLHttpRequest();
		let data = {
			action: "twitter_search",
			foods: search_terms,
		}
		xhr.addEventListener('load', () => {
			console.log(xhr.responseText)
			let results = JSON.parse(xhr.responseText);
			console.log(results);
			this.setState({tweet_ids: results, is_searching: false});

		});
		let searchURL = "http://localhost:5000";
		xhr.open('POST', searchURL);
		console.log("hitting flask api with: " + data)
		xhr.setRequestHeader("Content-Type", "application/json");    
		xhr.send(JSON.stringify(data));
  }
  renderButton(data) {
    if (this.state.tweet_ids == null) {
      let is_searching = this.state.is_searching;
        return (
          <div className="center_button">
              <Button className="button" variant='outline-secondary' disabled={is_searching} onClick={() => {this.loadTweetIDs(data)}}>
                <p className="button_text">{is_searching ? 'Loading Results...' : 'Search Twitter for recipes!'}</p>
              </Button>{' '}
              </div>
        )
      
    }
    else {
      let search_items = data.map((item) => {
				//return <li key={item}>{item}</li>
        return(
          <div className="custom_button">
            <Button  variant='outline-secondary' disabled={true}>
              <p className="button_text">{item}</p>
            </Button>
          </div>
        )
          
			})
      return (
        <>
          <p>
            Below are recipes related to: 
          </p>
          <div className="flex_container">
            {search_items}
          </div>
          </>
      )
    }
  }
  renderTweets() {
    if (this.state.tweet_ids == null) {
			return;
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
          <br/>
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