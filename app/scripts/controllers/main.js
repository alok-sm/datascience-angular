'use strict';

angular.module('aspiringResearcherApp')
.controller('MainCtrl', function ($scope, $location) {
	if (localStorage.getItem("_token") !== null) {
	  	$location.path("/task/assign");
	}
});
