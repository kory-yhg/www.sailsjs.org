// angular.module('Sails').directive('newsBanner', ['$http', function ($http) {
//   return {
//     restrict: 'E',
//     templateUrl: '/templates/NewsBanner.html',
//     scope: {},
//     link: function (scope) {

//       scope.options={};

//       $http.get('/news').then(function (res) {

//         var mostRecentActivity = res.data[0];

//         scope.options.latestCommit = angular.extend(mostRecentActivity, {
//           date: moment(mostRecentActivity.commit.author.date).fromNow(),
//           url: 'https://github.com/balderdashy/sails'
//         });

//       }, function onError(err) {
//         scope.options.error = err;
//       });

//     },
//   };
// }]);
