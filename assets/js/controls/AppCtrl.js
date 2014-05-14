menu = [];
angular.module('Sails').controller('AppCtrl', [
  '$scope',

  function($scope) {

    // var referenceMenuData = flattenJST('reference', JST);
    // var referenceMenuOrphans = _.where(referenceMenuData, {parentName: null});
    // $scope.referenceMenu = referenceMenuOrphans;
    // MENU=referenceMenuData;

    // var anatomyMenuData = flattenJST('anatomy', JST);
    // var anatomyMenuOrphans = _.where(anatomyMenuData, {parentName: null});
    // $scope.anatomyMenu = anatomyMenuOrphans;

    $scope.docs = {};


    // Qualifiers
    $scope.getIsCurrentPage = function( path ) {
      var current = window.location.hash;
      return current === '#'+path;
    };

    $scope.intent = angular.extend($scope.intent || {}, {

      /**
       * goto()
       *
       * Navigate to the specified client-side route.
       *
       * @param  {String} hash (e.g. #/foo/bar, #/blah)
       */
      goto: function (hash) {
        alert(hash);
        window.location.hash = hash;
      },

      /**
       * changeDocsTab()
       *
       * Switch out the content of the documentation section based on
       * the sectionID.
       *
       * @param  {String} sectionID  (e.g. anatomy, reference)
       */
      changeDocsTab: function(sectionID, pieces) {

        $scope.docs.sectionID = sectionID;
        $scope.docs.sectionTpl = 'templates/pages/Documentation/sections/DocsSection_'+sectionID+'.html';

        switch(sectionID) {
          case 'anatomy':
            $scope.docs.title = 'Anatomy of a Sails App';
            break;
          case 'reference':
            $scope.docs.title = 'Reference';
            break;
        }
      },


      expandMenuItem: function (sectionMenuData, id) {
        var thisMenuItem = _.findWhere(sectionMenuData, { name: id });
        thisMenuItem.expanded = true;
        thisMenuItem.visibleChildren = _.where(sectionMenuData, { parentName: thisMenuItem.name });
      },
      collapseMenuItem: function (sectionMenuData, id) {
        var thisMenuItem = _.findWhere(sectionMenuData, { name: id });
        thisMenuItem.expanded = false;
        thisMenuItem.visibleChildren = [];
      },

      showTemplateForReferenceItem: function (id) {
        var thisMenuItem = _.findWhere(referenceMenuData, { name: id });
        var overviewTemplate = _.findWhere(referenceMenuData, { name: id+'.html' });

        if (thisMenuItem.templatePath) {
          $scope.currentPage = thisMenuItem;
        } else if(overviewTemplate) {
          $scope.currentPage = overviewTemplate;
        }
      },
      toggleReferenceItemExpanded: function (id) {
        var thisMenuItem = _.findWhere(referenceMenuData, { name: id });

        if (!thisMenuItem.expanded) {
          $scope.intent.expandMenuItem(referenceMenuData, id);
        }
        else {
          $scope.intent.collapseMenuItem(referenceMenuData,id);
        }
      },
      showTemplateForAnatomyItem: function (id) {
        var thisMenuItem = _.findWhere(anatomyMenuData, { name: id });
        var overviewTemplate = _.findWhere(anatomyMenuData, { name: id+'.html' });

        if (thisMenuItem.templatePath) {
          $scope.currentPage = thisMenuItem;
        } else if(overviewTemplate) {
          $scope.currentPage = overviewTemplate;
        }
      },
      toggleAnatomyItemExpanded: function (id) {
        var thisMenuItem = _.findWhere(anatomyMenuData, { name: id });

        if (!thisMenuItem.expanded) {
          $scope.intent.expandMenuItem(anatomyMenuData, id);
        }
        else {
          $scope.intent.collapseMenuItem(anatomyMenuData,id);
        }
      }
    });
  }
]);
