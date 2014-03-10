/**
 *
 */
Mast.define('Tweets', function () {

  var tweetItems = [],
      tweetCount = 0,
      curTweet = 0,
      slideSpeed = 5000; // Slideshow speed (ms)

  return {

    className: 'tweets-wrapper',

    events: {
      'mouseenter .tweets-wrapper': 'stopSlideshow',
      'mouseleave .tweets-wrapper': 'startSlideshow'
    },

    afterRender: function() {
      // Populate array of tweets from this.el
      $(this.el).find('.tweet').each(function(i){
        tweetItems[i] = this;
      });

      // Count result
      tweetCount = tweetItems.length;

      // Start the slideshow
      this.startSlideshow();
    },

    startSlideshow: function(){
      this.slideShow = setInterval(function(){

        // If current tweet is end of array, start over
        if(curTweet >= tweetCount){
          curTweet = 0;
        }

        // Remove active class from previous item
        this.$('.tweet').removeClass('active');

        // Add active class to this item
        $(tweetItems[curTweet]).addClass('active');

        curTweet++;

      }, slideSpeed);
    },

    stopSlideshow: function() {
      clearInterval(this.slideShow);
    }

  };
});
