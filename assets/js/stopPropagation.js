angular.module('Sails')

.directive('stopPropagation', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      element.bind(attr.stopPropagation, function(e) {
        e.stopPropagation();
      });
    }
  };
});