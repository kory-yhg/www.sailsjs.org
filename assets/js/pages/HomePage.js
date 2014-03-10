/**
 * 
 * 
 */
Mast.define('HomePage', function () {
  return {

    className: 'home-page',

    events: {
      'click .column': 'transformColumn'
    },

    transformColumn: function (e) {
      $(e.currentTarget).css({
        '-webkit-transform': 'perspective(500px) rotateY(360deg)'
      });
    }
  };
});
