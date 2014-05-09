angular.module('Sails').controller('TweetCtrl', [
  '$scope',
  '$interval',

  function($scope, $interval) {
    $scope.tweets = [
      {
        twitterHandle: '@androolloyd',
        twitterUrl: 'https://twitter.com/androolloyd',
        text: '@sailsjs you\'ll be happy to know there is a hackathon this weekend and I chose you to power my mad creation. PS, Can you have my babies? <3'
      },
      {
        twitterHandle: '@cbmeeks',
        twitterUrl: 'https://twitter.com/cbmeeks',
        text: 'OMG I\'ve been using #sailsjs and I am in friggin love!!  Where have you been all my life?'
      },
      {
        twitterHandle: '@dylanized',
        twitterUrl: 'https://twitter.com/dylanized',
        text: 'Rails is omakase; @SailsJS is a buffet'
      },
      {
        twitterHandle: '@FeedJoelPie',
        twitterUrl: 'https://twitter.com/FeedJoelPie',
        text: 'Very excited to try @sailsjs. 1st Railsy framework in @nodejs that didn\'t make me yell "STOP TRYING TO BUILD RAILS IN NODE!" at my computer.'
      },
      {
        twitterHandle: '@infil00p',
        twitterUrl: 'https://twitter.com/infil00p',
        text: 'Looks like I\'m going to be using a lot of @sailsjs in the near future.  I don\'t know why I haven\'t heard of this earlier.'
      },
      {
        twitterHandle: '@JohnnyReading',
        twitterUrl: 'https://twitter.com/JohnnyReading',
        text: 'Oh wow, #sailsjs. Not using node.js excuses getting thin.'
      },
      {
        twitterHandle: '@lorefnon',
        twitterUrl: 'https://twitter.com/lorefnon',
        text: 'Exploring #sailsjs.  - awesome realtime framework for node.js. Hassle free quckstart, Great docs, nice ORM, Rails inspired.'
      },
      {
        twitterHandle: '@rauchg',
        twitterUrl: 'https://twitter.com/rauchg',
        text: 'Wow http://balderdashy.github.com/sails/'
      }
    ];

    //Set initial tweet in Slideshow
    $scope.activeTweet = '@rauchg';
    
    $scope.intent = angular.extend($scope.intent || {}, {
      startSlideshow: function() {
        var tweetCount = $scope.tweets.length,
            curTweet = 0,

        slideshow = $interval(function() {
          // If current tweet is end of array, start over
          if(curTweet >= tweetCount){
            curTweet = 0;
          }
          // Add active class to this item
          $scope.activeTweet = $scope.tweets[curTweet].twitterHandle;

          curTweet++;
        }, 5000);
      }
    });
  }
]);
