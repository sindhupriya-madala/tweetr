
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

$(document).ready(function() {
    $(function() {
      //get the form.
      $form = $('#submit');
      //get the session of article.
      $tweets = $('.container-tweets');
      const $textarea = $('*[name=text]', $form);

      // Set up an event listener for the contact form.
      $form.submit( function(event) {
        // Stop the browser from submitting the form.

        console.log("before event propagation",event);
        event.preventDefault();

        var formData = $form.serialize();
        console.log("serialize data : ",formData,formData.slice(5));
        var text = formData.slice(5);
        if(text === '' || text === null) {
          console.log("your tweet message is empty");
        } else if(text.length > 140) {
          console.log("your tweet message exceeds length, should be below 140");
        } else {
          // Submit the form using AJAX.
          $.ajax({
              type: 'POST',
              url: '/tweets',
              data: formData,
              success: function() {
                loadTweets();
              }
          })
          $textarea.val("");
        }
      });
    });
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

    $compose = $('.compose');
    $newTweet = $('.new-tweet');
    $compose.on('click', function() {
      $newTweet.slideToggle(1000, function() {
        switch($newTweet.css('display')) {
          case 'block':
            $('.new-tweet textarea').focus();
            // add button class
            $('.compose').css("cssText","'color' : 'red;'");
            break;
          case 'none':
            // remove button class
            //$compose.'blue');
          break;
        }


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


