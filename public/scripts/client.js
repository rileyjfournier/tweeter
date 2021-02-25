/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  let allTweets = ''; 
  tweets.forEach(tweet => allTweets += createTweetElement(tweet));
  return allTweets;
}

// helper function for returning tweet creation time
const timeCreated = function(time) {
  let todayInMilli = new Date().getTime();
  let tweetCreated = todayInMilli - time;
  let daysAgo = Math.floor(tweetCreated / 60000 / 60 / 24);
  if (daysAgo < 1) {
    return 'Today'
  } 
  if (daysAgo >= 1 && daysAgo < 2) {
    return 'Yesterday'
  }
  return `${daysAgo} days ago`;
}

const createTweetElement = function(data) {
  let tweetTime = timeCreated(data.created_at)
  let tweet = 
  `
  <article class="individual-tweet">
    <div class="avatar-name-account">
      <div class="avatar-name">
        <img id="avatar-image" src="${data.user.avatars}">
        <div>${data.user.name}</div>
      </div>
      <div class="fade-text">${data.user.handle}</div>
    </div>
    <div class="tweet-content">
      <div>${data.content.text}</div>
    </div>
    <div class="bottom-info">
      <div>${tweetTime}</div>
      <div>share / like / save</div>
    </div>
  </article>
  `
  return tweet
};

const $tweet = renderTweets(tweetData);

$(document).ready(function() {
  $('#tweets-container').append($tweet);
})
