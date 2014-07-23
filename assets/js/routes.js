/**
 * Configure client-side routes (#/foo, #/bar, etc.)
 */

angular.module('Sails').config(['$routeProvider', function($routeProvider) {

  $routeProvider

  .when('/', {
    templateUrl: 'templates/pages/HomePage.html'
  })

  .when('/getStarted', {
    templateUrl: 'templates/pages/GetStartedPage.html'
  })
  // .when('/getStarted/WhatIsSails', {
  //   templateUrl: 'templates/gettingStarted/WhatIsSails.html'
  // })
  // .when('/getStarted/NewToNode', {
  //   templateUrl: 'templates/gettingStarted/NewToNode.html'
  // })


  .when('/logos', {
    templateUrl: 'templates/pages/LogosPage.html'
  })

  .when('/features', {
    templateUrl: 'templates/pages/FeaturesPage.html'
  })

  //Documentation Sections:
  // .when('/documentation', {
  //   templateUrl: 'templates/pages/Documentation/DocsMainPage.html'
  // })

  .when('/documentation', {
    redirectTo: '/documentation/concepts'
  })

  //Version Notes Links
  .when('/documentation/changelog/pre-0.8.77', {
    templateUrl: 'templates/pages/Documentation/VersionNotes/Changelog_before0.8.77.html'
  })
    .when('/documentation/changelog/0.8.7x', {
      templateUrl: 'templates/pages/Documentation/VersionNotes/Changelog_0.8.7x.html'
    })
    .when('/documentation/changelog/0.8.8x', {
      templateUrl: 'templates/pages/Documentation/VersionNotes/Changelog_0.8.8x.html'
    })
    .when('/documentation/changelog/0.8.9', {
      templateUrl: 'templates/pages/Documentation/VersionNotes/Changelog_0.8.9.html'
    })
    .when('/documentation/changelog/0.9.0', {
      templateUrl: 'templates/pages/Documentation/VersionNotes/Changelog_0.9.0.html'
    })
    .when('/documentation/changelog/0.9.4', {
      templateUrl: 'templates/pages/Documentation/VersionNotes/Changelog_0.9.4.html'
    })
    .when('/documentation/changelog/0.9.7', {
      templateUrl: 'templates/pages/Documentation/VersionNotes/Changelog_0.9.7.html'
    })
    .when('/documentation/changelog/0.9.16', {
      templateUrl: 'templates/pages/Documentation/VersionNotes/Changelog_0.9.8.html'
    })

  .when('/documentation/anatomy', {
    templateUrl: 'templates/pages/Documentation/DocsSection.html',
    redirectTo: '/documentation/anatomy/myApp'
  })

  .when('/support', {
    templateUrl: 'templates/pages/support/supportHome.html',
  })
  .when('/support/irc', {
    templateUrl: 'templates/pages/irc.html',
  })


  // .when('/support/:sectionPath*?', {
  //   templateUrl: 'templates/pages/support/supportHome.html',
  //  controller: ['$scope', '$routeParams', function ($scope, $routeParams) {
  //     var pieces = $routeParams.sectionPath.split('/');
  //     var subsection = pieces[0];
  //     $scope.support.sectionTemplate = './templates/pages/support/'+subsection+'.html';
  //     console.log('Changed template to',$scope.support.sectionTemplate)
  //   }]
  // })

  // .when('/documentation/concepts', {
  //   templateUrl: 'templates/pages/Documentation/DocsSection.html',
  //   redirectTo: '/documentation/concepts'
  // })

  // .when('/documentation/reference', {
  //   templateUrl: 'templates/pages/Documentation/DocsSection.html',
  //   redirectTo: '/documentation/reference'
  // })

  // Documentation section sub-router
  .when('/documentation/:sectionPath*?', {
    templateUrl: 'templates/pages/Documentation/DocsSection.html',
    controller: ['$scope', '$routeParams', 'Menu',
      function($scope, $routeParams, Menu) {

        // Split sectionPath on slashes, lower-case each piece, and eliminate empty pieces
        // to determine the top-level docs section (e.g. "reference")
        // and to determine the "id" of the subpage to display (e.g. "Blueprints")
        //        var pieces = !$routeParams.sectionPath ? [] : _($routeParams.sectionPath.split('/'))
        var pieces = $routeParams.sectionPath.split('/');
        // .where(function eliminateEmptypieces(piece) { return !!piece; }).valueOf();
        // Get topLevelSectionID (e.g. "anatomy", "reference")
        var topLevelSectionID = pieces[0];
        $scope.docs.sectionID = topLevelSectionID;

        // Build the menu
        var menu = Menu.all(topLevelSectionID);

        // Expose top-level menu in scope
        // Show only the menus that are parents but not children
        $scope.docs.visibleMenu = _.where(menu, function(anItem) {
          if (anItem.isParent && !anItem.isChild) {
            // console.log('making',anItem.id,'visible')
            return anItem;
          }
        });
        $scope.docs.subMenus = _.where(menu, {
          isParent: true,
          isChild: true
        });


        $scope.docs.findMenuItemByID = function(id, findIn) {
          var grabItem = _.find(findIn, {
            fullPathAndFileName: id
          });
          if (grabItem) {
            return grabItem;
          } else {
            return {};
          }
        };

        // Then show the top-level docs section (e.g. anatomy, reference)
        $scope.docs.sectionTpl = 'templates/pages/Documentation/sections/DocsSection_' + topLevelSectionID + '.html';
        switch (topLevelSectionID) {
          case 'anatomy':
            $scope.docs.title = 'Anatomy of a Sails App';
            break;
          case 'reference':
            $scope.docs.title = 'Reference';
            break;
          case 'concepts':
            $scope.docs.title = 'Concepts';
            break;
        }

        // Trim trailing slash(es)
        // var currentHashURL = window.location.hash.replace(/\/+$/, '');
        var currentHashURL = '#/documentation/'+($routeParams.sectionPath||'').replace(/\/+$/, '');
        // console.log('da hash:',currentHashURL);
        // console.log('da improv hash:','#/documentation/'+($routeParams.sectionPath||'').replace(/\/+$/, ''));
        // var currentHashURL = ($routeParams.sectionPath||'').replace(/\/+$/, '');

        // Lookup current page using current URL fragment
        var target = _.find(menu, function(checkItem) {
          if (currentHashURL === checkItem.href)
            return checkItem;
        }) ||

        // Or default to the page with label "--"
        _.find(menu, {
          displayName: '--'
        });

        // If target could not be found, we should give up and redirect
        // to the top level of the documentation section.
        //
        // TODO: intelligently try stepping backwards one ".../namespace/..." at a time
        if (!target) {
          // console.log('Could not find a target page for ::',$routeParams.sectionPath);
          _doRedirect('#/documentation');
          return;
        }


        // Then show the appropriate sub-section
        $scope.docs.subSectionID = target.id;
        $scope.docs.currentPage = target;
        $scope.docs.parentPage = _.find(menu, {
          id: target.parent
        });


        // Now collapse all other top-level sections
        _($scope.docs.visibleMenu).where({
          parent: undefined
        }).each(function(topLevelItem) {
          $scope.intent.collapseMenuItem(topLevelItem.id);
        });

        // In order to expand the appropriate parts of the menu
        // (expand the current page, and expand its parent, and then its parent, etc.)
        // we must find the menu item's ancestors

        var ancestors = [];
        var findParentsOfThese = [target];

        // Recursively pushes all parents of 'target'
        // to the ancestors array
        var grabParents = function() {

          if (findParentsOfThese.length) {

            var navItem = findParentsOfThese.shift();

            if (navItem.parent) {
              var parent = $scope.docs.findMenuItemByID(navItem.parent, menu);
              findParentsOfThese.push(parent);
              ancestors.push(parent);

            }

            grabParents();

          } else {

            // Since there are no more ancestors to find,
            // expand all of the ancestors and the current target

            _.each(ancestors, function(ancestor) {
              $scope.intent.expandMenuItem(ancestor.id);
            });

            $scope.intent.expandMenuItem(target.id);

            // Close all submenus that arent in lineage
            _.where($scope.docs.subMenus, function(lilMenu) {
              if (!(_.contains(ancestors, lilMenu) || _.isEqual(lilMenu, target)))
                $scope.intent.collapseMenuItem(lilMenu.id);
            });
          }

        };

        grabParents();


        // Handle the `q` "search" param
        // (used for permalinking to individual sections)
        var $ = angular.element;

        // Look for matching header
        function findPermalinkedHeader(permalink){

          // Ensure "stringiness" and make the comparison case-insensitive
          // by lowercasing our search string
          // (permalink directives in the HTML are always all-lowercase)
          permalink = (permalink||'').toLowerCase();

          var $header = $('[permalink="'+permalink+'"]');

          if (!$header || !$header.length)  {
            return null;
          }
          else return $header;
        }

        // If it IS found, scroll to the appropriate point on the page
        function scrollToHeader($header) {
          if ($header) {
            var coordinates = $header.offset();
            var y = coordinates.top;

            // subtract fixed-pos topbar height so it looks nicer
            y -= 40;
            // console.log('scrolling to y='+y);

            $('html, body').animate({scrollTop: y}, 'slow');
          }
        }

        // console.log($routeParams);
        var $header;
        if ($routeParams.q) {
          $header = findPermalinkedHeader($routeParams.q);
        }

        if ($header) {
          scrollToHeader($header);
        }
        else {
          // console.log('couldnt scroll to header "%s" because it doesnt exist yet (or at all)', $routeParams.q);
          // console.log('will try again after some content loads...');
          // maybe after ALL content? (http://stackoverflow.com/a/21420965/486547)

          // `gaveUp` is just a dumb spin-lock that works with `$header` to prevent
          // some pretty serious "wtf?" scenarios-- this is because this event is being
          // bound a whole lotta times-- and it's an event binding leak.
          // This code should be refactored at some point to the temporal scope
          // of a directive where the event handlers won't snowball.
          var gaveUp;
          $(function (){
            setTimeout(function(){
              if ($header || gaveUp) return;
              // If it's STILL not found, q param is ignored
              // scroll to the top
              gaveUp = true;
              $('html, body').animate({scrollTop: 0}, 15);

              // pretty sure everything loaded at this point
              Rainbow.color();

              // console.log('STILL couldnt scroll to header "%s" because it doesnt exist yet (or at all)', $routeParams.q);
            }, 500);
          });
          $scope.$on('$includeContentLoaded', function onNgInclude (e) {
            // console.log('nginclude:',e.targetScope);

            // If the header has already been located, or we've given up,
            // don't do anything (remember, this event keeps firing forever for now)
            if ($header || gaveUp) return;

            if ($routeParams.q) {
              $header = findPermalinkedHeader($routeParams.q);
            }
            if ($header) {
              scrollToHeader($header);
            }

            // If we couldn't match the permalink, do nothing--
            // more $includeContentLoaded events will fire, or we'll eventually give up
          });
        }



      }
    ]
  })

  .otherwise({
    redirectTo: function (hashParams, hashPath, hashQs) {

      // TODO:
      // use a more automated/intelligent approach w/ $route.routes
      // however in order to do that, we'd need to upgrade angular
      // and I don't want to introduce any more entropy right now
      // (see http://stackoverflow.com/questions/16012270/angularjs-get-the-list-of-defined-routes-routeprovider#comment38591740_16368629)
      //
      // (could potentially even implement a "Did you mean..." view...)

      // Default unmatched routes to the home page, but also explicitly
      // handle known bad links and route them to a more educated guess
      //
      // This approach, as apposed to using ".when()" also supports #! urls
      // and other "not-quite-right" hash URLs.  Which is why we're doing it.
      _doRedirect(
      hashPath.match(/documentation|docs/i) ?
        '#/documentation' :
      hashPath.match(/start/i) ?
        '#/getStarted' :
      hashPath.match(/reference/i) ?
        '#/documentation/reference' :
      hashPath.match(/anatomy/i) ?
        '#/documentation/anatomy' :
      hashPath.match(/feature/i) ?
        '#/features' :
      hashPath.match(/irc/i) ?
        '#/support/irc' :

        // otherwise, default to the home page:
        '#/'
      );
    }
  });

}]);



/**
 * [doRedirect description]
 * @param  {[type]} newURLHash [description]
 * @return {[type]}            [description]
 *
 * TODO: replace w/ proper $location redirect once we've updated angular
 */
function _doRedirect(newURLHash) {
  var expectedHash = window.location.hash;
  setTimeout(function (){
    // conditionvar
    if (window.location.hash!==expectedHash)return;
    window.location.hash = newURLHash;
  },1);
}
