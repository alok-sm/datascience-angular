'use strict';

angular.module('aspiringResearcherApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .constant('api', {
    'url': "https://young-sands-7278.herokuapp.com"
  })
  .constant('debug', {
    'log': function(output){
      console.log(output);
    }
  })
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
      .when('/task/done', {
        templateUrl: 'views/task/done.html',
        controller: 'TaskDoneCtrl'
      })
      .otherwise({
        redirectTo: '404'
      });
  });
