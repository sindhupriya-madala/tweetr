
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
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
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "<script>alert('uh oh!');</script>"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function renderTweets(tweets) {
  var $tweets_container = $("#all-tweets");
  for(var tweet in tweets) {
    var $tweet_article = createTweetElement(tweets[tweet]);
    $tweets_container.append($tweet_article);
  }
  return $tweets_container;
}

function createTweetElement(tweet) {
  $tweet = $('<article>', {'class' : 'tweet'}).append(
    $('<header>').append(
      $('<img>').attr('src', tweet.user.avatars.small),
      $('<h1>').text(tweet.user.name),
      $('<h3>').text(tweet.user.handle)
      ),
    $('<p>').text(tweet.content.text),
    $('<footer>').append(
      $('<h3>').text(tweet.created_at),
      $('<h4>', { 'class' : "fa fa-flag"}),
      $('<h4>', { 'class' : "fa fa-retweet"}),
      $('<h4>', { 'class' : "fa fa-heart"})
      )
    )
  return $tweet;
}


 //old function but still works.
/*function createTweetElement(tweet) {
  var $tweet = $("<article/>").addClass("tweet");
  var $tweet_header = $("<header/>");
  var $tweet_footer = $("<footer/>");
  var $tweet_message = $("<p/>").text(`${tweet.content.text}`);

  $tweet_header.append($("<img>").attr('src', `${tweet.user.avatars.small}`));
  $tweet_header.append($("<h1>").text(tweet.user.name));
  $tweet_header.append($("<h3>").text(`${tweet.user.handle}`));

  $tweet_footer.append($("<h3>").text(`${tweet.created_at}`));
  $tweet_footer.append($("<h4>").addClass("fa fa-flag"));
  $tweet_footer.append($("<h4>").addClass("fa fa-retweet"));
  $tweet_footer.append($("<h4>").addClass("fa fa-heart"));

  $tweet.append($tweet_header);
  $tweet.append($tweet_message);
  $tweet.append($tweet_footer);

  return $tweet;
}*/

$(document).ready(function() {
    console.log(renderTweets(data));
});
