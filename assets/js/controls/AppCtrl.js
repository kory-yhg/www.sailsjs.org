menu = [];
angular.module('Sails').controller('AppCtrl', [
  '$scope',

  function($scope) {
    var referenceMenuData = flattenJST('reference', JST);
    var anatomyMenuData = flattenJST('anatomy', JST);

    // Calculate the orphans
    var referenceMenuOrphans = _.where(referenceMenuData, {parentName: null});
    var anatomyMenuOrphans = _.where(anatomyMenuData, {parentName: null});
    // console.log('ORPHAN ORPHAN ORPHAN: ',orphans);

    // Put the orphans on the scope as "menu"
    $scope.referenceMenu = referenceMenuOrphans;
    $scope.anatomyMenu = anatomyMenuOrphans;

    $scope.docs = {};

    $scope.intent = angular.extend($scope.intent || {}, {
      
      isCurrentPage: function( path ) {
        var current = window.location.hash;
        return current === '#'+path;
      },

      changeDocsTab: function(section) {
        $scope.docs.currentSection = section;
        $scope.docs.documentationSection = 'templates/pages/Documentation/sections/DocsSection_'+section+'.html';

        if(section === 'anatomy') {
          $scope.docs.currentSectionTitle = 'Anatomy of a Sails App';
        }
        if(section === 'reference') {
          $scope.docs.currentSectionTitle = 'Reference';
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
        // console.log('I CLCIEKD O IT', id, thisMenuItem.templatePath);
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
        // console.log('I CLCIEKD O IT', id, thisMenuItem.templatePath);
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
