angular.module('SailsWebsite').controller('HomepageCtrl', [
  '$scope',
  '$interval',
  function($scope, $interval) {

    //Set initial tweet in Slideshow
    $scope.activeTweet = '@rauchg';

    $scope.tweets = ['@androolloyd', '@cbmeeks', '@dylanized', '@FeedJoelPie', '@infil00p', '@JohnnyReading', '@lorefnon', '@rauchg'];

    // Start the slideshow:
    var tweetCount = $scope.tweets.length,
        curTweet = 0,

    slideshow = $interval(function() {
      // If current tweet is end of array, start over
      if(curTweet >= tweetCount){
        curTweet = 0;
      }
      // Add active class to this item
      $scope.activeTweet = $scope.tweets[curTweet];

      curTweet++;
    }, 5000);

    // $('html, body').animate({
    //   scrollTop: 0
    // }, 500);
}
]);



