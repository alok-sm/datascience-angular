'use strict';

angular.module('aspiringResearcherApp')
.controller('UserCreateCtrl', function ($scope, $http, $location, api, debug) {
	if (localStorage.getItem("token") !== null) {
		$location.path("/task/assign");
	}

	$scope.submit = function(){
		$scope.invalid_gender = typeof $scope.gender === 'undefined';
		$scope.invalid_age = typeof $scope.age === 'undefined';
		$scope.invalid_employment = typeof $scope.employment_status === 'undefined';
		$scope.invalid_education = typeof $scope.education_level === 'undefined';

		if( !$scope.invalid_gender && !$scope.invalid_age && !$scope.invalid_employment && !$scope.invalid_education ) {
			$scope.submit = null;
			$http.post(api.url + "/users", {
				'gender'     : $scope.gender,
				'education'  : $scope.education_level,
				'employment' : $scope.employment_status,
				'age'        : $scope.age
			})
			.success(function(success_response){
				localStorage.setItem("token", success_response['token']);
				$location.path("/task/assign");
			})
			.error(function(error_response){
				debug.log(error_response);
			});
		}
	};
});
