'use strict';

angular.module('aspiringResearcherApp')
.controller('MainCtrl', function ($scope, $location) {
	if (localStorage.getItem("token") !== null) {
		$location.path("/task/assign");
	}
});
