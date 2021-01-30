import tweepy
import json

API_KEY = "sVP5jpY6HyToTWCrCp2Y3alsr"
API_SECRET = "NUt0muznGlrKj1iB5EDYU2bIWcdqZhG5AFQe94jcM4ZuqmAbDx"
ACCESS_TOKEN = "1351613332051161090-b71OqMwjGQTB3GWCfIcrpykCI7BCZx"
ACCESS_TOKEN_SECRET = "ImpQe1rBLXt4bXZirlJmrhicxd8IYmj9VYSpELLJFTz8q"

# Authenticate Twitter
def authenticate_twitter():
    auth = tweepy.OAuthHandler(API_KEY, API_SECRET)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

    api = tweepy.API(auth)

    try: 
        api.verify_credentials()
        print("Verified!")
    except: 
        print("Authentication Error")
    return api

def recipe_search(api, search_word="broccoli", max_items=20):
    # for tweet in api.search(q=search_word, lang="en", rpp=10):
    #     print("{}: {}".format(tweet.user.name, tweet.text))

    results = [status._json for status in tweepy.Cursor(api.search, q=search_word, lang="en", result_type="mixed", tweet_mode="extended").items(20)]
    with open('data.txt', 'w') as f:
        json.dump(results, f, indent=4)

def event_search():
    x=3
if __name__ == '__main__':
    api = authenticate_twitter()
    recipe_search(api, "broccoli recipe")