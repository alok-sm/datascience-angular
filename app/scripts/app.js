'use strict';

angular.module('aspiringResearcherApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/404', {
        templateUrl: 'views/404.html',
        controller: '404Ctrl'
      })
      .when('/user/create', {
        templateUrl: 'views/user/create.html',
        controller: 'UserCreateCtrl'
      })
      .when('/task/assign', {
        templateUrl: 'views/task/assign.html',
        controller: 'TaskAssignCtrl'
      })
      .otherwise({
        redirectTo: '404'
      });
  });
