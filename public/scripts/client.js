/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  tweets.forEach(tweet => {
    const tweetElement = createTweetElement(tweet);
    $('#tweets-container').prepend(tweetElement)
  })
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


$(document).ready(function() {
  
  $('#submit-tweet').on('submit', function (event) {
    
    event.preventDefault();
    
    const submission = $('#tweet-input').val();
    
    if (!submission) {
      window.alert("Please enter a message 🦉");
      return;
    }

    if(submission.length > 140) {
      window.alert("Your tweet exceeds 140 characters");
      return;
    }

    if(submission.length > 0 && submission.length <= 140) {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: {text: submission}
      }).then(() => {

        loadTweets();
        $('#tweet-input').val('');

      }).catch(err => {
        console.log('ERR caught in AJAX POST: ', err);
      })
    }

  })

  
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    }).then((data)=> {
      const tweets = renderTweets(data);
    }).catch(err => {
      console.log('ERR caught in AJAX GET: ', err);
    })
  };
  
  loadTweets();

  
})
