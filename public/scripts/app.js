
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 //"use strict";

function renderTweets(tweets) {
  var $tweets_container = $("#all-tweets");
  for(var tweet in tweets) {
    var $tweet_article = createTweetElement(tweets[tweet]);
    $tweets_container.append($tweet_article);
  }
  //return $tweets_container;
}

function createTweetElement(tweet) {
  return $('<article>', {'class' : 'tweet'}).append(
    $('<header>').append(
      $('<img>').attr('src', tweet.user.avatars.small),
      $('<h1>').text(tweet.user.name),
      $('<h3>').text(tweet.user.handle)
      ),
    $('<p>').text(tweet.content.text),
    $('<footer>').append(
      $('<h3>').text(tweet.created_at),
      ['flag', 'retweet', 'heart'].map(icon => $('<h4>', { 'class' : "fa fa-" + icon}))
      )
    )
}

$(document).ready(function() {
    $(function() {
      //get the form.
     const $form = $('#submit');
      //get the session of article.
      const $tweets = $('.container-tweets');
      const $textarea = $('*[name=text]', $form);
      let $errSpan = $('.err-message');

      // Set up an event listener for the contact form.
      $form.submit( function(event) {
        // Stop the browser from submitting the form.
        event.preventDefault();
        // if tweent is empty or more than 140 just display span with proper msg for 1500ms time.
        var text = $textarea.val();
        if(text === '' || text === null) {
          $errSpan.text("Tweet should not be Empty");
          setTimeout(() => {
            $errSpan.text("");
          },1500);
        } else if(text.length > 140) {
          $errSpan.text("Tweet length more than 140 characters");
          setTimeout(() => {
            $errSpan.text("");
          },1500);
        } else {
          // Submit the form using AJAX.
          $.ajax({
              type: 'POST',
              url: '/tweets',
              data: $form.serialize(),
              success: function() {
                loadTweets();
              }
          })
          //empty the tweet textarea after tweet submits the post.
          $textarea.val("");
        }
      });
    });
    //function for load all tweets.
    function loadTweets() {
      $.ajax({
        url: '/tweets',
        method: 'GET',
        success: function (tweetsArray) {
          //console.log('Success POST : ', tweetsArray);
          renderTweets(tweetsArray);
        }
      });
    }
    loadTweets();

    //when we click compose button it slideDown newtweet and with the return value of slideToggle
    // we are changing the compose button appearance.
    const $compose = $('.compose');
    const $newTweet = $('.new-tweet');
    $compose.on('click', function() {
      $newTweet.slideToggle(1000, function() {
        var style = {
          'block': {
            'color': 'red',
            'text-decoration': 'underline'
          },
          'none': {
            'color': 'blue',
            'text-decoration': 'none'
          }
        }

        $('.new-tweet textarea').focus();
        $('.compose').css(style[$newTweet.css('display')]);
      });
    });
});





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


