'use strict';

angular.module('aspiringResearcherApp')
  .directive('selectcountry', function () {
    return {
      templateUrl: '../../directive_views/selectcountry.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
