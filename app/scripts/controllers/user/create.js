'use strict';

angular.module('aspiringResearcherApp')
.controller('UserCreateCtrl', function ($scope, $http, api, debug) {
	$scope.submit = function(){

		$scope.invalid_gender = typeof $scope.gender === 'undefined'
		$scope.invalid_age = typeof $scope.age === 'undefined'
		$scope.invalid_employment = typeof $scope.employment_status === 'undefined'
		$scope.invalid_education = typeof $scope.education_level === 'undefined'

		if( !$scope.invalid_gender && !$scope.invalid_age && !$scope.invalid_employment && !$scope.invalid_education ) {
			$scope.submit = null;
			$http.get(api.url + "/token")
			.success(function(token_response) {
				debug.log(token_response['token']);
				$http.post(api.url + "/users", {
					'_token'     : token_response['token'],
					'gender'     : $scope.gender,
					'education'  : $scope.education_level,
					'employment' : $scope.employment_status,
					'age'        : $scope.age
				})
				// $http.post(api.url + "/users", {
				// 	'_token'     : 'uQf88eSJ6072UfoMQECLetg3SvDOaRKZkHAcSDDk',
				// 	'gender'     : 'M',
				// 	'education'  : 'fgjnsjgk',
				// 	'employment' : 'jgnsfjgn',
				// 	'age'        : '20'
				// })
				.success(function(success_response){
					debug.log(success_response);
				})
				.error(function(error_response){
					debug.log(error_response);
				});
			});
		}
	};
});
