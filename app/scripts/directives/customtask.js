'use strict';
angular.module('aspiringResearcherApp')
	.directive('customtask', function () {
		return{
			restrict:'E',
			templateUrl : '../../directive_views/customtask.html'
		};
	});

