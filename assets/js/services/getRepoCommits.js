angular.module('Sails').factory('getRepoCommits', ['$http', function ($http) {

  return {

    inputs: {
      path: { example: 'README.md' }
    },

    fn: function (opts) {
      return $http.get('/news', { params: opts })
      .then(function (res) {
        // tolerate errors- this is unfinished
        if (!res.data.length) return {latestCommit: {}};
        try {
          var mostRecentActivity = res.data[0];
          return {
            latestCommit: angular.extend(mostRecentActivity, {
              date: moment(mostRecentActivity.commit.author.date).fromNow()
            })
          };
        }
        catch (e) {
          return {latestCommit: {}};
        }
      });
    }
  };

}]);
