$(document).ready(function() {
   const data = [
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
 
//  tweets.forEach(element => {
//    const $tweet = createTweetElement(element);
$('#tweets-container').empty();
tweets.forEach(element => {
   const $tweet = createTweetElement(element);
   $('#tweets-container').prepend($tweet);
 });
 console.log("hi");
}

 //create new tweet element
const createTweetElement = function(obj) {
   
   
   const time = timeago.format(obj.created_at);

   const $tweet = $(`
   <article class="tweet">
       <header>
         <span><img src=${obj.user.avatars}> ${obj.user.name}</span>
         <span id="mention">${obj.user.handle}</span>
       </header>
       <p>${obj.content.text}</p>
       <footer>
         <span id = "time-ago">${time}</span>
         <div><i class="fas fa-flag"></i><i class="fas fa-redo-alt"></i><i class="fas fa-heart"></i></div>
       </footer>
   </artical>
   `);
   return $tweet;
 };

//const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
//console.log($tweet); // to see what it looks like
//$('#tweets-container').append($tweet); //

renderTweets(data);

$('form').submit(function(event) {
   event.preventDefault();

   if (!$(this).find('#tweet-text').val()) {
      alert("Tell me something, the tweet is empty.");
      return;
    } else if ($(this).find('.counter').val() < 0) {
      alert("Character number exceeds the maximum limit!");
      return;
    }

   $.ajax({
     url: '/tweets/',
     method: 'POST',
     data: $(this).serialize()
   })
   .then(() => {
      loadTweets();
      $('#tweet-text').val(''); //clear the textarea
    })
  });

  //fetch tweets from server
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
      .then(function(data) {
        renderTweets(data);
      })
  }

 loadTweets();
})
