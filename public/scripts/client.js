/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // RENDER ALL EXISTING TWEETS
const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  tweets.forEach(tweet => {
    const tweetElement = createTweetElement(tweet);
    $('#tweets-container').prepend(tweetElement);
  });
};

// RETURN TWEET CREATION TIME
const timeCreated = function(time) {
  const todayInMilli = new Date().getTime();
  const tweetCreated = todayInMilli - time;
  const daysAgo = Math.floor(tweetCreated / 60000 / 60 / 24);
  const hoursAgo = Math.floor(tweetCreated / 60000 / 60)
  const minutesAgo = Math.floor(tweetCreated / 60000)
  const secondsAgo = Math.floor(tweetCreated / 1000)
  if (daysAgo < 1) {
    if (secondsAgo === 0) {
      return `just tweeted!`
    }
    if (secondsAgo < 60) {
      return `${secondsAgo} seconds ago`
    }
    if (minutesAgo === 1) {
      return `${minutesAgo} minute ago`
    }
    if (minutesAgo < 60) {
      return `${minutesAgo} minutes ago`
    } else if (hoursAgo < 24) {
      return `${hoursAgo} hours ago`
    }
  }
  if (daysAgo === 1) {
    return `${daysAgo} day ago`;
  }
  if (daysAgo > 1) {
    return `${daysAgo} days ago`;
  }
};

// RETURNS HTML TWEET WITH USER INPUT
const createTweetElement = function(data) {
  const escape = function(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const tweetTime = timeCreated(data.created_at);
  const tweet = 
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
      <div>${escape(data.content.text)}</div>
    </div>
    <div class="bottom-info">
      <div>${tweetTime}</div>
      <div>share / like / save</div>
    </div>
  </article>
  `;
  return tweet;
}; 

$(document).ready(function() {
  
  $('#submit-tweet').on('submit', function(event) {
    
    event.preventDefault();
    
    const tweetText = $('#tweet-input').val();
    
    if (!tweetText) {
      $('.char-limit').slideDown(100);
      return;
    }
    
    if (tweetText.length > 140) {
      $('.char-limit').slideDown(100);
      return;
    }

    if (tweetText.length > 0 && tweetText.length <= 140) {
      if ($('.char-limit').is(':visible')) {
        $('.char-limit').hide();
      }
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: {text: tweetText}
      }).then(() => {

        loadTweets();
        $('#tweet-input').val('');

      }).catch(err => {
        console.log('ERR caught in AJAX POST: ', err);
      });
    }
  });

  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    }).then((data)=> {
      renderTweets(data);
      $('#tweet-text-counter').html('140')
    }).catch(err => {
      console.log('ERR caught in AJAX GET: ', err);
    });
  };
  loadTweets();
});
